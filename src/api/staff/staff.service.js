import { createStaff, findStaffByEmail } from "./staff.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_very_secret_key";

export async function registerStaff(data) {
  const hash = await bcrypt.hash(data.password, 10);
  const id = Date.now();
  const staff = {
    id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    roleId: data.roleId,
    username: data.username,
    password: hash,
  };
  await createStaff(staff);
  return { id, name: data.name, username: data.username };
}

export async function loginStaff({ email, password }) {
  const user = await findStaffByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.PASSWORD);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    {
      id: user.STAFFID,
      email: user.EMAIL,
      name: user.NAME,
      role: user.TITLE,
      roleId: user.ROLEID,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.STAFFID,
      name: user.NAME,
      mail: user.EMAIL,
      role: user.TITLE,
      roleId: user.ROLEID,
    },
  };
}
