const express = require('express');
const Doc = require('../models/Doc');

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
    const { version, content } = req.body;
    try {
        const doc = await Doc.findOne();

        if (!doc) {
            return res.status(404).json({ message: '문서를 찾을 수 없습니다.' });
        }

        // 충돌 처리: 클라이언트가 보낸 버전이 서버의 최신 버전보다 낮은 경우
        if (version < doc.version) {
            return res.status(409).json({ message: '버전 충돌이 발생했습니다.' });
        }

        // 문서 업데이트
        doc.content = content;
        doc.version += 1;
        await doc.save();

        res.json({ message: '문서가 성공적으로 업데이트되었습니다.', doc });
    } catch (error) {
        res.status(500).json({ error: '문서를 업데이트하는 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
