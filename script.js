// Get elements
const todoColumn = document.getElementById('todo-column');
const inProgressColumn = document.getElementById('in-progress-column');
const doneColumn = document.getElementById('done-column');
const addTodoTaskBtn = document.getElementById('add-todo-task');
const addTodoBtnInsideCard = document.getElementById('add-todo-btn');
const taskFormModal = document.getElementById('task-form-modal');
const taskForm = document.getElementById('task-form');
const closeModalBtn = document.querySelector('.close');

// Task data storage
let tasks = [];

// Add event listeners
addTodoTaskBtn.addEventListener('click', () => {
    $('#task-form-modal').modal('show');
});

addTodoBtnInsideCard.addEventListener('click', () => {
    $('#task-form-modal').modal('show');
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;
    
    if (!taskName || !taskDescription) {
        alert('Please fill out all fields.');
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        name: taskName,
        description: taskDescription,
        state: 'todo'
    };

    // Push the new task to the tasks array
    tasks.push(newTask);
    
    // Render the new task in the TODO column
    renderTask(newTask, todoColumn);
    
    // Hide the modal and reset the form
    $('#task-form-modal').modal('hide');
    taskForm.reset();
});

// Render task
function renderTask(task, column) {
    const card = document.createElement('div');
    card.className = 'card draggable mb-3';
    card.setAttribute('draggable', 'true');
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${task.name}</h5>
            <p class="card-text">${task.description}</p>
        </div>
    `;
    card.setAttribute('data-task-id', task.id);
    column.querySelector('.card-list').appendChild(card);
    makeDraggable(card);
}

// Make card draggable
function makeDraggable(card) {
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
        setTimeout(() => {
            card.style.display = 'none';
        }, 0);
    });

    card.addEventListener('dragend', (e) => {
        setTimeout(() => {
            card.style.display = 'block';
        }, 0);
    });
}

// Handle drop event
function handleDropEvent(column) {
    column.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const task = tasks.find(t => t.id == taskId);
        const card = document.querySelector(`[data-task-id='${taskId}']`);
        task.state = column.id.replace('-column', '');
        column.querySelector('.card-list').appendChild(card);
    });

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
}

// Initialize drag and drop
[todoColumn, inProgressColumn, doneColumn].forEach(column => {
    handleDropEvent(column);
});
