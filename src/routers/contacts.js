import { Router } from "express";

import { getAllContactsController, getContactByIdController, addContactController, deleteContactController, putchContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { contactSchema, contactSchemaPutch } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/contacts',  ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(contactSchema), ctrlWrapper(addContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(contactSchemaPutch), ctrlWrapper(putchContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;