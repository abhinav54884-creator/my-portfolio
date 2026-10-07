/**
 * Interactive Project Demos Engine for Abhinav M Portfolio
 * Embedded live playable versions of projects within modals
 */

const ProjectDemos = {
  // 1. To-Do List Demo
  renderTodoList() {
    return `
      <div class="demo-container todo-demo">
        <div class="demo-header">
          <h3><i class="fas fa-tasks"></i> Interactive To-Do List Demo</h3>
          <p>Test the task management logic right here live!</p>
        </div>
        <div class="todo-input-group">
          <input type="text" id="demoTodoInput" placeholder="Add a new task (e.g. Master Graph Algorithms)..." onkeypress="if(event.key==='Enter') ProjectDemos.addTodoItem()">
          <button class="btn btn-primary sound-btn" onclick="ProjectDemos.addTodoItem()">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
        <div class="todo-filters">
          <button class="filter-chip active" onclick="ProjectDemos.filterTodos('all', this)">All (<span id="todoCountAll">3</span>)</button>
          <button class="filter-chip" onclick="ProjectDemos.filterTodos('active', this)">Active</button>
          <button class="filter-chip" onclick="ProjectDemos.filterTodos('completed', this)">Completed</button>
        </div>
        <ul class="todo-list-items" id="demoTodoList">
          <li class="todo-item completed" data-status="completed">
            <span class="todo-text" onclick="ProjectDemos.toggleTodoItem(this)">Setup CBIT CSE Portfolio HTML/CSS</span>
            <span class="todo-badge completed-badge"><i class="fas fa-check-circle"></i> Done</span>
            <button class="todo-del-btn" onclick="ProjectDemos.deleteTodoItem(this)"><i class="fas fa-trash-alt"></i></button>
          </li>
          <li class="todo-item" data-status="active">
            <span class="todo-text" onclick="ProjectDemos.toggleTodoItem(this)">Practice LeetCode Binary Trees</span>
            <span class="todo-badge active-badge"><i class="fas fa-clock"></i> Pending</span>
            <button class="todo-del-btn" onclick="ProjectDemos.deleteTodoItem(this)"><i class="fas fa-trash-alt"></i></button>
          </li>
          <li class="todo-item" data-status="active">
            <span class="todo-text" onclick="ProjectDemos.toggleTodoItem(this)">Implement Web Audio Sound FX Engine</span>
            <span class="todo-badge active-badge"><i class="fas fa-clock"></i> Pending</span>
            <button class="todo-del-btn" onclick="ProjectDemos.deleteTodoItem(this)"><i class="fas fa-trash-alt"></i></button>
          </li>
        </ul>
      </div>
    `;
  },

  addTodoItem() {
    const input = document.getElementById('demoTodoInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) {
      if (window.soundFX) window.soundFX.playLose();
      alert('Please enter a task title!');
      return;
    }

    if (window.soundFX) window.soundFX.playSuccess();
    const list = document.getElementById('demoTodoList');
    const li = document.createElement('li');
    li.className = 'todo-item animate-pop';
    li.setAttribute('data-status', 'active');
    li.innerHTML = `
      <span class="todo-text" onclick="ProjectDemos.toggleTodoItem(this)">${this.escapeHTML(text)}</span>
      <span class="todo-badge active-badge"><i class="fas fa-clock"></i> Pending</span>
      <button class="todo-del-btn" onclick="ProjectDemos.deleteTodoItem(this)"><i class="fas fa-trash-alt"></i></button>
    `;
    list.prepend(li);
    input.value = '';
    this.updateTodoCounts();
  },

  toggleTodoItem(element) {
    const li = element.closest('.todo-item');
    if (!li) return;
    li.classList.toggle('completed');
    const isComp = li.classList.contains('completed');
    li.setAttribute('data-status', isComp ? 'completed' : 'active');
    
    const badge = li.querySelector('.todo-badge');
    if (badge) {
      if (isComp) {
        badge.className = 'todo-badge completed-badge';
        badge.innerHTML = '<i class="fas fa-check-circle"></i> Done';
        if (window.soundFX) window.soundFX.playSuccess();
      } else {
        badge.className = 'todo-badge active-badge';
        badge.innerHTML = '<i class="fas fa-clock"></i> Pending';
        if (window.soundFX) window.soundFX.playClick();
      }
    }
    this.updateTodoCounts();
  },

  deleteTodoItem(element) {
    if (window.soundFX) window.soundFX.playClick();
    const li = element.closest('.todo-item');
    if (li) {
      li.style.transform = 'scale(0.8)';
      li.style.opacity = '0';
      setTimeout(() => {
        li.remove();
        this.updateTodoCounts();
      }, 200);
    }
  },

  filterTodos(filter, btn) {
    if (window.soundFX) window.soundFX.playClick();
    const filterBtns = document.querySelectorAll('.todo-filters .filter-chip');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const items = document.querySelectorAll('#demoTodoList .todo-item');
    items.forEach(item => {
      const status = item.getAttribute('data-status');
      if (filter === 'all' || status === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  },

  updateTodoCounts() {
    const countAll = document.querySelectorAll('#demoTodoList .todo-item').length;
    const countSpan = document.getElementById('todoCountAll');
    if (countSpan) countSpan.innerText = countAll;
  },

  // 2. Rock Paper Scissors Demo
  renderRPS() {
    return `
      <div class="demo-container rps-demo">
        <div class="demo-header text-center">
          <h3><i class="fas fa-gamepad"></i> Interactive Rock Paper Scissors Game</h3>
          <p>Challenge the AI in real time with interactive audio feedback!</p>
        </div>

        <div class="rps-score-board">
          <div class="score-card player">
            <span class="score-label">YOU (Abhinav)</span>
            <span class="score-val" id="rpsPlayerScore">0</span>
          </div>
          <div class="score-vs">VS</div>
          <div class="score-card ai">
            <span class="score-label">COMPUTER AI</span>
            <span class="score-val" id="rpsAIScore">0</span>
          </div>
        </div>

        <div class="rps-arena" id="rpsArena">
          <div class="rps-choice-display" id="rpsPlayerDisplay">❓</div>
          <div class="rps-result-text" id="rpsResultText">Choose your move to start!</div>
          <div class="rps-choice-display" id="rpsAIDisplay">❓</div>
        </div>

        <div class="rps-actions">
          <button class="rps-btn" onclick="ProjectDemos.playRPS('rock')">
            <span class="rps-emoji">✊</span>
            <span class="rps-name">Rock</span>
          </button>
          <button class="rps-btn" onclick="ProjectDemos.playRPS('paper')">
            <span class="rps-emoji">✋</span>
            <span class="rps-name">Paper</span>
          </button>
          <button class="rps-btn" onclick="ProjectDemos.playRPS('scissors')">
            <span class="rps-emoji">✌️</span>
            <span class="rps-name">Scissors</span>
          </button>
        </div>
      </div>
    `;
  },

  rpsState: { player: 0, ai: 0 },

  playRPS(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];

    const pDisplay = document.getElementById('rpsPlayerDisplay');
    const aDisplay = document.getElementById('rpsAIDisplay');
    const resText = document.getElementById('rpsResultText');

    if (pDisplay) pDisplay.innerText = emojis[playerChoice];
    if (aDisplay) aDisplay.innerText = emojis[aiChoice];

    let result = '';
    if (playerChoice === aiChoice) {
      result = "It's a Tie! 🤝";
      if (window.soundFX) window.soundFX.playClick();
    } else if (
      (playerChoice === 'rock' && aiChoice === 'scissors') ||
      (playerChoice === 'paper' && aiChoice === 'rock') ||
      (playerChoice === 'scissors' && aiChoice === 'paper')
    ) {
      result = 'You Win! 🎉';
      this.rpsState.player++;
      if (window.soundFX) window.soundFX.playVictory();
    } else {
      result = 'Computer Wins! 🤖';
      this.rpsState.ai++;
      if (window.soundFX) window.soundFX.playLose();
    }

    if (resText) resText.innerHTML = `<strong>${result}</strong>`;
    
    const pScore = document.getElementById('rpsPlayerScore');
    const aScore = document.getElementById('rpsAIScore');
    if (pScore) pScore.innerText = this.rpsState.player;
    if (aScore) aScore.innerText = this.rpsState.ai;
  },

  // 3. Library Management System Demo
  renderLibrary() {
    return `
      <div class="demo-container library-demo">
        <div class="demo-header">
          <h3><i class="fas fa-book-reader"></i> Library Management System Simulator</h3>
          <p>Simulating Java backend CRUD operations & MySQL database queries.</p>
        </div>

        <div class="library-controls">
          <button class="btn btn-outline" onclick="ProjectDemos.addDemoBook()"><i class="fas fa-plus-circle"></i> Insert Book Record</button>
          <button class="btn btn-outline" onclick="ProjectDemos.runSQLQuery()"><i class="fas fa-database"></i> Run SQL SELECT Query</button>
        </div>

        <div class="table-responsive">
          <table class="library-table" id="libraryTable">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>BK-101</code></td>
                <td>Data Structures & Algorithms</td>
                <td>Narasimha Karumanchi</td>
                <td>Computer Science</td>
                <td><span class="badge badge-success">Available</span></td>
                <td><button class="btn-sm btn-primary" onclick="ProjectDemos.toggleBookIssue(this)">Issue Book</button></td>
              </tr>
              <tr>
                <td><code>BK-102</code></td>
                <td>Clean Code</td>
                <td>Robert C. Martin</td>
                <td>Software Engineering</td>
                <td><span class="badge badge-warning">Issued</span></td>
                <td><button class="btn-sm btn-success" onclick="ProjectDemos.toggleBookIssue(this)">Return Book</button></td>
              </tr>
              <tr>
                <td><code>BK-103</code></td>
                <td>Database System Concepts</td>
                <td>Silberschatz & Korth</td>
                <td>DBMS</td>
                <td><span class="badge badge-success">Available</span></td>
                <td><button class="btn-sm btn-primary" onclick="ProjectDemos.toggleBookIssue(this)">Issue Book</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="sql-console-box mt-3">
          <div class="console-header"><i class="fas fa-terminal"></i> MySQL Query Output Log</div>
          <pre id="sqlConsole">-- Initialized MySQL Connection [jdbc:mysql://localhost:3306/library_db]
SELECT * FROM books WHERE status = 'Available';
--> 2 records retrieved successfully (0.004 sec).</pre>
        </div>
      </div>
    `;
  },

  toggleBookIssue(btn) {
    if (window.soundFX) window.soundFX.playClick();
    const tr = btn.closest('tr');
    const statusTd = tr.cells[4];
    const bookTitle = tr.cells[1].innerText;
    const consoleBox = document.getElementById('sqlConsole');

    if (statusTd.innerText.includes('Available')) {
      statusTd.innerHTML = '<span class="badge badge-warning">Issued</span>';
      btn.className = 'btn-sm btn-success';
      btn.innerText = 'Return Book';
      if (consoleBox) {
        consoleBox.innerText += `\n\nUPDATE books SET status='Issued', issued_date=NOW() WHERE title='${bookTitle}';\n--> Query OK, 1 row affected.`;
      }
      if (window.soundFX) window.soundFX.playSuccess();
    } else {
      statusTd.innerHTML = '<span class="badge badge-success">Available</span>';
      btn.className = 'btn-sm btn-primary';
      btn.innerText = 'Issue Book';
      if (consoleBox) {
        consoleBox.innerText += `\n\nUPDATE books SET status='Available', returned_date=NOW() WHERE title='${bookTitle}';\n--> Query OK, 1 row affected.`;
      }
      if (window.soundFX) window.soundFX.playToggle(true);
    }
  },

  addDemoBook() {
    if (window.soundFX) window.soundFX.playClick();
    const title = prompt('Enter Book Title:', 'Mastering Java & MySQL');
    if (!title) return;
    const author = prompt('Enter Author Name:', 'Abhinav M');
    if (!author) return;

    const tbody = document.querySelector('#libraryTable tbody');
    const newId = `BK-${Math.floor(100 + Math.random() * 900)}`;
    const tr = document.createElement('tr');
    tr.className = 'animate-pop';
    tr.innerHTML = `
      <td><code>${newId}</code></td>
      <td>${this.escapeHTML(title)}</td>
      <td>${this.escapeHTML(author)}</td>
      <td>Computer Science</td>
      <td><span class="badge badge-success">Available</span></td>
      <td><button class="btn-sm btn-primary" onclick="ProjectDemos.toggleBookIssue(this)">Issue Book</button></td>
    `;
    tbody.appendChild(tr);

    const consoleBox = document.getElementById('sqlConsole');
    if (consoleBox) {
      consoleBox.innerText += `\n\nINSERT INTO books (id, title, author, category, status) VALUES ('${newId}', '${title}', '${author}', 'Computer Science', 'Available');\n--> Query OK, 1 row inserted.`;
    }
    if (window.soundFX) window.soundFX.playSuccess();
  },

  runSQLQuery() {
    if (window.soundFX) window.soundFX.playClick();
    const consoleBox = document.getElementById('sqlConsole');
    if (consoleBox) {
      consoleBox.innerText += `\n\nSELECT COUNT(*) AS total_books, COUNT(CASE WHEN status='Available' THEN 1 END) AS available FROM books;\n--> [Total: 4 | Available: 3 | Issued: 1]`;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
  },

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
};

window.ProjectDemos = ProjectDemos;
