const background = document.querySelector("#background"),
      trackImg = document.querySelector("#track__image"),
      songTitle = document.querySelector("#title"),
      artist = document.querySelector("#artist"),
      currentAudio = document.querySelector("#current-song"),
      playPauseBtn = document.querySelector(".play-pause"),
      prevBtn = document.querySelector(".back"),
      nextBtn = document.querySelector(".forward"),
      progressLine = document.querySelector(".line");

      let trackIndex = 1;

      window.addEventListener("load", () => {
        loadTrack(trackIndex);
      })

// load song function  
function loadTrack(index) {
  background.src = `assets/images/${allSongs[index - 1].img}.jpg`;
  trackImg.src = `assets/images/${allSongs[index - 1].img}.jpg`;
  songTitle.innerText = allSongs[index - 1].title;
  artist.innerText = allSongs[index - 1].artist,
  currentAudio.src = `assets/songs/${allSongs[index - 1].src}.m4a`;
};

// change class function 
function replaceClass(id, oldClass, newClass) {
  const element = document.getElementById(id);
  element.classList.remove(oldClass);
  element.classList.add(newClass);
};

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
  trackIndex > allSongs.length ? trackIndex = 1 : trackIndex = trackIndex;
  loadTrack(trackIndex);
  playAudio();
}

// previous audio function 
function prevAudio() {
  trackIndex--;
  loadTrack(trackIndex);
  playAudio();
}

// ===== Event listeners =====

// if play or pause button event 
playPauseBtn.addEventListener("click", () => {
  isPlay ? pauseAudio() : playAudio();
  isPlay
    ? replaceClass("playPause", "fa-play", "fa-pause")
    : replaceClass("playPause", "fa-pause", "fa-play");
});

// next audio button event 
nextBtn.addEventListener("click", () => {
  nextAudio();
  isPlay
  ? replaceClass("playPause", "fa-play", "fa-pause")
  : replaceClass("playPause", "fa-pause", "fa-play");
});

// previous audio button event 
prevBtn.addEventListener("click", () => {
  prevAudio();
  isPlay
  ? replaceClass("playPause", "fa-play", "fa-pause")
  : replaceClass("playPause", "fa-pause", "fa-play");
});

// duration line changing according to audio 
currentAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressLine.style.width = `${progressWidth}%`;

  // update audio total duration time 
  currentAudio.addEventListener("loadeddata", () => {
    let audioCurrentTime = document.querySelector(".current"),
        audioDurationTime = document.querySelector(".duration");

        let audioDuration = currentAudio.duration;
        let min = Math.floor(audioDuration / 60);
        let sec = Math.floor(audioDuration % 60);
        if (sec < 10) {
          sec = `0${sec}`;
        }
        audioDurationTime.innerText = `${min}:${sec}`;
  });
});

// update audio progress time 

