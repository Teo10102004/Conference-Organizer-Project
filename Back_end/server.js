const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test DB Connection and Sync
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync({ force: true }); // Using force: true to reset DB for fresh test
    })
    .then(() => console.log('Database synced'))
    .catch(err => console.log('Error: ' + err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/conferences', require('./routes/conferenceRoutes'));
app.use('/api', require('./routes/paperRoutes'));

app.get('/', (req, res) => res.send('ConfHub API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
