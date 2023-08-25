import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message, Button, Empty, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { removeFromCart, removeAllItemsFromCart } from '../redux/cartReducer';
import '../CSS/CartStyles.css';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../redux/orderReducer';

function CartPage() {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const [instance, setInstance] = useState(null);
    const [clientToken, setClientToken] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const user = useSelector((state) => state.users.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productUniqueRef) => {
        dispatch(removeFromCart(productUniqueRef));
        message.success('Product removed from cart.');
    };

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.finalPrice), 0);
    };

    const getToken = async () => {
        try {
            const { data } = await axios.get("/api/catalogue/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    const handlePayment = async () => {
        try {
            if (instance) {
                const { nonce } = await instance.requestPaymentMethod();
                const { data } = await axios.post("/api/catalogue/braintree/payment", {
                    nonce,
                    cartItems,
                });

                if (data) {
                    message.success('Payment successful!');
                    setPaymentSuccess(true);

                    const order = {
                        paymentAmount: getTotalAmount(),
                        items: cartItems,
                        userId: user._id.toString(),
                    };
                    console.log("Order to be dispatched:", order);
                    dispatch(addOrder(order));

                    try {
                        const productUniqueRefs = cartItems.map((item) => item.productUniqueRef);
                        await axios.post("/api/catalogue/removeItems", { productUniqueRefs });

                        dispatch(removeAllItemsFromCart());
                        navigate('/payment-success');

                    } catch (error) {
                        console.error("Error removing items from the catalog:", error);
                    }
                } else {
                    message.error('Payment failed. Please try again.');
                }
            }
        } catch (error) {
            console.error(error);
            message.error('Payment failed. Try again.');
        }
    };


    // useEffect(() => {
    //     if (paymentSuccess) {
    //         navigate('/payment-success');
    //     }
    // }, [paymentSuccess, navigate]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'productImages',
            key: 'image',
            render: (productImages) => (
                <img src={productImages[0]} alt="" style={{ width: 80, height: 80 }} />
            ),
        },
        {
            title: 'Product Description',
            dataIndex: 'productDescription',
            key: 'description',
            width: '40%',
            className: 'product-description-column',
        },
        {
            title: 'Product Price',
            dataIndex: 'finalPrice',
            key: 'price',
            render: (finalPrice) => `£${finalPrice}`,
            width: '20%',
            className: 'product-price-column',
        },
        {
            key: 'remove',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to remove this item from the cart?"
                    onConfirm={() => handleRemoveFromCart(record.productUniqueRef)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ fontSize: '18px', color: 'black', cursor: 'pointer' }} />
                </Popconfirm>
            ),
        },
        {
            title: 'Subtotal',
            dataIndex: 'finalPrice',
            key: 'subtotal',
            render: (finalPrice) => `£${finalPrice}`,
        },
    ];

    return (
        <div className="cart-page">
            <h1 className="welcome-text">Welcome to Your Shopping Cart</h1>
            <p className="cart-items-count">You have {cartItems.length} items in your cart.</p>
            <div className="cart-items-container">
                {cartItems.length === 0 ? (
                    <Empty description="Your cart is empty." />
                ) : (
                    <div className="cart-items-list">
                        <div className="cart-item cart-item-header">
                            <div className="cart-item-details">

                                <div className="cart-item-text">
                                    <p className="column-title">Product Details</p>
                                </div>

                                <div className="cart-item-price">
                                    <p className="column-title">Price</p>
                                </div>
                                <div className="cart-item-remove">
                                    <p className="column-title">Action</p>
                                </div>
                            </div>
                        </div>
                        {cartItems.map(item => (
                            <div key={item.productUniqueRef} className="cart-item">
                                <div className="cart-item-details">
                                    <div className="cart-item-image">
                                        <img src={item.productImages[0]} alt="" />
                                    </div>
                                    <div className="cart-item-text">
                                        <p className="product-name">{item.name}</p>
                                        <p className="product-description">{item.productDescription}</p>
                                    </div>

                                    <div className="cart-item-price">
                                        <p className="product-price">£{item.finalPrice}</p>
                                    </div>
                                    <div className="cart-item-remove">
                                        <Popconfirm
                                            title="Are you sure you want to remove this item from the cart?"
                                            onConfirm={() => handleRemoveFromCart(item.productUniqueRef)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined style={{ fontSize: '18px', color: 'black', cursor: 'pointer' }} />
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="total-amount-container">
                <h2>Total Amount</h2>
                <p>{getTotalAmount()} GBP</p>
                <div className="payment-options">
                    {clientToken && cartItems.length > 0 && (
                        <>
                            <DropIn
                                options={{
                                    authorization: clientToken,
                                    paypal: {
                                        flow: "vault",
                                    },
                                }}
                                onInstance={(instance) => setInstance(instance)}
                            />
                            <Button type="primary" size="large" block onClick={handlePayment}>
                                Make Payment
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartPage;
