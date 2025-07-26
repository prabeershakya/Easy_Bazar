const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require('./DB/Database')
const userRoutes = require("./Routes/userRoute");

const app = express();
const PORT = 5000;

// Middleware
// app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running fine!");
});


app.use('/api/user', userRoutes);

const StartServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true});
        app.listen(PORT, () => {
            console.log(`Server running at localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error(error)
    }
}

StartServer();  
