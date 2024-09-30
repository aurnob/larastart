import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    handleLogout();
};

export default Logout;
