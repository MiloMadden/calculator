const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ["https://calculator-pied-three-52.vercel.app/", "https://calculator-nw4y7abpz-milomadden.vercel.app"]

app.use( cors({
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            return callback(null, origin)
        }
        return callback("Error de Cors perra")
    }
}) )
app.use( express.json() )
app.use( express.static('public') )

app.use('/api', require('./routes/index'))

app.listen(port, ()=> console.log(`Working in port ${ port }`))
