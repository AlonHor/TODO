import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-title");
const clear = document.querySelector("#clear");
const tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
  input.value = "";
});
clear?.addEventListener("click", clearCompletedTasks);
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    if (task.completed) {
      label.classList.add("completed");
    } else {
      label.classList.remove("completed");
    }
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  if (checkbox.checked) {
    label.classList.add("completed");
  }
  const title = document.createElement("span");
  title.textContent = task.title;
  title.classList.add("text");
  label.append(checkbox, title);
  item.append(label);
  list?.append(item);
}
function clearCompletedTasks() {
  console.groupCollapsed("%cCLEARING...", "color:#ffff00;font-family:system-ui;font-size:1.5rem;font-weight:bold");
  console.trace("clear");
  console.time("clear");
  const completedTasks = tasks.filter((t) => t.completed);
  completedTasks.forEach((t) => {
    console.count("For each completed task");
    const index = tasks.indexOf(t);
    tasks.splice(index, 1);
  });
  console.assert(tasks.filter((t) => t.completed).length === 0, "%cERROR %cFAILED TO REMOVE COMPLETED TASKS", "color:#ff0000;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold", "font-family:system-ui;font-size:1.5rem;font-weight:bold");
  console.timeEnd("clear");
  console.groupEnd();
  saveTasks();
  list.innerHTML = "";
  tasks.forEach(addListItem);
  if (tasks.filter((t) => t.completed).length > 0) {
    console.error("%cFAILED! %cSEE %cCLEARING %cGROUP FOR DETAILS.", "color:#ff0000;font-family:system-ui;font-size:4rem;font-weight:bold", "font-family:system-ui;font-size:1.5rem;font-weight:bold", "color:#ffff00;font-family:system-ui;font-size:1.5rem;font-weight:bold", "font-family:system-ui;font-size:1.5rem;font-weight:bold");
  } else {
    console.log("%cSUCCESS! %cSUCCESSFULLY CLEARED COMPLETED TASKS.", "color:#00ff00;font-family:system-ui;font-size:1.5rem;font-weight:bold", "font-family:system-ui;font-size:1.5rem;font-weight:bold");
  }
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}
