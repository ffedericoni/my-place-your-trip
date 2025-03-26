// In pages/profile.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

function ProfilePage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const session = await supabase.auth.getSession();

            if (!session?.data?.session?.user) {
                // If no session, redirect to login
                router.push('/login');
                return;
            }

            const user = session.data.session.user;
            setUser(user);
        };

        fetchUser();
    }, [router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Your Profile</h2>
                <p className="mb-2"><strong>User ID:</strong> {user.id}</p>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Full Name:</strong> {user.user_metadata.full_name || 'Not set'}</p>
            </div>
        </div>
    );
}

export default ProfilePage;