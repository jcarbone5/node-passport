const app = require("./app");
const { connectDB } = require("./database");

const start = async () => {
    try {
        await app.listen(app.get("port"));
        await connectDB();

        console.log("Server on port", app.get("port"));
    } catch (error) {
        console.log(error);
    }
};

start();