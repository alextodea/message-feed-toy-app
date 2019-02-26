const ROUTES = require("./routes");
const axios = require("axios");

export const formatDate = (date) => {

    const newDate = new Date(date);

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const day = newDate.getDate();
    const monthIndex = newDate.getMonth();
    const year = newDate.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  export const saveThreadInDb = (title) => {
    return new Promise( (resolve,reject) => {
      const emailFromLocalStorage = localStorage.getItem("email");
      const FULL_GET_SINGLE_USER_URL = ROUTES.GET_SINGLE_USER + `?email=${emailFromLocalStorage}`;
      
      axios.get(FULL_GET_SINGLE_USER_URL)
        .then(response => {
          const userFromDb = response.data.user;
          const postBody = {author:userFromDb._id,title};
          
          axios.post(ROUTES.POST_THREAD,postBody)
            .then(response => {
              const obj = {
                ...response.data.body,
                authorEmail: emailFromLocalStorage
              }
              resolve(obj);
            })
            .catch(e=> reject(e))
        })
        .catch( e=> reject(e))
    });
  }
