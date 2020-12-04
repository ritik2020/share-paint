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
            if(i===0){
                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = lineColor;
                ctx.fillStyle = fillColor;
                ctx.moveTo(d[i].x,d[i].y);
            }
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




