const sendButton = document.getElementById("send_button");

const socket = io.connect("https://buzzstop.herokuapp.com/");
socket.on("connect", () => console.log("connected"));
socket.on("receive-message", (message) => displayMessage(message));

sendButton.addEventListener("click", () => {
  const nameInput = document.getElementById("name_input");
  const messageInput = document.getElementById("message_input");
  const selectedSound = document.querySelector(
    'input[name="picked_sound"]:checked'
  ).value;
  let message = {
    name: nameInput.value === "" ? "Anonym" : nameInput.value,
    selectedSound: selectedSound,
    time: Date.now(),
  };

  if (messageInput === "") {
    return;
  }

  displayMessage(message);
  socket.emit("send-message", message);
  messageInput.value = "";
});

const displayMessage = (message) => {
  const messageContainer = document.getElementById("message_container");
  const div = document.createElement("div");
  div.id = "message_div";
  new Audio(`./Audio/${message.selectedSound}.mp3`).play();
  div.innerHTML = message.name;
  messageContainer.append(div);
};
