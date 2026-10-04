// Public portfolio demo: no credentials, account IDs, selectors, or private school data.
// This file shows representative planner logic from Rayth ScholarOS.

const ACTION_WORDS = /\b(homework|submit|submission|deadline|required|must)\b/i;
const ASSESSMENT_WORDS = /\b(mock|exam|test|assessment|oral|project)\b/i;

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

function classifyItem(item) {
  const status = normalize(item.status);
  const type = normalize(item.type);
  const text = normalize([item.title, item.message, item.due].join(" "));

  if (status === "completed" || status === "turned in") {
    return { signal: "COMPLETED", priority: 100, reason: "Already completed" };
  }

  if (item.daysUntilDue != null && item.daysUntilDue >= 0 && item.daysUntilDue <= 7) {
    return { signal: "EXPLICIT_DEADLINE", priority: 10, reason: "Confirmed due date within 7 days" };
  }

  if (ACTION_WORDS.test(text)) {
    return { signal: "POSSIBLE_ACTION", priority: 25, reason: "Explicit action wording" };
  }

  if (ASSESSMENT_WORDS.test(text)) {
    return { signal: "ASSESSMENT_SIGNAL", priority: 30, reason: "Assessment wording detected" };
  }

  if (type === "material") {
    return { signal: "RESOURCE", priority: 70, reason: "Material alone is not homework" };
  }

  if (status === "assigned") {
    return { signal: "UNCONFIRMED_ASSIGNED", priority: 80, reason: "Assigned label alone is insufficient" };
  }

  return { signal: "INFORMATION", priority: 90, reason: "No strong action evidence" };
}

function buildPlannerIndex(items) {
  return items
    .map(item => ({ ...item, ...classifyItem(item) }))
    .filter(item => item.signal !== "COMPLETED")
    .sort((a, b) => a.priority - b.priority);
}

const fakeSchoolData = [
  {
    class: "Mathematics",
    type: "assignment",
    title: "Budgeting Investigation",
    status: "assigned",
    due: "Due Oct 9",
    daysUntilDue: 5,
    message: "Submit your final investigation by the due date."
  },
  {
    class: "English",
    type: "material",
    title: "Revision worksheet",
    status: "",
    due: "",
    daysUntilDue: null,
    message: ""
  },
  {
    class: "Science",
    type: "assignment",
    title: "Practice questions",
    status: "assigned",
    due: "",
    daysUntilDue: null,
    message: ""
  }
];

console.table(buildPlannerIndex(fakeSchoolData));
