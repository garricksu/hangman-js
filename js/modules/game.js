import Home from "./home.js";
import End from "./end.js";
import Board from "./board.js";
import { sound } from "./../data/sound.js";

const Game = (() => {
  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const words = ['apple', 'ball', 'cat', 'dog', 'elephant'];
  let chosenWord;
  let guessingWord;
  let lives;
  let guesses;

  const $hangman = document.querySelector('.hangman');

  const init = () => {
    //choose a word
    chosenWord = chooseWord();
    //build out word with user guesses
    guessingWord = Array(chosenWord.length).fill('_');
    guesses = [];
    lives = 7;
    //render inital page
    renderInitPage();
    listeners();
    Board.init();
  }

  const listeners = () => {
    $hangman.addEventListener('click', event => {
      if (event.target.matches('.hangman__letter')) {
        sound.click.play();
        check(event.target.innerHTML);
      }
      if (event.target.matches('.hangman__trigger')) {
        sound.click.play();
        Home.init();
      }
    })
  }

  const isAlreadyTaken = letter => {
    return guesses.includes(letter);
  }

  const check = guess => {
    //check if letter has been guessed
    if (isAlreadyTaken(guess)) return;

    guesses.push(guess);

    //check if guess exists in chosen word
    if (chosenWord.includes(guess)) {
      updateGuessingWord(guess);
    }
    //else decrease life
    else {
      lives--;
      Board.setLives(lives);
    }
    // render board acccordingly
    render();
    // check if game is over
    isGameOver();
  }

  const hasWon = () => guessingWord.join("") === chosenWord;

  const hasLost = () => lives <= 0;

  const isGameOver = () => {
    // win
    if (hasWon()) {
      sound.win.play();
      End.setState({
        chosenWord,
        result: "win"
      })
    }
    // lose
    if (hasLost()) {
      sound.lose.play();
      End.setState({
        chosenWord,
        result: "lose"
      })
    }
  }

  const render = () => {
    document.querySelector(".hangman__lives").innerHTML = lives;
    document.querySelector(".hangman__word").innerHTML = guessingWord.join("");
    document.querySelector(".hangman__letters").innerHTML = createLetters();
  }

  const updateGuessingWord = letter => {
    chosenWord.split("").forEach((elem, index) => {
      if (elem === letter) {
        guessingWord[index] = elem;
      }
    });
  }

  const renderInitPage = () => {
    let markup = `
      <p class="hangman__stats">Lives:
        <span class="hangman__lives">${lives}</span>
      </p>
      <h1 class="hangman__title">Hangman</h1>
      <canvas class="hangman__board" height="155px"></canvas>
      <div class="hangman__word">${guessingWord.join("")}</div>
      <p class="hangman__instructions">Pick a letter below to geuss the whole word.</p>
      <ul class="hangman__letters">
        ${createLetters()}
      </ul>
      <button class="button hangman__trigger">Main Menu</button>
    `
    $hangman.innerHTML = markup;
  }

  const createLetters = () => {
    let markup = ``;
    letters.forEach(letter => {
      const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
      markup += `
        <li class="hangman__letter ${isActive}">${letter}</li>
      `
    })
    return markup;
  }

  const chooseWord = () => {
    let randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  }

  return {
    init
  }
})();

export default Game;