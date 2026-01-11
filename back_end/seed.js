const { User, Conference, sequelize } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Warning: This clears the DB first!
        
        // 1. Create Users
        const admin = await User.create({ name: 'Admin User', email: 'admin@conf.com', password: 'admin123', role: 'organizer' });
        const author = await User.create({ name: 'Author One', email: 'author@test.com', password: 'author123', role: 'author' });
        const rev1 = await User.create({ name: 'Reviewer One', email: 'rev1@test.com', password: 'rev123', role: 'reviewer' });
        const rev2 = await User.create({ name: 'Reviewer Two', email: 'rev2@test.com', password: 'rev123', role: 'reviewer' });

        // 2. Create a Conference
        await Conference.create({ 
            name: 'Tech Future 2025', 
            description: 'AI and Robotics', 
            organizerId: admin.id 
        });

        console.log("Database seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();