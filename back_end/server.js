//importing required modules and models so that we can use them in our server
const express = require('express'); 
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');
const Conference = require('./models/Conference');
const Article = require('./models/Article');
const Review = require('./models/Review');

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

//User Registration and Login
app.post('/auth/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (e) { res.status(500).json(e); }
});

//Login Route 
app.post('/auth/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (user) res.json({ message: "Success", user });
    else res.status(401).json({ error: "Invalid credentials" });
});

//Starting the server
app.listen(3000, () => console.log('Server running on port 3000'));

//Create a new Conference
//POST Request
app.post('/conferences', async(req, res)=>{
    try{
        const conf = await Conference.create(req.body);
        res.status(201).json(conf);
    } catch(e){
        res.status(500).json(e);
    }
});

//Get all the conferences
//GET Request
app.get('/conferences', async(req, res)=>{
    try{
        const conferences = await Conference.findAll();
        res.json(conferences); 
    } catch(e){
        res.status(500).json(e);
    }
});

//Submit Feedback
app.put('/reviews/:id', async(req, res) =>{
    try{
        await Review.update(req.body, {where: {id: req.params.id}});
        res.json({message: "Review updated"});
    } catch(e){
        res.status(500).json(e);
    }
});

//Get all Reviews
app.get('/reviews', async(req, res) =>{
    try{
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch(e){
        res.status(500).json(e);
    }
})

// Upload Article and Assign Reviewers
app.post('/articles', async (req, res) => {
    try {
        const { title, content, authorId, conferenceId } = req.body; //this is assigning the values from the request body to variables

        // 1. Create the Article
        const newArticle = await Article.create({
            title,
            content,
            authorId,
            conferenceId
        });

        // 2. Find ALL users who are Reviewers
        const allReviewers = await User.findAll({ where: { role: 'reviewer' } }); //returns an array of all reviewers

        if (allReviewers.length < 2) {
            return res.status(400).json({ message: "Not enough reviewers in the system!" });
        }

        // 3. Shuffle the list and pick 2 random reviewers
        const shuffled = allReviewers.sort(() => 0.5 - Math.random()); //the sort function will randomly compare two elements and shuffle the array
        const selectedReviewers = shuffled.slice(0, 2);

        // 4. Create the Review entries in the database for both reviewers
        for (const reviewer of selectedReviewers) {
            await Review.create({
                articleId: newArticle.id,
                reviewerId: reviewer.id,
                status: 'pending'
            });
        }

        res.status(201).json({ //201 means created
            message: "Article submitted and 2 reviewers assigned successfully!",
            article: newArticle,
            assignedTo: selectedReviewers.map(r => r.name) // Just for debugging, what map does is it creates a new array with the names of the reviewers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading article" }); // Internal Server Error
    }
});


