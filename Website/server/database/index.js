const mongoose = require('mongoose');

exports.makeDb = () => {
    const DB = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    );

    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        })
        .then(() => {
            console.log('DB Connection Succesful!');
        })
        .catch((err) => console.log(err));
};
