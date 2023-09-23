const background = document.querySelector("#background"),
      trackImg = document.querySelector("#track__image"),
      songTitle = document.querySelector("#title"),
      artist = document.querySelector("#artist"),
      playPauseBtn = document.querySelector(".play-pause")

      ;

      let trackIndex = 3;

      window.addEventListener("load", () => {
        loadTrack(trackIndex);
      })

// load song function  
function loadTrack(index) {
  background.src = `assets/images/${allSongs[index - 1].img}.jpg`;
  trackImg.src = `assets/images/${allSongs[index - 1].img}.jpg`;
  songTitle.innerText = allSongs[index - 1].title;
  artist.innerText = allSongs[index - 1].artist;
}

// music play button 
playPauseBtn.addEventListener("click", () => {

})


