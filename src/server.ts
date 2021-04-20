import express from 'express';

import './database';
import { settingRepository } from './repositories/setting.repository';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.post('/', async (req, res) => {
  const { username, chat } = req.body;

  const setting = settingRepository().create({
    username,
    chat,
  });
  await settingRepository().save(setting);

  return res.status(201).json(setting);
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`\nServer is running on port ${port}`);
});
