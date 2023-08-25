import { Button, message, Table, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import moment from 'moment';

import { UpdateUserStatus } from '../../apiIntegration.js/users';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsers } from '../../apiIntegration.js/users';


import '../../CSS/AddProduct.css';

function AdminUserPage() {
    const [users, setUsers] = React.useState([]);


    const handleApprove = async (id, status) => {
        const response = await UpdateUserStatus(id, status);
        try {
            if (response.success) {

                message.success(response.message);
                getValues();

            }
            else {
                throw new Error(response.message);
            }
        }
        catch (error) {
            message.error(error.message)
        }

    };



    const getValues = async (data) => {
        try {
            const response = await GetUsers(null);
            if (response.success) {
                setUsers(response.data);
            }

        }
        catch (error) {
            message.error(error.message)
        }


    }
    useEffect(() => {
        getValues();
    }, [])

    const fields = [

        {
            title: "Username",
            dataIndex: "name"
        },

        {
            title: "Email",
            dataIndex: "email"
        },


        {
            title: "Current Status",
            render: (text, record) => {
                return record.status
            },

            dataIndex: "status",

        },


        {
            title: "Registered On",
            dataIndex: "createdAt",
            render: (text, record) =>
                moment(record.createdAt).format('DD-MM-YYYY HH:mm'), // Format the date as "DD-MM-YYYY HH:mm"
        },




        {
            title: "Permission",
            dataIndex: "action",

            render: (text, record) => {
                const { status, _id } = record;
                return (
                    <div className='flex gap-4'>

                        {status === 'active' && (<Button onClick={() => handleApprove(_id, "blocked")}>Block User</Button>)}
                        {status === 'blocked' && (<Button onClick={() => handleApprove(_id, "active")}>Activate User</Button>)}
                    </div>
                )
            }



            ,
        }



    ]



    return (
        <div>


            {
                users && users.length > 0 ? (
                    <Table columns={fields} dataSource={users} className="ant-table catalogue-table custom-table" />
                ) : (
                    <p>No Users available</p>
                )
            }


        </div >
    );


}


export default AdminUserPage;
