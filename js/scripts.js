// Helpful function for creating & appending elements
const appendToDiv = (elementName, parentSelector) => {
    const element = document.createElement(elementName)
    const parent = document.querySelector(parentSelector)
    parent.appendChild(element);
    return element;
};


const search = appendToDiv('form', '.search-container');
search.insertAdjacentHTML('afterbegin', '<input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
