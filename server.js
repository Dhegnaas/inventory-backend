const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');

app.use(cors()); // <-- TAN MUHIIM AYAA AH
app.use(express.json());

app.use('/api/customers', customerRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 8000}`);
});
