(() => {
  "use strict";
  const data = window.PORTFOLIO;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const text = (selector, value) => { if (typeof value === "string") $(selector).textContent = value; };
  const element = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const safeUrl = (value) => {
    try {
      const url = new URL(value, document.baseURI);
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  };

  document.querySelectorAll("[data-name]").forEach(node => { node.textContent = data.name; });
  document.title = `${data.name} — 个人简历与作品集`;
  text("#tagline", data.tagline);
  text("#introduction", data.introduction);
  text("#about-lead", data.aboutLead);
  text("#about-body", data.about);
  text("#current-chapter", data.currentChapter);
  text("#year", String(new Date().getFullYear()));
  const github = safeUrl(data.github);
  if (github) {
    document.querySelectorAll("[data-github]").forEach(link => { link.href = github; });
    $(".contact-copy").dataset.printContact = github;
  }
  if (typeof data.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    const contact = $("#contact-link");
    contact.href = `mailto:${data.email}`;
    contact.textContent = "给我发邮件 ↗";
    contact.removeAttribute("target");
  }

  const menu = $(".menu-toggle");
  const navigation = $("#navigation");
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "打开导航");
    navigation.classList.remove("open");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    navigation.classList.toggle("open", open);
  });
  navigation.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menu.focus();
    }
  });

  const artwork = (project) => {
    const art = element("div", "project-art project-screenshot");
    art.setAttribute("aria-hidden", "true");
    const url = project.image && safeUrl(project.image);
    if (url) {
      const img = element("img");
      img.src = url;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      art.append(img);
    }
    return art;
  };
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const dialog = $("#project-dialog");
  let dialogTrigger;
  const openProject = (project, trigger) => {
    dialogTrigger = trigger;
    text("#dialog-title", project.title);
    text("#dialog-category", `${project.number || ""} / ${project.category || "作品"}`);
    text("#dialog-description", project.description || "");
    text("#dialog-overview", project.overview || "");
    text("#dialog-process", project.process || "");
    dialog.querySelector(".example-label").hidden = !project.example;
    $("#dialog-tags").replaceChildren(...(project.tags || []).map(tag => element("span", "tag", tag)));
    const link = $("#dialog-link");
    const url = project.url && safeUrl(project.url);
    link.hidden = !url;
    if (url) link.href = url;
    else link.removeAttribute("href");
    link.textContent = `${project.urlLabel || "查看项目"} ↗`;
    const sourceLink = $("#dialog-source");
    const sourceUrl = project.sourceUrl && safeUrl(project.sourceUrl);
    sourceLink.hidden = !sourceUrl;
    if (sourceUrl) sourceLink.href = sourceUrl;
    else sourceLink.removeAttribute("href");
    const image = $("#dialog-image");
    const imageUrl = project.image && safeUrl(project.image);
    image.hidden = !imageUrl;
    if (imageUrl) {
      image.src = imageUrl;
      image.alt = project.imageAlt || `${project.title}界面截图`;
    } else image.removeAttribute("src");
    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.querySelector(".dialog-close").focus();
  };
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener("close", () => { document.body.classList.remove("dialog-open"); dialogTrigger?.focus(); });

  const renderProjects = (category) => {
    const visible = projects.filter(project => category === "全部" || project.category === category);
    const cards = visible.map(project => {
      const card = element("article", "project-card");
      const button = element("button", "project-open");
      button.type = "button";
      button.setAttribute("aria-label", `查看${project.example ? "示例" : "作品"}：${project.title}`);
      button.append(artwork(project));
      const openMark = element("span", "project-open-mark", "↗");
      openMark.setAttribute("aria-hidden", "true");
      button.append(openMark);
      if (project.runtime) button.append(element("span", "project-runtime", project.runtime));
      if (project.example) button.append(element("span", "project-example", "示例项目"));
      button.addEventListener("click", () => openProject(project, button));
      const meta = element("div", "project-meta");
      meta.append(element("span", "project-number", `/${project.number || ""}`), element("span", "project-category", project.category || "作品"));
      const title = element("h3");
      const titleButton = element("button", "project-title-button", project.title);
      titleButton.type = "button";
      titleButton.addEventListener("click", () => openProject(project, titleButton));
      title.append(titleButton);
      card.append(button, meta, title, element("p", "project-subtitle", project.subtitle || project.description || ""));
      return card;
    });
    $("#projects").replaceChildren(...cards);
    if (!visible.length) $("#projects").append(element("p", "empty-projects", "新的作品正在整理中。"));
    text("#filter-status", `显示 ${visible.length} 个${category === "全部" ? "" : category}作品`);
  };
  const filterContainer = $("#project-filters");
  [...new Set(projects.map(project => project.category).filter(Boolean))].forEach(category => {
    const button = element("button", "filter", category);
    button.type = "button";
    button.dataset.filter = category;
    button.setAttribute("aria-pressed", "false");
    filterContainer.append(button);
  });
  filterContainer.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filterContainer.querySelectorAll("button").forEach(filter => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderProjects(button.dataset.filter);
  });
  $(".template-note").hidden = !projects.some(project => project.example);
  renderProjects("全部");

  if (Array.isArray(data.experience)) {
    $("#experience-list").replaceChildren(...data.experience.map(item => {
      const entry = element("article", "experience");
      const content = element("div");
      content.append(element("h3", "", item.title), element("p", "", item.description));
      const icon = element("span", "experience-icon", "↗");
      icon.setAttribute("aria-hidden", "true");
      entry.append(element("div", "experience-date", item.date), content, icon);
      return entry;
    }));
  }
  $(".resume-note").hidden = !(data.experience || []).some(item => item.date === "待补充");
  $("#print-resume").addEventListener("click", () => {
    const resume = data.resumeUrl && safeUrl(data.resumeUrl);
    if (resume) window.open(resume, "_blank", "noopener,noreferrer");
    else window.print();
  });
})();
