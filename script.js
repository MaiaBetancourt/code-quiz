var startGameBtn = document.querySelector("#start-game");
var startPrompt = document.querySelector("#start-prompt");
var questionPrompt = document.querySelector("question-prompt");
var questionText = document.querySelector("#question-text");
var questionOptions = document.querySelector("#question-options");
var timerContainer = document.querySelector(".timer-container");
var timeSpan = document.querySelector("#time");

var questionIndex = 0;
var time = 120;
var timer;
var questions = [
    {
        text: "Which of these characters star in the Harry Potter series?",
        options: ["Hodor", "Legolas", "Ron Weasly", "Gangalf"],
        answer: "Ron Weasly",
    },
    {
        text: "Where did Harry Potter go to school?",
        options: ["Hogwarts", "Purdue", "Yale", "Stanford"],
        answer: "Hogwarts",
    },
    {
        text: "What Hogwarts house did Harry belong to?",
        options: ["Vanderbilt", "Gryffindor", "Boston", "Kings Landing"],
        answer: "Gryffindor",
    },
    {
        text: "How many movies make up the whole Harry Potter series?",
        options: ["4", "6", "1", "8"],
        answer: "8",
    },
    {
        text: "Harry's forehead scar resembles a _______.",
        options: ["Lighting Bolt", "Handprint", "Smiley Face", "Star"],
        answer: "Lighting Bolt",
    },
];

function startTimer() {
    timerContainer.style.display = "block";
    timeSpan.textContent = time;
    timer = setInterval(function () {
        time--;
        timeSpan.textContent = time;
        if(time === 0){
            endGame();
        }
    }, 1000);
}

function endGame() {
    alert("Game over!!");
    clearInterval(timer);
}


startGameBtn.addEventListener("click", function (e) {
    startPrompt.style.display = "none";
    questionPrompt.style.display = "block";
    startTimer();
    renderQuestion();
});

function renderQuestion() {
    var question = questions[questionIndex];
    questionText.textContent = question.text;
    questionOptions.innerHTML = "";

    for (var i = 0; i < questions.options.length; i++) {
        var btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-info question-option");
        btn.setAttribute("value", question.options[i]);
        btn.textContent = questions.options[i];
        questionOptions.append(btn);
    }
}

document.body.addEventListener("click", function (e) {
    if (!e.target.matches(".question-option")) return;
    var value = e.target.value;
    if (questions[questionIndex].answer === value) {
        console.log("Correct!");
    } else {
        console.log("Ooops! You were wrong.");
        time -= 10;
        timeSpan.textContent = time;
    }
    questionIndex++;
    if (questionIndex === questions.length) {
        endGame();
    } else {
        renderQuestion();
    }
});