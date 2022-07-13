import { setCoordinates, fillInputDots, objectDisappear, objectAppear, fillColor, setColor, unsetColor } from "./animation-utility.js";
'use strict';

window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed = setSpeed;
window.setClock = setClock;
window.setInput = setInput;
// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");

// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;

// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY = "";
const status = document.getElementById("play-or-pause");
const observ = document.getElementById("observations");
const speed = document.getElementById("speed");


const objects = [
    document.getElementById("input"),
    document.getElementById("clock"),
    document.getElementById("clock-bar"),
    document.getElementById("output"),
];
const textInput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
];
const textOutput = [document.createElementNS(svgns, "text")];
const inputDots = [
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];


let decide = false;
let circuitStarted = false;

function demoWidth() {
    if (width < 1024) {
        circuitBoard.style.height = "600px";
    } else {
        circuitBoard.style.height = `${windowHeight - circuitBoardTop - 20}px`;
    }
    sidePanels[0].style.height = circuitBoard.style.height;
}

//initialise input text
function textIOInit() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}
function outputCoordinates() {
    setCoordinates(896, 376, textOutput[0]);
    svg.append(textOutput[0]);
}

function inputDotsDisappear() {
    for (const inputDot of inputDots) {
        objectDisappear(inputDot);
    }
}
function inputDotsAppear() {
    for (const inputDot of inputDots) {
        objectAppear(inputDot);
    }
}


// function to disappear the output text
function outputDisappear() {
    for (const text of textOutput) {
        objectDisappear(text);
    }
}

function inputTextDisappear() {
    for (const text of textInput) {
        objectDisappear(text);
    }
}

// function to appear the input text
function clearObservation() {
    observ.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotsDisappear();
    outputDisappear();
    inputTextDisappear();
    for (const object of objects) {
        fillColor(object, "#008000");
    }
}


function setInput() {
    if (textInput[0].textContent !== "0" && timeline.progress() === 0) {
        changeTo0(26, 376, 0, 0);
    }
    else if (textInput[0].textContent !== "1" && timeline.progress() === 0) {
        changeTo1(26, 376, 0, 0);
    }
    setter(textInput[0].textContent, inputDots[0]);
    setter(textInput[0].textContent, inputDots[1]);
}

function setClock(){
    if(textInput[1].textContent !== "0" && timeline.progress() === 0){
        changeTo0(146, 176, 1, 1);
        changeTo1(146, 576, 2, 2);
    }
    else if(textInput[1].textContent !== "1" && timeline.progress() === 0){
        changeTo1(146, 176, 1, 1);
        changeTo0(146, 576, 2, 2);
    }
    setter(textInput[1].textContent, inputDots[2]);
    setter(textInput[2].textContent, inputDots[3]);
}

function changeTo1(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);

    fillColor(objects[object], "#29e");
    objectAppear(textInput[textObject]);
    clearObservation();
}

function changeTo0(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);

    fillColor(objects[object], "#eeeb22");
    objectAppear(textInput[textObject]);
    clearObservation();
}

function reboot() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}
function display() {
    observ.innerHTML = "Simulation has finished. Press Reset to start again";
}
function setter(value, component) {
    //toggles the text content a of input/output component b
    if (value === "1") {
        unsetColor(component);
    }
    else if (value === "0") {
        setColor(component);
    }
}

function setSpeed(speed) {
    if (circuitStarted) {
        timeline.timeScale(parseInt(speed));
        observ.innerHTML = `${speed}x speed`;
    }
}

function restartCircuit() {
    circuitStarted = false;
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    reboot();
    clearObservation();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;

}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else if (decide) {
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.time() !== 0 && timeline.progress() !== 1) {
        timeline.pause();
        observ.innerHTML = "Simulation has been stopped.";
        decide = false;
        status.innerHTML = "Start";
        speed.selectedIndex = 0;
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    if (circuitStarted) {
        timeline.play();
        timeline.timeScale(1);
        observ.innerHTML = "Simulation has started";
        decide = true;
        status.innerHTML = "Pause";
        speed.selectedIndex = 0;
    }
    else {
        if (textInput[0].textContent !== "2" && textInput[1].textContent !== "2" && textInput[2].textContent !== "2") {
            circuitStarted = true;
            timeline.play();
            timeline.timeScale(1);
            observ.innerHTML = "Simulation has started.";
            decide = true;
            status.innerHTML = "Pause";
            speed.selectedIndex = 0;
        }
        else if(textInput[0].textContent === "2") {
            observ.innerHTML = "Please set the value of input to either 0 or 1";
        }
        else if(textInput[1].textContent === "2") {
            observ.innerHTML = "Please set the value of clock to either 0 or 1";
        }
        else if (timeline.progress() === 1) {
            observ.innerHTML = "Please Restart the simulation";
        }
    }
}

function InitInputDots() {
    //sets the coordinates of the input dots
    for (const inputDot of inputDots) {
        fillInputDots(inputDot, 200, 200, 15, "#FF0000");
        svg.append(inputDot);
    }
}

function simulator1() {
    timeline.to(inputDots[0], {
        motionPath: {
            path: "#path1",
            align: "#path1",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[1], {
        motionPath: {
            path: "#path2",
            align: "#path2",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[2], {
        motionPath: {
            path: "#path3",
            align: "#path3",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[3], {
        motionPath: {
            path: "#path4",
            align: "#path4",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
}

function simulator2(){
    if(textInput[1].textContent === "0"){
        setter(textInput[0].textContent, inputDots[0]);
        setter(textInput[0].textContent, inputDots[1]);
        objectAppear(inputDots[0]);
        objectAppear(inputDots[1]);
        timeline.to(inputDots[0], {
            motionPath: {
                path: "#path5",
                align: "#path5",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },

            duration: 6,
            delay: 7,
            repeat: 0,
            repeatDelay: 3,
            yoyo: true,
            ease: "none",
            paused: false,

        }, 0);
        timeline.to(inputDots[1], {
            motionPath: {
                path: "#path6",
                align: "#path6",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },

            duration: 6,
            delay: 7,
            repeat: 0,
            repeatDelay: 3,
            yoyo: true,
            ease: "none",
            paused: false,

        }, 0);
        textOutput[0].textContent = textInput[0].textContent;
    }
    else{
        observ.innerHTML = "No output is generated";
    }
}

function outputHandler() {
    if(textInput[1].textContent === "0"){
        objectAppear(textOutput[0]);
        setter(textOutput[0].textContent, objects[3]);
    }
}


//execution starts here
let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
textIOInit();
outputCoordinates();
inputDotsDisappear();
InitInputDots();
outputDisappear();

timeline.add(inputDotsAppear, 0);
timeline.add(simulator1, 0);
timeline.add(inputDotsDisappear, 7);
timeline.add(simulator2, 7);
timeline.add(inputDotsDisappear, 13);
timeline.add(outputHandler, 13);
timeline.add(display, 15);
timeline.eventCallback("onComplete", display);
timeline.pause();
inputDotsDisappear();