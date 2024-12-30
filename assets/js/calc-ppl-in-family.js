console.log("loaded: assets/js/calc-ppl-in-family.js");

function calcPeopleInFamily(fetchUrls, containerID) {
    const fetchPromises = fetchUrls.map(url => 
        fetch(url) // Ensure the endpoint returns JSON
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .catch(error => console.error(`Error fetching data from ${url}:`, error))
    );

    Promise.all(fetchPromises).then(allData => {
        console.log("Inside calcPeopleInFamily function", allData); // Log to verify the data

        const container = document.getElementById(containerID);
        container.innerHTML = ''; // Clear existing content

        // Create the carousel structure
        const carousel = document.createElement('div');
        carousel.id = 'personsCarousel';
        carousel.className = 'carousel slide';
        carousel.setAttribute('data-bs-ride', 'carousel');
        carousel.setAttribute('data-bs-interval', '5000');
        carousel.setAttribute('data-bs-pause', 'false'); // Ensure autoplay without user interaction

        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        // Process each dataset and create a carousel item for each URL
        allData.forEach((data, urlIndex) => {
            if (!data) return; // Skip if data is null or undefined

            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item${urlIndex === 0 ? ' active' : ''}`;

            // Create a block of persons for this URL
            const personsBlock = document.createElement('div');
            personsBlock.className = 'd-flex justify-content-center align-items-center text-center';
            personsBlock.style.height = '250px';
            personsBlock.style.background = '#333';

            data.forEach(person => {
                const personHTML = `
                    <div class="mb-3">
                        <img src="${person.img}" alt="${person.name}" style="width: 100px; height: 100px; border-radius: 50%;" class="mb-2">
                        <p class="pt-2"><strong>Name:</strong> ${person.name}</p>
                        <p class="pt-2"><strong>Date of Birth:</strong> ${person.dob}</p>
                        <p class="pt-2"><strong>Family:</strong> ${person.family}</p>
                    </div>
                `;
                personsBlock.innerHTML += personHTML;
            });

            carouselItem.appendChild(personsBlock);
            carouselInner.appendChild(carouselItem); // Append each carousel item to the carousel inner container
        });

        carousel.appendChild(carouselInner);

        // Add carousel controls
        carousel.innerHTML += `
            <button class="carousel-control-prev" type="button" data-bs-target="#personsCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#personsCarousel" data-bs-slide="next">
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
    });
}
