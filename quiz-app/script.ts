// ---- Quiz Data ----
interface Question {
  question: string;
  options: string[];
  answer: number; // index of correct answer
}

const questions: Question[] = [
  {
    question: "What does 'const' mean in JS?",
    options: [
      "A variable that can’t be redeclared or reassigned",
      "A variable that can’t be redeclared, but can be reassigned",
      "A variable that can be redeclared, but not reassigned",
      "A variable for constants and variables"
    ],
    answer: 0
  },
  {
    question: "Which Array method creates a new array by applying a function to each element?",
    options: ["reduce", "filter", "map", "forEach"],
    answer: 2
  },
  {
    question: "Which is not a valid JavaScript data type?",
    options: ["Object", "Symbol", "Float", "BigInt"],
    answer: 2 // "Float" is not a JS type ("number" covers all floats/ints)
  },
  {
    question: "How do you declare a function in JavaScript?",
    options: [
      "function myFunc() {}",
      "def myFunc():",
      "func myFunc() {}",
      "declare function myFunc() {}"
    ],
    answer: 0
  },
  {
    question: "What is the correct syntax to fetch data with Promises?",
    options: [
      "fetch(url).then(response => ...)",
      "fetch(url).await(response => ...)",
      "fetch(url).do(response => ...)",
      "fetch(url).async(response => ...)"
    ],
    answer: 0
  }
];

// ---- State Variables ----
let currentQuestion = 0;
let score = 0;
let selectedOption: number | null = null;
let answers: number[] = [];
let githubAvatarUrl: string = '';
let githubUsername: string = '';

// ---- DOM Element References ----
const githubModal = document.getElementById('github-modal') as HTMLDivElement;
const githubInput = document.getElementById('github-username-input') as HTMLInputElement;
const githubBtn = document.getElementById('github-submit-btn') as HTMLButtonElement;
const githubError = document.getElementById('github-error') as HTMLDivElement;

const avatarContainer = document.getElementById('avatar-container') as HTMLDivElement;
const quizContainer = document.getElementById('quiz-container') as HTMLElement;
const resultModal = document.getElementById('result-modal') as HTMLDivElement;
const resultAvatar = document.getElementById('result-avatar') as HTMLDivElement;
const scoreDisplay = document.getElementById('score') as HTMLParagraphElement;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;

// ---- GitHub API Integration ----
async function fetchGitHubUser(username: string): Promise<string> {
  const resp = await fetch(`https://api.github.com/users/${username.trim()}`);
  if (!resp.ok) throw new Error('User not found');
  const data = await resp.json();
  return data.avatar_url as string;
}

// ---- User Avatar UI ----
function renderAvatar(url: string) {
  avatarContainer.innerHTML = `<img src="${url}" alt="User Avatar" referrerpolicy="no-referrer" />`;
}

// ---- Quiz Rendering ----
function renderQuestion() {
  const q = questions[currentQuestion];

  let html = `
    <div class="quiz-question">${currentQuestion + 1}. ${q.question}</div>
    <ul class="options-list">
      ${q.options.map((opt, idx) => `
        <li data-idx="${idx}" ${selectedOption === idx ? 'class="selected"' : ''}>${opt}</li>
      `).join('')}
    </ul>
    <button id="next-btn" ${selectedOption === null ? 'disabled' : ''}>
      ${currentQuestion === questions.length-1 ? 'Finish' : 'Next'}
    </button>
  `;
  quizContainer.innerHTML = html;

  // Add listeners to options
  Array.from(quizContainer.querySelectorAll('li')).forEach((li) => {
    li.addEventListener('click', () => {
      selectedOption = parseInt((li as HTMLElement).dataset.idx!);
      renderQuestion(); // re-render just for UI update
    });
  });

  // Next/Finish button logic
  quizContainer.querySelector<HTMLButtonElement>("#next-btn")!.onclick = () => {
    if (selectedOption !== null) {
      answers[currentQuestion] = selectedOption;
      if (selectedOption === questions[currentQuestion].answer) {
        score++;
      }
      selectedOption = null;
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        showResult();
      }
    }
  };
}

// ---- Score Modal ----
function showResult() {
  // Center avatar in result modal
  resultAvatar.innerHTML = `<img src="${githubAvatarUrl}" alt="Avatar" referrerpolicy="no-referrer" />`;
  scoreDisplay.innerHTML = `${score} / ${questions.length}`;
  resultModal.classList.add('active');
}

// ---- Quiz Restart ----
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answers = [];
  selectedOption = null;
  resultModal.classList.remove('active');
  renderAvatar(githubAvatarUrl);
  renderQuestion();
}

// ---- Initial Modal flow ----
githubBtn.onclick = async () => {
  const username = githubInput.value.trim();
  if (!username) {
    githubError.textContent = "Please enter a GitHub username.";
    return;
  }
  githubError.textContent = "";
  githubBtn.disabled = true;
  try {
    const avatarUrl = await fetchGitHubUser(username);
    githubAvatarUrl = avatarUrl;
    githubUsername = username;
    githubModal.classList.remove('active');
    renderAvatar(avatarUrl);
    renderQuestion();
  } catch (err) {
    githubError.textContent = "Could not find that GitHub user.";
  } finally {
    githubBtn.disabled = false;
  }
};

// Restart Quiz button
restartBtn.onclick = () => {
  restartQuiz();
};

// ---- Optional: Enter key submits username ----
githubInput.addEventListener('keyup', (e) => {
  if (e.key === "Enter") {
    githubBtn.click();
  }
});
