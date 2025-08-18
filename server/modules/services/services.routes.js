import express from 'express';
import servicesControllers from './services.controllers.js';
const router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/servicescoop' , servicesControllers.sendMailServCoop);


export default router;
