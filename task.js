let tasks = [];

document.getElementById('newTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

function openForm() {
    document.getElementById('taskForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('taskForm').style.display = 'none';
}

function closeTaskDetails() {
    document.getElementById('taskDetails').style.display = 'none';
}

function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const date = document.getElementById('taskDate').value;

    if (title !== '' && description !== '' && date !== '') {
        tasks.push({ title, description, priority, date, status: 'todo' });
        renderTasks();
        closeForm();
        document.getElementById('newTaskForm').reset();
    }
}

function renderTasks() {
    const todoList = document.getElementById('todoList');
    const doingList = document.getElementById('doingList');
    const onHoldList = document.getElementById('onHoldList');
    const doneList = document.getElementById('doneList');

    todoList.innerHTML = '';
    doingList.innerHTML = '';
    onHoldList.innerHTML = '';
    doneList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        const priorityColor = task.status === 'done' ? 'grey' : getPriorityColor(task.priority);
        taskElement.innerHTML = `
            <span class="priority" style="background-color: ${priorityColor}">${task.priority}</span>
            <br>
            <h3>${task.title}</h3>
            <p>Due date: ${task.date}</p>
        `;
        taskElement.addEventListener('click', () => openTaskDetails(index));
        
        switch (task.status) {
            case 'todo':
                todoList.appendChild(taskElement);
                break;
            case 'doing':
                doingList.appendChild(taskElement);
                break;
            case 'onHold':
                onHoldList.appendChild(taskElement);
                break;
            case 'done':
                doneList.appendChild(taskElement);
                break;
        }
    });

    // Add list names on top of the lists
    addListNames(todoList, 'To Do');
    addListNames(doingList, 'Doing');
    addListNames(onHoldList, 'On Hold');
    addListNames(doneList, 'Done');
}

function addListNames(list, name) {
    const listName = document.createElement('h2');
    listName.textContent = name;
    list.insertBefore(listName, list.firstChild);
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'High':
            return 'red';
        case 'Medium':
            return 'orange';
        case 'Low':
            return 'blue';
        default:
            return 'grey';
    }
}

// Add event listener for editing the task description
// Updated function to open task details
function openTaskDetails(index) {
    const task = tasks[index];
    const taskDetailsContent = document.getElementById('taskDetailsContent');
    taskDetailsContent.innerHTML = `
        <h2>${task.title}</h2>
        <br>
        <br>
        <h3>Description:</h3>
        <br>
        <textarea id="taskDescriptionEdit" rows="4" style="color: white">${task.description}</textarea> <!-- Text color set to white -->
        <br>
        <p>Priority: <span style="color: ${getPriorityColor(task.priority)}">${task.priority}</span></p> <!-- Priority name with color -->
        <br>
        <p>Due date: ${task.date}</p>
        <select onchange="updateTaskStatus(${index}, this.value)">
            <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
            <option value="doing" ${task.status === 'doing' ? 'selected' : ''}>Doing</option>
            <option value="onHold" ${task.status === 'onHold' ? 'selected' : ''}>On Hold</option>
            <option value="done" ${task.status === 'done' ? 'selected' : ''}>Done</option>
        </select>
        <button onclick="updateTaskDescription(${index})">Update Task</button> <!-- Button to update description -->
        <button onclick="deleteTask(${index})">Delete</button>
    `;
    document.getElementById('taskDetails').style.display = 'block';
}

// Function to update task description
function updateTaskDescription(index) {
    const newDescription = document.getElementById('taskDescriptionEdit').value.trim();
    if (newDescription !== '') {
        tasks[index].description = newDescription;
        const newStatus = document.getElementById('taskDetailsContent').querySelector('select').value;
        tasks[index].status = newStatus; // Update task status
        renderTasks();
        document.getElementById('taskDetails').style.display = 'none';
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    document.getElementById('taskDetails').style.display = 'none';
}

// Initial rendering
renderTasks();

