







// SEARCH 
const searchFeature2 = () => {
    const cards = document.querySelectorAll('.card');
    let searchInput = document.querySelector('#search-input')
    let matches = [];
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
        let employeeName = document.querySelectorAll('#name');
        if (searchInput.value.length !== 0) {
            console.log(searchInput.value); 
          if (employeeName.textContent.includes(searchInput.value)) {
            matches.push(cards[i]);
          }
        }
      }
      if (matches.length === 0) {
      gallery.insertAdjacentHTML('afterbegin', `<h3>Sorry - your search yeilded no matches`);
      } else {
        gallery.insertAdjacentHTML('afterbegin', `${matches}`);
      }
}

search.addEventListener('input', searchFeature2);

