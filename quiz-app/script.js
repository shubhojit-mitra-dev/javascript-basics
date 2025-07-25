var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var questions = [
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
var currentQuestion = 0;
var score = 0;
var selectedOption = null;
var answers = [];
var githubAvatarUrl = '';
var githubUsername = '';
// ---- DOM Element References ----
var githubModal = document.getElementById('github-modal');
var githubInput = document.getElementById('github-username-input');
var githubBtn = document.getElementById('github-submit-btn');
var githubError = document.getElementById('github-error');
var avatarContainer = document.getElementById('avatar-container');
var quizContainer = document.getElementById('quiz-container');
var resultModal = document.getElementById('result-modal');
var resultAvatar = document.getElementById('result-avatar');
var scoreDisplay = document.getElementById('score');
var restartBtn = document.getElementById('restart-btn');
// ---- GitHub API Integration ----
function fetchGitHubUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username.trim()))];
                case 1:
                    resp = _a.sent();
                    if (!resp.ok)
                        throw new Error('User not found');
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.avatar_url];
            }
        });
    });
}
// ---- User Avatar UI ----
function renderAvatar(url) {
    avatarContainer.innerHTML = "<img src=\"".concat(url, "\" alt=\"User Avatar\" referrerpolicy=\"no-referrer\" />");
}
// ---- Quiz Rendering ----
function renderQuestion() {
    var q = questions[currentQuestion];
    var html = "\n    <div class=\"quiz-question\">".concat(currentQuestion + 1, ". ").concat(q.question, "</div>\n    <ul class=\"options-list\">\n      ").concat(q.options.map(function (opt, idx) { return "\n        <li data-idx=\"".concat(idx, "\" ").concat(selectedOption === idx ? 'class="selected"' : '', ">").concat(opt, "</li>\n      "); }).join(''), "\n    </ul>\n    <button id=\"next-btn\" ").concat(selectedOption === null ? 'disabled' : '', ">\n      ").concat(currentQuestion === questions.length - 1 ? 'Finish' : 'Next', "\n    </button>\n  ");
    quizContainer.innerHTML = html;
    // Add listeners to options
    Array.from(quizContainer.querySelectorAll('li')).forEach(function (li) {
        li.addEventListener('click', function () {
            selectedOption = parseInt(li.dataset.idx);
            renderQuestion(); // re-render just for UI update
        });
    });
    // Next/Finish button logic
    quizContainer.querySelector("#next-btn").onclick = function () {
        if (selectedOption !== null) {
            answers[currentQuestion] = selectedOption;
            if (selectedOption === questions[currentQuestion].answer) {
                score++;
            }
            selectedOption = null;
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                renderQuestion();
            }
            else {
                showResult();
            }
        }
    };
}
// ---- Score Modal ----
function showResult() {
    // Center avatar in result modal
    resultAvatar.innerHTML = "<img src=\"".concat(githubAvatarUrl, "\" alt=\"Avatar\" referrerpolicy=\"no-referrer\" />");
    scoreDisplay.innerHTML = "".concat(score, " / ").concat(questions.length);
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
githubBtn.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var username, avatarUrl, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = githubInput.value.trim();
                if (!username) {
                    githubError.textContent = "Please enter a GitHub username.";
                    return [2 /*return*/];
                }
                githubError.textContent = "";
                githubBtn.disabled = true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, fetchGitHubUser(username)];
            case 2:
                avatarUrl = _a.sent();
                githubAvatarUrl = avatarUrl;
                githubUsername = username;
                githubModal.classList.remove('active');
                renderAvatar(avatarUrl);
                renderQuestion();
                return [3 /*break*/, 5];
            case 3:
                err_1 = _a.sent();
                githubError.textContent = "Could not find that GitHub user.";
                return [3 /*break*/, 5];
            case 4:
                githubBtn.disabled = false;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Restart Quiz button
restartBtn.onclick = function () {
    restartQuiz();
};
// ---- Optional: Enter key submits username ----
githubInput.addEventListener('keyup', function (e) {
    if (e.key === "Enter") {
        githubBtn.click();
    }
});
