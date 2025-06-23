import express from "express";
import customerRoutes from "./api/customer/customer.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

// Mount API routers
app.use("/api/customers", customerRoutes);

// Test Route
app.get("/", (req, res) => res.json({ message: "API is running" }));

// Error middleware
app.use(errorHandler);

export default app;
