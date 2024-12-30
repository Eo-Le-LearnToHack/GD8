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

            // Create the carousel structure
            const carousel = document.createElement('div');
            carousel.id = 'eventsCarousel';
            carousel.className = 'carousel slide';
            carousel.setAttribute('data-bs-ride', 'carousel');
            carousel.setAttribute('data-bs-interval', '5000');
            carousel.setAttribute('data-bs-pause', 'false'); // Ensure autoplay without user interaction

            const carouselInner = document.createElement('div');
            carouselInner.className = 'carousel-inner';

            // Loop through the data and create each carousel item
            processedData.forEach((event, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;

                carouselItem.innerHTML = `
                    <div class="d-flex flex-column justify-content-center align-items-center text-center" style="height: 250px;background-color: #333">
                        <p class="pt-2"><strong>Begivenhed:</strong> ${event.Begivenhed} d.  ${event.Dato}</p>
                        <p class="pt-2"><strong>Sted:</strong> ${event.Sted}</p>
                        <p class="pt-2"><strong>Bemærkning:</strong> ${event.Bemærkning}</p>
                    </div>
                `;

                carouselInner.appendChild(carouselItem); // Append each carousel item to the carousel inner container
            });

            carousel.appendChild(carouselInner);

            // Add carousel controls
            carousel.innerHTML += `
                <button class="carousel-control-prev" type="button" data-bs-target="#eventsCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#eventsCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            `;

            container.appendChild(carousel); // Append the carousel to the main container

            // Programmatically trigger the autoplay to start immediately
            const bootstrapCarousel = new bootstrap.Carousel(carousel, {
                interval: 5000,
                ride: 'carousel'
            });
        })
        .catch(error => console.error('Error fetching or processing data:', error));
}
