var socket = io();


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = window.innerHeight;



//formatting variables
var lineWidth = "6";
var lineColor = "red";
var fillColor = "red";

//functionalities variables
var isDrawing = false;
var currentTool = "pencil";


//utility variables
var stack = [];

//textarea
var textArea = document.getElementById("textArea");


function changeColor(color){
    lineColor = color;
    fillColor = color;
    socket.emit('changeColor',color);
}

function changeTool(tool){
    currentTool = tool;
    socket.emit('changeTool',tool);
}

function clearCanvas(){
    if(confirm("Do you really want to clear the canvas??")){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        socket.emit('clearCanvas');
    }   
}

function addActiveClassToAColor(ele){
    var allElements = document.getElementsByClassName("color");
    var currentActiveElement;
    var targetElement;
    for(let i=0 ; i<allElements.length; i++){
        if(allElements[i].classList.contains("color-active")){
            currentActiveElement = i;
            allElements[i].classList.remove("color-active");
        }
        if(allElements[i]===ele){
            targetElement = i;
            allElements[i].classList.add("color-active");
        }
    }
    socket.emit('makeColorActive',{currentActiveElement, targetElement});
}

function addActiveClassToATool(ele){
    var allTools = document.getElementsByClassName("tool");
    var currentTool;
    var targetTool;
    for(let i=0; i<allTools.length; i++){
        if(allTools[i].classList.contains("tool-active")){
            currentTool = i;
            allTools[i].classList.remove("tool-active");
        }
        if(allTools[i]===ele){
            targetTool = i;
            allTools[i].classList.add("tool-active");
        }
    }
    socket.emit('makeToolActive',{currentTool,targetTool});
}


// Canvas events
canvas.addEventListener('mousedown',(e)=>{
    var canvasRect = canvas.getBoundingClientRect();
    var cx = canvasRect.x;
    var cy = canvasRect.y;
    var x = e.clientX - cx;
    var y = e.clientY - cy;
    isDrawing = true;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;

    if(currentTool === "pencil"){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    if(currentTool === "eraser"){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x,y,10,10);
    }
    if(currentTool==="array"){
        ctx.beginPath();
        let tempx = x;
        let arrSize = Number(prompt("enter array size"));
        let w = Number(prompt("enter width"));
        let h = Number(prompt("enter height"));
        for(let i=1; i<=arrSize; i++){
            if(i===1){
                ctx.strokeRect(tempx,y,w,h);
                tempx+=w;
            }
            else {
                ctx.strokeRect(tempx,y,w,h);
                tempx+=w;
            }  
        }
        socket.emit('array',{x,y,arrSize,w,h});
    }

    if(currentTool==="text"){
        ctx.beginPath();
        ctx.font = "20px serif";
        let text = prompt("Enter text");
        ctx.fillText(text,x,y);
        socket.emit('text',{text,x,y});
    }

    socket.emit('mousedown',{x,y});
});


canvas.addEventListener('mousemove',(e)=>{
    var canvasRect = canvas.getBoundingClientRect();
    var cx = canvasRect.x;
    var cy = canvasRect.y;
    var x = e.clientX-cx;
    var y = e.clientY-cy;
    if(isDrawing){
        if(currentTool === "pencil"){
                ctx.lineTo(x,y);
                ctx.stroke();
                stack.push({x,y}); //pushing the moving coordinates into stack
        }
        
        if(currentTool === "eraser"){
                 ctx.fillStyle = "white";
                 ctx.fillRect(x,y,30,30);
                 stack.push({x,y}); //pushing the moing coordinates into stack
        }    
    }
});


canvas.addEventListener('mouseup',(e)=>{
    isDrawing = false;
    socket.emit('mouseup',stack);
    stack = [];
});


//textarea events
textArea.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
        socket.emit("textChange",textArea.value);
    }
});


// Socket events 
socket.on("changeTool",(tool)=>{
    currentTool = tool;
    console.log(currentTool);
});

socket.on("clearCanvas",()=>{
ctx.clearRect(0,0,canvas.width,canvas.height);
});

socket.on("changeColor",(color)=>{
    lineColor = color;
    fillColor = color;
});

socket.on('makeColorActive',(d)=>{
    var allElements = document.getElementsByClassName("color");
    allElements[d.currentActiveElement].classList.remove("color-active");
    allElements[d.targetElement].classList.add("color-active");
});

socket.on('makeToolActive',(d)=>{
    console.log(d);
    var allTools = document.getElementsByClassName("tool");
    allTools[d.currentTool].classList.remove("tool-active");
    allTools[d.targetTool].classList.add("tool-active");
});

socket.on("textChange",(val)=>{
    textArea.value = val;
});

socket.on('mousedown',(cords)=>{
    isDrawing = true;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;
    console.log(cords);
    if(currentTool === "pencil"){
        ctx.beginPath();
        ctx.moveTo(cords.x,cords.y);
    }
    if(currentTool === "eraser"){
        eraser.style.top = `${cords.y}px`;
        eraser.style.left = `${cords.x}px`;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(cords.x,cords.y,10,10);
    }
});

socket.on('array',(d)=>{
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    for(let i=1; i<=d.arrSize; i++){
        if(i===1){
            ctx.strokeRect(d.x,d.y,d.w,d.h);
            d.x+=d.w;
        }
        else {
            ctx.strokeRect(d.x,d.y,d.w,d.h);
            d.x+=d.w;
        }
    }
});

socket.on('text',(d)=>{
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.font = "20px serif";
    ctx.fillText(d.text,d.x,d.y);  
});

socket.on('mouseup',(d)=>{
    console.log(d);
    if(d.length===0){return;}
    if(currentTool === "pencil"){
        for(let i=0; i<d.length; i++){
            ctx.lineTo(d[i].x,d[i].y);
            ctx.stroke();
        }
        isDrawing = false;
        stack = [];
    }
    
    if(currentTool === "eraser"){
        for(let i=0; i<d.length; i++){
             ctx.fillStyle = "white";
             ctx.fillRect(d[i].x,d[i].y,30,30);
        }
        isDrawing = false;
        stack = [];
    }
});


socket.on('update connection count',(count)=>{
    document.getElementById("total_connections").innerHTML = count;
});




