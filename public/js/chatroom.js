var chats= document.getElementById("chats");
var messageToSent = document.getElementById("messageToSent");
var isChatRoomOpen = false;


messageToSent.addEventListener("keyup",(e)=>{
    console.log("event");
    if(e.code === "Enter"){
        console.log("enter");
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let fullDate = `${day}-${month}-${year}`;
        let fullTime = `${hours}:${minutes}`;

        let sentBy = document.getElementById("username").innerText;

        let msgData = {
            msg: messageToSent.value, 
            sentBy: sentBy,
            date: fullDate,
            time: fullTime
        };

        messageToSent.value = "";

        chats.innerHTML += 
        `<div class="message">
            <div class="user-name text-primary">${msgData.sentBy}</div>
            <div class="msg">${msgData.msg}</div>
            <div class="d-flex justify-content-between mt-1">
                <div class="date text-secondary">${msgData.date}</div>
                <div class="time text-secondary">${msgData.time}</div>
            </div>
        </div>`;
        //emit to others
        socket.emit('message', msgData);
    }
});

function toggleChatroom(){
    if(!isChatRoomOpen){
        chatroom.style.transform = "translateX(0)";
        isChatRoomOpen = true;
    }
    else {
        chatroom.style.transform = "translateX(-100%)";
        isChatRoomOpen = false;
    }
}