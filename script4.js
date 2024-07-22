const startButton = document.getElementById('start-btn')
const restartButton = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById('timer')
const scoreElement = document.getElementById('score')
const resultElement = document.getElementById('result')
const finalScoreElement = document.getElementById('final-score')

let shuffledQuestions, currentQuestionIndex
let score = 0
let timeLeft = 60
let timerInterval

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '3', correct: false },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'Which is the Fastest trainin india?',
    answers: [
      { text: 'Gatimaan Express', correct: false },
      { text: 'Rajdhani Express', correct: false },
      { text: 'New Delhi-Bhopal Shatabdi Express', correct: false },
      { text: 'Vande Bharat Express', correct: true }
    ]
  },
  {
    question: 'When assem became the part of india?',
    answers: [
      { text: '1947', correct: false},
      { text: '1950', correct: true },
      { text: '1983', correct: false },
      { text: '1976', correct: false }
    ]
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false }
    ]
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: [
      { text: 'Harper Lee', correct: true },
      { text: 'Mark Twain', correct: false },
      { text: 'Ernest Hemingway', correct: false },
      { text: 'F. Scott Fitzgerald', correct: false }
    ]
  },
  {
    question: 'which state is called as "Rice Bowl of India"?',
    answers: [
      { text: 'West Bengal', correct: false },
      { text: 'Uttar Pradesh', correct: false },
      { text: 'Andhra Pradesh', correct: true },
      { text: 'Punjab', correct: false }
    ]
  },
  {
    question: 'Which is the Rainless place in the world?',
    answers: [
      { text: 'chile', correct: true },
      { text: 'Dry Valleyes', correct: false },
      { text: 'Dubai', correct: false },
      { text: 'Egypt', correct: false }
    ]
  },
  {
    question: 'which city is called "The city of Light"?',
    answers: [
      { text: 'Paries', correct: true },
      { text: 'Varanasi', correct: false },
      { text: 'New York', correct: false },
      { text: 'None of this', correct: false }
    ]
  },
  {
    question: '"Smallest city in the world"?',
    answers: [
      { text: 'Ngerulmud', correct: false },
      { text: 'Hum', correct: false },
      { text: 'Adamstown', correct: false },
      { text: 'Vatican', correct: true }
    ]
  },
  {
    question: 'What is the rank of India in Railway?',
    answers: [
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '3', correct: false },
      { text: '6', correct: false }
    ]
  },
]

startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  score = 0
  scoreElement.innerText = 'Score: ' + score
  timeLeft = 60
  timerElement.innerText = 'Time: ' + timeLeft
  timerInterval = setInterval(() => {
    timeLeft--
    timerElement.innerText = 'Time: ' + timeLeft
    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      endGame()
    }
  }, 1000)
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    score++
    scoreElement.innerText = 'Score: ' + score
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++
    setNextQuestion()
  } else {
    clearInterval(timerInterval)
    endGame()
  }
}

function endGame() {
  questionContainerElement.classList.add('hide')
  resultElement.classList.remove('hide')
  finalScoreElement.innerText = 'You scored ' + score + ' out of ' + questions.length
}

function restartGame() {
  resultElement.classList.add('hide')
  startButton.classList.remove('hide')
}
