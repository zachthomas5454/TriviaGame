
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

    // function to populate all questions along with the answer options in the <div> element
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
    // function to calculate and populate total questions answered right, wrong and unanswered <div> element
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
            else if ((userAnswer !== questions[i].correctAnswer) && (userAnswer === "a" || userAnswer === "b" || userAnswer === "c" || userAnswer === "d")) {
                ansWrong++;
            }
            else if ((userAnswer !== questions[i].correctAnswer) && (userAnswer !== "a" && userAnswer !== "b" && userAnswer !== "c" && userAnswer !== "d")) {
                ansLeft++;
            }
        }
        resultsSection.innerHTML = ' Correct:   ' + ansCorrect + '<br><br>' + ' Wrong:   ' + ansWrong + '<br><br>' + ' Unanswered:   ' + ansLeft;

    }

    //timer section
    var number = 50;
    var intervalId;

    //Timer runs with the desired interval value
    function startTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        running = true;
    }
    //Timer decreases the counter and executes Stop function when it reaches 0
    function decrement() {
        number--;
        $("#timeleft").html("<h2>" + "Time Left:     " + number + "</h2>");
        if (number === 0) {
            stop();
        }
    }

    //calling startPage function
    function startPage() {
        $("#startID").show();
        $("#submitID").hide();
    }
    // first function to execute when page is refereshed (Step 1)
    startPage();

    // executes when Start button is clicked (Step 2)
    startBtn.onclick = function () {
        hideQuiz();
        showQuestions(questions, quizSection);
        $("#submitID").show();
    }

    // hides Question page and timer and shows Results (After answering questions and before timer ends)
    doneBtn.onclick = function () {
        stop();
    }
    // hides Start button and starts timer
    function hideQuiz() {
        $("#startID").hide();
        startTimer();
    }


    // Function closes all the Question Answer display and displays the final result
    //Activates when timer is done or Done button is selected
    function stop() {
        clearInterval(intervalId);
        running = false;
        showResults(questions, quizSection, resultsSection);
        $("#questionID").hide();
        $("#submitID").hide();
        $("#timeleft").hide();
    }
}