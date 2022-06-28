import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createError } from '../utils/error.js';

//USER REGISTER
export const register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send('User created Successfully!');
  } catch (err) {
    next(err);
  }
};

//USER LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) return next(createError(404, 'user is not found!'));
    const matchPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!matchPassword) return next(createError(400, 'user and password not matched!'));

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
