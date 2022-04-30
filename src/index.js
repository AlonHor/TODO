"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var list = document.querySelector('#list');
var form = document.getElementById('new-task-form');
var input = document.querySelector('#new-task-title');
var clear = document.querySelector('#clear');
var tasks = loadTasks();
tasks.forEach(addListItem);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == '' || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    var newTask = {
        id: uuid_1.v4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    saveTasks();
    addListItem(newTask);
    input.value = '';
});
clear === null || clear === void 0 ? void 0 : clear.addEventListener('click', clearCompletedTasks);
function addListItem(task) {
    var item = document.createElement('li');
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        if (task.completed) {
            label.classList.add('completed');
        }
        else {
            label.classList.remove('completed');
        }
        saveTasks();
    });
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    if (checkbox.checked) {
        label.classList.add('completed');
    }
    var title = document.createElement('span');
    title.textContent = task.title;
    title.classList.add('text');
    label.append(checkbox, title);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function clearCompletedTasks() {
    console.groupCollapsed('%cCLEARING...', 'color:#ffff00;font-family:system-ui;font-size:1.5rem;font-weight:bold');
    console.trace('clear');
    console.time('clear');
    var completedTasks = tasks.filter(function (t) { return t.completed; });
    completedTasks.forEach(function (t) {
        console.count('For each completed task');
        // const index = tasks.findIndex((t2) => t2.id === t.id);
        var index = tasks.indexOf(t);
        tasks.splice(index, 1);
    });
    console.assert(tasks.filter(function (t) { return t.completed; }).length === 0, '%cERROR %cFAILED TO REMOVE COMPLETED TASKS', 'color:#ff0000;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold', 'font-family:system-ui;font-size:1.5rem;font-weight:bold');
    console.timeEnd('clear');
    console.groupEnd();
    saveTasks();
    list.innerHTML = '';
    tasks.forEach(addListItem);
    if (tasks.filter(function (t) { return t.completed; }).length > 0) {
        console.error('%cFAILED! %cSEE %cCLEARING %cGROUP FOR DETAILS.', 'color:#ff0000;font-family:system-ui;font-size:4rem;font-weight:bold', 'font-family:system-ui;font-size:1.5rem;font-weight:bold', 'color:#ffff00;font-family:system-ui;font-size:1.5rem;font-weight:bold', 'font-family:system-ui;font-size:1.5rem;font-weight:bold');
    }
    else {
        console.log('%cSUCCESS! %cSUCCESSFULLY CLEARED COMPLETED TASKS.', 'color:#00ff00;font-family:system-ui;font-size:1.5rem;font-weight:bold', 'font-family:system-ui;font-size:1.5rem;font-weight:bold');
    }
}
function saveTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function loadTasks() {
    var taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
