import express from 'express';
import EntryController from '../controllers/EntryController';
import Validator from '../utils/validation';

const router = express.Router();
router.post('/entries', Validator.addEntry, EntryController.addEntry);

export default router;
