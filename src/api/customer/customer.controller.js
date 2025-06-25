import {
  registerCustomer,
  loginCustomer,
  fetchAllCustomers,
  removeCustomer 
} from "./customer.service.js";

export async function signup(req, res, next) {
  try {
    const user = await registerCustomer(req.body);
    res.status(201).json({ message: "Customer registered", user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginCustomer(req.body);
    res.json({ message: "Login successful", ...result });
  } catch (err) {
    next(err);
  }
}

export async function getCustomers(req, res, next) {
  try {
    const customers = await fetchAllCustomers();
    res.json({ customers });
  } catch (err) {
    next(err);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    const { id } = req.params;
    await removeCustomer(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    next(err);
  }
}
