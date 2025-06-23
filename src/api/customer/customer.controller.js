import { registerCustomer, loginCustomer } from './customer.service.js';

export async function signup(req, res, next) {
  try {
    const user = await registerCustomer(req.body);
    res.status(201).json({ message: 'Customer registered', user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await loginCustomer(req.body);
    res.json({ message: 'Login successful', user });
  } catch (err) {
    next(err);
  }
}