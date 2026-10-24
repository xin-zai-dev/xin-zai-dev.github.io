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

  const artwork = (kind) => {
    const art = element("div", `project-art art-${["dashboard", "focus", "form"].includes(kind) ? kind : "form"}`);
    art.setAttribute("aria-hidden", "true");
    // These are decorative layout illustrations, not screenshots of real projects.
    const pieces = {
      dashboard: '<div class="mock-dashboard"><div class="mock-side"><b>◈</b><i></i><i></i><i></i><i></i></div><div class="mock-main"><div class="mock-title">Overview <span>•••</span></div><div class="mock-stats"><div><small>Total views</small><strong>12,840</strong></div><div><small>Growth</small><strong>+24.8%</strong></div></div><div class="mock-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="mock-lines"><i></i><i></i></div></div></div>',
      focus: '<div class="mock-focus"><span class="focus-label">MAKE ROOM FOR</span><strong>the important.</strong><div class="focus-task done"><span>✓</span> A little less noise</div><div class="focus-task"><span></span> A little more focus</div><div class="focus-task"><span></span> One thing at a time</div><div class="focus-bottom"><span>↳ KEEP IT SIMPLE</span><b>+</b></div></div><span class="focus-asterisk">✳</span>',
      form: '<div class="form-poster"><div class="poster-header"><span>FORM &amp;<br>FEELING</span><span>VOL. 01</span></div><div class="poster-shapes"><i></i><i></i><i></i><i></i></div><div class="poster-footer"><span>EXPLORATIONS<br>IN EVERYDAY FORMS</span><span>↗</span></div></div>'
    };
    art.innerHTML = pieces[kind] || pieces.form;
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
      button.append(artwork(project.artwork));
      const openMark = element("span", "project-open-mark", "↗");
      openMark.setAttribute("aria-hidden", "true");
      button.append(openMark);
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
