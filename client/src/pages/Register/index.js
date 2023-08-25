import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../../CSS/registerPage.module.css';
import { RegisterUser } from '../../apiIntegration.js/users';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        studentId: ""
    });

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@student\.bham\.ac\.uk$/;

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const navigate = useNavigate();

    const onFinish = async (event) => {
        event.preventDefault();
        try {

            if (!emailPattern.test(data.email)) {
                setError("Please use your Student Email.");
                return;
            }


            const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
            if (!passwordPattern.test(data.password)) {
                setError(
                    "Password must be at least 7 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                );
                return;
            }
            const studentIdPattern = /^\d{7}$/;
            if (!studentIdPattern.test(data.id)) {
                setError("Student ID must be 7 digits long.");
                return;
            }
            const response = await RegisterUser(data);

            if (response.success) {
                message.success(response.message);
                navigate("/login");
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>

                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={onFinish}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Student Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Student Id"
                            name="id"
                            onChange={handleChange}
                            value={data.id}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.signup_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
