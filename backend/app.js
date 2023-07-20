const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173', 'https://calculator-pied-three-52.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use( cors() )
app.use( express.json() )
app.use( express.static('public') )

app.use('/api', require('./routes/index'))

app.listen(port, ()=> console.log(`Working in port ${ port }`))
