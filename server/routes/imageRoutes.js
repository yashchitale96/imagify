import express from 'express';
import { generateImage, getUserImages, toggleFavorite, deleteImage, bulkDeleteImages } from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post('/generate-image', userAuth, generateImage);
imageRouter.get('/gallery', userAuth, getUserImages);
imageRouter.post('/toggle-favorite', userAuth, toggleFavorite);
imageRouter.delete('/delete/:imageId', userAuth, deleteImage);
imageRouter.post('/bulk-delete', userAuth, bulkDeleteImages);

export default imageRouter;