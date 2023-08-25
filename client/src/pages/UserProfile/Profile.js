import React from 'react'
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Catalogue from './Catalogue';
import UserPlacedBids from './UserPlacedBids';
import UpdateProfile from './UpdateProfile';
import OrdersPlaced from './OrdersPlaced';

function UserProfile() {
    const { user } = useSelector((state) => state.users)

    return (
        <div>
            <Tabs defaultActiveKey='Key1'>
                <Tabs.TabPane tab="Add Product" key="Key1">
                    <Link to="/profile"></Link>
                    <Catalogue />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Bids Placed" key="Key2">
                    <Link to="/profile"></Link>
                    <UserPlacedBids />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Orders Placed" key="Key3">
                    <Link to="/profile"></Link>
                    < OrdersPlaced />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Profile" key="Key4">

                    <Link to={`/profile/${user._id}`}></Link>
                    <UpdateProfile></UpdateProfile>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default UserProfile
