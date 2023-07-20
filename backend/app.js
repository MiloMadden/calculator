const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ["https://calculator-pied-three-52.vercel.app/", "https://calculator-nw4y7abpz-milomadden.vercel.app"]

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            return callback(null, origin)
        }
        return callback("Error de Cors perra")
    }, 
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}

app.use( cors() )
app.use( express.json() )
app.use( express.static('public') )

app.use('/api', require('./routes/index'))

app.listen(port, ()=> console.log(`Working in port ${ port }`))
