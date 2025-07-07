import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';

// 🌟 داده‌ها
const todos = loadFromLocalStorage() || [];
let currentFilter = 'all';

// عناصر UI
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// 🎯 تابع برای رندر کردن تسک‌ها همراه با دکمه‌های تکمیل و حذف
function renderTasks(todos, filter) {
  taskList.innerHTML = '';

  let filteredTasks = todos;
  if (filter === 'completed') {
    filteredTasks = todos.filter(task => task.completed);
  } else if (filter === 'incomplete') {
    filteredTasks = todos.filter(task => !task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');

    // متن تسک با خط خوردن اگر انجام شده
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.style.textDecoration = 'line-through';
      taskText.style.color = '#888';
    }

    // دکمه‌ها در div جدا
    const actionBtns = document.createElement('div');
    actionBtns.classList.add('action-buttons');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = '✔';
    completeBtn.title = 'Mark as completed';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '✖';
    deleteBtn.title = 'Delete task';

    // اضافه کردن دکمه‌ها به div
    actionBtns.appendChild(completeBtn);
    actionBtns.appendChild(deleteBtn);

    // اضافه کردن متن و دکمه‌ها به لی
    li.appendChild(taskText);
    li.appendChild(actionBtns);

    // رویداد کلیک دکمه تکمیل
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      updateUI();
    });

    // رویداد کلیک دکمه حذف
    deleteBtn.addEventListener('click', () => {
      const index = todos.findIndex(t => t.id === task.id);
      if (index > -1) {
        todos.splice(index, 1);
        updateUI();
      }
    });

    taskList.appendChild(li);
  });
}

// 🎯 تابع به‌روزرسانی UI و ذخیره‌سازی
function updateUI() {
  saveToLocalStorage(todos);
  renderTasks(todos, currentFilter);
}

// ➕ افزودن تسک جدید
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  todos.push(newTask);
  updateUI();
  taskInput.value = '';
});

// 🔁 فیلترها
document.getElementById('filterAll').addEventListener('click', () => {
  currentFilter = 'all';
  updateUI();
});
document.getElementById('filterDone').addEventListener('click', () => {
  currentFilter = 'completed';
  updateUI();
});
document.getElementById('filterTodo').addEventListener('click', () => {
  currentFilter = 'incomplete';
  updateUI();
});

// 🚀 اجرای اولیه
updateUI();

// 🌗 حالت دارک مود
const darkModeBtn = document.getElementById('toggleDarkMode');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


function simulateLoading() {
  return new Promise((resolve, reject) => {
    // نمایش پیام در حال بارگذاری
    const loadingDiv = document.getElementById('loadingMessage');
    loadingDiv.textContent = 'در حال بارگذاری...';

    // شبیه‌سازی کار زمان‌بر با setTimeout به مدت 3 ثانیه
    setTimeout(() => {
      resolve('داده‌ها دریافت شد!');
    }, 3000);
  });
}


// document.getElementById('simulateLoadBtn').addEventListener('click', () => {
//   simulateLoading()
//     .then(message => {
//       // وقتی Promise موفق شد، پیام جدید را نمایش بده
//       const loadingDiv = document.getElementById('loadingMessage');
//       loadingDiv.textContent = message;

//       // بعد از 2 ثانیه پیام را پاک کن
//       setTimeout(() => {
//         loadingDiv.textContent = '';
//       }, 2000);
//     })
//     .catch(err => {
//       console.error('خطا در بارگذاری:', err);
//     });
// });


document.getElementById('simulateLoadBtn').addEventListener('click', async () => {
  try {
    const message = await simulateLoading(); // منتظر Promise باش
    const loadingDiv = document.getElementById('loadingMessage');
    loadingDiv.textContent = message;

    setTimeout(() => {
      loadingDiv.textContent = '';
    }, 2000);

  } catch (err) {
    console.error('خطا در بارگذاری:', err);
  }
});
