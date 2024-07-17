"use client";


import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            // Redirect to shopping list page if the user is logged in
            router.push("/week-8/shopping-list");
        }
    }, [user, router]);

    const handleLogin = async () => {
        try {
            await gitHubSignIn();
            // Redirect to shopping list page after login
            router.push("/week-8/shopping-list");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await firebaseSignOut();
            // Redirect to landing page after logout
            router.push("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '3rem' }}>Shopping List App</h1>
            {!user ? (
                <button onClick={handleLogin}>Login with GitHub</button>
            ) : (
                <div>
                    <p>Welcome, {user.displayName} ({user.email})</p>
                    <button onClick={handleLogout}>Logout</button>
                    <a href="/week-8/shopping-list">Go to Shopping List</a>
                </div>
            )}
        </div>
    );
};

export default Page;
