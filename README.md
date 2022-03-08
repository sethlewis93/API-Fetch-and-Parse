# API FETCH AND PARSE

## About

Using the [randomuser.me api](https://randomuser.me/api/?results=12&nat=us), this application makes API requests, asynchronously parses the data, and dynamically displays the data in the application. 

The app is for a fictional company called "Awesome Startup" which requires a smooth way for employees to view contact information across the company.

The API request resulted receives 12 JSON objects (one for each employee). Each employee's contact info is parsed and displayed on the web page. 

Once all 12 employees are displayed on the page, the user can select each individual employee "card" which opens up a modal window focusing on the employee selected. Inside each window is more specific information about the employee selected. 

## Search

The search feature filters the directory by employee name.The modal toggle feature allows a user to toggle back and forth between the employees displayed on the page once a single modal window is open.

## To Test

1. Download the code.
2. Open index.html in your preferred browser.
3. Search for employees by name or select an employee card to view more information. Select the next or previous employee to scroll through each in the directory with the modal open.
4. Refresh the browser for a new list of randomly selected "employees" from the public api.