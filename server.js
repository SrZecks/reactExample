// Dependencies
const express = require("express")
const cors = require("cors")
const mariadb = require("mariadb");

// Mariadb pool cluster
const pool = mariadb.createPool({ host: "127.0.0.1", user: "root", password: "102030", connectionLimit: 5 });

// Express app instance
const app = express();

// app config
app.use(cors())

// Routes (Remember to send this to an external file an use a router middleware)
app.get('/getUsers', function (req, res) {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM react.users ORDER BY name ASC")
                .then(rows => { // rows: [ {val: 1}, meta: ... ]
                    res.json(rows)
                    conn.release();
                })
                .catch(err => {
                    console.log(err)
                    conn.release(); // release to pool
                })

        }).catch(err => {
            console.log(err)
            //not connected
        });
});

app.post('/addUser', function (req, res) {
    let { id, name } = req.query
    
    pool.getConnection()
        .then(conn => {
            conn.query("INSERT INTO react.users(id,name) VALUES(?,?)", [id,name])
                .then(rows => {
                    return conn.query("SELECT * FROM react.users WHERE id = ?",[id])
                })
                .then(result => { // rows: [ {val: 1}, meta: ... ]
                    res.status(200).json(result)
                    conn.release();
                })
                .catch(err => {
                    res.status(400).send('Erro ao executar a query')
                    console.log(err)
                    conn.release(); // release to pool
                })

        }).catch(err => {
            res.status(400).send('Erro ao Conectar no banco')
            console.log(err) //not connected
        });    
});

app.delete('/delUser', function (req, res) {
    pool.getConnection()
    .then(conn => {
        conn.query("DELETE FROM react.users WHERE id = ?",[req.query.id])
            .then(rows => { // rows: [ {val: 1}, meta: ... ]
                res.status(200).json(rows)
                conn.release();
            })
            .catch(err => {
                res.status(400).send('Erro ao executar a query')
                console.log(err)
                conn.release(); // release to pool
            })

    }).catch(err => {
        res.status(400).send('Erro ao Conectar no banco')
        console.log(err) //not connected
    });  
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))