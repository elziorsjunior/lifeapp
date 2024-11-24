const projectsContainer = document.getElementById('projects-container');

// Função para criar um novo projeto
function createProject(title = 'New Project') {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';

    // Título do projeto (editável)
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = title;
    projectTitle.addEventListener('dblclick', () => {
        const newTitle = prompt('Edit Project Title:', projectTitle.textContent);
        if (newTitle) projectTitle.textContent = newTitle;
    });

    // Lista de tarefas
    const taskList = document.createElement('ul');
    taskList.className = 'task-list';

    // Botão para adicionar tarefa
    const addTaskButton = document.createElement('button');
    addTaskButton.className = 'add-task-btn';
    addTaskButton.textContent = '+';
    addTaskButton.addEventListener('click', () => addTask(taskList));

    // Entrada para nova tarefa
    const newTaskInput = document.createElement('input');
    newTaskInput.type = 'text';
    newTaskInput.id = 'new-task-input';
    newTaskInput.placeholder = 'Enter task...';

    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(taskList);
    projectDiv.appendChild(newTaskInput);
    projectDiv.appendChild(addTaskButton);

    projectsContainer.appendChild(projectDiv);
}

// Função para adicionar uma nova tarefa
function addTask(taskList) {
    const taskInput = taskList.nextElementSibling;
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const taskLabel = document.createElement('span');
        taskLabel.textContent = taskText;
        taskLabel.addEventListener('dblclick', () => {
            const newText = prompt('Edit Task:', taskLabel.textContent);
            if (newText) taskLabel.textContent = newText;
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => taskList.removeChild(taskItem));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    }
}

// Inicializar com um projeto padrão
createProject('Project 01');

// Botão para adicionar novos projetos
document.querySelector('.add-project-btn').addEventListener('click', () => {
    createProject();
});
