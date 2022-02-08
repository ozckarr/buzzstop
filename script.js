window.onload = function () {
  randomizeColor();
};

const sendButton = document.getElementById("send_button");
const playerColor = document.getElementById("player_color");

const socket = io.connect("https://buzzstop.herokuapp.com/");
socket.on("connect", () => console.log("connected"));
socket.on("receive-message", (message) => displayMessage(message));

sendButton.addEventListener("click", () => {
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
});

const displayMessage = (message) => {
  const messageContainer = document.getElementById("message_container");
  const div = document.createElement("div");
  div.setAttribute("style", `background-color:${message.playerColor};`);
  div.setAttribute("class", "message_div");

  new Audio(`./Audio/${message.selectedSound}.mp3`).play();
  div.innerHTML = message.name;
  messageContainer.append(div);
};

playerColor.addEventListener("change", () => {
  const newColor = playerColor.value;
  document.getElementById("send_button").style.backgroundColor = newColor;
});

const randomizeColor = () => {
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  playerColor.value = randomColor;
  document.getElementById("send_button").style.backgroundColor = randomColor;
};