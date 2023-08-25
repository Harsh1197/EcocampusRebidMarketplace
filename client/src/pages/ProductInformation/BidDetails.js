import Modal from 'antd/es/modal/Modal';
import React, { useRef } from 'react';
import { Col, Form, Input, Row, Tabs, message } from 'antd';
import { createBid } from '../../apiIntegration.js/catalogue';
import { useDispatch, useSelector } from 'react-redux';
import { AddNotification } from '../../apiIntegration.js/notifications';
function BidDetails({ product, getValues, bidDetails, setBidDetails }) {
    const { user } = useSelector((state) => state.users);
    const reference = React.useRef(null);
    const onSubmit = async (values) => {
        try {
            const response = await createBid({
                ...values,
                product: product._id,
                productSeller: product.productSeller._id,
                productBuyer: user._id
            })
            if (response.success) {
                message.success('Bid Placed Successfully')
                await AddNotification({
                    title: "Attention: New Bid Alert!",
                    notificationRead: false,
                    message: `A new bid has been placed on your product ${product.name} by ${user.name} for ${values.productBidAmount} `,
                    user: product.productSeller._id,
                    onClick: '/profile'


                })
                getValues()
                setBidDetails(false)
            }
            else {
                throw new Error(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
        }

    }

    const validateBidValue = (_, value) => {
        if (value < 5) {
            return Promise.reject(new Error('Bid Value cannot be less than 5'));
        }
        return Promise.resolve();
    };

    const validateMessage = (_, value) => {
        if (!value || value.length <= 0) {
            return Promise.reject(new Error('Message is required'));
        }
        return Promise.resolve();
    };


    return (
        <Modal onOk={() => reference.current.submit()} centered open={bidDetails} onCancel={() => setBidDetails(false)}>
            <div className="flex flex-col  mb-5 gap-5">
                <h1 className="text-primary text-3xl font-semibold text-primary-800 text-center">
                    Place Your Bid
                </h1>
                <Form onFinish={onSubmit} ref={reference} layout="vertical">
                    <Form.Item label="Bid Value" name="productBidAmount" rules={[{ validator: validateBidValue }]} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Message" name="message" rules={[{ validator: validateMessage }]} required>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}

export default BidDetails;
