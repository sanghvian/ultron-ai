import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users: { email: string, password: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token });
}
