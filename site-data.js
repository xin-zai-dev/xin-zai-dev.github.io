// 在这里维护公开资料；未提供的个人经历保留待补充提示。
// image 为项目截图；url 为主要入口，sourceUrl 可额外提供源码入口。
window.PORTFOLIO = {
  name: "xin-zai-dev",
  tagline: "保持好奇，让想法成为作品。",
  introduction: "从旅行路线到英语学习，把日常想法做成可以使用的工具。这里收录我的项目与持续探索。",
  github: "https://github.com/xin-zai-dev",
  // 只有希望公开邮箱时才填写；为空时联系入口仍指向 GitHub。
  email: "",
  aboutLead: "用具体的作品，介绍自己。",
  about: "你好，我是 xin-zai-dev。我正在实践如何把日常需求变成工具：用路线工坊记录旅行，用 Speak Daily 练习英语，再用这个网站整理作品。这里展示真实界面、实现方式与源码，记录每一步探索。",
  currentChapter: "记录旅行，练习英语，继续把想法做出来。",
  // 有真实 PDF 后，可填写相对路径，例如 ./assets/resume.pdf。
  resumeUrl: "",
  projects: [
    {
      id: "amap-routes",
      number: "01",
      title: "自驾路线工坊",
      subtitle: "AmapRoutes · 旅行路线与足迹可视化",
      category: "路线可视化",
      image: "./assets/projects/amap-routes.png",
      imageAlt: "自驾路线工坊的编辑器与示例旅行路线地图",
      runtime: "本地应用",
      tags: ["Node.js", "D3 / SVG", "地图可视化", "MP4 导出"],
      description: "把一次旅行中的地点串联成路线，让沿途的记忆在地图上动起来。",
      overview: "支持多段行程编排、TXT / CSV / JSON / GeoJSON 足迹导入，以及 SVG 图片和 1080p / 4K 视频导出。已到访地区与计划路线独立记录，项目可在浏览器自动保存并备份。截图使用示例行程。",
      process: "使用 D3 与 SVG 绘制地图，预览和视频导出共用动画时间线。完整功能需要本机 Node.js、Chromium 与 FFmpeg，运行步骤见仓库。路线按地点连线展示，不提供道路导航，也不会自动同步高德个人足迹。",
      url: "https://github.com/xin-zai-dev/AmapRoutes",
      urlLabel: "查看源码与运行说明",
      example: false
    },
    {
      id: "personal-website",
      number: "02",
      title: "我的个人空间",
      subtitle: "PersonalWebsite · 个人简历与作品集",
      category: "个人网站",
      image: "./assets/projects/personal-website.jpg",
      imageAlt: "xin-zai-dev 个人网站首页",
      runtime: "在线网站",
      tags: ["HTML / CSS", "JavaScript", "响应式设计", "GitHub Pages"],
      description: "一个持续更新的个人主页，集中展示项目、经历和探索过程。",
      overview: "使用轻量静态页面搭建个人简历与作品集，提供作品分类筛选、截图详情、GitHub 源码入口和简历打印功能。桌面与手机都可以浏览，个人经历会随整理进度继续补充。",
      process: "无需前端框架或构建工具，公开资料集中维护在 site-data.js。通过 GitHub Pages 发布，提交源码后自动更新；用键盘导航、原生对话框和减少动画偏好改善浏览体验。",
      url: "https://xin-zai-dev.github.io/",
      urlLabel: "访问网站",
      sourceUrl: "https://github.com/xin-zai-dev/xin-zai-dev.github.io",
      example: false
    },
    {
      id: "speak-daily",
      number: "03",
      title: "Speak Daily",
      subtitle: "reminder Assistant · 英语学习与提醒助手",
      category: "学习工具",
      image: "./assets/projects/speak-daily.jpg",
      imageAlt: "Speak Daily 的每日英语课程与学习界面",
      runtime: "本地应用",
      tags: ["Node.js", "Ollama", "英语学习", "本地提醒"],
      description: "把每日词汇、阅读与口语练习放在一起，让学习成为日常的一部分。",
      overview: "提供轮换的每日课程、词汇间隔复习、阅读与口语练习、学习进度和提醒事项管理。可连接本地 Ollama 进行英语对话与纠错，并按需配置企业微信每日学习材料推送。",
      process: "使用原生网页与本机 Node.js 服务，学习记录保存在浏览器。AI 对话、语音和定时推送需要相应的本地服务或独立配置；完整功能不能仅依赖 GitHub Pages 运行。仓库提供启动说明与 macOS launchd 模板，个人凭据与学习记录不随源码发布。",
      url: "https://github.com/xin-zai-dev/reminder-assistant",
      urlLabel: "查看源码与运行说明",
      example: false
    }
  ],
  // 填入真实经历后，date 可为年份或起止时间。
  experience: [
    { date: "待补充", title: "工作与项目经历", description: "经历正在整理中，将在这里更新。" },
    { date: "待补充", title: "教育背景", description: "教育背景与学习经历将在这里更新。" }
  ]
};
