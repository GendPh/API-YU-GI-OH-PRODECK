const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the output directory for downloaded images
const outputDirectory = '../src/Assets/card'; // Change this to the desired directory

async function downloadImages(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        const get = response.data;
        const data = get.data;
        for (let i = 0; i < data.length; i++) {
            console.clear();
            const imageUrl = data[i].card_images[0].image_url;

            if (imageUrl) {
                // Determine the output file path
                const outputFilePath = path.join(outputDirectory, `${data[i].id}.jpg`);

                // Check if the image file already exists
                if (!fs.existsSync(outputFilePath)) {
                    const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });

                    // Ensure the output directory exists
                    if (!fs.existsSync(outputDirectory)) {
                        fs.mkdirSync(outputDirectory);
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

downloadImages(apiUrl);