<div align="center">

# 💼 Job Application Tracker PRO

**A modern, responsive dashboard for managing job applications, tracking hiring stages, and staying organized throughout your job search.**

Built with **HTML • CSS • Vanilla JavaScript** — no frontend framework required.

**[🚀 Live Demo]()** · **[📂 Source Code](https://github.com/JohnyIsBackk/job-application-tracker-pro)**

</div>

---

## 🖼️ Preview

![Job Application Tracker PRO — promotional preview](./license)

> **Preview note:** This graphic is an illustrative project cover, not an exact screenshot. For the most accurate portfolio preview, replace `assets/preview.png` with a screenshot of the finished application.

## ✨ Features

- **Application management (CRUD):** add, edit, and delete job applications using an accessible modal form.
- **Application details:** save company, position, location, date, status, priority, vacancy URL, and personal notes.
- **Live search:** find applications by company, position, or location.
- **Advanced filtering:** narrow results by hiring status and priority.
- **Sorting:** order applications by application date or company name.
- **Visual hiring pipeline:** group applications into **Applied**, **Interview**, **Offer**, and **Rejected** stages.
- **Dashboard statistics:** see application totals, stage counts, and a calculated response rate.
- **Local persistence:** retain application records and theme preference using `localStorage`.
- **Dark / light themes:** switch the appearance and save the selected preference.
- **Responsive layout:** dashboard with mobile-friendly sidebar navigation.
- **No backend required:** runs as a static site with Vanilla JavaScript.

### 📊 Response rate

The dashboard estimates response rate based on the current application statuses:

```text
Response Rate = (Interviews + Offers + Rejected) / Total Applications × 100
```

This is a **status-based estimate**, not an inbox-integrated response tracker. Applications still marked _Applied_ are treated as awaiting a response.

## 🛠️ Tech Stack

| Technology        | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| HTML5             | Semantic page structure, forms, native `<dialog>`      |
| CSS3              | Responsive dashboard, cards, dark/light themes         |
| JavaScript (ES6+) | Application state, CRUD, search/filter/sort, rendering |
| Web Storage API   | Browser-side persistence with `localStorage`           |
| Web Crypto API    | Unique IDs with `crypto.randomUUID()`                  |
| Lucide Icons      | UI icons                                               |

## 🚀 Getting Started

**Option 1 — Open locally**

1. Clone the repository:

   ```bash
   git clone https://github.com/JohnyIsBackk/job-application-tracker-pro.git
   ```

2. Open the project folder in VS Code.
3. Run `index.html` with a local development server (for example, **Live Server** in VS Code).
4. Open the local URL in your browser.

**Option 2 — View the hosted version**

Open the **[Live Demo](https://johnyisbackk.github.io/job-application-tracker-pro/)** after GitHub Pages has been enabled for this repository.

No `npm install`, build step, or database is required.

## 🧭 How to Use

1. Click **Add Application** and fill out the company, role, date, and other details.
2. Save to add the application to your dashboard and pipeline.
3. Use **Edit** to update an application as your hiring process progresses.
4. Use **Search**, **Status**, **Priority**, and **Sort** to find specific records.
5. Review dashboard counts and the status pipeline.
6. Use **Delete** to remove an application you no longer want to track.

Application data is stored **only in the browser where it was entered**. It is not automatically synced between devices, browser profiles, or private/incognito sessions. Clearing browser storage can remove saved records.

## 🧠 What I Practiced

This project was created as a hands-on Vanilla JavaScript exercise, focusing on:

- Managing application state and passing data between functions.
- Manipulating collections with `.find()`, `.filter()`, `.map()`, and `.sort()`.
- Rendering dynamic HTML with template literals, `.join("")`, and DOM updates.
- Handling form submissions and event delegation for dynamic buttons.
- Persisting data in `localStorage` and restoring it on page load.
- Keeping state, business logic, event listeners, and UI rendering separated.

## 🗺️ Possible Improvements

- Export and import application records as JSON.
- Dedicated interview schedule and reminders.
- Fully data-driven weekly activity charts and recent activity feed.
- Better accessibility and automated tests.
- Optional cross-device sync with a backend.

> Some supplementary analytics/interview/activity widgets may contain illustrative UI content; the application records, filters, main statistics, and pipeline are the dynamic features.

## 👨‍💻 Author

**Samuel Jahn** — Frontend Developer

- Portfolio: [samueljahn.sk](https://samueljahn.sk)
- GitHub: [@JohnyIsBackk](https://github.com/JohnyIsBackk)

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with HTML, CSS & JavaScript.** 💜

</div>
