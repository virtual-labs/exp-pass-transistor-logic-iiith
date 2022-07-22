'use strict';
export const connectionMap = new Map();
import { jsplumbInstance, editConnectionMap } from './components.js';
import { compPmos, compNmos, compVdd,compGround,compTransistor,compClock,compClockbar,resetCounts,comp2Input0,comp2Input1,comp2Output } from './integrate.js';
const container = document.getElementById("diagram");
container.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

export let componentsList = [];
export const currentTab = { MUX: 0, PT: 1 };
export let selectedTab = currentTab.MUX;
const tabs = document.querySelectorAll('.v-tabs li');
const EMPTY="";

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'));
        tab.classList.add('is-active');
        let parent = tab.parentNode;
        selectedTab = Array.prototype.indexOf.call(parent.children, tab);
        refreshWorkingArea();
    });
});
window.compPmos = compPmos;
window.compNmos=compNmos;
window.compVdd=compVdd;
window.compGround=compGround;
window.compTransistor = compTransistor;
window.compClock = compClock;
window.compClockbar = compClockbar;

window.refreshWorkingArea = refreshWorkingArea;

function emptyList() {
    for(const component of componentsList) {
        let elem = document.getElementById(component.id);
        elem.parentNode.removeChild(elem);
    }
    componentsList = [];
}

export function refreshObservations() {
    // refresh the errors
    document.getElementById("error-container").style.display="none";   
    document.getElementById("output-text").innerHTML = EMPTY;
    document.getElementById("graph-image").style.display = "none";
}

export function refreshWorkingArea() {
    // to reset the working area
    jsplumbInstance.deleteEveryEndpoint();
    editConnectionMap();

    // to remove all the svgs called in the working area
    emptyList();
    resetCounts();
    comp2Input0();
    comp2Input1();
    comp2Output();
    refreshObservations();
}
refreshWorkingArea();