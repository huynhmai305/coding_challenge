const quizData = [
  {
    question: "Cây gì càng để lâu thì càng thấp",
    a: "Cây xanh",
    b: "Cây cổ thụ",
    c: "Cây nến",
    answer: "c",
  },
  {
    question: "Vừa bằng một thước. Mà bước không qua?",
    a: "Con đường",
    b: "Cái bóng",
    c: "Con sông",
    answer: "b",
  },
  {
    question:
      "Có một cây lê có hai cành, mỗi cành có hai nhánh lớn, mỗi nhánh lớn có hai nhánh nhỏ, mỗi nhánh nhò có hai cái lá, cạnh mỗi cái lá có hai quả. Hỏi trên cây đó có mấy quả táo?",
    a: "0",
    b: "10",
    c: "32",
    answer: "a",
  },
  {
    question: "Cái gì của bạn mà toàn người khác dùng?",
    a: "Quần áo",
    b: "Tên",
    c: "Giày dép",
    answer: "b",
  },
  {
    question:
      "Cày trên đồng ruộng trắng phau, khát xuống uống nước giếng sâu đen ngòm",
    a: "Cái cày",
    b: "Con trâu",
    c: "Cây bút",
    answer: "c",
  },
  {
    question: "Nghe kêu mà chẳng thấy ơi. Cong lưng mà chạy một hơi tới nhà",
    a: "Con người",
    b: "Con bò",
    c: "Con chó",
    answer: "c",
  },
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerHTML = currentQuizData.question;
  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
};

const getSelected = () => {
  const answerEls = document.querySelectorAll(".answer");
  let answerId;
  answerEls.forEach((el) => {
    if (el.checked) {
      answerId = el.id;
    }
  });
  return answerId;
};

const resetAnswers = () => {
  const answerEls = document.querySelectorAll(".answer");
  answerEls.forEach((el) => {
    el.checked = false;
  });
  return answerEls;
};

loadQuiz();

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].answer) {
      score += 1;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
      resetAnswers();
    } else {
      quiz.innerHTML = `
        <div>
          <div class="quiz-header">
            <h2 class="text-center">Bạn đã trả lời đúng ${score} / ${quizData.length} câu hỏi</h2>
          </div>
          <button onclick="location.reload()">Reset quiz</button>
        </div>
      `;
    }
  }
});
