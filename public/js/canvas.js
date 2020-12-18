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


function changeColor(color){
    lineColor = color;
    fillColor = color;
}

function changeTool(tool){
    currentTool = tool;
}

function clearCanvas(){
    if(confirm("Do you really want to clear the canvas??")){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        socket.emit('clearCanvas');
    }   
}

//utility variables
var stack = [];

// Canvas events
canvas.addEventListener('mousedown',(e)=>{
    var canvasRect = canvas.getBoundingClientRect();
    var cx = canvasRect.x;
    var cy = canvasRect.y;
    var x = e.clientX - cx;
    var y = e.clientY - cy;
    isDrawing = true;
    

    if(currentTool === "pencil"){
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(x,y);
        stack.push({x,y});
    }
    if(currentTool === "eraser"){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(x,y,10,10);
    }
    if(currentTool==="array"){
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
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
        socket.emit('array',{x,y,arrSize,w,h,lineWidth,lineColor});
    }

    if(currentTool==="text"){
        ctx.beginPath();
        ctx.font = "20px serif";
        let text = prompt("Enter text");
        ctx.fillText(text,x,y);
        socket.emit('text',{text,x,y});
    }

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
    socket.emit('mouseup',{stack,lineColor,fillColor,currentTool});
    stack = [];
});