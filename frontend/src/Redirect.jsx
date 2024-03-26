import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const Redirect = () => {
    const token = Cookies.get('token');

    useEffect(() => {
        if (token) {
            window.location.href = '/home';
        } else {
            window.location.href = '/login';
        }
    }, [token]); // Include token as dependency to ensure useEffect runs when token changes

    return (
        <div>
        </div>
    );
};

export default Redirect;