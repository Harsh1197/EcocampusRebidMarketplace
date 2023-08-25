import React from 'react';
import { Button, Form, Input, Rate, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../CSS/Feedback.css';

const { TextArea } = Input;
const { Item } = Form;

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    const handleSubmit = (values) => {

        console.log('Feedback submitted:', values);
        message.success('Thank you for your feedback!');
    };

    return (
        <div className="payment-page-container">
            <h1>Payment Successful!</h1>
            <Button type="primary" onClick={handleGoBack}>
                Go Back to Home
            </Button>
            <div className="feedback-form-container">
                <h2>Feedback</h2>
                <Form onFinish={handleSubmit} layout="vertical">
                    <Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name!',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Item>
                    <Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email address!',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Item>
                    <Item
                        name="rating"
                        label="Rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide a rating!',
                            },
                        ]}
                    >
                        <Rate />
                    </Item>
                    <Item
                        name="feedback"
                        label="Feedback"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide your feedback!',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Item>
                    <Item className="submit-button-container">
                        <Button type="primary" htmlType="submit">
                            Submit Feedback
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default PaymentPage;
