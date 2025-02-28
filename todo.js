const taskInput = document.getElementById('taskInput');
const startTimeInput = document.getElementById('startTimeInput');
const endTimeInput = document.getElementById('endTimeInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let serialNumber = 1;
let tasks = []; // Array to hold tasks as objects for easy sorting

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();

    
    if (taskText === '' || startTime === '' || endTime === '') {
        alert("Please fill in all fields (Task, Start Time, End Time).");
        return;
    }
    const task = {
        serialNo: serialNumber,
        taskText: taskText,
        startTime: startTime,
        endTime: endTime
    };
    tasks.push(task);
    sortTasks();
    taskInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
}

function deleteTask(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    const taskIndex = Array.from(taskList.rows).indexOf(row) - 1;
    tasks.splice(taskIndex, 1);

    serialNumber = 1;
    tasks.forEach((task, index) => {
        task.serialNo = serialNumber++;
    });
    renderTasks();
}

function sortTasks() {
    tasks.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
    });
    serialNumber = 1;
    tasks.forEach((task) => {
        task.serialNo = serialNumber++;
    });
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.serialNo}</td>
            <td>${task.taskText}</td>
            <td>${task.startTime}</td>
            <td>${task.endTime}</td>
            <td><button onclick="deleteTask(this)">Delete</button></td>
        `;
        taskList.appendChild(row);
    });
}
