import React, { useState, useEffect } from 'react';
import { Input, Button, message, Select } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AiOutlineCamera } from 'react-icons/ai';
import '../../CSS/ProfileContent.css';

const UpdateProfile = () => {
    const [contact, setContact] = useState('');
    const [chatUsername, setChatUsername] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [address, setAddress] = useState('');
    const { user } = useSelector((state) => state.users);
    const token = localStorage.getItem('token');
    const [profileData, setProfileData] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const { Option } = Select;

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`/api/users/getProfile/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                setProfileData(response.data);
                setContact(response.data.contact);
                setChatUsername(response.data.chatUsername);
                setCourseTitle(response.data.courseTitle);
                setAddress(response.data.address);
                setProfileImage(response.data.profileImages[0]);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProfile = {
                contact,
                chatUsername,
                courseTitle,
                address,
            };

            if (profileData) {
                const response = await axios.put(`/api/users/updateProfile/${user._id}`, updatedProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    message.success('Profile updated successfully');
                } else {
                    message.error('Failed to update profile');
                }
            } else {
                const response = await axios.post('/api/users/createProfile', updatedProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    message.success('Profile created successfully');
                } else {
                    message.error('Failed to create profile');
                }
            }
        } catch (error) {
            message.error('An error occurred while processing the profile');
        }
    };

    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('userId', user._id);
        try {
            const response = await axios.post('/api/users/upload-profile-image', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setProfileImage(response.data.data);
                message.success('Image uploaded successfully');

            } else {
                message.error('Failed to upload image');
            }
        } catch (error) {
            message.error('An error occurred while uploading image');
        }
    };

    return (
        <div className="update-profile-container">
            <div className="avatar-section">
                <div className="avatar-wrapper">
                    <img
                        src={profileImage || ''}
                        className="avatar-image"
                        alt="User Avatar"
                    />
                    <div className="avatar-overlay">
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={handleImage}
                        />
                        <label htmlFor="image">
                            <AiOutlineCamera />
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-section">
                <div className="central-section">
                    <div className="form-columns">
                        <div className="left-fields">
                            <Input
                                className="profile-input"
                                type="text"
                                placeholder="Full Name"
                                value={user.name}
                                disabled
                            />
                            <Input
                                className="profile-input"
                                type="text"
                                placeholder="Phone Number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                            <Input
                                className="profile-input"
                                type="text"
                                placeholder="Your Chat Username"
                                value={chatUsername}
                                onChange={(e) => setChatUsername(e.target.value)}
                            />
                            <Input
                                className="profile-input"
                                type="text"
                                placeholder="Student ID"
                                value={user.id}
                                disabled
                            />
                        </div>
                        <div className="gap"></div>
                        <div className="right-fields">
                            <Input
                                className="profile-input"
                                type="text"
                                placeholder="Email Address"
                                value={user.email}
                                disabled
                            />
                            <Input.TextArea
                                className="profile-input"
                                rows={4}
                                placeholder="Select your Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Select
                                className='profile-dropdown'
                                placeholder="Select Course Title"
                                value={courseTitle}
                                onChange={value => setCourseTitle(value)}
                                dropdownClassName="custom-dropdown"
                                dropdownStyle={{ backgroundColor: '#1f2937', color: 'white' }}
                                style={{
                                    fontSize: '16px',
                                    fontStyle: 'italic',
                                    width: '100%',
                                    height: '40px',
                                    backgroundColor: '#1f2937',
                                    color: '#1f2937'
                                }}
                            >
                                <Option value="Select">Select your course</Option>
                                <Option value="MSc Computer Science">MSc Computer Science</Option>
                                <Option value="MSc Advanced Computer Science">MSc Advanced Computer Science</Option>
                                <Option value="MSc CyberSecurity">MSc CyberSecurity</Option>
                                <Option value="MSc Data Science">MSc Data Science</Option>
                                <Option value="MSc Artificial Intelligence">MSc Artificial Intelligence</Option>
                                <Option value="MSc Biotechnology">MSc Biotechnology</Option>
                            </Select>
                        </div>
                    </div>
                    <Button
                        className="update-button"
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
