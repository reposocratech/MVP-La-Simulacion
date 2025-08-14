import express from 'express';
const router = express.Router();

/* GET services listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
