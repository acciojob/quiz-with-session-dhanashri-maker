
// Get elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Questions data (fixed: all have 4 options)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // fixed
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const questionDiv = document.createElement("div");
    questionDiv.textContent = q.question;

    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore saved answer
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      // Save progress on change
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      questionDiv.appendChild(input);
      questionDiv.appendChild(document.createTextNode(choice));
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Calculate score
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}

// On page load
window.onload = function () {
  renderQuestions();

  // Show saved score if exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
  }
};

// Submit button
submitBtn.addEventListener("click", () => {
  const score = calculateScore();

  // Show score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save score
  localStorage.setItem("score", score);
});