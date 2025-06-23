import express from "express";
import customerRoutes from "./api/customer/customer.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import staffRoutes from "./api/staff/staff.routes.js";
import playAreaRoutes from "./api/playarea/playarea.routes.js";

const app = express();
app.use(express.json());

// Mount API routers customers
app.use("/api/customers", customerRoutes);

// Mount API routers staff
app.use("/api/staff", staffRoutes);

// Mount API routers playareas
app.use("/api/playareas", playAreaRoutes);

// Test Route
app.get("/", (req, res) => res.json({ message: "API is running" }));

// Error middleware
app.use(errorHandler);

export default app;
