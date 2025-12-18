/*
  Simple To-Do List App using Vanilla JavaScript
  ----------------------------------------------
  Features:
    - Add tasks
    - Delete tasks
    - Mark tasks as completed
    - Save tasks in localStorage so they persist after page refresh
*/

const STORAGE_KEY = "todo_tasks";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyStateText = document.getElementById("empty-state");
const todayDateElement = document.getElementById("today-date");

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  // Bugünün tarihini başlığa yaz
  if (todayDateElement) {
    const now = new Date();
    const formatted = now.toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    todayDateElement.textContent = formatted;
  }

  renderTasks();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  input.value = "";
});

list.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("todo-delete-btn")) {
    const taskId = Number(target.closest(".todo-item").dataset.id);
    deleteTask(taskId);
  }

  if (target.classList.contains("todo-checkbox")) {
    const taskId = Number(target.closest(".todo-item").dataset.id);
    toggleTaskCompleted(taskId);
  }
});

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

function toggleTaskCompleted(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed,
      };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    emptyStateText.style.display = "block";
    return;
  }

  emptyStateText.style.display = "none";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }

    const contentDiv = document.createElement("div");
    contentDiv.className = "todo-item-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = task.completed;

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = task.text;

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(textSpan);

    // Görev tarihi (oluşturulma zamanı)
    const dateSpan = document.createElement("span");
    dateSpan.className = "todo-date";

    if (task.createdAt) {
      const date = new Date(task.createdAt);
      const formatted = date.toLocaleString("tr-TR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      dateSpan.textContent = formatted;
    } else {
      dateSpan.textContent = "";
    }

    contentDiv.appendChild(dateSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "todo-delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}


