const express = require('express');
const Doc = require('../models/Doc');
const { applyChanges, adjustChangesForConflict } = require('../utils/operationalTransform');

const router = express.Router();

// 문서 조회 API
router.get('/', async (req, res) => {
    try {
        const doc = await Doc.findOne();
        if (!doc) {
            return res.status(404).json({ message: '문서를 찾을 수 없습니다.' });
        }
        res.json(doc);
    } catch (error) {
        res.status(500).json({ error: '문서를 조회하는 중 오류가 발생했습니다.' });
    }
});

// 문서 변경 API
router.post('/update', async (req, res) => {
    const { version, changes } = req.body;
    try {
        const doc = await Doc.findOne();

        if (!doc) {
            return res.status(404).json({ message: '문서를 찾을 수 없습니다.' });
        }

        // 충돌 처리: 클라이언트 버전이 서버 버전보다 낮은 경우
        if (version < doc.version) {
            const adjustedChanges = adjustChangesForConflict(doc.content, doc.version, version, changes);
            doc.content = applyChanges(doc.content, adjustedChanges);
        } else {
            doc.content = applyChanges(doc.content, changes);
        }

        // 버전 증가 및 저장
        doc.version += 1;
        console.log('Updated content:', doc.content);
        console.log('Updated version:', doc.version);
        await doc.save();

        res.json({ message: '문서가 성공적으로 업데이트되었습니다.', doc });
    } catch (error) {
        console.error('Error updating document:', error); // 에러 로그
        res.status(500).json({ error: '문서를 업데이트하는 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
