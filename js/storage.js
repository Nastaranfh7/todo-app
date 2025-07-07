// storage.js

/**
 * Save the list of tasks to localStorage
 * @param {Array} todos - List of task objects
 */
export function saveToLocalStorage(todos) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Load tasks from localStorage
 * @returns {Array} - List of task objects or empty array if none found
 */
export function loadFromLocalStorage() {
  try {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}
