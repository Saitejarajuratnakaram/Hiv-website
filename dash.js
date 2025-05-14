
      

document.querySelectorAll('.actions .fa-times-circle').forEach(function(element) {
    element.addEventListener('click', function() {
        alert('Appointment cancelled!');
    });
});

document.getElementById('hospitalVisit').addEventListener('click', function() {
    document.querySelector('.grid').style.display = 'none';
    document.querySelector('.hospital-details').classList.add('active');
    document.querySelector('.prescription-details').classList.remove('active');
    document.querySelector('.health-report-details').classList.remove('active');
    initMap();
});

document.getElementById('dashboard').addEventListener('click', function() {
    document.querySelector('.grid').style.display = 'grid';
    document.querySelector('.hospital-details').classList.remove('active');
    document.querySelector('.prescription-details').classList.remove('active');
    document.querySelector('.health-report-details').classList.remove('active');
});

document.getElementById('prescription').addEventListener('click', function() {
    document.querySelector('.grid').style.display = 'none';
    document.querySelector('.hospital-details').classList.remove('active');
    document.querySelector('.prescription-details').classList.add('active');
    document.querySelector('.health-report-details').classList.remove('active');
});

document.getElementById('healthReport').addEventListener('click', function() {
    document.querySelector('.grid').style.display = 'none';
    document.querySelector('.hospital-details').classList.remove('active');
    document.querySelector('.prescription-details').classList.remove('active');
    document.querySelector('.health-report-details').classList.add('active');
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

// Modal interaction
let profileIcon = document.getElementById('profileIcon');
let userModal = document.getElementById('userModal');
let closeModal = document.getElementsByClassName('close')[0];
let cancelButton = document.getElementById('cancelButton');

// Show modal on profile icon click
profileIcon.addEventListener('click', function() {
    userModal.style.display = 'block';
    loadUserDetails(); // Load saved details when modal is opened
});

// Close modal
closeModal.addEventListener('click', function() {
    userModal.style.display = 'none';
});

// Close modal if clicked outside
window.addEventListener('click', function(event) {
    if (event.target == userModal) {
        userModal.style.display = 'none';
    }
});

// Cancel button
cancelButton.addEventListener('click', function() {
    userModal.style.display = 'none';
});

// Form validation and CRUD operations
const userDetailsForm = document.getElementById('userDetailsForm');
const deleteButton = document.getElementById('deleteButton');

// Real-time validation for name, email, phone, and address
userDetailsForm.addEventListener('input', function() {
    let nameValid = validateName(document.getElementById('name').value);
    let emailValid = validateEmail(document.getElementById('email').value);
    let mobileValid = validatePhone(document.getElementById('mobile').value);
    let addressValid = document.getElementById('address').value.trim().length > 0;

    // Toggle error messages and input styles
    toggleErrorMessages('name', nameValid, 'Only letters and spaces are allowed');
    toggleErrorMessages('email', emailValid, 'Please enter a valid email address');
    toggleErrorMessages('mobile', mobileValid, 'Phone number must be in the format XXX-XXX-XXXX');
    toggleErrorMessages('address', addressValid, 'Address cannot be empty');

    // Enable or disable the submit button based on validation
    userDetailsForm.querySelector('button[type="submit"]').disabled = !(nameValid && emailValid && mobileValid && addressValid);
});

// Toggle error message and input border style
function toggleErrorMessages(fieldId, isValid, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorMessageElement = document.getElementById(fieldId + '-error');

    if (isValid) {
        field.classList.remove('input-error');
        if (errorMessageElement) {
            errorMessageElement.style.display = 'none';
        }
    } else {
        field.classList.add('input-error');
        if (errorMessageElement) {
            errorMessageElement.style.display = 'block';
            errorMessageElement.innerText = errorMessage;
        } else {
            const errorElement = document.createElement('div');
            errorElement.id = fieldId + '-error';
            errorElement.classList.add('error-message');
            errorElement.innerText = errorMessage;
            field.parentElement.appendChild(errorElement);
        }
    }
}

// Validate name (only alphabets and spaces allowed)
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    return nameRegex.test(name);
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Validate phone number format (example: 123-456-7890)
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return phoneRegex.test(phone);
}

// Handle Save (Update user details)
userDetailsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user data from the form
    let userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value
    };

    // Save user data to localStorage or server
    localStorage.setItem('userData', JSON.stringify(userData));

    console.log('User Details Updated:', userData);
    alert('User details saved successfully!');
    userModal.style.display = 'none';  // Close the modal after saving
});

// Handle Delete (Delete user details)
deleteButton.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete your profile?')) {
        // Delete the saved user data from localStorage
        localStorage.removeItem('userData');
        resetForm(); // Reset the form and UI

        alert('User profile deleted');
        userModal.style.display = 'none'; // Close the modal
    }
});

// Load saved user details into the form
function loadUserDetails() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const userData = JSON.parse(savedData);
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('mobile').value = userData.mobile;
        document.getElementById('address').value = userData.address;
    }
}

// Reset the form and the UI
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('address').value = '';
    // Clear error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => input.classList.remove('input-error'));
}

        // Function to generate calendar for the current month
        function generateCalendar() {
            const today = new Date();
            const currentMonth = today.getMonth(); // Current month (0 - 11)
            const currentYear = today.getFullYear(); // Current year (YYYY)
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
            const daysInMonth = lastDayOfMonth.getDate(); // Total days in current month
            const startingDay = firstDayOfMonth.getDay(); // Starting day of the month (0 - 6, 0 is Sunday)
        
            // Set month and year in the header
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            document.getElementById("monthYear").innerText = `${monthNames[currentMonth]} ${currentYear}`;
        
            // Clear previous calendar
            const calendarBody = document.getElementById("calendar-body");
            calendarBody.innerHTML = '';
        
            // Create empty cells for days before the 1st
            let dayCount = 1;
            let row = document.createElement("tr");
        
            // Insert empty cells for days before the 1st
            for (let i = 0; i < startingDay; i++) {
                let cell = document.createElement("td");
                row.appendChild(cell);
            }
        
            // Insert actual days of the month
            for (let i = startingDay; i < 7; i++) {
                let cell = document.createElement("td");
                cell.innerText = dayCount;
                if (dayCount === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                    cell.classList.add("today"); // Highlight today's date
                }
                row.appendChild(cell);
                dayCount++;
            }
            calendarBody.appendChild(row);
        
            // Create rows for the remaining days
            while (dayCount <= daysInMonth) {
                row = document.createElement("tr");
                for (let i = 0; i < 7 && dayCount <= daysInMonth; i++) {
                    let cell = document.createElement("td");
                    cell.innerText = dayCount;
                    if (dayCount === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                        cell.classList.add("today"); // Highlight today's date
                    }
                    row.appendChild(cell);
                    dayCount++;
                }
                calendarBody.appendChild(row);
            }
        }
        
        // Call the function to generate the calendar on page load
        generateCalendar();


  
 
 
   document.getElementById("labResultItem").addEventListener("click", function() {
            // Toggle the lab reports section
            var labReportsSection = document.getElementById("labReportsSection");
            labReportsSection.style.display = (labReportsSection.style.display === "none" || labReportsSection.style.display === "") ? "block" : "none";
        });
        
        document.getElementById("sessionNotesItem").addEventListener("click", function() {
            // Toggle the session notes section
            var sessionNotesSection = document.getElementById("sessionNotesSection");
            sessionNotesSection.style.display = (sessionNotesSection.style.display === "none" || sessionNotesSection.style.display === "") ? "block" : "none";
        });
 