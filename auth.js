/* Old Harbour High School
   
   Sabrina Edwards #
   Aaron Elliston #
   Monecia Hamilton #2409578
   Josan Small #2501992

   Ms. Sirsha Badhika Friday 12-2pm
*/

// Get the login form.
const loginForm = document.getElementById("login-form");

// Check if the login form exists.
if (loginForm !== null) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get the entered information.
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const loginStatus = document.getElementById("login-status");

        // Get stored accounts.
        const users = getUsers();

        let validUser = null;

        // Check username and password.
        for (let i = 0; i < users.length; i++) {

            if (username === users[i].username &&
                password === users[i].password) {

                validUser = users[i];
                break;
            }
        }

        // Check if the account was found.
        if (validUser !== null) {

            // Save the current login session.
            sessionStorage.setItem("loggedInUser", validUser.username);
            sessionStorage.setItem("userRole", validUser.role);

            // Send users to their dashboards.
            if (validUser.role === "admin") {

                window.location.href = "admin.html";

            } else if (validUser.role === "teacher") {

                window.location.href = "teacher.html";

            } else if (validUser.role === "viewer") {

                window.location.href = "viewer.html";
            }

        } else {

            loginStatus.textContent = "Invalid username or password.";
        }

    });
}


// Check if a user has permission.
function checkAccess(requiredRole) {

    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const userRole = sessionStorage.getItem("userRole");

    // Redirect users who are not logged in.
    if (loggedInUser === null) {

        window.location.replace("login.html");
        return false;
    }

    // Redirect users with the wrong role.
    if (userRole !== requiredRole) {

        alert("You do not have permission to access this page.");

        window.location.replace("login.html");
        return false;
    }

    return true;
}


// Log out the current user.
function logout() {

    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("userRole");

    window.location.replace("login.html");
}