import axios from 'axios';


function getToken() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
        const data = JSON.parse(userData);
        return data.token;
    }
    return null;
}

const token = getToken();

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Chỉ đính kèm token nếu nó tồn tại
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    }
});
