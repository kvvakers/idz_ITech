import express from 'express';
import cors from 'cors';
import { useDBConnection } from './connection.js';
import { useActorController } from './controllers/actor.js';
import { useGenreController } from './controllers/genre.js';
import { useFilmController } from './controllers/films.js';

export const app = express();
const port = 3000;

app.use(cors());

const conn = useDBConnection();

useActorController(app, conn);
useGenreController(app, conn);
useFilmController(app, conn);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
n