const form = document.getElementById("todo-form");
const input = document.querySelector(".input-todo");
const dateInput = document.querySelector('input[type="date"]');
const tableBody = document.querySelector("tbody");
const filter = document.querySelector(".filter");
const deleteAll = document.querySelector(".delete-all");

let tasks = [];

// Fungsi
function renderTasks(filteredTasks = tasks) {
    tableBody.innerHTML = "";

    if (filteredTasks.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No task found!</td></tr>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.text}</td>
            <td>${task.date}</td>
            <td>${task.completed ? "Completed" : "Pending"}</td>
            <td>
                <button onclick="status(${index})">Complete</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Tambah tugas
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskText = input.value.trim();
    const dueDate = dateInput.value;

    if (!taskText || !dueDate) return;

    tasks.push({
        text: taskText,
        date: dueDate,
        completed: false
    });

    input.value = "";
    dateInput.value = "";

    renderTasks();
});

// delete all
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// status
function status(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete all
deleteAll.addEventListener("click", function () {
    if (confirm("Menghapus semua tugas?")) {
        tasks = [];
        renderTasks();
    }
});

// Filter tugas
filter.addEventListener("change", function () {
    const value = filter.value;

    if (value === "all") {
        renderTasks();
    } else if (value === "completed") {
        renderTasks(tasks.filter(task => task.completed));
    } else if (value === "pending") {
        renderTasks(tasks.filter(task => !task.completed));
    }
});