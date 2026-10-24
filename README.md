# xin-zai-dev 的个人网站模板

无依赖、无构建步骤的 HTML / CSS / JavaScript 静态站点，适合直接发布到 GitHub Pages。

页面中的项目和履历提示是**展示示例，不是真实履历**。发布个人正式版本前，请替换为自己的公开资料。

## 本地预览

在项目目录运行：

```sh
python3 -m http.server 8000
```

打开 <http://localhost:8000>。按 `Ctrl+C` 停止预览。

## 修改内容

- 编辑 `site-data.js`，集中修改个人介绍、简历内容、联系入口和项目。
- 显示名称和 GitHub 用户名均为 `xin-zai-dev`，主页为 <https://github.com/xin-zai-dev>。
- 将真实项目的 `example` 设为 `false`，填写 `url` 后详情页会显示项目外链。
- 如需更换名称，请同步修改 `index.html` 的标题、简介和默认文字，便于搜索引擎与无脚本访问。
- 编辑 `styles.css` 调整配色、排版和打印样式。
- 如需替换图片或增加文件，把资源放入项目中，并使用 `./` 相对路径引用。
- 简历按钮使用浏览器打印，可选择“另存为 PDF”。

页面不需要 Node.js 才能运行；安装 Node.js 后可以执行静态检查：

```sh
node check-site.mjs
```

检查涵盖 HTML 本地资源、页面锚点以及项目根目录 JS / JSON 的语法。交互与屏幕布局仍需在浏览器中检查。

## 发布到 GitHub Pages

1. 在 GitHub 账号 `xin-zai-dev` 下使用公开仓库 `xin-zai-dev.github.io`。
2. 把网站文件提交到 `main` 根目录，保留 `index.html` 和空文件 `.nojekyll`。
3. 在仓库 **Settings → Pages** 中选择 **Deploy from a branch → main → /(root) → Save**。
4. 部署完成后访问 <https://xin-zai-dev.github.io/>。后续提交到 `main` 会自动更新站点，通常需要几分钟。

无需自建 Actions YAML。详细步骤见 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
