import express from 'express';
import entryController from '../controllers/EntryController';

const router = express.Router();
router.get('/', entryController.getEntries);

export default router;
