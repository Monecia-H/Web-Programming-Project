/* Old Harbour High School
   
   Sabrina Edwards #
   Aaron Elliston #
   Monecia Hamilton #2409578
   Josan Small #2501992

   Ms. Sirsha Badhika Friday 12-2pm
*/

// Create sample accounts when none exist.
function initializeStorage() {

    if (localStorage.getItem("schoolUsers") === null) {

        const users = [
            {
                username: "admin",
                password: "Admin123",
                role: "admin"
            },
            {
                username: "teacher",
                password: "Teacher123",
                role: "teacher"
            },
            {
                username: "viewer",
                password: "Viewer123",
                role: "viewer"
            }
        ];

        localStorage.setItem("schoolUsers", JSON.stringify(users));
    }

    // Create an empty student list.
    if (localStorage.getItem("schoolStudents") === null) {

        const students = [];

        localStorage.setItem("schoolStudents", JSON.stringify(students));
    }

    // Create an empty grades list.
    if (localStorage.getItem("schoolGrades") === null) {

        const grades = [];

        localStorage.setItem("schoolGrades", JSON.stringify(grades));
    }

    // Create an empty payments list.
    if (localStorage.getItem("schoolPayments") === null) {

        const payments = [];

        localStorage.setItem("schoolPayments", JSON.stringify(payments));
    }
}

// Get stored users.
function getUsers() {

    const users = localStorage.getItem("schoolUsers");

    return JSON.parse(users) || [];
}

// Get stored students.
function getStudents() {

    const students = localStorage.getItem("schoolStudents");

    return JSON.parse(students) || [];
}

// Save student information.
function saveStudents(students) {

    localStorage.setItem("schoolStudents", JSON.stringify(students));
}

// Get stored grades.
function getGrades() {

    const grades = localStorage.getItem("schoolGrades");

    return JSON.parse(grades) || [];
}

// Save grades.
function saveGrades(grades) {

    localStorage.setItem("schoolGrades", JSON.stringify(grades));
}

// Get stored payments.
function getPayments() {

    const payments = localStorage.getItem("schoolPayments");

    return JSON.parse(payments) || [];
}

// Save payments.
function savePayments(payments) {

    localStorage.setItem("schoolPayments", JSON.stringify(payments));
}

// Initialize browser storage.
initializeStorage();