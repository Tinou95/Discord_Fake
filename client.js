let socket = io();
let send = function () {
    let text = document.getElementById("message-input").value;
    socket.emit('chat message', text)
};
let receive = function (msg) {
    let li = document.createElement('li');
    li.innerText = msg;
    document.getElementById("messages").appendChild(li)

}
socket.on('chat message', receive);