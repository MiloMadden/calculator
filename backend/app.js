const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use( cors({
    origin: "*", 
    optionsSuccessStatus: 200
}) )
app.use( express.json() )
app.use( express.static('public') )

app.use('/api', require('./routes/index'))

app.listen(port, ()=> console.log(`Working in port ${ port }`))
