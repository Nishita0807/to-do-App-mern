import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js"
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div>
            {userToken && <Navigate to="/" />}
            <section className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex justify-center items-center flex-wrap h-full text-gray-800">
                        <div className="w-full max-w-md">
                            <form method='post' onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg">
                                {error && (
                                    <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">
                                        {error.message}
                                    </div>
                                )}
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                                        placeholder="Password"
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 focus:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Login
                                </button>
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
