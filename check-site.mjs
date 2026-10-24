import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));
const entry = resolve(root, 'index.html');
const problems = [];
let resourceCount = 0;
let anchorCount = 0;

if (!existsSync(entry)) {
  console.error('检查失败：根目录缺少 index.html。');
  process.exit(1);
}

const html = readFileSync(entry, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const ids = new Set([...html.matchAll(/\sid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)]
  .map((match) => match[1] ?? match[2]));

for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
  for (const attribute of tag[0].matchAll(/\s(src|href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    const name = attribute[1].toLowerCase();
    const value = (attribute[2] ?? attribute[3] ?? attribute[4]).trim();
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) continue;

    let url;
    try {
      url = new URL(value, 'https://local.invalid/index.html');
    } catch {
      problems.push(`无效的 ${name} 地址：${value}`);
      continue;
    }

    let path;
    let anchor;
    try {
      path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
      anchor = decodeURIComponent(url.hash.slice(1));
    } catch {
      problems.push(`地址编码无效：${value}`);
      continue;
    }

    if (path !== root && !path.startsWith(`${root}${sep}`)) {
      problems.push(`本地地址超出网站目录：${value}`);
      continue;
    }
    if (existsSync(path) && statSync(path).isDirectory()) path = resolve(path, 'index.html');
    if (!existsSync(path)) {
      problems.push(`本地资源不存在：${value}`);
      continue;
    }
    resourceCount += 1;

    if (name === 'href' && anchor && path === entry) {
      anchorCount += 1;
      if (!ids.has(anchor)) problems.push(`页面锚点不存在：#${anchor}`);
    }
  }
}

// Project images are rendered by JavaScript rather than written in index.html.
try {
  const context = { window: {} };
  runInNewContext(readFileSync(resolve(root, 'site-data.js'), 'utf8'), context, { timeout: 1000 });
  for (const project of context.window.PORTFOLIO.projects || []) {
    const value = project.image;
    if (!value) continue;
    const url = new URL(value, 'https://local.invalid/index.html');
    if (url.origin !== 'https://local.invalid') continue;
    const path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (!path.startsWith(`${root}${sep}`) || !existsSync(path) || !statSync(path).isFile()) {
      problems.push(`项目截图不存在或超出网站目录：${value}`);
    } else resourceCount += 1;
  }
} catch (error) {
  problems.push(`项目资料无法检查：${error.message}`);
}

const sources = readdirSync(root)
  .map((name) => resolve(root, name))
  .filter((path) => statSync(path).isFile() && /\.(?:m?js|json)$/.test(path));

for (const path of sources) {
  const name = relative(root, path);
  if (extname(path) === '.json') {
    try {
      JSON.parse(readFileSync(path, 'utf8'));
    } catch (error) {
      problems.push(`${name} JSON 语法错误：${error.message}`);
    }
  } else {
    const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
    if (result.status !== 0) {
      problems.push(`${name} JavaScript 语法错误：\n${result.stderr || result.error?.message || '检查进程未成功退出'}`);
    }
  }
}

if (problems.length) {
  console.error(`检查失败，共 ${problems.length} 项：\n${problems.map((problem) => `- ${problem}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`检查通过：${resourceCount} 个本地引用、${anchorCount} 个锚点、${sources.length} 个 JS / JSON 文件。`);
}
