
var myQuestions = [
    {
        question: "Which among the following is an egg laying mammal?",
        answers: {
            a: 'Frog',
            b: 'Koala',
            c: 'Platypus',
            d: 'Alligator'
        },
        correctAnswer: 'c'
    },
    {
        question: "What of the following is not a sports car brand?",
        answers: {
            a: 'Ferrari',
            b: 'Lamborghini',
            c: 'Indian',
            d: 'Pagani'
        },
        correctAnswer: 'c'
    },
    {
        question: "What is 12*12?",
        answers: {
            a: '2121',
            b: '144',
            c: '1212',
            d: '24'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is length*breadth of a rectangle calculated as?",
        answers: {
            a: 'Circumference',
            b: 'Perimeter',
            c: 'Volume',
            d: 'Area'
        },
        correctAnswer: 'd'
    },
    {
        question: "What is the capital of Pennsylvania?",
        answers: {
            a: 'Philadelphia',
            b: 'Harrisburg',
            c: 'Pittsburg',
            d: 'Lancaster'
        },
        correctAnswer: 'b'
    },
    {
        question: "In which state is Mount Rushmore located?",
        answers: {
            a: 'Nebraska',
            b: 'Montana',
            c: 'North Dakota',
            d: 'South Dakota'
        },
        correctAnswer: 'd'
    },
    {
        question: "If you are currently located at Acadia National Park, then you are present in  which state?",
        answers: {
            a: 'New Hampshire',
            b: 'Maine',
            c: 'Vermont',
            d: 'Massachusetts'
        },
        correctAnswer: 'b'
    },
    {
        question: "Who is the current CEO of Microsoft?",
        answers: {
            a: 'Satya Nadella',
            b: 'Tim Cook',
            c: 'Bill Gates',
            d: 'Bob Swan'
        },
        correctAnswer: 'a'
    },
];

var quizSection = document.getElementById('questionID');
var resultsSection = document.getElementById('resultID');
var doneBtn = document.getElementById('submitID');
var startBtn = document.getElementById('startID');

newQuestion(myQuestions, quizSection, resultsSection, doneBtn);

function newQuestion(questions, quizSection, resultsSection, doneBtn) {

    function showQuestions(questions, quizSection) {
        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {

            answers = [];

            for (letter in questions[i].answers) {

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizSection.innerHTML = output.join('');
    }

    function showResults(questions, quizSection, resultsSection) {

        var answerSection = quizSection.querySelectorAll('.answers');
        var userAnswer = '';
        var ansCorrect = 0;
        var ansWrong = 0;
        var ansLeft = 0;

        for (var i = 0; i < questions.length; i++) {

            userAnswer = (answerSection[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
            if (userAnswer === questions[i].correctAnswer) {
                ansCorrect++;
            }
            else if (userAnswer !== questions[i].correctAnswer ) {
                ansWrong++;
            }
            else {
                ansLeft++;
            }
        }
        resultsSection.innerHTML = ansCorrect + ' :corr   ' + ansWrong + ' :wrong   ' + ansLeft + ' :left   ';

    }
    function startPage() {
        $("#startID").show();

    }
    startPage();

    function hideQuiz() {
        $("#startID").hide();
    }



    startBtn.onclick = function () {
        hideQuiz();
        showQuestions(questions, quizSection);
    }


    doneBtn.onclick = function () {
        hideQuiz();
        showResults(questions, quizSection, resultsSection);
        $("#questionID").hide();
        $("#submitID").hide();
    }

}