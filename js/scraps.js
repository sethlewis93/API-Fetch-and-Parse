







// SEARCH 
function searchFeature(employees) {
    
  const cards = document.querySelectorAll('.card');
  const searchInput = document.querySelector('#search-input').value.toLowerCase();
  let searchFilter = [];

  for(let emp in employees) {
      console.log(`${emp}: ${employees[emp]}`);
      // const firstNames = emp.name.first;
      // const lastNames = emp.name.last;
      // const fullNames = `${firstNames} ${lastNames}`;
      
  }

  for(let keys of Object.values(searchFilter)) {
      if(searchInput.includes(keys)) {
          console.log(keys);
      }
  }
};


