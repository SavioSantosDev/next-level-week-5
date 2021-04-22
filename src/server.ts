import app from './app';
import './websockets/client.ws';

const port = process.env.PORT || 3333;
app.http.listen(port, () => {
  console.log(`\nServer is running on port ${port}`);
});
