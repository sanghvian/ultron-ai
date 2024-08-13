import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token || !jwt.verify(token, process.env.JWT_SECRET!)) {
                router.push('/signin');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
