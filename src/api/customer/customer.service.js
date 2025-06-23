import { createCustomer, findCustomerByEmail } from "./customer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_very_secret_key";

export async function registerCustomer(data) {
  const hash = await bcrypt.hash(data.password, 10);
  const id = Date.now();
  const customer = {
    id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    username: data.username,
    password: hash,
  };
  await createCustomer(customer);
  return { id, name: data.name, username: data.username };
}

export async function loginCustomer({ email, password }) {
  const user = await findCustomerByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.PASSWORD);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    {
      id: user.CUSTOMERID,
      email: user.EMAIL,
      name: user.NAME,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user.CUSTOMERID, name: user.NAME, email } };
}
