import express from 'express';
import servicesControllers from './services.controllers.js';
import { formCoopSchema } from '../../schemas/formCoopSchema.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { uploadImageSingle } from '../../middlewares/multerSingle.js';
import { createCoopSchema } from '../../schemas/createCoopSchema.js';
const router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/servicescoop', validateForm(formCoopSchema) , servicesControllers.sendMailServCoop);
router.get('/servicescoop', servicesControllers.getDataServCoop)
router.post('/createservicecoop', verifyToken , uploadImageSingle("servCoop") ,validateForm(createCoopSchema) , servicesControllers.createServCoop);
router.put('/delservcoop', verifyToken  , servicesControllers.servCoopDel);


export default router;
