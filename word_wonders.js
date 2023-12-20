const letters = document.querySelectorAll(".scoreboard-letter");
//console.log(letters);
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGHT = 5;

async function init() {
  let currentGuess = "";
  let currentRow = 0;


  const res = await fetch("https://words.dev-apis.com/word-of-the-day")
  //res - common short form for responce, - response from API

  const resObj  = await res.json();
  const word = resObj.word.toUpperCase();
  //console.log(word);

  setLoading(false);

  function addLetter(letter) {
    //add letter to the end
    if (currentGuess.length < ANSWER_LENGHT) {
      currentGuess += letter;
    } else {
      //else replace the last letter
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[ANSWER_LENGHT * currentRow + currentGuess.length - 1].innerText =letter;
  }

  async function commit() {
    if (currentGuess.length != ANSWER_LENGHT) {
      //do nothing
      return;
    }

    //TODO validate the word

    //TODO all the marking as 'correct' 'close' or 'wrong'
    

    //TODO did they win or lose?

    currentRow++;
    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGHT * currentRow + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;
    //console.log(action);
    if (action === "Enter") {
      //todo
      commit();
    } else if (action === "Backspace") {
      //todo
      backspace();
    } else if (isLetter(action)) {
      //todo
      addLetter(action.toUpperCase());
    } else {
      //do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle('show',isLoading);
}
init();
