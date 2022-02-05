import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Inputs = {
    confirmPassword: string;
    password: string;
};
const schema = yup
    .object({
        password: yup.string().min(6).required(),
        confirmPassword: yup.string().min(6).required()
    })
    .required();

const ResertPassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    return (
        <div className="bg-blue-100 min-h-screen w-full flex justify-center items-center text-left">
            <div className="h-9/12 bg-white w-11/12 sm:w-10/12 md:w-8/12 flex justify-center items-center  flex-col py-5 rounded-lg">
                <div className="w-10/12 sm:w-8/12 md:w-1/2 text-center">
                    <h1 className="text-3xl font-semibold py-6 text-blue-500">
                        Memory App
                    </h1>
                    <h1 className="text-xl sm:text-2xl font-semibold pb-3 ">
                        Reset Password
                    </h1>
                  

                    <form
                        className=" flex justify-center items-center space-y-3 flex-col w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            placeholder="Enter your Confirm Password"
                            className="w-full border-2  py-3 px-4   transition-all ease-out duration-300  rounded-md"

                            {...register('confirmPassword', { required: true })}
                        />
                        {errors.confirmPassword && (
                            <span className="m_0 pt-2 text-red-500 ">
                                {errors?.confirmPassword.message}
                            </span>
                        )}
                        <input
                            placeholder="Enter your password"
                            className="w-full border-2  py-3 px-4   transition-all ease-out duration-300  rounded-md"

                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                        />
                        {errors.password && (
                            <span className="m_0 pt-2  text-red-500    ">
                                {errors?.password.message}
                            </span>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500  w-full py-3 px-3 rounded-lg mt-3 text-white hover:bg-blue-600"

                        >
                        Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResertPassword;
