import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import reviewsControllers from './reviews.controllers.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { reviewSchema } from '../../schemas/reviewSchema.js';
const router = express.Router();

router.post('/createReview', verifyToken, validateForm(reviewSchema), reviewsControllers.createReview);

export default router;