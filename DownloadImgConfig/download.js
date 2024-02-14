const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the output directory for downloaded images
const outputDirectory = '../src/Assets/AllCards'; // Change this to the desired directory

async function downloadImages(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        const get = response.data;
        const data = get.data;
        for (let i = 0; i < data.length; i++) {
            // Set Cards
            // const imageUrl = data[i].set_image;
            // All Cards
            const imageUrl = data[i].card_images[0].image_url;

            if (imageUrl) {
                const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
                // All Cards
                const outputFilePath = path.join(outputDirectory, `${data[i].id}.jpg`);
                // Set Card 
                // const outputFilePath = path.join(outputDirectory, `${data[i].set_code}.jpg`);

                // Ensure the output directory exists
                if (!fs.existsSync(outputDirectory)) {
                    fs.mkdirSync(outputDirectory);
                }

                imageResponse.data.pipe(fs.createWriteStream(outputFilePath));
                console.log(`Image downloaded successfully to ${outputFilePath}`);
            } else {
                console.log(`No image URL found for object ${data[i].set_code}`);
            }
        }
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
}

// Example usage: API URL
// Set Cards
// const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardsets.php';
// All Cards
const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

downloadImages(apiUrl);
