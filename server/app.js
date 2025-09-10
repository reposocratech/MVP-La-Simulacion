import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Importaciones de rutas:
import usersRoutes from './modules/users/users.routes.js';
import servicesRoutes from './modules/services/services.routes.js';
import roomsRoutes from './modules/rooms/rooms.routes.js';
import eventsRoutes from './modules/events/events.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';
import reviewsRoutes from './modules/reviews/reviews.routes.js';


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares:
//app.use(cors({origin: 'http://localhost:5173'})); 
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middlewares de rutas:
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/reviews', reviewsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // response with the error json
  res.status(err.status || 500).json(err);
});

export default app;
