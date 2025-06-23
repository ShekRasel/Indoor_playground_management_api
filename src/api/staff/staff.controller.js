import { registerStaff, loginStaff } from './staff.service.js';

export async function signup(req, res, next) {
  try {
    const user = await registerStaff(req.body);
    res.status(201).json({ message: 'Staff registered', user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginStaff(req.body);
    res.json({ message: 'Login successful', ...result });
  } catch (err) {
    next(err);
  }
}