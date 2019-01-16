var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';

document.getElementsByTagName('head')[0].appendChild(script);

/*-------------------------------------------------------------------------------Scrolling effect---------------------------------------------------------------*/
/* var pageHeight = window.innerHeight;
var isAnimating = false;
document.body.style.transform = 'translate3d(0px,0px,0px)';

document.addEventListener('scroll', function(e){
  document.body.scrollTop = 0;
});
document.addEventListener('wheel', wheelListener);

function wheelListener(e) {
  if(e.deltaY > 0) {
    scrollPage(-pageHeight);
  } else {
    scrollPage(+pageHeight);
  }
}

function scrollPage(scrollSize) {
  if(isAnimating){
    return;
  }
  isAnimating = true;
  var yPos = getNewYPos(scrollSize);
  document.body.style.transform = 'translate3d(0px,'+ yPos + ',0px)';
}

function getNewYPos(add){
  var oldYPos = document.body.style.transform.split(',')[1];
  oldYPos = parseInt(oldYPos.replace(/px/,''));
  var newYPos = oldYPos + add;
  if(newYPos > 0){
    isAnimating = false;
  }
  return Math.min(0, newYPos) + 'px';
}


document.body.addEventListener('transitionend', function(){
  setTimeout(function(){ isAnimating = false; }, 500);
  document.addEventListener('wheel', wheelListener);
}) 

/*----------------------------------------------------------------------------------- Button Scroll ---------------------------------------------------------------------------*/
var welcomeButton = document.getElementsByClassName("welcomeButton");

$(welcomeButton).click(function(){
  $("html, body").animate({
      scrollTop: $('.secondPage').offset().top 
  }, 1500);
});

/*---------------------------------------------------------------------------------- QUIZ ------------------------------------------------------------------------------ */

//vom folosi un vector pentru a pastra toate intrebarile pentru QUIZ
(function() {
  const myQuestions = [
    {
      question: "Who was P.O.T.M in December?",
      answers: {
        a: "Aubameyang",
        b: "Hazard",
        c: "van Dijk"
      },
      correctAnswer: "c"
    },
    {
      question: "What team Aubameyang plays for?",
      answers: {
        a: "Tottenham",
        b: "Liverpool",
        c: "Arsenal"
      },
      correctAnswer: "c"
    },
    {
      question: "Which player got G.O.T.M in October?",
      answers: {
        a: "Lucas Moura",
        b: "Ramsey",
        c: "Townsend"
      },
      correctAnswer: "b"
    }
  ];

  function buildQuiz() {
    
    const output = [];

    // pentru fiecare intrebare
    myQuestions.forEach((currentQuestion, questionNumber) => {
    // stocam lista optiunilor de raspuns
      const answers = [];

      // pentru fiecare raspuns disponibil
      for (letter in currentQuestion.answers) {
        // Adaugam un buton HTML
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // adaugam intrebare si raspunsurile sale la iesire
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // selectam toate clasele din HTML cu denumirea 'answer'
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // raspunsurile utilizatorilor
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      // gasim raspunsul utilizatorilor
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // daca raspunsul este gresit sau nu s-a dat niciun raspuns
        // coloram cu rosu
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // numarul total de raspunsuri corecte
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide"); 
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // aratam rezultatele
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();