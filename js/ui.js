/**
 * Render a list of tasks into the DOM based on the current filter
 * @param {Array} todos - The full list of tasks
 * @param {string} currentFilter - Filter: 'all', 'completed', or 'incomplete'
 * @param {Function} saveToLocalStorage - Function to persist the tasks
 */
export function renderTasks(todos, currentFilter, saveToLocalStorage) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Apply filter
  const filteredTodos = todos.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'incomplete') return !task.completed;
    return true; // 'all'
  });

  // Render each task
  filteredTodos.forEach(task => {
    const li = document.createElement('li');

    // Task text
    li.textContent = task.text;
    li.style.textDecoration = task.completed ? 'line-through' : 'none';
    li.style.color = task.completed ? 'gray' : 'black';

    // Buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action-buttons');

    // Toggle complete button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Undo' : 'Done';
    toggleBtn.classList.add('complete-btn');
    toggleBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      saveToLocalStorage();
      renderTasks(todos, currentFilter, saveToLocalStorage);
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      const index = todos.findIndex(t => t.id === task.id);
      if (index > -1) {
        todos.splice(index, 1);
        saveToLocalStorage();
        renderTasks(todos, currentFilter, saveToLocalStorage);
      }
    });

    buttonContainer.appendChild(toggleBtn);
    buttonContainer.appendChild(deleteBtn);

    // Layout
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  });
}
