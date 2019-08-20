const  End = (() => {
  const state = {
    chosenWord: null,
    windOrLose: null
  }

  const $hangman = document.querySelector('.hangman');

  const setState = obj => {
    state.chosenWord = obj.chosenWord;
    state.windOrLose = obj.result;
    render();
  }

  const render = () => {
    let markup = `
      <h1 class="hangman__title">GAME OVER</h1>
      <p class="result">You ${state.windOrLose.toUpperCase()}! <br>
      The word is &#x27A1; ${state.chosenWord.toUpperCase()}.</p>
      <button class="button hangman__trigger">Main Menu </button>
    `

    $hangman.innerHTML = markup;
  }

  return {
    setState
  }
})();

export default End;