// Dependencies
const express = require("express")
const cors = require("cors")
const path = require("path")
const requestIp = require('request-ip');
const mongoose = require("mongoose")
//yuri:fgmbr4YF9icExBW8
// Mongoose instance
const mongoDB = "mongodb+srv://yuri:fgmbr4YF9icExBW8@react-fjapq.mongodb.net/reactTest?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', err => handleError(err));

//Schema instance
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { type: String, required: [true, 'Id missing!'] },
    name: { type: String, required: [true, 'Name missing!'] }
})

var User = mongoose.model('users', UserSchema)

// Express app instance
const app = express();

// app config
app.use(cors())
app.use(requestIp.mw())

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

// Routes (Remember to send this to an external file an use a router middleware)
app.get('/getUsers', async function (req, res, next) {
    let query = User.find({})
    query.exec(function (err, rows) {
        if (err) return next(err);
        res.json(rows);
    });
});

app.post('/addUser', function (req, res, next) {
    let ip = req.clientIp;
    let { name } = req.query

    let user = new User({
        id: ip,
        name:name
    })

    user.save(function (err, doc) {
        if (err) return next(err);
        res.json(doc)
    })
});

app.delete('/delUser', function (req, res, next) {
    let { _id } = req.query
    
    User.findOne({ _id: _id }, (err, user) => {
        if (err) return next(err);
        user.remove()
        res.sendStatus(200)
    })
    
});

app.get('/myIp', function (req, res, next) {
    let ip = req.clientIp;

    let user = new User({
        id:ip,
        ip: ip,
        name: ip
    })

    user.save(function (err, doc) {
        if (err) return next(err);
        res.json(doc)
    })
})

app.get('/getIp', function (req, res, next) {
    let ip = req.clientIp;
    
    let query = User.find({"id":ip}).countDocuments()
    query.exec(function (err, rows) {
        if (err) return next(err);
        res.json(rows)
    });
})

app.get('/getName', function (req, res, next) {
    let ip = req.clientIp;
    
    let query = User.find({"id":ip})
    query.exec(function (err, rows) {
        if (err) return next(err);
        res.json(rows)
    });
})
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname+'/client/build/index.html'));
//});
  
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))