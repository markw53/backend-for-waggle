import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000; // Use the Render-assigned port or default to 10000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
