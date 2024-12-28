console.log("loaded: assets/js/calc-date");

// Safely access after DOM is ready
document.addEventListener('DOMContentLoaded', () => {

});


function calcCurrentDate(containerID) {
    console.log("inside calcCurrentDate");
    document.getElementById(containerID).textContent = `Dagsdato: ${getAnyDate(Date.now())}`;
}


// Define a function to expose the data
function getAnyDate(timestamp) {
const date = new Date(timestamp); // Create a Date object

// Extract day, month, and year
const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit format
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getFullYear();

// Return in dd-mm-YYYY format
return `${day}-${month}-${year}`;
}


function getCurrentYear() {
    return new Date(Date.now()).getFullYear();
}

function getCurrentMonth() {
    return new Date(Date.now()).getMonth() + 1;
}

function getCurrentDay() {
    return new Date(Date.now()).getDate();
}

  