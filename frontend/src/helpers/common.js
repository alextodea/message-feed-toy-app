const axios = require("axios");
const jwtDecode = require("jwt-decode");

exports.formatDate = (date) => {

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