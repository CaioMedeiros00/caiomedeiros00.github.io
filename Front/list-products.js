async function fetchProductData() {
    try {

        const response = await fetch("data/products.json");

        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);

            return;
        }

        // Parse the response object to JSON
        const data = await response.json();
        // Verify the code is working by logging the data to the console
        console.log(data);
        // Output the data to the web page
        displayProducts(data);
    }
    catch (error) {
        // Handle any errors that occur in the try block
        console.error(`Error fetching data: ${error}`);
    } // end of try-catch

} // end of Fetch API function

// Function to handle the DOM output
function displayProducts(productsArray) {
    const container = document.getElementById("products-container");
    let htmlOutput = "";

    // Loop through each product in the array
    productsArray.forEach(product => {
        /* Build the HTML string using the compound assignment operator 
        and template literals.
        Line breaks added for readability */
        htmlOutput += `
            <p>
            <b>${product.name}</b>
            Price: $${product.price}  
            Available?: ${product.inStock ? "Yes" : "No"}
            </p>
        `;
    });

    /* Output the final HTML to the "products-container"
    DIV element on the web page */
    container.innerHTML = htmlOutput;
}

// Call the function to run the fetch request
fetchProductData();
