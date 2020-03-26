##

***This project is a proof-of-concept piece created for a hack-a-thon. This is not officially supported by JW Player and should be used at your own risk!***

## About

This is a simple Chrome extension I built to make it easier to access my JW Dashboard library/player. This extension allows you to grab video media ids, grab single line embeds urls, hls streams, player ids, etc.

## Demo

![Dash-Lite Demo](public/dash-lite_demo.gif)

## How to install

1. Clone or download the folder
2. Navigate into the folder and run **npm install** in the terminal (make sure you have npm installed already https://www.npmjs.com/)
3. Create a **secrets.js** file and put it inside the "src" folder. The secrets.js file should look like:

   export let apiKey = "API_KEY"  
   export let apiSecret = "API_SECRET"

4. Run **npm run build** in the terminal
5. Go to Chrome and navigate to the Extensions tab
6. Enable Developer Mode (top right) and then click "Load Unpacked" and point to the "build" folder, which is created after step 4
