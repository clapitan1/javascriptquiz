var questions = [{        question: "Where is the correct place to insert a JavaScript?",        choices: ["The <body> section", "The <head> section", "Both the <head> and the <body> section are correct"],
        correctAnswer: "Both the <head> section and the <body> section are correct"
    },
    {
        question: "The external JavaScript file must contain the <script> tag",
        choices: ["True", "False"],
        correctAnswer: "False"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        correctAnswer: "function myFunction()"
    },
];

var startButton = document.querySelector('#start-btn');
var choicesList = document.querySelector('#choices');
var scoreSpan = document.querySelector('#score');
var timeLeftSpan = document.querySelector('#time-left');

var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timerId;

function startQuiz() {
    document.querySelector('#start-screen').classList.add('hide');
    document.querySelector('#quiz-screen').classList.remove('hide');
    askQuestion();
    startTimer();
}

function askQuestion() {
    var question = questions[currentQuestion];
    document.querySelector('#questions').textContent = question.question;
    choicesList.innerHTML = '';
    for (var i = 0; i < question.choices.length; i++) {
        var choice = question.choices[i];
        var li = document.createElement('li');
        var button = document.createElement('button');
        button.textContent = choice;
        li.appendChild(button);
        choicesList.appendChild(li);
        button.addEventListener('click', function() {
            var isCorrect = checkAnswer(question, this.textContent);
            if (isCorrect) {
                score++;
                scoreSpan.textContent = score;
            } else {
                timeLeft -= 10;
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                askQuestion();
            } else {
                endQuiz();
            }
        });
    }
}

function checkAnswer(question, answer) {
    return question.correctAnswer === answer;
}

function startTimer() {
    timeLeftSpan.textContent = timeLeft;
    timerId = setInterval(function() {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerId);
    document.querySelector('#quiz-screen').classList.add('hide');
    document.querySelector('#end-screen').classList.remove('hide');
    document.querySelector('#score').textContent = score;
}

startButton.addEventListener('click', startQuiz);
