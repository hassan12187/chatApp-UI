import {useCookies} from 'react-cookie';
const checkToken = ()=>{
    const cookie = useCookies();
    const token = cookie[0].token;
    return token;
};
export default checkToken;