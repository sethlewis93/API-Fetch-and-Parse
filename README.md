# Public API Requests
Team Treehouse FSJS Techdegree Project 5

## About
Project 5 is an application wherein I practiced making and API request, asynchronously parsing the data, and dynamically displaying the data in the application. 

The app is for a fictional company called "Awesome Startup" which requires a smooth way for employees to share contact information with each other. 

The API request resulted in receiving JSON objects for 12 employees whose information (such as name, image, location, etc.) was parsed and displayed on the web page. 

Once all 12 employees are displayed on the page, the user can select each individual employee "card" which opens up a modal window focusing on the employee selected. Inside each window is more specific information about the employee selected. 

### Exceeds
The search feature filters the directory by name. To keep the search smooth, the API request was tailored to retrieve employee nationality that will only return the data in the English alphabet. 

The modal toggle feature allows a user to toggle back and forth between the employees displayed on the page once a single modal window is open.

Inside the styles.css file I updated lines 35 and 36 as follows: Change color and weight of the header text to help it "pop" a little more.

Inside scripts.js file at the generateUserHTML function, I changed color of the directory emails to green to help them stand out as if they were a link that someone could click to email directly. 

