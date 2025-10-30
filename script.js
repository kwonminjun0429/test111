const questions = [
  {
    text: "1. 나는 정치 뉴스를 접할 때 그 출처(어디서 나왔는지)를 확인하는 편이다.",
    choices: [
      { text: "항상 확인한다", score: 2 },
      { text: "가끔 확인한다", score: 1 },
      { text: "전혀 확인하지 않는다", score: 0 }
    ]
  },
  {
    text: "2. 정치 정보가 내 생각과 다르더라도 내용을 읽고 이유를 이해하려고 노력한다.",
    choices: [
      { text: "자주 이해하려고 한다", score: 2 },
      { text: "가끔 이해하려고 한다", score: 1 },
      { text: "읽지 않는다", score: 0 }
    ]
  },
  {
    text: "3. 뉴스나 영상 속 정치적 주장에 대해 ‘이게 사실일까?’ 의심해본 적이 있다.",
    choices: [
      { text: "자주 그런 생각을 한다", score: 2 },
      { text: "가끔 있다", score: 1 },
      { text: "거의 없다", score: 0 }
    ]
  },
  {
    text: "4. 하나의 정치 이슈에 대해 다양한 의견이나 시각을 찾아본다.",
    choices: [ 
      { text: "여러 관점을 찾아본다", score: 2 },
      { text: "가끔 다른 의견도 본다", score: 1 },
      { text: "한 쪽 의견만 본다", score: 0 }
    ]
  },
  {
    text: "5. 정치 정보가 나에게 감정적으로 불쾌하거나 자극적이면 잠시 멈추고 판단하려 한다.",
    choices: [ 
      { text: "의도적으로 멈추고 생각한다", score: 2 },
      { text: "가끔 멈춰 본다", score: 1 },
      { text: "바로 반응하거나 공유한다", score: 0 }
    ]
  },
  {
    text: "6. 정치 관련 콘텐츠를 볼 때, 제목이나 댓글에만 의존하지 않고 내용을 직접 확인한다.",
    choices: [ 
      { text: "항상 내용을 직접 확인한다", score: 2 },
      { text: "가끔 직접 본다", score: 1 },
      { text: "제목이나 댓글만 본다", score: 0 }
    ]
  },
  {
    text: "7. 정치 이슈에 대해 친구나 가족과 이야기해본 적이 있다.",
    choices: [ 
      { text: "자주 이야기한다", score: 2 },
      { text: "가끔 이야기한다", score: 1 },
      { text: "거의 이야기하지 않는다", score: 0 }
    ]
  },
  {
    text: "8. 정치 정보가 나의 생활이나 미래와 관련 있다는 생각을 한 적이 있다.",
    choices: [ 
      { text: "자주 그런 생각을 한다", score: 2 },
      { text: "가끔 그렇다", score: 1 },
      { text: "전혀 느끼지 못했다", score: 0 }
    ]
  },
  {
    text: "9. 정치 정보를 접할 때 내 감정에만 치우치지 않도록 조심한다.",
    choices: [ 
      { text: "항상 조심한다", score: 2 },
      { text: "가끔 신경 쓴다", score: 1 },
      { text: "신경 쓰지 않는다", score: 0 }
    ]
  },
  {
    text: "10. 정치 콘텐츠를 공유하거나 반응할 때, 그 정보의 신뢰성을 고민해본다.",
    choices: [ 
      { text: "항상 고민한다", score: 2 },
      { text: "자주 고민한다", score: 1 },
      { text: "고민하지 않는다", score: 0 }
    ]
  }
];

let currentQuestion = 0;
let totalScore = 0;
let selectedScore = null;

const startScreen = document.getElementById("start-screen");
const quizStep = document.getElementById("quiz-step");
const resultDiv = document.getElementById("result");

document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizStep.classList.remove("hidden");
  showQuestion(currentQuestion);
});

function showQuestion(index) {
  selectedScore = null;

  const q = questions[index];
  const progressHTML = `<div id="progress">질문 ${index + 1} / ${questions.length}</div>`;

  quizStep.innerHTML = `
    ${progressHTML}
    <div class="question-text">${q.text}</div>
    ${q.choices.map(choice => `
      <div class="choice-bar" data-score="${choice.score}">${choice.text}</div>
    `).join('')}
    <button id="next-btn" disabled>다음</button>
  `;

  const nextBtn = document.getElementById("next-btn");

  document.querySelectorAll(".choice-bar").forEach(bar => {
    bar.addEventListener("click", () => {
      document.querySelectorAll(".choice-bar").forEach(b => b.classList.remove("selected"));
      bar.classList.add("selected");
      selectedScore = parseInt(bar.dataset.score);
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener("click", () => {
    if (selectedScore !== null) {
      totalScore += selectedScore;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
      } else {
        showResult();
      }
    }
  });
}

function showResult() {
  quizStep.classList.add("hidden");
  resultDiv.classList.remove("hidden");

  const maxScore = questions.length * 2;
  const ratio = totalScore / maxScore;

  let message = "";
  if (ratio >= 0.8) {
    message = "🌕 당신은 매우 건강하게 정치 정보를 소비하고 있어요!";
  } else if (ratio >= 0.4) {
    message = "🌗 보통 수준이에요. 다양한 시각을 더 접해보세요.";
  } else {
    message = "🌑 정치 정보를 더 비판적으로 바라보는 연습이 필요해요.";
  }

  resultDiv.innerHTML = `
    <div class="question-text">결과</div>
    <p>${message}</p>
    <p style="margin-top: 10px; color: #666;">점수: ${totalScore} / ${maxScore} (${(ratio * 100).toFixed(0)}%)</p>
  `;
}