import moment from 'moment';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Table, message } from 'antd'
import { getBids } from '../../apiIntegration.js/catalogue';

import '../../CSS/AddProduct.css';

function UserPlacedBids({ bidsDetails, setBidsDetails, productSelected }) {
    const [bidValues, setBidValues] = React.useState([]);
    const { user } = useSelector((state) => state.users);

    const fields = [
        {
            title: "Product",
            dataIndex: "image",
            render: (text, record) => (
                <img
                    className='w-20 h-20 object-cover rounded-md'
                    src={!record?.product.productImages.length <= 0 ? record.product.productImages[0] : ""}
                />
            )
        },
        {
            title: "Item Name",
            dataIndex: "product",
            render: (text, record) => (
                record.product.name
            )
        },
        {
            title: "Bid Value",
            dataIndex: "productBidAmount",
        },
        {
            title: "Bid Date",
            dataIndex: "bidDate",
            render: (text, record) => (
                moment(text).format("DD/MM/YYYY HH:mm")
            )
        },
        {
            title: "Product Seller",
            dataIndex: "productSeller",
            render: (text, record) => (
                record.productSeller.name
            )
        },
        {
            title: "Message",
            dataIndex: "message",
        },
    ];

    const getValues = async () => {
        try {
            const response = await getBids({ productBuyer: user._id });
            if (response.success) {
                const filteredBidValues = response.data.filter(
                    bid => bid.product !== null && bid.productSeller !== null
                );

                const organizedBids = filteredBidValues.reduce((acc, bid) => {
                    const productKey = bid.product._id;
                    if (!acc[productKey] || acc[productKey].productBidAmount < bid.productBidAmount) {
                        acc[productKey] = bid;
                    }
                    return acc;
                }, {});

                const bidsArray = Object.values(organizedBids);

                setBidValues(bidsArray);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    useEffect(() => {
        getValues();
    }, [])



    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center">

                <div className="mb-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-800 text-white rounded-lg p-8 shadow-xl">
                            <h2 className="text-3xl font-semibold mb-4 text-center">Bids Placed on Live Products</h2>
                            <a href="/" className="block text-blue-500 hover:underline mb-4" style={{ color: '#0dcaf0', textAlign: 'center' }}>
                                View Other Live Products

                            </a>

                            <div className="flex justify-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-3 flex-col'>
                <div className="flex gap-5 flex-col custom-table-container">

                    <Table columns={fields} className="custom-table" dataSource={bidValues} pagination={false} />
                </div>
            </div>
        </div>
    )
}

export default UserPlacedBids;
