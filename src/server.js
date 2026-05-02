import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// // Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'system',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// GET-запит до маршруту "/notes" Список усіх нотаток
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

// Конкретний користувач за id
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', () => {
  // Штучна помилка для прикладу
  throw new Error('Simulated server error');
});

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd ? 'Server Error' : err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
