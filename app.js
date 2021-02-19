const express = require('express')
const app = express()
const port = process.env.PORT || 80

// meer open dan standaard (naar http https toe)
var cors = require('cors')
app.use(cors())

// extra code van wesley op Slack
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var bodyParser = require('body-parser');
app.use(bodyParser.json())

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'wjajqjouwoxhrb',
    host: 'ec2-54-220-35-19.eu-west-1.compute.amazonaws.com',
    database: 'd8s9pctqablfnu',
    password: '57df057335925e89558e574a075d9e3cb08c69a537ddbf6849f91a9eff6f086a',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,

    },
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/lijst', (req, res) => {
    // QUERY UITVOEREN
    pool.query('SELECT * FROM LIJST', (err, res2) => {
        // console.log(res2);
        res.send(JSON.stringify(res2.rows));
    })
})

// GET SNACK
app.get('/frituursnacks/:id', (req, res) => {
    pool.query('SELECT * FROM frituursnacks WHERE id ='+req.params.id, (err, res2) => {
        res.send(JSON.stringify(res2.rows[0]));
    })
})

// GET SNACKS
app.get('/frituursnacks', (req, res) => {
    // QUERY UITVOEREN
    pool.query('SELECT * FROM frituursnacks ORDER BY naam', (err, res2) => {
        // console.log(res2);
        res.send(JSON.stringify(res2.rows));
    })
})

// ADD SNACK MY WAY
app.post('/frituursnacks/nieuw', (req, res) => {
    // console.log(req.body);
    // hier INSERT INTO insteken
    pool.query("INSERT INTO frituursnacks(naam, frituurtijd, vegetarisch) VALUES('"+req.body.naam + "', '" + req.body.frituurtijd + "', '" + req.body.vegetarisch+"')", (err, res3) => {
    });
    res.send("[]")
})

// ADD SNACK MELISSA'S WAY - template literals
/* app.post('/frituursnacks/nieuw', (req, res) => {
    // console.log(req.body);
    pool.query(`INSERT INTO frituursnacks(naam,frituurtijd,vegetarisch) VALUES('${req.body.naam}','${req.body.frituurtijd}','${req.body.vegetarisch}')`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.send('De ' + req.body.naam + ' werd succesvol toegevoegd');
        });
}); */

app.get('/test', (req, res) => {
    let arr = ['wesley', 'laura', 'brent'];
    res.send(JSON.stringify(arr));
})

app.put('/frituursnacks/:id', (req, res) => {
    // console.log(req.body);
    // hier INSERT INTO insteken
    pool.query("UPDATE frituursnacks SET naam = '"+req.body.naam+"', frituurtijd = '"+req.body.frituurtijd+"', vegetarisch = '"+req.body.vegetarisch+"' WHERE id="+req.params.id, (err, res3) => {
    });
    res.send("[]")
})

app.delete('/frituursnacks/delete/:id', (req, res) => {
    // console.log(req.body);
    // hier INSERT INTO insteken
    pool.query("DELETE FROM frituursnacks WHERE id="+req.params.id, (err, res3) => {
    });
    res.send("[]")
})

app.listen(port, () => {
    console.log(`App Server luistert op poort ${port}`)
})