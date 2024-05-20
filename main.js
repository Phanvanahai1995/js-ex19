"use strict";

const msgEl = document.getElementById("msg");
const spanEl = document.querySelector("span");
const btnEL = document.querySelector(".btn");
const searchResult = document.querySelector(".search-result");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();

recognition.lang = "vi-VN";

let isFlag = false;

// Handle search speak
function onSpeak(transcript) {
  switch (transcript) {
    case "google":
      isFlag = true;
      window.open("https://google.com");

      break;

    case "youtube":
      isFlag = true;
      window.open("https://youtube.com");

      break;

    case "facebook":
      isFlag = true;
      window.open("https://facebook.com");

      break;

    case "google drive":
      isFlag = true;
      window.open("https://drive.google.com");

      break;

    case "google maps":
    case "bản đồ":
    case "maps":
      isFlag = true;
      window.open("https://maps.google.com");

      break;

    default:
      if (
        transcript.includes("chỉ đường") ||
        transcript.includes("đường tới") ||
        transcript.includes("tới")
      ) {
        const url = `https://www.google.com/maps/search/${transcript
          .replace("chỉ đường", "")
          .replace("tới", "")
          .replace("đường", "")
          .trim()}`;
        isFlag = true;
        window.open(url.trim());
      } else if (
        transcript.includes("bài hát") ||
        transcript.includes("mở bài hát") ||
        transcript.includes("nghe bài hát")
      ) {
        const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${transcript
          .replace("bài hát", "")
          .replace("mở", "")
          .replace("nghe", "")
          .trim()}`;
        isFlag = true;
        window.open(url.trim());
      } else if (
        transcript.includes("video") ||
        transcript.includes("mở video") ||
        transcript.includes("xem video")
      ) {
        const url = `https://www.youtube.com/results?search_query=${transcript
          .replace("video", "")
          .replace("mở", "")
          .replace("xem", "")
          .trim()}`;
        isFlag = true;
        window.open(url.trim());
      }
  }
}

// Start speak event

btnEL.addEventListener("click", () => {
  recognition.start();

  recognition.onspeechend = function () {
    recognition.stop();
  };

  spanEl.innerText = `Say what you want to search for`;
  spanEl.className = "start";

  btnEL.classList.add("active");

  searchResult.innerText = ``;
  searchResult.classList.remove("active");
});

// Speak result event

recognition.addEventListener("result", function (e) {
  const transcript = e.results[0][0].transcript.toLowerCase();
  spanEl.innerText = `Done talking! Hope the results are as sought.`;
  spanEl.className = "end";

  if (!isFlag) {
    searchResult.innerText = `Processing: ${transcript}`;
    searchResult.classList.add("active");
  }

  if (transcript.trim()) {
    setTimeout(() => {
      onSpeak(transcript);

      !isFlag
        ? (searchResult.innerText = `
    No results were found!`)
        : (searchResult.innerText = `Finished!!!`);

      btnEL.classList.remove("active");

      isFlag = false;
    }, 1000);
  }
});
