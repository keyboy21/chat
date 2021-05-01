const socket = io();
const chatFrom = document.getElementById("chat-form");
const Message = document.getElementById("msg");
const chatMessage = document.querySelector(".chat-messages");

const username = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit('join',username)

socket.on("Welcometochat", (message) => {
  outputMessage(message);
});

chatFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  // get message
  message = Message.value;
  socket.emit("message", message);
  Message.value = "";
  Message.focus();
});

socket.on("CHatmessage", (message) => {
  outputMessage(message);
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

const outputMessage = (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${data.username} <span>${data.time}</span></p>
  <p class="text">${data.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
};