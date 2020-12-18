var socket = io();

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
}








