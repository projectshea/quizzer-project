/*
here is code that will:
 [ ]make things smooth
 [x]create card questions
 [x]create random generator
 [ ]create bonus round
 [x]create options for answers
 [x]create questions
 [x]tally points
 [ ]Make a bargraph using local storage of wins 
            or make bargraph of probability guessing the next card

*/

'use strict';

let quizArray = [];//uses the constructor to save an array of objects
let arrCont = [];//content used to split the questions inside render prototype
let askedQuestion = [];//saves integers where random() is used. this will keep track if something has been asked already.
let resultsCounter = 0; //quiz score - will be tallied in prototype
let BonusQuesArray = [];//holds the bonus rounds

// localStorage declarations and setup
let currentScore;
let highScore;

if (typeof highScore !== Number) {
  highScore = 0;
}

highScore = localStorage.getItem("highScore");
console.log('last score was: ' + localStorage.getItem("prevScore"));


//html callers
let myForm = document.getElementById('Response-fromQuiz');
let legElem = document.getElementById('questionbox');
let opt1 = document.getElementById('option1');
let opt2 = document.getElementById('option2');
let opt3 = document.getElementById('option3');
let opt4 = document.getElementById('option4');

/*******************constructor ****************** */
function GenerateQuiz(quizQuestion, quizOption, quizAnswer)
{
  this.quizQuestion = quizQuestion;//string is a question
  this.quizOption = quizOption;  //String with a,b,c,d possible options - MUST Be SPLICED!
  this.quizAnswer = quizAnswer; //the correct answer from array -MUST Be SPliced!!
  this.weight; //will give weight to each question


  quizArray.push(this)
}

function BonusRound(quizQuestion, quizOption, quizAnswer)
{
  this.BonusRoundQ = quizQuestion//question
  this.BonusRoundO = quizOption//option
  this.BonusRoundA = quizAnswer//answers
  this.weight;//add some weight to each question TODO: Math.random()
  BonusQuesArray.push(this);
}
/******************************* Prototypes*************** */
GenerateQuiz.prototype.showQuestions = function()
{


}


GenerateQuiz.prototype.renderForm = function()
{
  arrCont = this.quizOption.split('-');
  legElem.textContent = this.quizQuestion;//asks the question

  for(let i = 1; i < 5; ++i)//only four options
  {
    //input creator
    let inputElem = document.createElement('input');
    inputElem.setAttribute('type', 'radio');
    inputElem.setAttribute('id', 'option' + i);
    inputElem.setAttribute('name', 'optionsFamily');
    legElem.appendChild(inputElem);
    let splitter = arrCont[i - 1].split('.');
    //label creator
    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', 'option' + i);
    labelElem.textContent = splitter[0] + ') ' +  splitter[1];//offset from loop
    legElem.appendChild(labelElem);
  }
}

/******************** generating the questions ****************/
//quizHtmlArray, quizCssArray, quizJsArray
//optionsHtmlArray, optionsCssArray, optionsJsArray
//answersHtmlArray, anwswersCssArray, answersJsArray
for(let i = 0; i < quizQArray.length; i++)//all arrays should be exactly the same length
{
  new GenerateQuiz(quizQArray[i], optionsArray[i], answersArray[i]);
}
//TODO: bonus round
//if(points are greater than or equal to minBonusRoundPoints)
{
  //bonus round
  //new BonusRound(x,x,x); ->  //Notice: constant.js has all arrays with 10 questions for each type(html, css, js). therefore, questionsArray[0 -9] are all html questions and so on.

}


/************************* helper functions**************** */
function getRandom(min, max){  return Math.floor(Math.random() * (max - min + 1) + min);}

/************************* caller function********** */
function main()
{
  let rando = getRandom(0, quizArray.length - 1);
  for(let aQuiz of quizArray)
  {
    if(!askedQuestion.includes(rando))
    {
      quizArray[rando].renderForm();
      askedQuestion.push(rando);//askQuestion saves the rando number so that we dont ask question again
      break;
    }
  }
}
main();

function handleSubmit(event)
{
  event.preventDefault();
  let question_Box = event.target[0].childNodes[1].firstChild.nodeValue;
  let userResponse;
  let newUserAnswer1 = event.target.option1.checked;
  let newUserAnswer2 = event.target.option2.checked;
  let newUserAnswer3 = event.target.option3.checked;
  let newUserAnswer4 = event.target.option4.checked;

  if(newUserAnswer1){userResponse = arrCont[0];}
  if(newUserAnswer2){userResponse = arrCont[1];}
  if(newUserAnswer3){userResponse = arrCont[2];}
  if(newUserAnswer4){userResponse = arrCont[3];}
    userResponse = userResponse.split('.');
  

  /*
  loop goes through all quiz questions string in quizArray to find the correlating correct answers.
  */
  for(let question of quizArray)
  {
    if(question.quizQuestion === question_Box &&//check if we are at the right question
       question.quizAnswer === userResponse[0])//and check if the answer matches client response
    {
      alert(`you guessed ${userResponse[0]} and the answer is ${userResponse[1]}! Good job, have some points!`);
      //question.resultsCounter++;//if so, tally points
      resultsCounter++;

      // localStorage code BEGIN
      let prevScore = resultsCounter;
      localStorage.setItem("prevScore", prevScore);
      currentScore = resultsCounter;
      console.log('current score is: ' + currentScore);
      

    if (currentScore > highScore) {
      highScore = currentScore;
      console.log("THE high score is: " + highScore);
      localStorage.setItem("highScore", highScore);
    }

      // localStorage code END

      break;
    }
    else if(question.quizQuestion === question_Box &&
      question.quizAnswer !== userResponse[0])
    {
      alert("alert you were wrong! ");
      break;
    }
    //else continue searching questions till found
  }

  //new set of questions after click
  main();

}
//************** event listener ***************************/
myForm.addEventListener('submit', handleSubmit);