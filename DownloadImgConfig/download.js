// Import required modules
const axios = require('axios'); // For making HTTP requests
const fs = require('fs'); // For interacting with the file system
const path = require('path'); // For working with file paths

// Define the output directory for downloaded images
const outputDirectory = '../src/Assets/card'; // Change this to the desired directory

// Asynchronous function to download images
async function downloadImages(apiUrl) {
    try {
        // Make a GET request to the provided API URL
        const response = await axios.get(apiUrl);
        const get = response.data;
        const data = get.data;

        // Loop through the data obtained from the API
        for (let i = 0; i < data.length; i++) {
            console.clear(); // Clear the console for each iteration

            // Get the URL of the card image
            const imageUrl = data[i].card_images[0].image_url;

            if (imageUrl) { // Check if image URL exists
                // Determine the output file path
                const outputFilePath = path.join(outputDirectory, `${data[i].id}.jpg`);

                // Check if the image file already exists
                if (!fs.existsSync(outputFilePath)) {
                    // Make a GET request to download the image
                    const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });

                    // Ensure the output directory exists
                    if (!fs.existsSync(outputDirectory)) {
                        fs.mkdirSync(outputDirectory); // Create the directory if it doesn't exist
                    }

                    // Pipe the image data to the output file
                    imageResponse.data.pipe(fs.createWriteStream(outputFilePath));
                    console.log(`${i} - Image downloaded successfully to ${outputFilePath}`);
                } else {
                    console.log(`${i} - Image ${outputFilePath} already exists. Skipping download.`);
                }
            } else {
                console.log(`${i} - No image URL found for object ${data[i].id}`);
            }
        }
        console.log("Download process completed.");
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    } finally {
        console.log("Script execution ended.");
    }
}

// Example usage: API URL
const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

// Call the function to download images
downloadImages(apiUrl);
