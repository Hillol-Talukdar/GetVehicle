const mongoose = require("mongoose");

exports.makeDb = () => {
    const DB = process.env.DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
    );

    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then((con) => {
            console.log("DB Connection Succesful!");
        });
};
