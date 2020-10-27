







// SEARCH 
function searchFeature(employees) {
    
  const cards = document.querySelectorAll('.card');
  const searchInput = document.querySelector('#search-input').value.toLowerCase();
  let searchFilter = [];

  for(let emp of employees) {
      const firstNames = emp.name.first;
      const lastNames = emp.name.last;
      const fullNames = `${firstNames} ${lastNames}`;
      searchFilter.push(fullNames);
  }

  for(let keys of Object.values(searchFilter)) {
      if(searchInput.includes(keys)) {
          console.log(keys);
      }
  }

};  
