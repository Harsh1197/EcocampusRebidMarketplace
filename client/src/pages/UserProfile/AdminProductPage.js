import { Button, message, Table, Space } from 'antd'
import React, { useEffect, useState } from 'react';

import { GetItem, UpdateStatus } from '../../apiIntegration.js/catalogue';
import { useDispatch, useSelector } from 'react-redux';


import '../../CSS/AddProduct.css';

function AdminProductPage() {
    const [products, setProducts] = React.useState([]);
    const [catalogueForm, setCatalogueForm] = React.useState(false);
    const [productSelected, setProductSelected] = React.useState(null);
    const { user } = useSelector((state) => state.users);

    const handleApprove = async (id, productStatus) => {
        const response = await UpdateStatus(id, productStatus);
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



    const getValues = async () => {
        try {
            const response = await GetItem(null);
            if (response.success) {
                setProducts(response.data);


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
            title: "Product",
            dataIndex: "image",
            render: (text, record) => {
                return (
                    < img className='w-20 h-20 object-cover rounded-md'
                        src={!record?.productImages.length <= 0 ? record.productImages[0] : ""} />


                )
            }
        },
        {
            title: "Item Name",
            dataIndex: "name"
        },


        {
            title: "Description",
            dataIndex: "productDescription",

        },
        {
            title: "Category",
            dataIndex: "productCategory"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Condition",
            dataIndex: "condition"
        },

        {
            render: (text, record) => {
                return record.productStatus.toUpperCase();
            },
            title: "Status",
            dataIndex: "productStatus",

        },
        {
            title: "Permission",
            dataIndex: "action"
            ,
            render: (text, record) => {
                const { productStatus, _id } = record;
                return (
                    <div className='flex gap-4'>
                        {productStatus === 'Approved' && (<Button onClick={() => handleApprove(_id, "Blocked")}>Block</Button>)}
                        {productStatus === 'Blocked' && (<Button onClick={() => handleApprove(_id, "Approved")}>Unblock</Button>)}
                        {productStatus === 'Pending' && (<Button onClick={() => handleApprove(_id, "Approved")}>Accept</Button>)}
                        {productStatus === 'Pending' && (<Button onClick={() => handleApprove(_id, "Rejected")}>Decline</Button>)}
                    </div>
                )
            }



            ,
        }



    ]



    return (
        <div>


            {
                products && products.length > 0 ? (
                    <Table columns={fields} dataSource={products} className="ant-table catalogue-table custom-table" />
                ) : (
                    <p>No products available</p>
                )
            }


        </div >
    );


}


export default AdminProductPage;
