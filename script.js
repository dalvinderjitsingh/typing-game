// All of the quotes
const quotes = [
  ["Sometimes you gotta run before you can walk.", "Tony Stark"],
  [
    "Just because something works, doesn't mean it cannot be improved.",
    "Shuri"
  ],
  ["The hardest choices require the strongest wills.", "Thanos"],
  [
    "We may lose. Sometimes painfully. But we don't die. We survive.",
    "Loki Laufeyson"
  ],
  ["That's my secret, Captain. I'm always angry.", "Bruce Banner"],
  [
    "I choose to run towards my problems, and not away from them. Because that's what heroes do.",
    "Thor Odinson"
  ],
  [
    "You get hurt, hurt them back. You get killed, walk it off.",
    "Captain America"
  ],
  [
    "In times of crisis, the wise build bridges, while the foolish build barriers.",
    "T'Challa"
  ],
  ["I can't control their fear, only my own.", "Wanda Maximoff"],
  [
    "You gotta stop looking to other people to tell you who you are.",
    "Sam Wilson"
  ],
  [
    "At some point we all have to choose between what the world wants you to be and who you are.",
    "Natasha Romanoff"
  ],
  [
    "You never know. You hope for the best and make do with what you get.",
    "Nick Fury"
  ],
  [
    "Sometimes, the thing you're searching for your whole life is right there by your side all along.",
    "Peter Quill"
  ],
  ["Baskin Robbins always finds out.", "Dale"],
  [
    "Vengeance has consumed you. It's consuming them. I'm done letting it consume me.",
    "Black Panther"
  ],
  [
    "Love is a dagger. It's a weapon to be wielded far away or up close. You can see yourself in it. It's beautiful until it makes you bleed.",
    "Loki Laufeyson"
  ],
  [
    "We never lose our demons, Mordo. We only learn to live above them.",
    "The Ancient One"
  ],
  [
    "I just want peace. Turns out, resentment is corrosive and I hate it.",
    "Tony Stark"
  ],
  [
    "No man can win every battle, but no man should fall without a struggle.",
    "Peter Parker"
  ],
  ["I can do this all day.", "Steve Rogers"],
  [
    "Symbols are nothing without the women and men that give them meaning.",
    "Sam Wilson"
  ],
  [
    "Nothing goes over my head. My reflexes are too fast. I would catch it.",
    "Drax the Destroyer"
  ],
  [
    "Whosoever holds this hammer, if he be worthy, shall possess the power of Thor.",
    "Odin Borson"
  ],
  ["No amount of money ever bought a second of time.", "Tony Stark"],
  ["Compromise where you can, but where you can't, don't.", "Peggy Carter"],
  [
    "This is the fight of our lives, and we're going to win. Whatever it takes.",
    "Captain America"
  ],
  [
    "You cannot talk! One more word, and I will feed you to my children. I'm kidding. We are vegetarians.",
    "M'Baku"
  ],
  [
    "Everyone fails at who they are supposed to be, Thor. The measure of a person, of a hero, is how well they succeed at being who they are.",
    "Frigga"
  ],
  [
    "If you're nothing without this suit, then you shouldn't have it.",
    "Tony Stark"
  ],
  [
    "You up for a little tough love? You want to climb out of the hell you're in, do the work. Do it.",
    "Sam Wilson"
  ],
  [
    "A wise king never seeks out war but he must always be ready for it.",
    "Odin Borson"
  ],
  [
    "Dread it. Run from it. Destiny arrives all the same. And now, it's here. Or should I say, I am.",
    "Thanos"
  ],
  ["Part of the journey is the end.", "Tony Stark"]
];

// Array for storing the words of the current challenge
let words = [];
// Stores the index of the word the player is currently typing
let wordIndex = 0;
// Default value for startTime (will be set on start)
let startTime = Date.now();
// Game timer which gets displayed on h1 when game starts
let timer = null;

// Grab UI items
const topHeadingElement = document.getElementById("topHeading");
const instructionElement = document.getElementById("instruction");
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const congratsMessageElement = document.getElementById("congratsMessage");
const speedMessageElement = document.getElementById("speedMessage");
const timeMessageElement = document.getElementById("timeMessage");
const typedValueElement = document.getElementById("typed-value");
const startElement = document.getElementById("start");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

// Disable the input field
typedValueElement.disabled = true;
// Remove the input field
typedValueElement.style.display = "none";

// LOCAL STORAGE
const topSpeedElement = document.getElementById("topSpeed");
const noOfGamesElement = document.getElementById("noOfGames");
const recentSpeedElement = document.getElementById("recentSpeed");
const recentTimeElement = document.getElementById("recentTime");

const topSpeedKey = "topSpeed";
const noOfGamesKey = "noOfGames";
const recentSpeedKey = "recentSpeed";
const recentTimeKey = "recentTime";

function populateStorage(key, value) {
  // Add stats to local storage
  localStorage.setItem(key, value);

  // Invoke setScores()
  setStats();
}

function setStats() {
  topSpeedElement.innerHTML = `Top Speed: <span class="statsStyle">${localStorage.getItem(
    "topSpeed"
  )} Words Per Minute<span>`;
  noOfGamesElement.innerHTML = `Games Completed: <span class="statsStyle">${localStorage.getItem(
    "noOfGames"
  )}<span>`;
  recentSpeedElement.innerHTML = `Speed: <span class="statsStyle">${localStorage.getItem(
    "recentSpeed"
  )} Words Per Minute<span>`;
  recentTimeElement.innerHTML = `Time: <span class="statsStyle">${localStorage.getItem(
    "recentTime"
  )} Seconds<span>`;
}
// Set up the Stats in the modal box
setStats();

// DATE AND TIME
// Current Date
const date = new Date();
dateElement.innerHTML = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
// Set datetime attribute for date
dateElement.setAttribute(
  "datetime",
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
);
// Current Time
function currentTime() {
  const time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  m = checkTime(m);
  timeElement.innerHTML = h + ":" + m;
  // Set datetime attribute for time
  timeElement.setAttribute("datetime", h + ":" + m);
  setTimeout(currentTime, 30000);
}
// Add zero in front of minutes and seconds < 10
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// MODAL BOXES
// Get the main modals
const statsModal = document.getElementById("statsModal");
const settingsModal = document.getElementById("settingsModal");
// Get the delete modal
const deleteModal = document.getElementById("deleteModal");

// Get the buttons that opens the main modals
const statsBtn = document.getElementById("statsBtn");
const settingsBtn = document.getElementById("settingsBtn");
// Get the button that opens the delete modal
const deleteBtn = document.getElementById("deleteBtn");
// Get the button that cancels the deletion of game information
const cancelBtn = document.getElementById("cancelBtn");
// Get the button that clear's the users game information from their browser's local storage
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// Get the <span> element that closes the modals
const closeBtn = document.getElementsByClassName("close");

// When the user clicks on the button, open the modal
statsBtn.onclick = function () {
  statsModal.style.display = "block";
};
settingsBtn.onclick = function () {
  settingsModal.style.display = "block";
};
deleteBtn.onclick = function () {
  deleteModal.style.display = "block";
};

// When the user clicks on the button, clear user's local storage, clear game statistics, and close the modal
confirmDeleteBtn.onclick = function () {
  // Clear local storage
  localStorage.clear();
  // Clear game statistics on statistics modal
  setStats();
  // Close the modal
  deleteModal.style.display = "none";
  settingsModal.style.display = "none";
};

// When the user clicks on <span> (x) or the Cancel button, close the modal
closeBtn[0].onclick = function () {
  statsModal.style.display = "none";
};
closeBtn[1].onclick = function () {
  settingsModal.style.display = "none";
};
closeBtn[2].onclick = function () {
  deleteModal.style.display = "none";
};
cancelBtn.onclick = function () {
  deleteModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == statsModal) {
    statsModal.style.display = "none";
  }
  if (event.target == settingsModal) {
    settingsModal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
    settingsModal.style.display = "none";
  }
};

// START CLOSURE
startElement.addEventListener("click", function () {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex][0];
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Display the quote's author name
  authorElement.innerHTML = "- " + quotes[quoteIndex][1];
  authorElement.style.display = "block";

  // Clear instruction and any prior messages and styles
  instructionElement.innerText = "";
  instructionElement.style.margin = "0rem";
  congratsMessageElement.innerText = "";
  congratsMessageElement.style.margin = "0rem";
  speedMessageElement.innerText = "";
  speedMessageElement.style.margin = "0rem";
  timeMessageElement.innerText = "";
  // Setup the text-box
  // Enable the input field
  typedValueElement.disabled = false;
  // Insert the input field
  typedValueElement.style.display = "block";
  // Clear the text-box
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
  // change button's text
  startElement.innerText = "Restart";
  // set the event handler
  // Start the timer for elapsed time calculations
  startTime = new Date().getTime();

  // GAME TIMER DISPLAYED ON H1
  let timerSecondsCount = 0;
  topHeadingElement.innerHTML = `Time: 0${timerSecondsCount}`;
  startGameTimer();

  function startGameTimer() {
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    timerSecondsCount++;
    // Add zero in front of seconds < 10
    if (timerSecondsCount < 10) {
      timerSecondsCount = "0" + timerSecondsCount;
    }
    topHeadingElement.innerHTML = `Time: ${timerSecondsCount}`;
  }
});

// INPUT CLOSURE
typedValueElement.addEventListener("input", (e) => {
  // Get the current word
  const currentWord = words[wordIndex];
  // Get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of quote
    // Remove quote
    quoteElement.innerText = "";
    // Remove quote's author name
    authorElement.innerText = "";
    authorElement.style.display = "none";

    // GAME TIMER RESET
    // Clear timer
    clearInterval(timer);
    // Reset h1 content
    topHeadingElement.innerHTML = `Speed Typing Game`;

    // WPM CALCULATIONS
    const elapsedTime = new Date().getTime() - startTime;
    const elapsedTimeInSeconds = elapsedTime / 1000;
    const roundedElapsedTimeInSeconds = Math.round(elapsedTimeInSeconds);
    const elapsedTimeInMinutes = elapsedTimeInSeconds / 60;
    const noOfWordsTyped = words.length;
    const wpm = Math.round(noOfWordsTyped / elapsedTimeInMinutes);

    // Display Success, Stats, & Instructions
    instructionElement.innerText = `Click **start** to go again!`;
    instructionElement.style.fontSize = "1.8rem";
    instructionElement.style.margin = "2.4rem 0rem";

    congratsMessageElement.innerText = `Congratulations!`;
    congratsMessageElement.style.marginBottom = "2.4rem";

    speedMessageElement.innerHTML = `Speed: <span class="statsStyle">${wpm} Words Per Minute<span>`;
    speedMessageElement.style.marginBottom = "1.2rem";

    timeMessageElement.innerHTML = `Time: <span class="statsStyle">${roundedElapsedTimeInSeconds} Seconds<span>`;

    // Disable the input field
    typedValueElement.disabled = true;
    // Remove the input field
    typedValueElement.style.display = "none";
    // Clear the text-box
    typedValueElement.value = "";
    // Change button's text
    startElement.innerText = "Start";

    // POPULATE STORAGE with Top Speed, No of Games Completed, and recent Speed & Time
    // If Top Speed is not in local storage then add current wpm as the Top Speed
    if (!localStorage.getItem("topSpeed")) {
      populateStorage(topSpeedKey, wpm);
    }

    // If there is a new Top Speed then update the local storage
    if (wpm > localStorage.getItem("topSpeed")) {
      populateStorage(topSpeedKey, wpm);
    }

    // No of Games Completed
    // If number of games completed is not in local storage then add it with 1 as value, else add 1 to the value with every passing rounds
    if (!localStorage.getItem("noOfGames")) {
      populateStorage(noOfGamesKey, 1);
    } else {
      let totalGamesCompleted = parseInt(localStorage.getItem("noOfGames")) + 1;
      populateStorage(noOfGamesKey, totalGamesCompleted);
    }

    // Populate storage with the most recent Speed & Time
    wpm.onchange = populateStorage(recentSpeedKey, wpm);
    roundedElapsedTimeInSeconds.onchange = populateStorage(
      recentTimeKey,
      roundedElapsedTimeInSeconds
    );
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
  }
});
