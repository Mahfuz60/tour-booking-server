import express from 'express';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

//user Authentication check
router.get('/checkAuthentication', verifyToken, (req, res, next) => {
  res.send('hello user, you are successfully login! ');
});
//user Authorized  check
router.get('/checkUser/:id', verifyUser, (req, res, next) => {
  res.send('hello user, you are update and delete this account! ');
});

//UPDATE
router.put('/:id', updateUser);
//DELETE
router.delete('/:id', deleteUser);
//GET
router.get('/:id', getUser);
//GET ALL
router.get('/', getAllUser);

export default router;
