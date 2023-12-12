"use strict";
//tsc -init
//tsc -w
class TodoItem {
    constructor(task, isCompleted) {
        this.task = task;
        this.isCompleted = isCompleted;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    addTasks(task) {
        const taskExists = this.tasks.some(item => item.task === task && !item.isCompleted);
        if (!taskExists) {
            const newItem = new TodoItem(task, false);
            this.tasks.push(newItem);
        }
    }
}
class HTMLHelper {
    static createTaskItem(task) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                task.isCompleted = true;
                displayTasks();
            }
        });
        const label = document.createElement("label");
        checkbox.type = "checkbox";
        label.innerHTML = task.task;
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        return listItem;
    }
}
const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completeTaskHolder = document.getElementById("completed-tasks");
const taskManager = new TaskManager();
addButton.addEventListener("click", () => {
    taskManager.addTasks(taskInput.value);
    displayTasks();
    clear();
});
function displayTasks() {
    if (completeTaskHolder && incompleteTaskHolder) {
        completeTaskHolder.innerHTML = "";
        incompleteTaskHolder.innerHTML = "";
    }
    taskManager.tasks.forEach(element => {
        var listItem = HTMLHelper.createTaskItem(element);
        if (element.isCompleted) {
            completeTaskHolder.appendChild(listItem);
        }
        else {
            incompleteTaskHolder.appendChild(listItem);
        }
    });
}
function clear() {
    taskInput.value = "";
}
