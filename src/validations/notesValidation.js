import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().trim(),
    content: Joi.string().allow('').optional().trim(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

// Кастомний валідатор для ObjectId
const objectIdValidation = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

// Окрема схема для noteId
const noteIdSchema = Joi.object({
  noteId: Joi.string().custom(objectIdValidation).required(),
});

// Схема для перевірки параметра noteId
export const noteIdParamSchema = {
  [Segments.PARAMS]: noteIdSchema,
};

export const updateNoteSchema = {
  [Segments.PARAMS]: noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional().trim(),
    content: Joi.string().allow('').optional().trim(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).min(1), // Вимагаємо принаймні одне поле для оновлення
};
