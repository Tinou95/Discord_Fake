let socket = io();
let username = "";
socket.on('connect', function() {
    socket.on('username', function(name) {
        username = name;
        document.querySelector('.user').innerHTML += `<figure>
        <img src="https://support.discord.com/hc/user_images/l12c7vKVRCd-XLIdDkLUDg.png" alt="">
        <figcaption>
            <p>${username}</p>
        </figcaption>
    </figure>`
        
    });
    
    socket.emit('user connected', username);
});
socket.on('username', function(name) {
    username = name;
    document.querySelector('.utilisateur').innerHTML += `<figure>
            <img src="https://support.discord.com/hc/user_images/l12c7vKVRCd-XLIdDkLUDg.png" alt="">
            <figcaption>
                <p>${username}</p>
            </figcaption>
        </figure>`
});
let send = function () {
    let text = document.getElementById("message-input").value;
    socket.emit('chat message', text);
};

let receive = function (data) {
    let li = document.createElement('li');
    if(data.message != ""){
        li.innerHTML = "<strong>" + data.username + "</strong>" +  ` <time> ${data.time} </time>: ` + data.message;
        document.getElementById("messages").appendChild(li);
    }
};


socket.on('chat message', receive);