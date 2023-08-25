import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import AdminUserPage from './AdminUserPage'
import { useDispatch, useSelector } from 'react-redux';
import AdminProductPage from './AdminProductPage'
import { useNavigate } from 'react-router-dom';

function Admin() {

    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.role === "user") {
            navigate('/');
        }
    }, [])
    return (
        <div>
            <Tabs defaultActiveKey='Key1'>
                <Tabs.TabPane tab="Products" key="Key1">
                    <AdminProductPage />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Listed By User" key="Key2">
                    <AdminUserPage />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin
