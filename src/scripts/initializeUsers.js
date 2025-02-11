const mongoose = require('mongoose');
const User = require('../models/User'); // User 모델 경로

async function initializeUsers() {
    try {
        await mongoose.connect('mongodb://localhost:27017/yess-project');

        console.log('Connected to MongoDB');

        // 기존 유저 삭제
        await User.deleteMany({});

        // 유저 A와 B 생성
        const users = [
            { email: 'A@example.com', name: 'A' },
            { email: 'B@example.com', name: 'B' },
        ];

        await User.insertMany(users);
        console.log('Users A and B added successfully');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error initializing users:', error);
    }
}

initializeUsers();
