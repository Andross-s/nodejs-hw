import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'Todo',
      enum: TAGS,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.index({ title: 'text', content: 'text', tag: 1 }); // Додаємо текстовий індекс

export const Note = model('Note', noteSchema);
