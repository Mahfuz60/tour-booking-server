import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);
//GET SINGLE HOTEL
router.get('/find/:id', getHotel);
//GET ALL
router.get('/', getAllHotel);

//count by city
router.get('/countByCity', countByCity);

router.get('/countByType', countByType);

export default router;
