// code away!

require('dotenv').config;

const port = process.env.PORT || 8000;

const server = require('./server.js');

server.listen(port, () => {
    console.log(`\n server running on ${port}  \n`);
})