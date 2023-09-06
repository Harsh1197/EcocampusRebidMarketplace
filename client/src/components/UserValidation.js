import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ValidateUser } from '../apiIntegration.js/users';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '../redux/Users';
import { Badge, Avatar, message, Menu } from 'antd';
import { MessageOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { FetchNotification, ReadAllNotifications } from '../apiIntegration.js/notifications';
import Notifications from './Notifications';


function UserValidation({ children }) {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const loadDispatcher = useDispatch();
    const [alerts, setAlert] = useState([]);
    const [displayAlert, setDisplayAlert] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const dispatch = useDispatch();
    const fetchProfileImage = async () => {
        try {

            const response = await axios.get(`/api/users/getProfile/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userProfile = response.data;
            if (userProfile.profileImages.length > 0) {
                setProfileImage(userProfile.profileImages[0]);
            }
        } catch (error) {
            console.error('Fetch Profile Image Error:', error);
        }
    };
    const handleChatIconClick = async () => {
        const extractedUsername = user.name;
        try {
            const response = await axios.post(
                'https://ecocampusrebid.onrender.com/authenticate',
                { username: extractedUsername }
                );
            navigate('/chat');
        } catch (error) {
            console.error("Authentication error:", error);
        }
    }

    const fetchNotification = async () => {
        try {
            const result = await FetchNotification();
            if (!result.success) {
                throw new Error(result.message);
            }
            setAlert(result.data);
        } catch (er) {
            message.error(er.response);
        }
    };

    const seenNotification = async () => {
        try {
            const result = await ReadAllNotifications();
            if (!result.success) {
                throw new Error(result.message);
            }
            fetchNotification();
        } catch (er) {
            message.error(er.response);
        }
    };

    const tokenValidation = async () => {
        try {
            const response = await ValidateUser();
          
            if (!response.success) {
                navigate("/login");
                message.error(response.message);
            }
            loadDispatcher(SetUser(response.data));
        } catch (error) {
            navigate("/login");
  
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            tokenValidation();
            fetchNotification();
        }
        else{
            navigate("/login");
        }
       
        if (user && user._id) {
            fetchProfileImage();
        }
     
    }, [user]);

    if (!user) {
        return null; 
    }

    return (
        <div className='curvy-line-container'>

            {user && (
                <div>
                    <div className='flex justify-between items-center bg-primary p-6'>
               
                    <div className='flex items-center'>
                        <img
                            src="/Bid.png" 
                            alt="EcoCampus ReBid"
                            style={{ width: 'auto', height: '50px', marginRight: '10px' }}
                        />
                        <h1 className='text-3xl text-white cursor-pointer' style={{
                            fontFamily: "Arial, sans-serif",
                            fontStyle: "italic",
                        }} onClick={() => navigate("/")}> EcoCampus ReBid</h1>
                    </div>
                        <Menu theme="dark" mode="horizontal" style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                      
                            <Menu.Item key="profile" onClick={() => {

                                if (user.role === 'user') {
                                    navigate('/profile');

                                }
                                else {
                                    navigate("/admin")
                                }
                            }} className='text-white'>
                                <div className="flex items-center">
                                    <Avatar
                                        src={profileImage}
                                        size={80}
                                        shape="circle"
                                        style={{
                                            marginRight: '8px',
                                            border: '2px solid white',
                                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <span>{user.name}</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item key="chats" onClick={handleChatIconClick} className='text-white'>
                                <MessageOutlined style={{ marginRight: '4px' }} />
                                My Chats
                            </Menu.Item>
                            <Menu.Item key="cart" onClick={() => navigate("/cart")} className='text-white'>
                                <ShoppingCartOutlined style={{ marginRight: '4px' }} />
                                Cart
                            </Menu.Item>

                            {/* Dropdown menu items */}

                            <Menu.Item key="notifications" onClick={() => {
                                seenNotification();
                                setDisplayAlert(true);
                            }} className='text-white'>
                                <Badge count={alerts?.filter(alert => !alert.read).length} className='cursor-pointer'>
                                    <Avatar shape="circle" size="medium" icon={<i className="ri-notification-line"></i>} />
                                </Badge>
                              
                            </Menu.Item>
                            <Menu.Item key="logout" onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }} className='text-white'>
                                <UserOutlined style={{ marginRight: '4px' }} />
                                Log Out
                            </Menu.Item>

                        </Menu>
                    </div>
                    <div className='p-5'>{children}</div>

                    {displayAlert && (
                        <Notifications
                            alerts={alerts}
                            reloadAlert={fetchNotification}
                            displayAlert={displayAlert}
                            setDisplayAlert={setDisplayAlert}
                        />
                    )}
                </div>
            )}
        </div>
    );
}


export default UserValidation;
