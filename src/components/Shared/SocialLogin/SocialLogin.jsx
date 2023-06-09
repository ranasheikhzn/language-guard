import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SocialLogin = () => {
    const {googleSingIn, twitterSingIn} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSingIn()
        .then(result => {
            const user = result.user;
            console.log(user)
            alert("Successfully login with google!")

            const newUser = {name: user.displayName, email: user.email, role: 'student', image: user.photoURL}
            // call a post api to send users to the server 
            axios.post('/users', newUser)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error))

            navigate(from, {replace: true})
        })
        .catch(error => console.log(error))
    }

    const handleTwitterSingIn = () => {
        twitterSingIn()
        .then(result => {
            const user = result.user;
            console.log(user)
            alert("Successfully login with Twitter!")

            // Here I created a random email with twitter username because there are no accessible email
            const newUser = {name: user.displayName, email: `${user.reloadUserInfo.screenName}.yahoo.com`, role: 'student', image: user.photoURL}
            // call a post api to send users to the server 
            axios.post('/users', newUser)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error))

            navigate(from, {replace: true})
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='text-center mb-4'>
        <div className='flex gap-4 justify-center items-center mb-4'>
            <button onClick={handleGoogleSignIn} className='flex items-center p-2.5 w-full rounded-lg border cursor-pointer hover:bg-neutral-200 text-sm font-medium'><FaGoogle /> <span className='mx-auto'>Continue with</span></button>

            <div className='h-[30px] w-[1px] bg-gray-400'></div>

            <button onClick={handleTwitterSingIn} className='flex items-center p-2.5 w-full rounded-lg border cursor-pointer hover:bg-neutral-200 text-sm font-medium'><FaTwitter /> <span className='mx-auto'>Continue with</span></button>
        </div>
        <span className='text-sm font-medium'>Or use your account</span>
        </div>
    );
};

export default SocialLogin;