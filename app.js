const express = require('express')
const app = express()
const port = process.env.PORT || 80

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

pool.query('SELECT * FROM TABEL', (err, res2) => {
       console.log(res2);
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

app.get('/test', (req, res) => {
    let arr = ['wesley', 'laura', 'brent'];
    res.send(JSON.stringify(arr));
})

app.listen(port, () => {
    console.log(`App Server luistert op poort ${port}`)
})