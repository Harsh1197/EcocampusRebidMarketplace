import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { message } from 'antd';

import styles from '../../CSS/loginPage.module.css'

import { LoginUser } from '../../apiIntegration.js/users';

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const onFinish = async (event) => {
        event.preventDefault();

        try {

            const response = await LoginUser(data);

            if (response.success) {
                message.success(response.message);
                localStorage.setItem('token', response.data);
                window.location.href = '/';
                
            }
            else {
                throw new Error(response.message);
            }

        } catch (error) {

            setError(error.message);
   
        }
    };

    return (

        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={onFinish}>
                        <h1>Login</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className={styles.input}
                            required
                            pattern="[a-zA-Z0-9._%+-]+@student\.bham\.ac\.uk"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.login_btn}>
                            Sign In
                        </button>
                    </form>
                </div>

                <div className={styles.right}>
                    <h1 className="ml-8"> New to This Community?</h1>
                    <Link to="/Register">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
