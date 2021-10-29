const express = require('express');
const app = express();


const port = 500;

app.get('/', (req, res) => {
    res.send('I am cheking my website')
})

app.listen(port, () => {
    console.log('Hitting the server', port)
})