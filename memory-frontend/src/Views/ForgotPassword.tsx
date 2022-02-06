import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const handleForgotPassword=()=>{
        console.log(email)
    }
    return (
        <div className="bg-blue-100 min-h-screen w-full flex justify-center items-center text-left">
            <div className="h-9/12 bg-white w-11/12 sm:w-10/12 md:w-8/12 flex justify-center items-center  flex-col py-5 rounded-lg">
                <div className="w-10/12 sm:w-8/12 md:w-1/2 text-center">
                    <h1 className="text-3xl font-semibold py-6 text-blue-500">
                        Memory App
                    </h1>
                    <h1 className="text-xl sm:text-2xl font-semibold ">
                        Forgot Password?
                    </h1>
                    <h3 className="py-6">
                        Don't worry Resetting your password is very easy. Just
                        type in the email you registered in Memory App
                    </h3>

                    <p className="text-left">Email</p>
                    <input
                        value={email}
                        type={"email"}
                        placeholder="Enter your email"
                        className="w-full border-2  py-3 px-4   transition-all ease-out duration-300  rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="bg-blue-500  w-full py-3 px-3 rounded-lg mt-3 text-white hover:bg-blue-600"
                        onClick={handleForgotPassword}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
