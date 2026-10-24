# xin-zai-dev 的个人网站与作品集

无依赖、无构建步骤的 HTML / CSS / JavaScript 静态站点，适合直接发布到 GitHub Pages。

已发布于 <https://xin-zai-dev.github.io/>，展示以下三个真实项目及其界面截图：

- [自驾路线工坊 / AmapRoutes](https://github.com/xin-zai-dev/AmapRoutes)：路线与足迹可视化、图片和视频导出。
- [PersonalWebsite](https://github.com/xin-zai-dev/xin-zai-dev.github.io)：当前个人简历与作品集网站。
- [Speak Daily / reminder Assistant](https://github.com/xin-zai-dev/reminder-assistant)：每日英语课程、复习与本地提醒。

AmapRoutes 与 Speak Daily 的完整功能需要本地服务，网站提供截图、介绍和源码入口；运行方式见对应仓库。个人教育与工作经历仍标记为待补充。

## 本地预览

在项目目录运行：

```sh
python3 -m http.server 8000
```

打开 <http://localhost:8000>。按 `Ctrl+C` 停止预览。

## 修改内容

- 编辑 `site-data.js`，集中修改个人介绍、简历内容、联系入口和项目。
- 显示名称和 GitHub 用户名均为 `xin-zai-dev`，主页为 <https://github.com/xin-zai-dev>。
- 项目 `image` 指向 `assets/projects/` 中的真实截图；`imageAlt` 描述截图内容。
- `url` / `urlLabel` 设置主入口与按钮文案，`sourceUrl` 可额外显示源码入口，`runtime` 标记在线网站或本地应用。
- 项目 `category` 自动生成分类筛选；真实项目保持 `example: false`。
- 如需更换名称，请同步修改 `index.html` 的标题、简介和默认文字，便于搜索引擎与无脚本访问。
- 编辑 `styles.css` 调整配色、排版和打印样式。
- 如需替换图片或增加文件，把资源放入项目中，并使用 `./` 相对路径引用。
- 简历按钮使用浏览器打印，可选择“另存为 PDF”。

页面不需要 Node.js 才能运行；安装 Node.js 后可以执行静态检查：

```sh
node check-site.mjs
```

检查涵盖 HTML 本地资源、项目截图、页面锚点以及项目根目录 JS / JSON 的语法。交互与屏幕布局仍需在浏览器中检查。

## 发布到 GitHub Pages

1. 在 GitHub 账号 `xin-zai-dev` 下使用公开仓库 `xin-zai-dev.github.io`。
2. 把网站文件提交到 `main` 根目录，保留 `index.html` 和 `.nojekyll`。
3. 在仓库 **Settings → Pages** 中选择 **Deploy from a branch → main → /(root) → Save**。
4. 部署完成后访问 <https://xin-zai-dev.github.io/>。后续提交到 `main` 会自动更新站点，通常需要几分钟。

无需自建 Actions YAML。详细步骤见 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
