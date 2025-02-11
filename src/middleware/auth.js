const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; // 토큰에서 사용자 정보 추출
        next();
    });
}

module.exports = authenticateToken;
