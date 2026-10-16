(() => {
  "use strict";

  const config = window.ISAC_CONFIG || {};
  const competitions = [
    { title: "Programme Presenting — English Junior", group: "presenting", detail: "Programme Presenting", language: "English", level: "Junior" },
    { title: "Programme Presenting — English Intermediate", group: "presenting", detail: "Programme Presenting", language: "English", level: "Intermediate" },
    { title: "Programme Presenting — English Senior", group: "presenting", detail: "Programme Presenting", language: "English", level: "Senior" },
    { title: "Programme Presenting — Sinhala Junior", group: "presenting", detail: "Programme Presenting", language: "Sinhala", level: "Junior" },
    { title: "Programme Presenting — Sinhala Intermediate", group: "presenting", detail: "Programme Presenting", language: "Sinhala", level: "Intermediate" },
    { title: "Programme Presenting — Sinhala Senior", group: "presenting", detail: "Programme Presenting", language: "Sinhala", level: "Senior" },
    { title: "Programme Presenting — Tamil Junior", group: "presenting", detail: "Programme Presenting", language: "Tamil", level: "Junior" },
    { title: "Programme Presenting — Tamil Intermediate", group: "presenting", detail: "Programme Presenting", language: "Tamil", level: "Intermediate" },
    { title: "Programme Presenting — Tamil Senior", group: "presenting", detail: "Programme Presenting", language: "Tamil", level: "Senior" },

    { title: "News Reading — English Junior", group: "news", detail: "News Reading", language: "English", level: "Junior" },
    { title: "News Reading — English Intermediate", group: "news", detail: "News Reading", language: "English", level: "Intermediate" },
    { title: "News Reading — English Senior", group: "news", detail: "News Reading", language: "English", level: "Senior" },
    { title: "News Reading — Sinhala Junior", group: "news", detail: "News Reading", language: "Sinhala", level: "Junior" },
    { title: "News Reading — Sinhala Intermediate", group: "news", detail: "News Reading", language: "Sinhala", level: "Intermediate" },
    { title: "News Reading — Sinhala Senior", group: "news", detail: "News Reading", language: "Sinhala", level: "Senior" },
    { title: "News Reading — Tamil Junior", group: "news", detail: "News Reading", language: "Tamil", level: "Junior" },
    { title: "News Reading — Tamil Intermediate", group: "news", detail: "News Reading", language: "Tamil", level: "Intermediate" },
    { title: "News Reading — Tamil Senior", group: "news", detail: "News Reading", language: "Tamil", level: "Senior" },

    { title: "News Editing — English Junior", group: "news", detail: "News Editing", language: "English", level: "Junior" },
    { title: "News Editing — English Intermediate", group: "news", detail: "News Editing", language: "English", level: "Intermediate" },
    { title: "News Editing — English Senior", group: "news", detail: "News Editing", language: "English", level: "Senior" },
    { title: "News Editing — Sinhala Junior", group: "news", detail: "News Editing", language: "Sinhala", level: "Junior" },
    { title: "News Editing — Sinhala Intermediate", group: "news", detail: "News Editing", language: "Sinhala", level: "Intermediate" },
    { title: "News Editing — Sinhala Senior", group: "news", detail: "News Editing", language: "Sinhala", level: "Senior" },
    { title: "News Editing — Tamil Junior", group: "news", detail: "News Editing", language: "Tamil", level: "Junior" },
    { title: "News Editing — Tamil Intermediate", group: "news", detail: "News Editing", language: "Tamil", level: "Intermediate" },
    { title: "News Editing — Tamil Senior", group: "news", detail: "News Editing", language: "Tamil", level: "Senior" },

    { title: "Podcast Presentation — English Open", group: "special", detail: "Podcast Presentation", language: "English", level: "Open" },
    { title: "Podcast Presentation — Sinhala Open", group: "special", detail: "Podcast Presentation", language: "Sinhala", level: "Open" },
    { title: "Dubbing — English Open", group: "special", detail: "Dubbing", language: "English", level: "Open" },
    { title: "Dubbing — Sinhala Open", group: "special", detail: "Dubbing", language: "Sinhala", level: "Open" },
    { title: "Sports Commentary — English Open", group: "special", detail: "Sports Commentary", language: "English", level: "Open" },
    { title: "Sports Commentary — Sinhala Open", group: "special", detail: "Sports Commentary", language: "Sinhala", level: "Open" },
    { title: "News Blogging Open", group: "special", detail: "News Blogging", language: "Open", level: "" },
    { title: "News & Template Round Open", group: "special", detail: "News & Template Round", language: "Open", level: "" },
    { title: "Wild Card — Best Announcer Selection Round Open", group: "special", detail: "Wild Card", language: "Open", level: "" }
  ];

  const grid = document.getElementById("competitionGrid");
  const categorySelect = document.getElementById("category");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  let activeFilter = "all";
  let authMode = "register";

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));

  function renderCompetitions() {
    if (!grid) return;
    const filtered = competitions.filter((item) => activeFilter === "all" || item.group === activeFilter);
    grid.innerHTML = filtered.map((item) => {
      const number = String(competitions.indexOf(item) + 1).padStart(2, "0");
      return `<button class="competition-card" type="button" data-competition="${escapeHtml(item.title)}" aria-label="Register interest in ${escapeHtml(item.title)}">
        <span class="card-number">ARENA ${number} · ${escapeHtml(item.language.toUpperCase())}</span>
        <span class="card-title">${escapeHtml(item.title)}</span>
        <span class="card-arrow" aria-hidden="true">↗</span>
      </button>`;
    }).join("");
  }

  function populateCategoryOptions() {
    if (!categorySelect) return;
    categorySelect.innerHTML = '<option value="">Choose a category</option>' +
      competitions.map((item) => `<option value="${escapeHtml(item.title)}">${escapeHtml(item.title)}</option>`).join("");
  }

  function openModal(mode = "register", category = "") {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    setAuthMode(mode);
    if (categorySelect && category) categorySelect.value = category;
    const firstField = document.getElementById("fullName");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function setAuthMode(mode) {
    authMode = mode;
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      const selected = tab.dataset.authTab === mode;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    const registerFields = document.getElementById("registerFields");
    const school = document.getElementById("school");
    const category = document.getElementById("category");
    const title = document.getElementById("authTitle");
    const submit = document.getElementById("authSubmit");
    const message = document.getElementById("formMessage");
    const isRegister = mode === "register";
    registerFields.hidden = !isRegister;
    school.required = isRegister;
    category.required = isRegister;
    title.innerHTML = isRegister ? 'Enter the <em>arena.</em>' : 'Participant <em>access.</em>';
    submit.innerHTML = isRegister ? 'Submit interest <span>↗</span>' : 'Continue <span>↗</span>';
    message.textContent = "";
  }

  document.addEventListener("click", (event) => {
    const authButton = event.target.closest("[data-open-auth]");
    if (authButton) openModal(authButton.dataset.openAuth);

    const card = event.target.closest("[data-competition]");
    if (card) openModal("register", card.dataset.competition);

    const filter = event.target.closest("[data-filter]");
    if (filter) {
      activeFilter = filter.dataset.filter;
      filterButtons.forEach((button) => button.classList.toggle("active", button === filter));
      renderCompetitions();
    }

    const tab = event.target.closest("[data-auth-tab]");
    if (tab) setAuthMode(tab.dataset.authTab);
  });

  document.getElementById("closeModal")?.addEventListener("click", closeModal);
  document.getElementById("authModal")?.addEventListener("click", (event) => {
    if (event.target.id === "authModal") closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document.getElementById("authForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.getElementById("formMessage");
    if (authMode === "login") {
      message.textContent = "Login is not connected yet. Please use the official registration platform once the organisers provide its link.";
      return;
    }
    if (config.registrationMode === "demo") {
      message.textContent = "Demo only: no information was sent or saved. Connect an approved registration service before launch.";
      return;
    }
    message.textContent = "Registration service is not configured. Please contact the organisers.";
  });

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const email = config.contactEmail || "replace-with-official-email@example.com";
  const emailLink = document.getElementById("contactEmailLink");
  const emailTitle = document.getElementById("contactEmailTitle");
  if (emailLink) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = `${email} ↗`;
  }
  if (emailTitle) emailTitle.textContent = "Contact the team";
  const social = document.getElementById("socialLink");
  if (social && config.socialUrl) social.href = config.socialUrl;
  const eventDate = document.getElementById("eventDate");
  if (eventDate && config.eventDate) eventDate.textContent = config.eventDate;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  populateCategoryOptions();
  renderCompetitions();
})();
