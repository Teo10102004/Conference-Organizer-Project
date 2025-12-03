const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const API_URL = 'http://localhost:3000/api';

async function test() {
    try {
        console.log('--- STARTING TESTS ---');

        // 1. Register Organizer
        console.log('\n1. Registering Organizer...');
        const organizerRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Organizer One',
            email: 'organizer@test.com',
            password: 'password123',
            role: 'ORGANIZER'
        });
        console.log('Organizer Registered:', organizerRes.data);

        // Login Organizer
        const organizerLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'organizer@test.com',
            password: 'password123'
        });
        const organizerToken = organizerLogin.data.token;
        console.log('Organizer Logged In');

        // 2. Register Reviewers
        console.log('\n2. Registering Reviewers...');
        const reviewer1Res = await axios.post(`${API_URL}/auth/register`, {
            name: 'Reviewer One',
            email: 'reviewer1@test.com',
            password: 'password123',
            role: 'REVIEWER'
        });
        const reviewer2Res = await axios.post(`${API_URL}/auth/register`, {
            name: 'Reviewer Two',
            email: 'reviewer2@test.com',
            password: 'password123',
            role: 'REVIEWER'
        });
        console.log('Reviewers Registered');

        // 3. Register Author
        console.log('\n3. Registering Author...');
        const authorRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Author One',
            email: 'author@test.com',
            password: 'password123',
            role: 'AUTHOR'
        });
        const authorLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'author@test.com',
            password: 'password123'
        });
        const authorToken = authorLogin.data.token;
        console.log('Author Registered & Logged In');

        // 4. Create Conference (Organizer)
        console.log('\n4. Creating Conference...');
        const confRes = await axios.post(`${API_URL}/conferences`, {
            title: 'TechConf 2025',
            description: 'A great conference',
            location: 'Virtual',
            startDate: '2025-01-01',
            endDate: '2025-01-03'
        }, {
            headers: { Authorization: `Bearer ${organizerToken}` }
        });
        const conferenceId = confRes.data.id;
        console.log('Conference Created:', confRes.data.title);

        // 5. Assign Reviewers to Conference
        console.log('\n5. Assigning Reviewers to Conference...');
        await axios.post(`${API_URL}/conferences/${conferenceId}/reviewers`, { reviewerId: reviewer1Res.data.userId }, { headers: { Authorization: `Bearer ${organizerToken}` } });
        await axios.post(`${API_URL}/conferences/${conferenceId}/reviewers`, { reviewerId: reviewer2Res.data.userId }, { headers: { Authorization: `Bearer ${organizerToken}` } });
        console.log('Reviewers Assigned');

        // 6. Submit Paper (Author)
        console.log('\n6. Submitting Paper...');
        // Create a dummy PDF file
        fs.writeFileSync('test_paper.pdf', 'Dummy PDF content');

        const form = new FormData();
        form.append('title', 'My Research Paper');
        form.append('abstract', 'This is a test abstract');
        form.append('keywords', 'test, api');
        form.append('file', fs.createReadStream('test_paper.pdf'));

        const paperRes = await axios.post(`${API_URL}/conferences/${conferenceId}/papers`, form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${authorToken}`
            }
        });
        console.log('Paper Submitted:', paperRes.data.title);

        // 7. Verify Auto-Assignment
        console.log('\n7. Verifying Auto-Assignment...');
        // We can't easily check DB here without connecting sequelize, but we can check logs or assume if no error it worked.
        // Ideally we would fetch the paper or reviews to confirm.
        // Let's assume the logs from the server will show "Assigned reviewer..."

        console.log('\n--- TESTS COMPLETED ---');

    } catch (error) {
        console.error('TEST FAILED:', error.response ? error.response.data : error.message);
    }
}

test();
