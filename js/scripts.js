
const search = document.querySelector('.search-container')
const gallery = document.querySelector('.gallery');
const headerText = document.querySelector('.header-text-container');

// HOW CAN I MAKE THE RESULTS NUMBER DYNAMIC? IS THAT EVEN WORTHWHILE?
const studentData = 'https://randomuser.me/api/?results=12&nat=us';

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
};

function getJSON(url) { 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              // The request has been completed successfully
              let data = JSON.parse(xhr.responseText);
              return data
            }
        }
    };
    xhr.send();
}

headerText.addEventListener('click', () => {
    // getJSON(studentData);
    generateHTML(getJSON(studentData))
});


// Search feature in progress
search
.insertAdjacentHTML('afterbegin', `
    <form action="#" method="get">                        
    <input type="search" id="search-input" 
    class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`);

// Search filter function
const searchFeature = (data) => {
    // get the data from the page
    data.filter(student => {
        if (search.value.length !== 0) {
            let userSearch = search.value.toLowerCase();
            if (student.first.includes(userSearch) || student.last.includes(userSearch)) { 
                return data
            }
        }
    });   
};



// searchFeature(getJSON(studentData, (json) => {
//     console.log(json)
// }));