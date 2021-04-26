import { Router } from 'express';

const routes = Router();

routes.get('/client', (req, res) => {
  return res.render('html/client.html');
});

routes.get('/admin', (req, res) => {
  return res.render('html/admin.html');
});

export default routes;
