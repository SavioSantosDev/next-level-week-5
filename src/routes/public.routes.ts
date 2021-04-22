import { Router } from 'express';

const routes = Router();

routes.get('/client', (req, res) => {
  return res.render('html/client.html');
});

export default routes;
