const pages = {
    'home': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'movies': () => document.getElementById('movies-section').scrollIntoView({ behavior: 'smooth' }),
    'offers' : () => document.getElementsByTagName('offerr').scrollIntoView({ behavior: 'smooth' })
};
// Show booking modal when a book button is clicked
const bookButtons = document.querySelectorAll('.book-btn');
const bookingModal = document.getElementById('booking-modal');
const closeBtn = document.querySelector('.close-btn');

// Logo click
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    pages['home']();
});

// Explore Now button
document.getElementById('explore-now').addEventListener('click', () => {
    pages['movies']();
});

//Offer button
document.getElementById('offer-btn').addEventListener('click', () => {
    pages['offers']();
});

//coming soon button pe alert
document.querySelectorAll('.coming-soonn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Coming soon!');
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    // Trigger search on button click
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}\n(Search functionality coming soon!)`);
        }
    });

    // Trigger search on Enter key press
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            const searchTerm = searchInput.value;
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}\n(Search functionality coming soon!)`);
            }
        }
    });
});

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Window click event to close modal
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Date selection
const dateItems = document.querySelectorAll('.date-item');
dateItems.forEach(item => {
    item.addEventListener('click', () => {
        dateItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Showtime selection
const showtimes = document.querySelectorAll('.showtime');
showtimes.forEach(time => {
    time.addEventListener('click', () => {
        document.querySelector('.booking-section').style.display = 'none';
        document.querySelector('.seat-selection').style.display = 'block';
    });
});

// Seat selection
const seats = document.querySelectorAll('.seat.available');
const selectedSeatsSpan = document.querySelector('.summary-row:nth-child(4) span:last-child');
const ticketPriceSpan = document.querySelector('.summary-row:nth-child(5) span:last-child');
const convenienceFeeSpan = document.querySelector('.summary-row:nth-child(6) span:last-child');
const totalAmountSpan = document.querySelector('.summary-total span:last-child');

const ticketPrice = 220; // Price per ticket
const convenienceFee = 30; // Fee per ticket

let selectedSeats = [];

document.addEventListener('DOMContentLoaded', () => {
    const bookButtons = document.querySelectorAll('.book-btn');
    const bookingModal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close-btn');

    // Modal elements
    const modalPoster = document.getElementById('modal-poster');
    const modalTitle = document.getElementById('modal-title');
    const modalGenre = document.getElementById('modal-genre');
    const modalDuration = document.getElementById('modal-duration');
    const modalRating = document.getElementById('modal-rating');
    const modalDescription = document.getElementById('modal-description');
    const modalCast = document.getElementById('modal-cast');

    // Open modal and populate content
    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get data from button
            const title = button.getAttribute('data-title');
            const genre = button.getAttribute('data-genre');
            const duration = button.getAttribute('data-duration');
            const rating = button.getAttribute('data-rating');
            const poster = button.getAttribute('data-poster');
            const description = button.getAttribute('data-description');
            const cast = button.getAttribute('data-cast').split(', ');

            // Populate modal content
            modalPoster.src = poster;
            modalTitle.textContent = title;
            modalGenre.textContent = genre;
            modalDuration.textContent = duration;
            modalRating.innerHTML = `<i class="fas fa-star"></i> ${rating}`;
            modalDescription.textContent = description;

            // Populate cast
            modalCast.innerHTML = '';
            cast.forEach(actor => {
                const castMember = document.createElement('div');
                castMember.classList.add('cast-member');
                castMember.innerHTML = `
                    <div class="cast-avatar">
                        <img src="/api/placeholder/60/60" alt="${actor}">
                    </div>
                    <span class="cast-name">${actor}</span>
                `;
                modalCast.appendChild(castMember);
            });

            // Show modal
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Function to reset modal content
    function resetModal() {
        // Reset selected seats
        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeats.forEach(seat => seat.classList.remove('selected'));

        // Reset booking summary
        selectedSeatsSpan.textContent = '-';
        ticketPriceSpan.textContent = '₹0';
        convenienceFeeSpan.textContent = '₹0';
        totalAmountSpan.textContent = '₹0';

        // Reset active date
        const activeDate = document.querySelector('.date-item.active');
        if (activeDate) {
            activeDate.classList.remove('active');
        }
        document.querySelector('.date-item').classList.add('active');

        // Reset seat selection section visibility
        document.querySelector('.booking-section').style.display = 'block';
        document.querySelector('.seat-selection').style.display = 'none';
    }

    // Close modal and reset content
    closeBtn.addEventListener('click', () => {
        resetModal();
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside and reset content
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            resetModal();
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const seatsGrid = document.querySelector('.seats-grid');
    const rows = ['A', 'B', 'C', 'D', 'E']; // Define row labels
    const seatsPerRow = 10; // Number of seats per row
    const bookedSeats = [] // Predefined booked seats

    const selectedSeatsSpan = document.querySelector('.summary-row:nth-child(4) span:last-child');
    const ticketPriceSpan = document.querySelector('.summary-row:nth-child(5) span:last-child');
    const convenienceFeeSpan = document.querySelector('.summary-row:nth-child(6) span:last-child');
    const totalAmountSpan = document.querySelector('.summary-total span:last-child');

    const ticketPrice = 220; // Price per ticket
    const convenienceFee = 30; // Fee per ticket

    let selectedSeats = [];

    // Clear existing seats
    seatsGrid.innerHTML = '';

    // Generate seats dynamically
    rows.forEach(row => {
        const seatRow = document.createElement('div');
        seatRow.classList.add('seat-row');

        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = row;
        seatRow.appendChild(rowLabel);

        const seatsContainer = document.createElement('div');
        seatsContainer.classList.add('seats');

        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.classList.add(bookedSeats.includes(seatId) ? 'booked' : 'available');
            seat.dataset.seatId = seatId; // Add a data attribute for the seat ID
            seatsContainer.appendChild(seat);
        }

        seatRow.appendChild(seatsContainer);
        seatsGrid.appendChild(seatRow);
    });

    // Delegate click event to seats-grid
    seatsGrid.addEventListener('click', (event) => {
        const seat = event.target;

        // Check if the clicked element is a seat and is available
        if (!seat.classList.contains('seat') || seat.classList.contains('booked')) return;

        seat.classList.toggle('selected');

        const seatId = seat.dataset.seatId;

        if (seat.classList.contains('selected')) {
            // Add to selected seats
            selectedSeats.push(seatId);
        } else {
            // Remove from selected seats
            selectedSeats = selectedSeats.filter(id => id !== seatId);
        }

        // Update booking summary
        selectedSeatsSpan.textContent = selectedSeats.join(', ') || '-';

        const totalTicketPrice = selectedSeats.length * ticketPrice;
        const totalConvenienceFee = selectedSeats.length * convenienceFee;
        const totalAmount = totalTicketPrice + totalConvenienceFee;

        ticketPriceSpan.textContent = `₹${totalTicketPrice}`;
        convenienceFeeSpan.textContent = `₹${totalConvenienceFee}`;
        totalAmountSpan.textContent = `₹${totalAmount}`;
    });
});