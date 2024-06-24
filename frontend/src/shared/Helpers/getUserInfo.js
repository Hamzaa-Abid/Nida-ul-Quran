
const getUserInfo = async () => {
    const info = await localStorage.getItem('userInfo');
    const role = JSON.parse(info);  
    return role;
}

 

export default getUserInfo;