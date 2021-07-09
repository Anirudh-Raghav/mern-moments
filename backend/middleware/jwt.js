import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'test';

const validateToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;

        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]

            if (bearerToken && bearerToken.length < 500) {
                const decodedData = jwt.verify(bearerToken, secretKey);

                req.token = bearerToken
                req.userId = decodedData?.id;
            } else {
                const decodedData = jwt.decode(bearerToken);

                req.token = bearerToken
                req.userId = decodedData?.sub;
            }

            next();
        }
    }
    catch (err) {
        console.error(err);
    }
};

export default validateToken;