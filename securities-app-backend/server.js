const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');

            // Test route to check server functionality
            app.get('/test', (req, res) => {
                res.send('Server is running and connected to the database!');
            });
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
