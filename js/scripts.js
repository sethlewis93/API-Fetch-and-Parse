// Helpful function for creating & appending elements
const newElement = (elementName, parentSelector) => {
    const element = document.createElement(elementName)
    // Not particularly fond of using querySelector below. Refactor later.
    const parent = document.querySelector(parentSelector)
    parent.appendChild(element);
    return element;
};

const studentData = 'https://randomuser.me/api/';

const ajax = new XMLHttpRequest();
ajax.onreadystatechange = function() {
    if(ajax.status === 200) {
        let students = JSON.parse(ajax.responseText);
        console.log(typeof students);
    } else {
        console.log(ajax.statusText);
    }
}
ajax.open('GET', studentData);
ajax.send();

const search = newElement('form', '.search-container');
search.insertAdjacentHTML('afterbegin', '<input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');

const studentDisplay = newElement('div', '.gallery');
studentDisplay.insertAdjacentHTML('afterbegin', '')