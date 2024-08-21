import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', 3000));
export function setupServer() {
    const app = express();
    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
      );
    app.use(cors());

    app.get('/contacts', async (req, res) => {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
      });
    } );

    app.get('/contacts/:contactId', async (req, res) => {
      const {contactId} = req.params;
      const contact = await getContactById(contactId);
      if(!contact) {
        res.status(404).json({
          message: 'Contact not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        });
      }
    });

    app.use((req, res, next) => {
        res.status(404).send(
            {
                message: 'Not found!',
              }
        );
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}