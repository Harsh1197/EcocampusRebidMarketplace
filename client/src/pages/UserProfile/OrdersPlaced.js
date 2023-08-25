import React from 'react';
import { useSelector } from 'react-redux';
import '../../CSS/OrdersPlaced.css';

function OrdersPlaced() {
    const orders = useSelector(state => state.order.orders);
    const user = useSelector(state => state.users.user);
    const userOrders = orders.filter(order => order.userId === user._id);

    return (
        <div className="orders-placed-page">
            <div className="bg-gray-800 text-white rounded-lg p-8 shadow-xl w-full">
                <h2 className="text-3xl font-bold mb-8 text-center">Orders Placed</h2>
                <div className="orders-list">
                    {userOrders.map((order, index) => (
                        <div key={index} className="order-item">
                            <div className="order-content">
                                <div className="order-image-container">
                                    <div
                                        className="order-image"
                                        style={{
                                            backgroundImage: `url(${order.items[0].productImages[0]})`,
                                        }}
                                    />
                                    <div className="category-label">{order.items[0].productCategory}</div>
                                </div>
                                <div className="order-details">
                                    <div className="order-description">
                                        <ul className="item-list">
                                            {order.items.map(item => (
                                                <li key={item.productUniqueRef} className="item-details">
                                                    <div className="item-info">
                                                        <div className="item-name">{item.name}</div>

                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="payment-amount text-white">Bid Amount: £{order.paymentAmount}</p>
                                    <p className="payment-status text-white">Payment Status: Amount Paid</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default OrdersPlaced;
