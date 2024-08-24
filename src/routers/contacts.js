import { Router } from "express";

import { getAllContactsController, getContactByIdController, addContactController, deleteContactController, putchContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { contactSchema, contactSchemaPutch } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {authenticate} from '../middlewares/authenticate.js';

const router = Router();

router.use('/',authenticate);

router.get('/',  ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(contactSchema), ctrlWrapper(addContactController));

router.patch('/:contactId', isValidId, validateBody(contactSchemaPutch), ctrlWrapper(putchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;