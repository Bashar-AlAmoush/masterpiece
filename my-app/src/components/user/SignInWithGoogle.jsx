import { gapi } from 'gapi-script'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInWithGoogle({massage, path, updateIsLog}) {

    const navigate = useNavigate();
    const [users, setUsers] = useState(JSON.parse(localStorage.Users) || []);
    const [massageWarning, setMassageWarning] = useState('');

    const themeValue = {
        success: "green",
        error: "red",
        warning: "red",
        normal: "teal"
    }

    function checkSignIn(email, name) {

        for (let index = 0; index < users.length; index++) {
            if (email === users[index].email && name === users[index].name) {
                return users[index];
            }
        }
        return false;
    }

    function handleSignIn(profile) {

        const email = profile.getEmail();
        const name = profile.getName();

        const isUser = checkSignIn(email, name)
        if (isUser) {
            sessionStorage.setItem('User', JSON.stringify(isUser));
        }
        else {
            const user = {
                name: name,
                email: email,
                cart: []
            };
            setUsers([...users, user]);
            sessionStorage.setItem('User', JSON.stringify(user));
            localStorage.setItem('Users', JSON.stringify([...users, user]));
        }
        updateIsLog(true);
        navigate(path);
    }

    const startApp = () => {
        window.gapi.load("auth2", function () {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_Google_Client_id,
                })
                .then((auth2) => {
                    const customBtn = document.getElementById("customBtn");
                    customBtn.addEventListener("click", () => {
                        auth2.signIn().then((googleUser) => {
                            handleSignIn(googleUser.getBasicProfile());

                        }).catch((error) => {
                            setMassageWarning("Something went wrong, please try again later");
                            console.log("Sign With google, Error :" +  error);
                        });
                    });
                });
        });
    };

    startApp();

    return (
        <>
            <button id="customBtn"
                class="sign-with-account w-full  max-w-xs font-bold shadow-md rounded-lg py-3 bg-orange-600 text-Orange-600 flex items-center justify-center hover:shadow-yellow-700 transition duration-300 focus:shadow-none focus:translate-y-0.5 focus:scale-110 hover:-translate-y-1 hover:scale-110"
            >
                <div class=" p-2 rounded-full">
                    <svg class="w-6" viewBox="0 0 533.5 544.3">
                        <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                        />
                        <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                        />
                        <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                        />
                        <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                        />
                    </svg>
                </div>
                <span class="ml-4">
                    <div className=''></div>
                    {massage}
                </span>
            </button>
            <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning}</span></p>
        </>
    )
}
