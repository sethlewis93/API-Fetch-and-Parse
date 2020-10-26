







// SEARCH 
const searchFeature2 = (data) => {
  data.map(emp => {
    const firstName = emp.name.first;
    const lastName = emp.name.last;
    const fullName = `${firstName} ${lastName}`;

    /*
      if fullName is the same as user input - return the matching card for that fullName
    */
  })
}

search.addEventListener('input', searchFeature2);

employeeCards[i] === 0 
            ? console.log('first') // generateModalHTML(employeeCards[11]) 
            : console.log('error') //generateModalHTML(employeeCards - 1);