import { Router } from "express";

import { getAllContactsController, getContactByIdController, addContactController, deleteContactController, putchContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts',  ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(addContactController));

router.patch('/contacts/:contactId', ctrlWrapper(putchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;