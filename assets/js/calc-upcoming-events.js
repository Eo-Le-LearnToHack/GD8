console.log("loaded: assets/js/calc-ppl-in-month.js")
function calcPeopleFilteredOnMonth(fetchUrl, containerID) {
    
fetch(fetchUrl)// Ensure the endpoint returns JSON
.then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
})
.then(data => {
    const today = new Date();

    // Process data: Calculate age dynamically
    const processedData = data.map(person => {
        const dob = new Date(person.dob);

        // Calculate age
        const age = today.getFullYear() - dob.getFullYear() - 
            (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        return {
            name: person.name,
            age: age,
            nextBirthday: daysToNextBirthday,
            img: person.img
        };
    });

    // Dynamically render the data into the container
    const container = document.getElementById(containerID);
    container.innerHTML = ''; // Clear existing content

    // Create a d-flex container
    const dFlexContainer = document.createElement('div');
    dFlexContainer.className = 'container-fluid d-flex align-items-center text-center text-white overflow-x-auto overflow-y-hidden border border-2 custom-img-container';
    dFlexContainer.style.height = '250px';

    // Loop through the data and create each person's block
    processedData.forEach(person => {
        const personBlock = document.createElement('div');
        personBlock.className = 'p-3'; // Padding for each person's content

        personBlock.innerHTML = `
            <img class="rounded-circle" src="${person.img}" alt="${person.name}">
            <p class="pt-2"><small>${person.name}, ${person.age} år</small></p>
            <p class="pt-2"><small>${person.age + 1} år om ${person.nextBirthday} dage</small></p>
        `;

        dFlexContainer.appendChild(personBlock); // Append each person block to the d-flex container
    });

    container.appendChild(dFlexContainer); // Append the d-flex container to the main container
})
.catch(error => console.error('Error fetching or processing data:', error));

}