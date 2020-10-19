// Helpful function for creating & appending elements
const newElement = (elementName, parentSelector) => {
    const element = document.createElement(elementName)
    // Not particularly fond of using querySelector below. Refactor later.
    const parent = document.querySelector(parentSelector)
    parent.appendChild(element);
    return element;
};

const gallery = document.querySelector('.gallery');

// HOW CAN I MAKE THE RESULTS NUMBER DYNAMIC? IS THAT EVEN WORTHWHILE?
const studentData = 'http://randomuser.me/api/1.3/?results=12';

// Generate the markup for each profile
/**
 * 
 * @param {*} data is the JSON retrieved from API call. Data is then 
 * dynamically appended to DOM
 * 
    Image
    First and Last Name
    Email
    City or location
 */

 function generateHTML(data) {
    const card = document.createElement('div');
    gallery.appendChild(card);
    card.className = 'card';
    card.insertAdjacentHTML( `
      <div class="card-img-container"> <img class="card-img" src=${data.results.picture.thumbnail} alt="profile picture">
      </div>
      <div class="card-info-container"> <h3 id="name" class="card-name cap">${data.results.first} ${data.results.last}</h3>
      <p class="card-text">${data.results.email}</p>
      <p class="card-text cap">${data.results.city}, ${data.results.state}</p>
      </div>
    `);
}


function getJSON(url, callback) { 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              // The request has been completed successfully
              let data = JSON.parse(xhr.responseText);
              return callback(data);
            }
        }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
    getJSON(studentData, (json) => {
       json.results.map(student => {
           getJSON(student.first + student.last, generateHTML);
       });
    });
});


// Search feature in progress
const search = newElement('form', '.search-container');
search.insertAdjacentHTML('afterbegin', '<input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
