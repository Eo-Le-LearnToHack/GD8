console.log("loaded: assets/js/calc-upcoming-events.js");

function calcUpcomingEvents(fetchUrl, containerID) {
    fetch(fetchUrl) // Ensure the endpoint returns JSON
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        console.log("Inside fetchAndDisplayEvents function", data); // Log to verify the data

        // Helper function to format the date as dd-MM-yyyy
        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        // Filter and map the data to ensure it's in the correct structure
        const today = new Date();
        const processedData = data
            .filter(event => {
                const eventDate = new Date(event.Dato);
                return event.Dato && eventDate >= today; // Include only events with valid future dates
            })
            .map(event => {
                return {
                    Dato: event.Dato ? formatDate(event.Dato) : 'N/A',
                    Begivenhed: event.Begivenhed || 'N/A',
                    Sted: event.Sted || 'N/A',
                    Bemærkning: event.Bemærkning || 'N/A'
                };
            });

        // Dynamically render the data into the container
        const container = document.getElementById(containerID);
        container.innerHTML = ''; // Clear existing content

        // Create a d-flex container
        const dFlexContainer = document.createElement('div');
        dFlexContainer.className = 'container-fluid d-flex align-items-center text-center text-white overflow-x-auto overflow-y-auto border border-2';
        //dFlexContainer.style.height = '250px';

        // Loop through the data and create each event's block
        processedData.forEach(event => {
            const eventBlock = document.createElement('div');
            eventBlock.className = 'p-3'; // Padding for each event's content

            eventBlock.innerHTML = `
                <p class="pt-2"><strong>Dato:</strong> ${event.Dato}</p>
                <p class="pt-2"><strong>Begivenhed:</strong> ${event.Begivenhed}</p>
                <p class="pt-2"><strong>Sted:</strong> ${event.Sted}</p>
                <p class="pt-2"><strong>Bemærkning:</strong> ${event.Bemærkning}</p>
            `;

            dFlexContainer.appendChild(eventBlock); // Append each event block to the d-flex container
        });

        container.appendChild(dFlexContainer); // Append the d-flex container to the main container
    })
    .catch(error => console.error('Error fetching or processing data:', error));
}
