import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IndieHub API Server is running on port ${PORT}`);
});
