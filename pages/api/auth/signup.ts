import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users: { email: string, password: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ email, password: hashedPassword });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(201).json({ token });
}
