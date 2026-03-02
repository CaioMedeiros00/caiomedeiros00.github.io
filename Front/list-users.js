async function fetchUserData() {
    try {
        // Fetch the resource and get a Response (status, headers, body stream)
        const response = await fetch("data/users.json");

        // *** Test status code is in success range ***
        if (!response.ok) {
            // Any non-successful status code
            console.log(`Network response was not ok - Status: ${response.status}`);
            // Stop executing the function and return control to the calling code
            return;
        }

        // Parse the response object to JSON
        const data = await response.json();
        // Verify the code is working by logging the data to the console
        console.log(data);
        // Output the data to the web page
        displayUsers(data);
    }
    catch (error) {
        // Handle any errors that occur in the try block
        console.error(`Error fetching data: ${error}`);
    } // end of try-catch

} // end of Fetch API function

// Function to handle the DOM output
function displayUsers(usersArray) {
    const container = document.getElementById("users-container");
    let htmlOutput = "";

    // Loop through each user in the array
    usersArray.forEach(user => {
        /* Build the HTML string using the compound assignment operator
        and template literals.
        Line breaks added for readability */
        htmlOutput += `
            <p>
            <b>${user.firstName} ${user.lastName}</b>
            Age: ${user.age}
            Active?: ${user.isActive ? "Yes" : "No"}
            </p>
        `;
    });

    /* Output the final HTML to the "users-container"
    DIV element on the web page */
    container.innerHTML = htmlOutput;
}

// Call the function to run the fetch request
fetchUserData();
