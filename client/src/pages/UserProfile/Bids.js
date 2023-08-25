import React, { useEffect } from 'react'
import { Modal, Table, message } from 'antd'
import { getBids } from '../../apiIntegration.js/catalogue';
import moment from 'moment';
import Divider from '../../components/Divider';
function Bids({ bidsDetails, setBidsDetails, productSelected }) {
    const [bidValues, setBidValues] = React.useState([]);

    const fields = [

        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => {
                return record.productBuyer.name
            }
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
            title: "Message",
            dataIndex: "message",
        },
        {
            title: "Buyer Details",
            dataIndex: "details",
            render: (text, record) => (
                <div>
                    <p>Email:{record.productBuyer.email}</p>
                </div>
            )
        },

    ]

    const getValues = async () => {
        try {
            const response = await getBids({ product: productSelected._id });
            if (response.success) {
                setBidValues(response.data);
            }

        }
        catch (error) {
            message.error(error.message)
        }


    }
    useEffect(() => {
        if (productSelected) {
            getValues();
        }

    }, [productSelected])


    return (
        <Modal width={1400} centered open={bidsDetails} onCancel={() => setBidsDetails(false)}>
            <h1 className='text-2xl text-primary'> Current Bids</h1>
            <Divider></Divider>
            <h1 className='text-xl text-gray-600 '>Product Name: {productSelected.name}</h1>
            <div className="flex gap-5 flex-col"> <Table columns={fields} dataSource={bidValues}></Table></div>

        </Modal>
    )
}

export default Bids
