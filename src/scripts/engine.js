const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");
let sustain = false; 

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`;
    audio.play();

    if (sustain) {
        audio.loop = true;   
    } else {
        audio.loop = false;
    }

    const clikedKey = document.querySelector(`[data-key="${key}"]`);
    clikedKey.classList.add("active");
    setTimeout(() => {
        clikedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
    if (mapedKeys.includes(e.key)) {
        playTune(e.key);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") sustain = true;
});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") sustain = false;
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
};
volumeSlider.addEventListener("input", handleVolume);

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};
keysCheck.addEventListener("click", showHideKeys);
