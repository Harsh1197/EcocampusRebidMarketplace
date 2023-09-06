import { Button, message, Table, Space, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import CatalogueForm from './CatalogueForm';
import { DeleteItem, GetItem } from '../../apiIntegration.js/catalogue';
import { useDispatch, useSelector } from 'react-redux';
import Bids from './Bids';
import '../../CSS/AddProduct.css';

function Catalogue() {


    const [products, setProducts] = React.useState([]);
    const [catalogueForm, setCatalogueForm] = React.useState(false);
    const [productSelected, setProductSelected] = React.useState(null);
    const { user } = useSelector((state) => state.users);
    const [bidModel, setShowBids] = React.useState(false);

    const deleteProduct = async (id) => {
        try {
            const response = await DeleteItem(id);
            if (!response.success) {
                message.error(response.message);
            }
            message.success(response.message);
            getValues();
        }
        catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        getValues();
    }, [])


    const getValues = async () => {
        try {
            const response = await GetItem(
                { productSeller: user._id }
            );


            if (response.success) {
                setProducts(response.data);


            }

        }
        catch (error) {
            message.error(error.message)
        }


    }
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
            title: "Category",
            dataIndex: "productCategory"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Condition",
            dataIndex: "condition",
            render: (text, record) => (
                <span>{record.condition.charAt(0).toUpperCase() + record.condition.slice(1)}</span>
            ),
        },

        {
            title: "Status",
            dataIndex: "productStatus"
        },
        {
            title: "Product Key",
            dataIndex: "productUniqueRef"
        },
       
        {
            title: "Update Item",
            dataIndex: "edit"
            ,
            render: (text, record) => (
                <div>
                    <Space>
                        <Button type="primary" onClick={() => { setCatalogueForm(true); setProductSelected(record); }}>
                            Update
                        </Button>
                        <span className='underline cursor-pointer ml-3' onClick={() => {
                            setProductSelected(record);
                            setShowBids(true)

                        }}>Current Bids</span>
                        <Button type="link" danger onClick={() => { deleteProduct(record._id) }}>
                            Delete
                        </Button>


                    </Space>
                </div>


            ),

        },
       
    
    ]


    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center">

                <div className="mb-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-800 text-white rounded-lg p-8 shadow-xl">
                            <h2 className="text-3xl font-semibold mb-4 text-center">Ready to Add a New Product?</h2>
                            <p className="text-lg mb-4 text-center">Add your products and await admin approval to make them live.</p>
                            <div className="flex justify-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="w-40"
                                    style={{ backgroundColor: '#0dcaf0', borderColor: '#0dcaf0', color: 'black' }}
                                    onClick={() => {
                                        setProductSelected(null);
                                        setCatalogueForm(true);
                                    }}
                                >
                                    Add Product
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {products && products.length > 0 ? (
                    <div className="mt-8 custom-section">
                        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Products Live</h2>
                        {products && products.length > 0 ? (

                            <Table
                                columns={fields}
                                dataSource={products}
                                bordered={false}
                                className="ant-table catalogue-table custom-table"
                                showHeader={false}
                            />

                        ) : (
                            <p className="text-center text-gray-600">No products available</p>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No products available</p>
                )}
            </div>


            {
                catalogueForm && (
                    <CatalogueForm catalogueForm={catalogueForm} setCatalogueForm={setCatalogueForm} productSelected={productSelected} getValues={getValues} />
                )
            }
            {
                bidModel && (
                    <Bids productSelected={productSelected} bidsDetails={bidModel} setBidsDetails={setShowBids} />
                )
            }
        </div>
    );

}


export default Catalogue;
