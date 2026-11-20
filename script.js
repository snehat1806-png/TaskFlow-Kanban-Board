// ---- Data: single source of truth ----
const STATUSES = ['todo', 'doing', 'done'];

let tasks = [
  { id: 1, title: 'Design login page',     priority: 'high',   status: 'todo',  due: '25 Nov' },
  { id: 2, title: 'Style priority labels', priority: 'medium', status: 'todo',  due: '27 Nov' },
  { id: 3, title: 'Set up GitHub repo',    priority: 'low',    status: 'todo',  due: '30 Nov' },
  { id: 4, title: 'Build navbar',          priority: 'medium', status: 'doing', due: '23 Nov' },
  { id: 5, title: 'Fix mobile spacing',    priority: 'high',   status: 'doing', due: '22 Nov' },
  { id: 6, title: 'Create project folder', priority: 'low',    status: 'done',  due: '20 Nov' },
];

// ---- DOM references ----
const form = document.querySelector('.add-task-form');
const input = document.querySelector('.add-task-input');
const prioritySelect = document.querySelector('.add-task-priority');
const board = document.querySelector('.board');

// ---- Build one card from a task object ----
function createCard(task) {
  const index = STATUSES.indexOf(task.status);

  const card = document.createElement('article');
  card.className = 'task-card';
  card.dataset.id = task.id;

  const title = document.createElement('h3');
  title.className = 'task-title';
  title.textContent = task.title;
  title.title = 'Double-click to edit';

  const badge = document.createElement('span');
  badge.className = `priority priority-${task.priority}`;
  badge.textContent = task.priority[0].toUpperCase() + task.priority.slice(1);

  const due = document.createElement('p');
  due.className = 'task-due';
  due.textContent = task.due ? `Due: ${task.due}` : 'No due date';

  const actions = document.createElement('div');
  actions.className = 'task-actions';
  actions.innerHTML = `
    <button type="button" data-action="left" ${index === 0 ? 'disabled' : ''} aria-label="Move left">&larr;</button>
    <button type="button" data-action="right" ${index === STATUSES.length - 1 ? 'disabled' : ''} aria-label="Move right">&rarr;</button>
    <button type="button" data-action="delete" class="delete-btn">Delete</button>
  `;

  card.append(title, badge, due, actions);
  return card;
}

// ---- Redraw the whole board from the tasks array ----
function render() {
  document.querySelectorAll('.column').forEach((column) => {
    const status = column.dataset.status;
    const list = column.querySelector('.task-list');
    const columnTasks = tasks.filter((t) => t.status === status);

    list.innerHTML = '';
    columnTasks.forEach((task) => list.appendChild(createCard(task)));

    column.querySelector('.task-count').textContent = `(${columnTasks.length})`;
  });
}

// ---- Add a task ----
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) {
    input.focus();
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    priority: prioritySelect.value,
    status: 'todo',
  });

  input.value = '';
  render();
});

// ---- Move / delete: one listener on the board (event delegation) ----
board.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const card = button.closest('.task-card');
  const id = Number(card.dataset.id);
  const task = tasks.find((t) => t.id === id);
  const action = button.dataset.action;

  if (action === 'delete') {
    if (confirm(`Delete "${task.title}"?`)) {
      tasks = tasks.filter((t) => t.id !== id);
    }
  } else {
    const step = action === 'right' ? 1 : -1;
    const newIndex = STATUSES.indexOf(task.status) + step;
    if (newIndex >= 0 && newIndex < STATUSES.length) {
      task.status = STATUSES[newIndex];
    }
  }

  render();
});

// ---- Stretch goal: double-click a title to edit it ----
board.addEventListener('dblclick', (event) => {
  const titleEl = event.target.closest('.task-title');
  if (!titleEl) return;

  const id = Number(titleEl.closest('.task-card').dataset.id);
  const task = tasks.find((t) => t.id === id);
  const newTitle = prompt('Edit task title:', task.title);

  if (newTitle !== null && newTitle.trim()) {
    task.title = newTitle.trim();
    render();
  }
});

render();