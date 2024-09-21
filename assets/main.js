var trbox = document.getElementById("tr");
var trheader = document.getElementById("trdrag");
var ncbox = document.getElementById("nc");
var ncheader = document.getElementById("ncdrag");
var hwbox = document.getElementById("hw");
var hwheader = document.getElementById("hwdrag");
var mbbox = document.getElementById("mb");
var mbheader = document.getElementById("mbdrag");
var rgbox = document.getElementById("rg");
var rgheader = document.getElementById("rgdrag");

var settings = document.getElementById("settings");

// Store references to each draggable element and its header
const draggableElements = {
    tr: { box: document.getElementById("tr"), header: document.getElementById("trdrag") },
    nc: { box: document.getElementById("nc"), header: document.getElementById("ncdrag") },
    hw: { box: document.getElementById("hw"), header: document.getElementById("hwdrag") },
    mb: { box: document.getElementById("mb"), header: document.getElementById("mbdrag") },
    rg: { box: document.getElementById("rg"), header: document.getElementById("rgdrag") }
};

// Track the highest z-index in use
let highestZIndex = 1;

// Fetch default positions from "defaults.json"
fetch("assets/defaults.json")
    .then(response => response.json())
    .then(defaultPositions => {
        // Apply drag functionality for each element
        ["tr", "nc", "hw", "mb", "rg"].forEach(prefix => addDragFunctionality(prefix, defaultPositions));
    })
    .catch(error => console.error("Error loading defaults.json:", error));

// Function to initialize dragging functionality
function addDragFunctionality(prefix, defaultPositions) {
    const element = draggableElements[prefix];
    let active = false;
    let currentX = 0, currentY = 0, initialX = 0, initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    // Check for saved positions in localStorage
    const savedPosition = localStorage.getItem(prefix);
    if (savedPosition) {
        // Use the position from localStorage
        const { x, y } = JSON.parse(savedPosition);
        currentX = x;
        currentY = y;
    } else if (defaultPositions && defaultPositions[prefix]) {
        // Use the default position from defaults.json
        const { x, y } = defaultPositions[prefix];
        currentX = x;
        currentY = y;

        // Save the default position to localStorage
        localStorage.setItem(prefix, JSON.stringify({ x: currentX, y: currentY }));
    }

    // Set initial translation
    xOffset = currentX;
    yOffset = currentY;
    setTranslate(currentX, currentY, element.box);

    element.header.addEventListener("mousedown", dragStart, false);
    window.addEventListener("mouseup", dragEnd, false);
    window.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === element.header) {
            active = true;

            // Set the box to have the highest z-index
            highestZIndex++;
            element.box.style.zIndex = highestZIndex;
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        active = false;

        // Save the current position to localStorage
        localStorage.setItem(prefix, JSON.stringify({ x: currentX, y: currentY }));
    }

    function drag(e) {
        if (active) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Calculate the new top-left position
            xOffset = currentX;
            yOffset = currentY;

            // Set the box's translation
            setTranslate(currentX, currentY, element.box);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
}


settings.addEventListener("click", function() {
    // chrome.action.setPopup({ popup: '/settings.html' });
    window.location = '/settings.html';
});