const axios = require("axios");

async function getUserById(userId){

    const resp = await axios.get(`https://jsonplaceholder.typicode.com/todos/${userId}`);
    return resp.data;  
}

module.exports = getUserById;