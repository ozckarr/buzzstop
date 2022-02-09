const socket = io.connect("https://buzzstop.herokuapp.com/");

const sendButton = document.getElementById("send_button");
const clearButton = document.getElementById("clear_button");
const playerColor = document.getElementById("player_color");

window.addEventListener("load", () => {
  init();
});

const init = () => {
  randomizeColor();
  // Socket setup
  socket.on("connect", () => console.log("connected"));
  socket.on("receive-message", (message) => handleMessage(message));

  sendButton.addEventListener("click", sendMsg);
  clearButton.addEventListener("click", clearBtn);
};

const randomizeColor = () => {
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  playerColor.value = randomColor;
  document.getElementById("send_button").style.backgroundColor = randomColor;
};

// Send message
const sendMsg = () => {
  const nameInput = document.getElementById("name_input");
  const selectedSound = document.querySelector(
    'input[name="picked_sound"]:checked'
  ).value;
  let message = {
    name: nameInput.value === "" ? "Anonym" : nameInput.value,
    selectedSound: selectedSound,
    time: Date.now(),
    playerColor: playerColor.value,
  };

  displayMessage(message);
  socket.emit("send-message", message);
};

// Clear
const clearBtn = () => {
  //Socket.io used wrong, but if it works it works...
  let message = {
    name: "clear",
    selectedSound: "clear",
    time: Date.now(),
    playerColor: "#fff",
  };
  socket.emit("send-message", message);

  clearMessages();
};

const clearMessages = () => {
  const messageContainer = document.getElementById("message_container");
  messageContainer.innerHTML = "";
};

const handleMessage = (message) => {
  if (message.name === "clear") {
    clearMessages();
  } else {
    displayMessage(message);
  }
};

// Display buzzes
const displayMessage = (message) => {
  const messageContainer = document.getElementById("message_container");
  const div = document.createElement("div");
  div.setAttribute("style", `background-color:${message.playerColor};`);
  div.setAttribute("class", "message_div");

  new Audio(`./Audio/${message.selectedSound}.mp3`).play();
  div.innerHTML = message.name;
  messageContainer.append(div);
};

// Color
playerColor.addEventListener("change", () => {
  const newColor = playerColor.value;
  document.getElementById("send_button").style.backgroundColor = newColor;
});
