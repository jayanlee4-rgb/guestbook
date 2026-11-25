// ----- Grab elements from the page -----
const form = document.querySelector('#entry-form');
const list = document.querySelector('#entries');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');

// ----- Data: our "database" is just an array -----
let entries = [];

function save() {
  localStorage.setItem('entries', JSON.stringify(entries));
}

function load() {
  try {
    entries = JSON.parse(localStorage.getItem('entries')) || [];
  } catch {
    entries = [];
  }
}

// ----- Show the data on the page -----
function render() {
  list.innerHTML = '';
  entries.forEach((entry) => {
    const li = document.createElement('li');
    // textContent (not innerHTML) so user text can never inject HTML or scripts
    li.textContent = `${entry.name}: ${entry.message}`;
    list.append(li);
  });
}

// ----- Handle the form -----
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  entries.unshift({ name, message, time: Date.now() });
  save();
  form.reset();
  render();
});

// ----- Fetch data from a public API -----
async function loadQuote() {
  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    document.querySelector('#quote').textContent = `${data.quote} (${data.author})`;
  } catch (err) {
    console.error('Could not load quote:', err);
  }
}

// ----- Start up -----
load();
render();
loadQuote();