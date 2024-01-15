const mongoose = require('mongoose');

//database connectopn
mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'auth_tutorial',
})
.then((result) => console.log('db connected'))
.catch((err) => console.log(err, 'db errrds'));