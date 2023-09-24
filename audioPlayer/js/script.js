const background = document.querySelector("#background"),
  trackImg = document.querySelector("#track__image"),
  songTitle = document.querySelector("#title"),
  artist = document.querySelector("#artist"),
  currentAudio = document.querySelector("#current-song"),
  playPauseBtn = document.querySelector(".play-pause"),
  prevBtn = document.querySelector(".back"),
  nextBtn = document.querySelector(".forward"),
  durationLine = document.querySelector(".duration__line"),
  progressLine = document.querySelector(".line"),
  repeatBtn = document.querySelector(".repeat"),
  shuffleBtn = document.querySelector(".shuffle");

let trackIndex = 1;

window.addEventListener("load", () => {
  loadTrack(trackIndex);
});

// load song function
function loadTrack(index) {
  background.src = `assets/images/${allSongs[index - 1].img}.jpg`;
  trackImg.src = `assets/images/${allSongs[index - 1].img}.jpg`;
  songTitle.innerText = allSongs[index - 1].title;
  (artist.innerText = allSongs[index - 1].artist),
    (currentAudio.src = `assets/songs/${allSongs[index - 1].src}.m4a`);
}

// change class function
function replaceClass(id, oldClass, newClass) {
  const element = document.getElementById(id);
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

let isPlay = false;

// play song function
function playAudio() {
  isPlay = true;
  currentAudio.play();
}

// pause song function
function pauseAudio() {
  isPlay = false;
  currentAudio.pause();
}

// next audio function
function nextAudio() {
  trackIndex++;
  // after the last audio go back to the first one
  trackIndex > allSongs.length ? (trackIndex = 1) : (trackIndex = trackIndex);
  loadTrack(trackIndex);
  playAudio();
}

// previous audio function
function prevAudio() {
  trackIndex--;
  loadTrack(trackIndex);
  playAudio();
}

// change play-pause button function
function changePlayBtn() {
  isPlay ? replaceClass("playPause", "fa-play", "fa-pause") : replaceClass("playPause", "fa-pause", "fa-play");
}

// ============ Event listeners ============

// if play or pause button event
playPauseBtn.addEventListener("click", () => {
  isPlay ? pauseAudio() : playAudio();
  changePlayBtn();
});

// next audio button event
nextBtn.addEventListener("click", () => {
  nextAudio();
  changePlayBtn();
});

// previous audio button event
prevBtn.addEventListener("click", () => {
  prevAudio();
  changePlayBtn();
});

// duration line changing according to audio
currentAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressLine.style.width = `${progressWidth}%`;

  let audioCurrentTime = document.querySelector(".current");
  let audioDurationTime = document.querySelector(".duration");

  // update audio-total-duration time
  currentAudio.addEventListener("loadeddata", () => {
    let audioDuration = currentAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    audioDurationTime.innerText = `${totalMin}:${totalSec}`;
  });
  // update audio-progress-time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  audioCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// change progress-time by clicking on line
durationLine.addEventListener("click", (e) => {
  let progressLineWidth = durationLine.clientWidth; //width of duration line
  let clickedOffSetX = e.offsetX; //offset x value
  let trackDuration = currentAudio.duration;

  currentAudio.currentTime =
    (clickedOffSetX / progressLineWidth) * trackDuration;
  playAudio();
  changePlayBtn();
});

// change repeat-icon color
repeatBtn.addEventListener("click", () => {
  const repeatId = document.getElementById("repeat-id");
  let repeatColor = repeatId.getAttribute("style");
  const shuffleId = document.getElementById("shuffle-id");
  let shuffleColor = shuffleId.getAttribute("style");

  switch (repeatColor) {
    case "color: #eeeeee;":
      repeatId.setAttribute("style", "color: #ff4734;");
      shuffleId.setAttribute("style", "color: #eeeeee;");
      break;
    case "color: #ff4734;":
      repeatId.setAttribute("style", "color: #eeeeee;");
      break;
  }
});

// function repeat-audio-or-not clicking on repeat button
function repeatOrNot() {
  const repeatId = document.getElementById("repeat-id");
  let repeatColor = repeatId.getAttribute("style");

  switch (repeatColor) {
    case "color: #eeeeee;":
      nextAudio();
      break;
    case "color: #ff4734;":
      currentAudio.currentTime = 0;
      loadTrack(trackIndex);
      playAudio();
      break;
  }
}

// what's happening with the song according to the icon (repeat or not)

// change shuffle icon color
shuffleBtn.addEventListener("click", () => {
  const shuffleId = document.getElementById("shuffle-id");
  let shuffleColor = shuffleId.getAttribute("style");
  const repeatId = document.getElementById("repeat-id");
  let repeatColor = repeatId.getAttribute("style");

  switch (shuffleColor) {
    case "color: #eeeeee;":
      shuffleId.setAttribute("style", "color: #ff4734;");
      repeatId.setAttribute("style", "color: #eeeeee;")
      break;
    case "color: #ff4734;":
      shuffleId.setAttribute("style", "color: #eeeeee;");
      break;
  }
});

// making a shuffle-button function
function shuffleOrNot() {
    const shuffleId = document.getElementById("shuffle-id");
    let shuffleColor = shuffleId.getAttribute("style");

    switch (shuffleColor) {
      case "color: #eeeeee;":
          repeatOrNot();
        break;
      case "color: #ff4734;":
        let randomIndex = Math.floor((Math.random() * allSongs.length) + 1);
        do {
          randomIndex = Math.floor((Math.random() * allSongs.length) + 1);
        } while (trackIndex == randomIndex);
        trackIndex = randomIndex;
        loadTrack(trackIndex);
        playAudio();
        break;
    }
}

currentAudio.addEventListener("ended", () => {
  shuffleOrNot();
});
