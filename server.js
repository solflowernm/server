const express = require('express')
const app = express() 
const port = 3000 
// const cors = require('cors')

// app.use(cors)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
  });

require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')



connection.connect((err) => { 
    if(err){ 
        console.error('error connecting to database', err.message); 
        return; 
    }
    console.log('connected to database')
})
app.get('/', (req, res) =>  
    res.send('this is a test')
)  
app.get('/strains', (req, res) => { 
    connection.query('SELECT * FROM strains', (queryError, results) => { 
        if(queryError){ 
            console.error('error querying', queryError.message)
            return; 
        }

        res.json(results)
    })
})
app.get('/pages', (req, res) => { 
    connection.query('SELECT * FROM pages', (queryError, results) => { 
        if(queryError){ 
            console.error('error querying', queryError.message)
        }
        res.json(results)
    })
})
app.listen(port, () => { 
    console.log('server is running on port ' + port)
})