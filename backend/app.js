const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use( cors() )
app.use( express.json() )
app.use( express.static('public') )

app.use('/api', require('./routes/index'))

app.listen(port, ()=> console.log(`Working in port ${ port }`))
