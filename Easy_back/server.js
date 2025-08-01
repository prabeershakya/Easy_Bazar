const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize, connectDB } = require('./DB/Database')
const userRoutes = require("./Routes/userRoute");
const productRoutes = require("./Routes/productRoutes");
const wishlistRoutes = require("./Routes/wishlistRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));



app.get("/", (req, res) => {
  res.send("server is running fine!");
});

app.use(express.json());
// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/wishlist', wishlistRoutes);


const StartServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({});
        app.listen(PORT, () => {
            console.log(`Server running at localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error(error)
    }
}

StartServer();  
