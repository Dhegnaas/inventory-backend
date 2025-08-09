const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());            // Allow cross-origin requests
app.use(logger);            // Log all requests
app.use(express.json());    // Parse JSON bodies

// Routes
app.use('/api/customers', customerRoutes);

// Error handler middleware LAST
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

