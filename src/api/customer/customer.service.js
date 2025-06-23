import { createCustomer, findCustomerByUsername } from "./customer.model.js";
import bcrypt from "bcrypt";

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

export async function loginCustomer({ username, password }) {
  const user = await findCustomerByUsername(username);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.PASSWORD);
  if (!isMatch) throw new Error("Invalid password");

  return { id: user.CUSTOMERID, name: user.NAME, username };
}
