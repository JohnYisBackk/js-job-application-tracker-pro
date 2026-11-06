"use strict";

/* ======================================================
    SELECT ELEMENTS
====================================================== */

// SIDEBAR & NAVIGATION

const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("#sidebarToggle");
const sidebarOverlay = document.querySelector("#sidebarOverlay");

const navLinks = document.querySelectorAll(".nav-link");

const themeBtn = document.querySelector("#themeBtn");
const currentYear = document.querySelector("#currentYear");

// APPLICATION MODAL TRIGGERS

const openApplicationModalBtns = document.querySelectorAll(
  "[data-open-application-modal]",
);

// SIDEBAR STATISTICS

const navApplicationsCount = document.querySelector("#navApplicationsCount");
const navInterviewsCount = document.querySelector("#navInterviewsCount");

const sidebarTotalCount = document.querySelector("#sidebarTotalCount");
const sidebarInterviewCount = document.querySelector("#sidebarInterviewCount");
const sidebarOfferCount = document.querySelector("#sidebarOfferCount");
const sidebarRejectedCount = document.querySelector("#sidebarRejectedCount");

// DASHBOARD STATISTICS

const totalApplications = document.querySelector("#totalApplications");
const totalInterviews = document.querySelector("#totalInterviews");
const totalOffers = document.querySelector("#totalOffers");
const totalRejected = document.querySelector("#totalRejected");
const responseRate = document.querySelector("#responseRate");

// APPLICATIONS

const applicationsCount = document.querySelector("#applicationsCount");
const applicationsTableBody = document.querySelector("#applicationsTableBody");
const applicationsEmpty = document.querySelector("#applicationsEmpty");
const applicationsResults = document.querySelector("#applicationsResults");

// SEARCH / FILTER / SORT

const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const priorityFilter = document.querySelector("#priorityFilter");
const sortSelect = document.querySelector("#sortSelect");
const clearFiltersBtn = document.querySelector("#clearFiltersBtn");

// APPLICATION PIPELINE

const pipelineApplied = document.querySelector("#pipelineApplied");
const pipelineInterview = document.querySelector("#pipelineInterview");
const pipelineOffer = document.querySelector("#pipelineOffer");
const pipelineRejected = document.querySelector("#pipelineRejected");

const pipelineAppliedCount = document.querySelector("#pipelineAppliedCount");
const pipelineInterviewCount = document.querySelector(
  "#pipelineInterviewCount",
);
const pipelineOfferCount = document.querySelector("#pipelineOfferCount");
const pipelineRejectedCount = document.querySelector("#pipelineRejectedCount");

// APPLICATION MODAL

const applicationModal = document.querySelector("#applicationModal");
const applicationModalTitle = document.querySelector("#applicationModalTitle");

const closeApplicationModalBtn = document.querySelector(
  "#closeApplicationModalBtn",
);

const cancelApplicationBtn = document.querySelector("#cancelApplicationBtn");

// APPLICATION FORM

const applicationForm = document.querySelector("#applicationForm");

const applicationId = document.querySelector("#applicationId");
const companyInput = document.querySelector("#companyInput");
const positionInput = document.querySelector("#positionInput");
const locationInput = document.querySelector("#locationInput");
const dateInput = document.querySelector("#dateInput");
const statusInput = document.querySelector("#statusInput");
const priorityInput = document.querySelector("#priorityInput");
const urlInput = document.querySelector("#urlInput");
const notesInput = document.querySelector("#notesInput");

const saveApplicationBtn = document.querySelector("#saveApplicationBtn");
const saveApplicationText = document.querySelector("#saveApplicationText");

/* ======================================================
    DATA
====================================================== */

const APPLICATION_STATUSES = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const APPLICATION_PRIORITIES = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const DEMO_APPLICATIONS = [
  {
    id: "demo-1",
    company: "Google",
    position: "Frontend Engineer",
    location: "Remote",
    date: "2026-11-01",
    status: "interview",
    priority: "high",
    url: "",
    notes: "",
  },
  {
    id: "demo-2",
    company: "OpenAI",
    position: "Junior JavaScript Developer",
    location: "Remote",
    date: "2026-11-02",
    status: "applied",
    priority: "high",
    url: "",
    notes: "",
  },
  {
    id: "demo-3",
    company: "Netflix",
    position: "Web Developer",
    location: "Hybrid",
    date: "2026-10-25",
    status: "offer",
    priority: "medium",
    url: "",
    notes: "",
  },
  {
    id: "demo-4",
    company: "Microsoft",
    position: "Junior Frontend Developer",
    location: "On-site",
    date: "2026-10-20",
    status: "rejected",
    priority: "low",
    url: "",
    notes: "",
  },
];

/* ======================================================
    STATE
====================================================== */

let applications = [];

let editingId = null;

let searchTerm = "";

let activeStatus = "all";
let activePriority = "all";
let activeSort = "newest";

let currentTheme = "dark";

/* ======================================================
    SAVE / LOAD DATA
====================================================== */

function saveData() {
  localStorage.setItem(
    "jobApplicationTrackerData",
    JSON.stringify(applications),
  );
}

function loadData() {
  const storedData = localStorage.getItem("jobApplicationTrackerData");

  if (!storedData) {
    applications = DEMO_APPLICATIONS.map((app) => ({ ...app }));
    return;
  }

  try {
    const parsedData = JSON.parse(storedData);

    applications = Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Failed to load applications:", error);
    applications = [];
  }
}

/* ======================================================
    THEME
====================================================== */

function loadTheme() {
  const storedTheme = localStorage.getItem("jobApplicationTheme");

  if (storedTheme === "dark" || storedTheme === "light") {
    currentTheme = storedTheme;
  }

  applyTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;

  themeBtn.setAttribute("aria-pressed", String(currentTheme === "light"));
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme();

  localStorage.setItem("jobApplicationTheme", currentTheme);
}

/* ======================================================
    NAVIGATION
====================================================== */

function updateActiveNav(targetId) {
  navLinks.forEach((link) => {
    const linkId = link.getAttribute("href");

    const isActive = linkId === targetId;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function handleNavClick(event) {
  const targetId = event.currentTarget.getAttribute("href");

  if (!targetId || !targetId.startsWith("#")) return;

  updateActiveNav(targetId);

  closeSidebar();
}

function syncActiveNav() {
  const targetId = window.location.hash || "#dashboard";

  updateActiveNav(targetId);
}

/* ======================================================
    SIDEBAR
====================================================== */

function openSidebar() {
  sidebar.classList.add("is-open");
  sidebarOverlay.hidden = false;

  document.body.classList.add("no-scroll");

  sidebarToggle.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebarOverlay.hidden = true;

  document.body.classList.remove("no-scroll");

  sidebarToggle.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
  const isOpen = sidebar.classList.contains("is-open");

  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

/* ======================================================
    APPLICATION MODAL
====================================================== */

function openApplicationModal() {
  resetApplicationForm();

  applicationModalTitle.textContent = "Add Application";

  applicationModal.showModal();

  document.body.classList.add("no-scroll");
}

function openEditApplicationModal(id) {
  const app = applications.find((item) => item.id === id);

  if (!app) return;

  editingId = app.id;

  applicationId.value = app.id;
  companyInput.value = app.company;
  positionInput.value = app.position;
  locationInput.value = app.location || "";
  dateInput.value = app.date;
  statusInput.value = app.status;
  priorityInput.value = app.priority;
  urlInput.value = app.url || "";
  notesInput.value = app.notes || "";

  applicationModalTitle.textContent = "Edit Application";
  saveApplicationText.textContent = "Save Changes";

  applicationModal.showModal();

  document.body.classList.add("no-scroll");
}

function closeApplicationModal() {
  applicationModal.close();

  document.body.classList.remove("no-scroll");

  resetApplicationForm();
}

/* ======================================================
    APPLICATION MANAGEMENT
====================================================== */

function getApplicationById(id) {
  const app = applications.find((item) => item.id === id);

  if (!app) return null;

  return app;
}

function addApplication(newApplication) {
  applications.push(newApplication);

  saveData();
  renderApp();
}

function deleteApplication(id) {
  applications = applications.filter((app) => app.id !== id);

  saveData();
  renderApp();
}

function updateApplication(id, updateData) {
  const app = getApplicationById(id);

  if (!app) return;

  Object.assign(app, updateData);

  saveData();
  renderApp();
}

function handleApplicationSubmit(event) {
  event.preventDefault();

  const formData = {
    company: companyInput.value.trim(),
    position: positionInput.value.trim(),
    location: locationInput.value.trim(),
    date: dateInput.value,
    status: statusInput.value,
    priority: priorityInput.value,
    url: urlInput.value.trim(),
    notes: notesInput.value.trim(),
  };

  if (editingId !== null) {
    updateApplication(editingId, formData);
  } else {
    const newApplication = {
      id: crypto.randomUUID(),
      ...formData,
    };

    addApplication(newApplication);
  }

  closeApplicationModal();
}

/* ======================================================
    SEARCH / FILTER / SORT
====================================================== */

function getFilteredApplications() {
  return applications.filter((app) => {
    const matchesStatus = activeStatus === "all" || app.status === activeStatus;

    const matchesPriority =
      activePriority === "all" || app.priority === activePriority;

    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm) ||
      app.position.toLowerCase().includes(searchTerm) ||
      app.location.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesPriority && matchesSearch;
  });
}

function getSortedApplications(filteredApplications) {
  const sortedApplications = [...filteredApplications];

  if (activeSort === "newest") {
    sortedApplications.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  if (activeSort === "oldest") {
    sortedApplications.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  if (activeSort === "company-asc") {
    sortedApplications.sort((a, b) => a.company.localeCompare(b.company));
  }

  if (activeSort === "company-desc") {
    sortedApplications.sort((a, b) => b.company.localeCompare(a.company));
  }

  return sortedApplications;
}

function clearFilters() {
  searchTerm = "";
  activeStatus = "all";
  activePriority = "all";
  activeSort = "newest";

  searchInput.value = "";
  statusFilter.value = "all";
  priorityFilter.value = "all";
  sortSelect.value = "newest";

  renderApp();
}

/* ======================================================
    STATISTICS
====================================================== */

function updateStatistics() {
  const total = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "interview",
  ).length;

  const offers = applications.filter((app) => app.status === "offer").length;

  const rejected = applications.filter(
    (app) => app.status === "rejected",
  ).length;

  const responses = interviews + offers + rejected;

  const responseRatePercent = total > 0 ? (responses / total) * 100 : 0;

  sidebarTotalCount.textContent = total;
  sidebarInterviewCount.textContent = interviews;
  sidebarOfferCount.textContent = offers;
  sidebarRejectedCount.textContent = rejected;
  navApplicationsCount.textContent = total;
  navInterviewsCount.textContent = interviews;

  totalApplications.textContent = total;
  totalInterviews.textContent = interviews;
  totalOffers.textContent = offers;
  totalRejected.textContent = rejected;
  responseRate.textContent = `${responseRatePercent.toFixed(0)}%`;
}

/* ======================================================
    APPLICATION PIPELINE
====================================================== */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderPipelineCards(items) {
  if (items.length === 0) {
    return `<p class="pipeline-empty">No applications yet</p>`;
  }

  return items
    .map((app) => {
      return `
    <div class="pipeline-card">
          <div class="pipeline-card-content">
            <h4 class="pipeline-card-company">
              ${escapeHTML(app.company)}
            </h4>

            <p class="pipeline-card-position">
              ${escapeHTML(app.position)}
            </p>
          </div>

          <span
            class="pipeline-card-priority"
            data-priority="${escapeHTML(app.priority)}">
              ${escapeHTML(app.priority)}
          </span> 
        </div> 
    `;
    })
    .join("");
}

function renderPipeline() {
  const applied = applications.filter((app) => app.status === "applied");
  const interview = applications.filter((app) => app.status === "interview");
  const offer = applications.filter((app) => app.status === "offer");
  const rejected = applications.filter((app) => app.status === "rejected");

  pipelineAppliedCount.textContent = applied.length;
  pipelineInterviewCount.textContent = interview.length;
  pipelineOfferCount.textContent = offer.length;
  pipelineRejectedCount.textContent = rejected.length;

  pipelineApplied.innerHTML = renderPipelineCards(applied);
  pipelineInterview.innerHTML = renderPipelineCards(interview);
  pipelineOffer.innerHTML = renderPipelineCards(offer);
  pipelineRejected.innerHTML = renderPipelineCards(rejected);
}

/* ======================================================
    RENDER FUNCTIONS
====================================================== */

function renderApplicationRow(app) {
  const statusLabel =
    APPLICATION_STATUSES.find((item) => item.value === app.status)?.label ??
    app.status;

  const priorityLabel =
    APPLICATION_PRIORITIES.find((item) => item.value === app.priority)?.label ??
    app.priority;

  return `
    <tr>
      <td>
        <div class="application-company">
          ${escapeHTML(app.company)}
        </div>
      </td>

      <td>
        <div class="application-position">
          ${escapeHTML(app.position)}
        </div>
      </td>

      <td>${escapeHTML(app.location || "—")}</td>

      <td>
        <span
          class="status-badge"
          data-status="${escapeHTML(app.status)}"
        >
          ${escapeHTML(statusLabel)}
        </span>
      </td>

      <td>${escapeHTML(app.date || "—")}</td>

      <td>
        <span
          class="priority-badge"
          data-priority="${escapeHTML(app.priority)}"
        >
          ${escapeHTML(priorityLabel)}
        </span>
      </td>

      <td>
        <div class="table-actions">
          <button
            type="button"
            class="edit-application-btn"
            data-id="${escapeHTML(app.id)}"
          >
            Edit
          </button>

          <button
            type="button"
            class="delete-application-btn"
            data-id="${escapeHTML(app.id)}"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  `;
}

function renderApplications() {
  const filtered = getFilteredApplications();
  const sorted = getSortedApplications(filtered);

  const rowsHTML = sorted.map((app) => renderApplicationRow(app)).join("");

  applicationsTableBody.innerHTML = rowsHTML;

  applicationsCount.textContent = applications.length;

  applicationsResults.textContent = `${sorted.length} of ${applications.length} applications`;

  applicationsEmpty.hidden = sorted.length > 0;
}

function renderApp() {
  updateStatistics();
  renderApplications();
  renderPipeline();
}

/* ======================================================
    RESET
====================================================== */

function resetApplicationForm() {
  applicationForm.reset();

  editingId = null;
  applicationId.value = "";

  applicationModalTitle.textContent = "Add Application";
  saveApplicationText.textContent = "Save Application";
}
/* ======================================================
    EVENT LISTENERS
====================================================== */

themeBtn.addEventListener("click", toggleTheme);

navLinks.forEach((link) => {
  link.addEventListener("click", handleNavClick);
});

window.addEventListener("hashchange", syncActiveNav);

sidebarToggle.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

openApplicationModalBtns.forEach((button) => {
  button.addEventListener("click", openApplicationModal);
});

closeApplicationModalBtn.addEventListener("click", closeApplicationModal);

cancelApplicationBtn.addEventListener("click", closeApplicationModal);

applicationsTableBody.addEventListener("click", (event) => {
  const editBtn = event.target.closest(".edit-application-btn");

  if (!editBtn) return;

  const id = editBtn.dataset.id;

  openEditApplicationModal(id);
});

applicationModal.addEventListener("close", () => {
  document.body.classList.remove("no-scroll");
  resetApplicationForm();
});

applicationForm.addEventListener("submit", handleApplicationSubmit);

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.toLowerCase().trim();

  renderApp();
});

statusFilter.addEventListener("change", (event) => {
  activeStatus = event.target.value;

  renderApp();
});

priorityFilter.addEventListener("change", (event) => {
  activePriority = event.target.value;

  renderApp();
});

sortSelect.addEventListener("change", (event) => {
  activeSort = event.target.value;

  renderApp();
});

clearFiltersBtn.addEventListener("click", clearFilters);

applicationsTableBody.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-application-btn");

  if (!deleteBtn) return;

  const id = deleteBtn.dataset.id;

  const confirmed = window.confirm(
    "Are you sure you want to delete this application?",
  );

  if (!confirmed) return;

  deleteApplication(id);
});

/* ======================================================
    INITIALIZE APP
====================================================== */

function initApp() {
  loadData();
  loadTheme();

  currentYear.textContent = new Date().getFullYear();

  syncActiveNav();
  renderApp();

  lucide.createIcons();
}

initApp();
