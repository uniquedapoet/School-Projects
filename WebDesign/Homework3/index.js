const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Announcements", href: "/announcements" },
  { name: "Assignments", href: "/assignments" },
  { name: "Discussions", href: "/discussion_topics" },
  { name: "Grades", href: "/grades" },
  { name: "People", href: "/users" },
  { name: "Syllabus", href: "/assignments/syllabus" },
  { name: "Modules", href: "/modules" },
  { name: "NameCoach", href: "/external_tools/1681" },
  { name: "CU Boulder Libraries", href: "/external_tools/3759" },
  { name: "My Course Materials", href: "/external_tools/33321" },
];

const recentAnnouncements = [
  "Announcement 3",
  "Announcement 2",
  "Announcement 1",
];

const courseModules = [
  {
    name: "Week 1 (1/13–1/19)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  },
  {
    name: "Week 2 (1/20–1/26)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 3 (1/27–2/2)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 4 (2/3–2/9)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 5 (2/10–2/16)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 6 (2/17–2/23)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 7 (2/24–3/2)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 8 (3/3–3/9)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 9 (3/10–3/16)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 10 (3/17–3/23)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  },
  {
    name: "Week 11 (3/24–3/30)",
    children: ["Item 1"],
  },
  {
    name: "Week 12 (3/31–4/6)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 13 (4/7–4/13)",
    children: ["Item 1", "Item 2", "Item 3", "Item 4"],
  },
  {
    name: "Week 14 (4/14–4/20)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 15 (4/21–4/27)",
    children: ["Item 1", "Item 2"],
  },
  {
    name: "Week 16 (4/28–4/30)",
    children: ["Item 1"],
  },
];

const todoItems = [
  "Todo 1",
  "Todo 2",
  "Todo 3",
  "Todo 4",
  "Todo 5",
  "Todo 6",
  "Todo 7",
];

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const main = document.querySelector("main");
  const aside = document.querySelector("aside");

  function Nav() {
    for (let link of navigationLinks) {
      const div = document.createElement("div");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.name;
      div.appendChild(a);
      nav.appendChild(div);
    }
  }
  
  function Announcement() {
    const div = document.createElement("div");
    div.innerHTML = "<h2>Recent Announcements</h2>";
    for (let announcement of recentAnnouncements) {
      const p = document.createElement("p");
      p.textContent = announcement;
      div.appendChild(p);
    }
    main.appendChild(div);
  }

  function Modules() {
    const div = document.createElement("div");
    div.innerHTML = "<h2>Course Modules</h2>";

    for (let module of courseModules) {
      const details = document.createElement("details");
      details.open = true;

      const summary = document.createElement("summary");  
      summary.textContent = module.name;
      details.appendChild(summary);

      const moduleList = document.createElement("ul");
      for (let item of module.children) {
        const li = document.createElement("li");
        li.textContent = item;
        moduleList.appendChild(li);
      }
      details.appendChild(moduleList);
      div.appendChild(details);
    }
    main.appendChild(div);
  }

  function Todo() {
    const div = document.createElement("div");
    div.innerHTML = "<h2>Todo List</h2>";
    const ul = document.createElement("ul");
    for (let item of todoItems) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
    div.appendChild(ul);
    aside.appendChild(div);
  }

  Nav();
  Announcement();
  Modules();
  Todo();
});
