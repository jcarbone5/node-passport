const { connect } = require("mongoose");

const connectDB = async () => {
    try {
        await connect("mongodb://localhost/node-passport", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB is conected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDB
}