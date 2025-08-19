import express from 'express';
import servicesControllers from './services.controllers.js';
import { formCoopSchema } from '../../schemas/formCoopSchema.js';
import { validateForm } from '../../middlewares/validateForm.js';
const router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/servicescoop', validateForm(formCoopSchema) , servicesControllers.sendMailServCoop);


export default router;
