// Dependencies
const express = require("express")
const cors = require("cors")
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

// Routes (Remember to send this to an external file an use a router middleware)
app.get('/getUsers', async function (req, res, next) {
    let query = User.find({}).select({ "name": 1, "_id": 1 })
    query.exec(function (err, rows) {
        if (err) return next(err);
        res.json(rows);
    });
});

app.post('/addUser', function (req, res, next) {
    let { id, name } = req.query

    let user = new User({
        id: id,
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

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))