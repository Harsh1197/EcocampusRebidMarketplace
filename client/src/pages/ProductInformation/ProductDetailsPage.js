import React from 'react';
import { useSelector } from 'react-redux';

import Divider from '../../components/Divider';
import { Button, message, Card } from 'antd';
import { GetItem, GetItemById, getBids } from '../../apiIntegration.js/catalogue';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BidDetails from './BidDetails';

function ProductDetailsPage() {
    const [imageIndex, setImageIndex] = React.useState(0);
    const [addBid, setBid] = React.useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = React.useState(null);
    const { user } = useSelector((state) => state.users);

    const getValues = async () => {
        try {
            const response = await GetItemById(id);
            if (response.success) {
                const bidResponse = await getBids({ product: id });
                setProduct({
                    ...response.data,
                    bids: bidResponse.data,
                });
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    React.useEffect(() => {
        getValues();
    }, []);

    return (
        product && (
            <div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col gap-6">
                        <img
                            className="w-full h-96 p-4 rounded-md"
                            src={product.productImages[imageIndex]}
                            alt={product.name}
                        />
                        <div className="flex gap-5">
                            {product.productImages.map((img, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    className={`w-20 h-20 object-cover cursor-pointer rounded-md ${imageIndex === imgIndex ? 'border-2 border-green-700 border-solid p-2' : ''
                                        }`}
                                    onClick={() => setImageIndex(imgIndex)}
                                    src={img}
                                    alt={product.name}
                                />
                            ))}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-blue-900">Product Added On</h4>
                            <span className="text-gray-500">
                                {moment(product.createdAt).format('DD-MM-YYYY hh:mm')}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 ml-8">
                        <div>
                            <h1 className="text-4xl font-semibold text-blue-900">
                                <em>{product.name}</em>
                            </h1>
                            <p className="text-me font-semibold text-gray-700 italic">{product.productDescription}</p>
                        </div>
                        <Divider />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold text-blue-900">Product Details</h1>
                            <Card
                                className="mb-6 hover:shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-primary"
                                bordered
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    padding: '3px',
                                    boxShadow: '0 0 0 2px #ccc',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #ccc',
                                    marginBottom: '2px',
                                    marginTop: '2px',
                                    transition: 'transform 0.2s',

                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                <div className="flex justify-between mt-3">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Category:</strong>
                                    </span>
                                    <span className="uppercase">{product.productCategory}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Price:</strong>
                                    </span>
                                    <span className="text-gray-700">£{product.price}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Bill Availability:</strong>
                                    </span>
                                    <span className="text-gray-700">
                                        {product.billAvailability ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Product Warranty:</strong>
                                    </span>
                                    <span className="text-gray-700">{product.warranty ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Accessories Available:</strong>
                                    </span>
                                    <span className="text-gray-700">
                                        {product.accessoriesAvailability ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Condition:</strong>
                                    </span>
                                    <span className="uppercase">{product.condition}</span>
                                </div>
                            </Card>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold text-blue-900">Seller Details</h1>

                            <Card
                                className="mb-6 hover:shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-primary"
                                bordered
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    padding: '3px',
                                    boxShadow: '0 0 0 2px #ccc',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #ccc',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                <div className="flex justify-between mt-3">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Name:</strong>
                                    </span>
                                    <span className="uppercase">{product.productSeller.name}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Email:</strong>
                                    </span>
                                    <span className="text-blue-700">{product.productSeller.email}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 font-semibold">
                                        <strong>Student id:</strong>
                                    </span>
                                    <span className="text-gray-700">{product.productSeller.id}</span>
                                </div>
                            </Card>
                        </div>

                        <div className="flex flex-col">
                            <Button
                                type="primary"
                                onClick={() => {
                                    setBid(!addBid);
                                }}
                                disabled={user._id === product.productSeller._id}
                            >
                                Place Your Bid
                            </Button>
                        </div>
                    </div>
                    {addBid && <BidDetails bidDetails={addBid} setBidDetails={setBid} product={product} getValues={getValues} />}
                    <div className="ml-14">
                        <div className="flex flex-col gap-4">
                            <div style={{ padding: '10px' }}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-800 text-lg">
                                        <strong>Total Bids: {product.bids.length}</strong>
                                    </span>
                                </div>
                                {product.showBids &&
                                    product?.bids?.map((bid) => (
                                        <Card
                                            key={bid._id}
                                            className="mb-6 hover:shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-primary"
                                            bordered
                                            style={{
                                                width: 'calc(75% - 20px)',
                                                borderRadius: '8px',
                                                padding: '10px',
                                                boxShadow: '0 0 0 2px #ccc',
                                                backgroundColor: '#FFFFFF',
                                            }}
                                        >
                                            <div className="flex justify-between items-center text-gray-700 mb-3">
                                                <span className="font-bold">Name:</span>
                                                <span>{bid.productBuyer.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-gray-600 mb-3">
                                                <span className="font-bold">Bid Amount:</span>
                                                <span>£{bid.productBidAmount}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-gray-600">
                                                <span className="font-bold">Bids Placed On:</span>
                                                <span>{moment(bid.createdAt).format('MMM D, YYYY hh:mm A')}</span>
                                            </div>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default ProductDetailsPage;
