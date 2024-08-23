import { Schema, model } from "mongoose";

const contactSchema = new Schema ({
    name: {
        type: String,
        required: true,
		minlength: 3,
        maxlength: 20,
      },
      phoneNumber:  {
        type: String,
        required: true,
		minlength: 3,
        maxlength: 20,
      },
      email: {
        type: String,
        required: false,
      },
      isFavourite: {
        type: Boolean,
        default: false,
      },
      contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal',
		minlength: 3,
        maxlength: 20,
      },
}, {
    timestamps: true
}
);

export const contactsCollection = model('contacts', contactSchema);