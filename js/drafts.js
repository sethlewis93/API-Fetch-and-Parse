







const searchFeature = (data) => {
  const cards = document.querySelectorAll('.card');
  const searchfield = document.querySelector('#search-input');
  const userSearch = searchfield.value.toLowerCase(); 

  data.filter(employee => {
      const firstName = employee.name.first;
      const lastName = employee.name.last;
      const fullName = `${firstName} ${lastName}`
  });
  return data;
};    

