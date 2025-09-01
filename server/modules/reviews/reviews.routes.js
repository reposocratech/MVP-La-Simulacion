import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import reviewsControllers from './reviews.controllers.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { reviewSchema } from '../../schemas/reviewSchema.js';
const router = express.Router();
router.get('/adminreviews', verifyToken, reviewsControllers.seeAllReview);
router.delete('/delreviewdata', verifyToken, reviewsControllers.delReview);
router.post('/createReview/:id', validateForm(reviewSchema), reviewsControllers.createReview);
router.get('/seereviews/:id', reviewsControllers.seeReview);

export default router;