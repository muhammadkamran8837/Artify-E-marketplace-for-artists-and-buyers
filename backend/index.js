const express = require("express");
const path = require("path"); // Import path module

const app = express();
const cors = require("cors");
const connectDatabase = require("./config/DbConnect");
const artistRoutes = require("./Routes/ArtistRoutes"); // Adjust the path as necessary
const adminRoutes = require("./Routes/adminRoutes"); // Adjust the path as necessary
const buyerUserRoutes = require("./Routes/buyerUserRoutes"); // Adjust the path as necessary
const orderRoutes = require("./Routes/orderRoutes");
const artRoutes = require("./Routes/artRoutes");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
connectDatabase();
app.use(express.json());
app.use("/api/artist", artistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/buyerUser", buyerUserRoutes);
app.use("/api/Order", orderRoutes);
app.use("/api/art", artRoutes);

const PORT = 8000;
const server = app.listen(8000, () => {
  console.log(`server running on port ${PORT}`);
});
