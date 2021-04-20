import app from './App';

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`\nServer is running on port ${port}`);
});
