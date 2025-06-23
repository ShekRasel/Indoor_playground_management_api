import dotenv from "dotenv";
dotenv.config();

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID || "101";

export function isAdmin(req, res, next) {
  try {
      console.log("Checking Admin: ", req.user);
    if (!req.user || String(req.user.roleId) !== String(ADMIN_ROLE_ID)) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    next(err);
  }
}
