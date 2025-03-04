const audio = new Audio();
let isPlaying = false;

const playPauseBtn = document.getElementById("playPauseBtn");
playPauseBtn.addEventListener("click", togglePlayPause);

// Load tracks using JavaScript
const tracks = [
  {
    src: "assets/songs/Ariana Grande - imperfect for you (live version).mp3",
    albumArt: "./assets/img/IMG_9003.JPG",
    trackTitle: "Imperfect for You",
    bandName: "Ariana Grande",
    duration: "3:03", // Format: "minutes:seconds"
  },
];

let currentTrackIndex = 0;

function loadTrack(trackIndex) {
  const track = tracks[trackIndex];
  audio.src = track.src;
  document.getElementById("albumArt").src = track.albumArt;
  document.getElementById("trackTitle").textContent = track.trackTitle;
  document.getElementById("bandName").textContent = track.bandName;
  document.getElementById("trackTime").textContent = track.duration;
}

loadTrack(currentTrackIndex);

// Event listener for updating time and buffering indicator
audio.addEventListener("timeupdate", () => {
  const currentTime = formatTime(audio.currentTime);
  document.getElementById("currentTime").textContent = currentTime;
  document.getElementById("seekSlider").value = audio.currentTime;

  if (audio.buffered.length > 0) {
    const buffered = audio.buffered.end(0);
    const bufferPercent = (buffered / audio.duration) * 100;
    document.getElementById(
      "bufferingIndicator"
    ).style.width = `${bufferPercent}%`;
  }

  const currentPercent = (audio.currentTime / audio.duration) * 100;
  document.getElementById("seekIndicator").style.width = `${currentPercent}%`;
});

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Event listener for seek slider
const seekSlider = document.getElementById("seekSlider");
seekSlider.addEventListener("input", handleSeek);

function handleSeek() {
  audio.currentTime = parseFloat(seekSlider.value);
}

// Event listener for updating the total duration when metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  seekSlider.max = audio.duration;
  document.getElementById("trackTime").textContent = formatTime(audio.duration);
});

// Function to toggle play and pause
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

audio.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

// Like button functionality
const likeBtn = document.getElementById("likeBtn");
let isLiked = false;

likeBtn.addEventListener("click", function () {
  isLiked = !isLiked;
  likeBtn.classList.toggle("liked", isLiked);
  likeBtn.innerHTML = isLiked
    ? '<i class="fas fa-heart"></i>'
    : '<i class="far fa-heart"></i>';
});
