
/* Old Harbour High School Portal */
/*  Sabrina Edwards # 
    Aaron Elliston # 
    Monecia Hamilton #2409578
    Josan Small #*/



/* TEACHER DIRECTORY SEARCH */

// Get the teacher search input and table
const teacherSearch = document.getElementById("teacher-search");
const teacherList = document.getElementById("teacher-list");
const directoryStatus = document.getElementById("directory-status");

// Check if the teacher directory exists on this page
if (teacherSearch && teacherList) {

    // Run whenever the user types in the search box
    teacherSearch.addEventListener("input", function() {

        // Get the search text and convert it to lowercase
        let searchText = teacherSearch.value.toLowerCase().trim();

        // Get all teacher rows
        let rows = teacherList.getElementsByTagName("tr");

        let matches = 0;

        // Loop through each teacher
        for (let i = 0; i < rows.length; i++) {

            // Get the teacher name and subject
            let teacherInfo = rows[i].textContent.toLowerCase();

            // Check if the row matches the search
            if (teacherInfo.includes(searchText)) {

                rows[i].style.display = "";
                matches++;

            } else {

                rows[i].style.display = "none";

            }
        }

        // Show a message if no results are found
        if (directoryStatus) {

            if (matches === 0) {
                directoryStatus.textContent = "No matching teachers found.";
            } else {
                directoryStatus.textContent = "";
            }

        }

    });

}


/* CONTACT FORM */

// Get the form and status message
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Check if the contact form exists on this page
if (contactForm) {

    // Run when the user submits the form
    contactForm.addEventListener("submit", function(event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Get the values entered by the user
        let fullName = document.getElementById("full-name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let subject = document.getElementById("subject").value;
        let message = document.getElementById("message").value.trim();

        // Check that the form meets HTML validation rules
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();
            return;

        }

        // Create an object containing the message information
        let contactMessage = {
            fullName: fullName,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        };

        // Get previously saved messages
        let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

        // Add the new message
        messages.push(contactMessage);

        // Save the updated messages in localStorage
        localStorage.setItem("contactMessages", JSON.stringify(messages));

        // Display confirmation message
        if (formStatus) {
            formStatus.textContent = "Your message has been saved successfully.";
        }

        // Clear the form
        contactForm.reset();

    });

}
