import express from "express";
import cors from "cors";
import path from "path";
import customerRoutes from "./api/customer/customer.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import staffRoutes from "./api/staff/staff.routes.js";
import playAreaRoutes from "./api/playarea/playarea.routes.js";
import bookingRoutes from "./api/booking/booking.routes.js";
import responsibilityRoutes from "./api/responsibility/responsibility.routes.js";
import staffScheduleRoutes from "./api/staffSchedule/staffSchedule.routes.js";
import bookingStaffRoutes from "./api/bookingStaff/bookingStaff.routes.js";
import paymentRoutes from "./api/payment/payment.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.resolve("uploads")));

// Mount API routers customers
app.use("/api/customers", customerRoutes);

// Mount API routers staff
app.use("/api/staff", staffRoutes);

// Mount API routers playareas
app.use("/api/playareas", playAreaRoutes);

// Mount API routers booking
app.use("/api/bookings", bookingRoutes);

// Mount API routers responsibilities
app.use("/api/responsibilities", responsibilityRoutes);

// Mount API routers responsibilities
app.use("/api/staff-schedules", staffScheduleRoutes);

// Mount API routers bookingStaff
app.use("/api/booking-staff", bookingStaffRoutes);

// Mount API routers payment
app.use("api/payment", paymentRoutes);

// Test Route
app.get("/", (req, res) => res.json({ message: "API is running" }));

// Error middleware
app.use(errorHandler);

export default app;
