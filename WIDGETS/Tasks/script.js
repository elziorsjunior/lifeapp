document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');
    const addProjectButton = document.getElementById('add-project');
    const newProjectInput = document.getElementById('new-project-input');
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Troca entre abas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Carregar projetos do LocalStorage
    function loadProjects() {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        storedProjects.forEach(project => addProjectToDOM(project.title, project.tasks));
    }

    // Salvar projetos no LocalStorage
    function saveProjects() {
        const projects = [];
        document.querySelectorAll('.project').forEach(project => {
            const title = project.querySelector('h2').textContent;
            const tasks = [];
            project.querySelectorAll('.task-list li').forEach(task => {
                tasks.push({
                    text: task.querySelector('span').textContent,
                    completed: task.querySelector('input').checked
                });
            });
            projects.push({ title, tasks });
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Adicionar projeto ao DOM
    function addProjectToDOM(title, tasks = []) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = title;
        projectTitle.addEventListener('dblclick', () => {
            const newTitle = prompt('Edit Project Title:', projectTitle.textContent);
            if (newTitle) {
                projectTitle.textContent = newTitle;
                saveProjects();
            }
        });
        projectDiv.appendChild(projectTitle);

        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.textContent = 'Delete Project';
        deleteProjectBtn.className = 'delete-btn';
        deleteProjectBtn.addEventListener('click', () => {
            projectsContainer.removeChild(projectDiv);
            saveProjects();
        });
        projectDiv.appendChild(deleteProjectBtn);

        const taskList = document.createElement('ul');
        taskList.className = 'task-list';

        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskItem);
        });

        projectDiv.appendChild(taskList);

        const newTaskInput = document.createElement('input');
        newTaskInput.type = 'text';
        newTaskInput.placeholder = 'Enter task...';
        projectDiv.appendChild(newTaskInput);

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.className = 'add-task-btn';
        addTaskButton.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                const taskItem = createTaskElement(taskText);
                taskList.appendChild(taskItem);
                newTaskInput.value = '';
                saveProjects();
            }
        });

        projectDiv.appendChild(addTaskButton);
        projectsContainer.appendChild(projectDiv);

        saveProjects();
    }

    // Criar elemento de tarefa
    function createTaskElement(text, completed = false) {
        const taskItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', saveProjects);

        const taskText = document.createElement('span');
        taskText.textContent = text;
        taskText.addEventListener('dblclick', () => {
            const newText = prompt('Edit Task:', taskText.textContent);
            if (newText) {
                taskText.textContent = newText;
                saveProjects();
            }
        });

        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'Delete';
        deleteTaskBtn.className = 'delete-btn';
        deleteTaskBtn.addEventListener('click', () => {
            taskItem.remove();
            saveProjects();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteTaskBtn);

        return taskItem;
    }

    // Adicionar evento para criar projeto
    addProjectButton.addEventListener('click', () => {
        const projectTitle = newProjectInput.value.trim();
        if (projectTitle) {
            addProjectToDOM(projectTitle);
            newProjectInput.value = '';
        }
    });

    // Exemplo inicial
    if (!localStorage.getItem('projects')) {
        addProjectToDOM('Example Project', [{
