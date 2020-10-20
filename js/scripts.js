
const search = document.querySelector('.search-container')
const gallery = document.querySelector('.gallery');
const headerText = document.querySelector('.header-text-container');

// HOW CAN I MAKE THE RESULTS NUMBER DYNAMIC? IS THAT EVEN WORTHWHILE?
const studentData = 'https://randomuser.me/api/?results=12&nat=us';
let students = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch(studentData)
        .then(response => {
            students = response.json();
            return students;
        })
        .then(generateHTML)
        .catch(err => console.log(err));
});


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
    data.map(student => {
        const card = document.createElement('div');
        gallery.appendChild(card);
        card.className = 'card';
        card.insertAdjacentHTML( `
          <div class="card-img-container"> <img class="card-img" src=${student.results.picture.thumbnail} alt="profile picture">
          </div>
          <div class="card-info-container"> <h3 id="name" class="card-name cap">${student.results.first} ${student.results.last}</h3>
          <p class="card-text">${student.results.email}</p>
          <p class="card-text cap">${student.results.city}, ${student.results.state}</p>
          </div>
        `);
    });
};

// function getJSON(url) { 
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', url);
//         xhr.onload = function () {
//             if(xhr.readyState === XMLHttpRequest.DONE) {
//                 const status = xhr.status;
//                 if (status === 200) {
//                   let data = JSON.parse(xhr.responseText);
//                   resolve(data);
//                 } else {
//                     reject(Error(xhr.responseText));
//                 }
//             }
//         };   
//         xhr.onerror = () => reject(Error('A network error occurred'));
//         xhr.send();
//     });
// };

// Search feature in progress
search
    .insertAdjacentHTML('afterbegin', `
        <form action="#" method="get">                        
        <input type="search" id="search-input" 
        class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
        `);

// Search filter function under construction
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

// Modal container under construction 
/*

gallery.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="" alt="profile picture">
                    <h3 id="name" class="modal-name cap">nombre</h3>
                    <p class="modal-text">homestarrunner</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/13/1993</p>
                </div>
            </div>
            
            <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
    </div>
`);

*/

