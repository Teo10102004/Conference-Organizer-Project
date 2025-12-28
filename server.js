const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');
const Conference = require('./models/Conference');

//initializing the app
const app = express();
app.use(express.json());
app.use(cors());

/**
 * DATABASE SYNCHRONIZATION
 * sequelize.sync(): Automatically creates tables if they don't exist.
 * 'force: false' ensures we don't overwrite data on restart.
 */
sequelize.sync({ force: false }).then(() => console.log('Database & tables created!'));

app.post('/auth/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (e) { res.status(500).json(e); }
});

app.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (user) res.json({ message: "Success", user });
    else res.status(401).json({ error: "Invalid credentials" });
});


app.listen(3000, () => console.log('Server running on port 3000'));