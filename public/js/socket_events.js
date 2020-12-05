// Socket events 
socket.on("clearCanvas",()=>{
ctx.clearRect(0,0,canvas.width,canvas.height);
});


socket.on('blockCanvas', ()=>{
    isCanvasBlocked = true;
    document.getElementById('canvas-status').innerHTML = "Canvas blocked";
});

socket.on('unblockCanvas',()=>{
    isCanvasBlocked = false;
    document.getElementById('canvas-status').innerHTML = "Canvas unblocked";
});

socket.on("textChange",(val)=>{
    textArea.value = val;
});

socket.on('array',(d)=>{
    ctx.lineWidth = d.lineWidth;
    ctx.strokeStyle = d.lineColor;
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
    if(d.stack.length===0){return;}
    if(d.currentTool === "pencil"){
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = d.lineColor;
        ctx.fillStyle = d.fillColor;
        for(let i=0; i<d.stack.length; i++){
            if(i===0){
                ctx.beginPath();
                ctx.moveTo(d.stack[i].x,d.stack[i].y);
            }
            else {
                ctx.lineTo(d.stack[i].x,d.stack[i].y);
                ctx.stroke();
            }
            
        }
    }
    
    if(d.currentTool === "eraser"){
            ctx.beginPath();
        for(let i=0; i<d.stack.length; i++){
             ctx.fillStyle = "white";
             ctx.fillRect(d.stack[i].x,d.stack[i].y,30,30);
        }

    }
});


socket.on('update connection count',(count)=>{
    document.getElementById("total_connections").innerHTML = count;
});




