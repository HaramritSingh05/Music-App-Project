console.log("Welcome to Echoverse");

// Initialize the Variables
let songIndex = 0;
let currentPlayTime = 0;

let audioElement = new Audio("songs/1.mp3");
// Creating a new audio object/element and putting 1.mp3 in it.
// audioElement will get all the functionalities of the Audio class.

let masterPlay = document.getElementById("masterPlay");
// Masterplay is the id of the MIDDLE ICON in the bottom bar.

let myProgressBar = document.getElementById("myProgressBar");
// This is the id of the range in the bottom bar

let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
// Id of the name that is displayed in the bottom bar

let songItems = Array.from(document.getElementsByClassName("songItem"));

// Array containing all the songs with their name, image and path
let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
  },
];

// We can do this work in html file also which will be easier so next time do it in html file
// We are assigning image and song names to all the divs by getting the info from the songs array
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  // We add an event listener to masterplay which is click that is the actions that occur whenever we click on master play, we define them

  // If the element is paused or not started yet then by clicking on it, the music starts and we remove the resume wala icon and add pause wala icon
  if (audioElement.paused || audioElement.currentTime <= 0) {
    PlayASong(songIndex, currentPlayTime);
    // gif becomes visible
  } else {
    PauseASong(songIndex);
  }
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar as the song progresses
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // Percentage is from 0to100 and range defined by us is also btw 1to100 that is why we are able to use percentage to upadate the seekbar
  myProgressBar.value = progress;
  currentPlayTime = audioElement.currentTime; //   CHECK THIS
  //
});

myProgressBar.addEventListener("change", () => {
  // This line is used so that we can start the song from the point at which we have clicked but the seekbar updation depends upon the timeupdate function
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// songItem play is the class for play wala icon
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // for debug: here e is an event
      console.log(e);

      // getting the index of current playing song
      currentPlaying = songIndex; // the song which is currently playing
      toPlay = parseInt(e.target.id); // the song to be played

      // if currentPlaying is the element on we clicked and it is in paused state then play it
      if (currentPlaying == toPlay && audioElement.paused) {
        PlayASong(toPlay, currentPlayTime);
        return;
      }
      // if the song on which we clicked is already playing then by clicking again we paused it
      if (currentPlaying == toPlay) {
        PauseASong(currentPlaying);
        return;
      }

      // We pause the song which was currently playing on the divs
      PauseASong(currentPlaying);

      // and play the song which is clicked
      PlayASong(toPlay, 0);
    });
  }
);

// Here we are handling clicking on the next button below progress bar
document.getElementById("next").addEventListener("click", () => {
  // changing the song index to next
  // +1 becz the indexing starts from 0 and we have given song names from 1.
  toPlay = (songIndex + 1) % 10;

  PauseASong(songIndex);

  PlayASong(toPlay, 0);
});

// Defining what action will happen if we press the previous button
document.getElementById("previous").addEventListener("click", () => {
  //pausing the current playing song
  toPlay = songIndex - 1;
  if (toPlay < 0) {
    toPlay = 0;
  }

  PauseASong(songIndex);

  PlayASong(toPlay, 0);
});

// This fucntion is playing another song
// currentPlaying => song that is currently playing
// toPlay => song that we need to play
function PlayASong(toPlay, playFrom) {
  //getting the toPlay song
  target = document.getElementById("" + toPlay);

  //changing the icons
  target.classList.remove("fa-play-circle");
  target.classList.add("fa-pause-circle");
  document.getElementById("masterSongName").innerText = songs[toPlay].songName;
  document.getElementById("gif").style.opacity = 1;

  // updating global songIndex to toPlay
  songIndex = toPlay;

  //updating the audio src to toPlay song
  // This line is used to change the source of the song which will be played
  // i.e. when we write play() then the song will be taken from the src and then played
  audioElement.src = `songs/${toPlay + 1}.mp3`;

  //play from is required because when src is reset for audio element then the currentTime is set to 0
  audioElement.currentTime = playFrom;
  audioElement.play();

  //updating the masterPlay to start playing
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
}

// This function is pausing the song with given id
function PauseASong(id) {
  console.log("pausing a song");
  //getting the song which needs to be paused
  target = document.getElementById("" + id);
  document.getElementById("gif").style.opacity = 0;

  //changing the icon to play in the songList
  target.classList.remove("fa-pause-circle");
  target.classList.add("fa-play-circle");
  audioElement.pause();

  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
}
