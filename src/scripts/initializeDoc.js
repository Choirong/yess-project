const mongoose = require('mongoose');
const Doc = require('../models/Doc'); // Doc 모델 경로

async function initializeDoc() {
    try {
        await mongoose.connect('mongodb://localhost:27017/yess-project');

        console.log('Connected to MongoDB');

        // 기존 문서 삭제
        await Doc.deleteMany({});

        // 초기 문서 생성
        const initialDoc = new Doc({
            content: 'ABCDE',
            version: 10,
        });

        await initialDoc.save();
        console.log('Initial document added successfully:', initialDoc);

        mongoose.disconnect();
    } catch (error) {
        console.error('Error initializing document:', error);
    }
}

initializeDoc();
