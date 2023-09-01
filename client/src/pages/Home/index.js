import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message, Card, Form } from 'antd';
import { GetItem } from '../../apiIntegration.js/catalogue';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import SearchInput from '../../apiIntegration.js/SearchFilter';
import { Modal, Input, Popover } from 'antd';
import { addToCart, setModalData } from '../../redux/cartReducer';
import { AddCartDetails } from '../../apiIntegration.js/cartDetails';
import { getBids } from '../../apiIntegration.js/catalogue';
import { AiOutlineMessage } from 'react-icons/ai';

const { Meta } = Card;

function Home() {
  const reference = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productFilters, setProductFilters] = useState({
    productStatus: 'Approved',
    category: [],
    age: [],
    price: [],
  });
  const [highestBidAmounts, setHighestBidAmounts] = useState({}); // Store highest bids for each product

  const [products, setProducts] = useState([]);
  const [displayFilters, setDisplayFilters] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [agreedAmount, setAgreedAmount] = useState(0);
  const { user } = useSelector((state) => state.users);
  const instructionContent = (
    <div>
      <h3>Instructions?</h3>
      <ul>
        <li>Step 1: Place a bid on the product in the "More Details" section.</li>
        <li>Step 2: Negotiate and agree on the final price with the seller.</li>
        <li>Step 3: Obtain the unique product key from the seller.</li>
        <li>Step 4: Enter the product key in the "Product Key" section to proceed with the payment.</li>
      </ul>
    </div>
  );


  const onSubmit = async (values) => {
    try {
      const response = await AddCartDetails(values);
      if (response.success) {
        message.success('Item added to cart successfully!');
        setIsModalVisible(false);
        dispatch(addToCart({ ...selectedProduct, ...values }));
        dispatch(
          setModalData({ email: values.studentEmail, id: values.studentId, price: values.finalPrice })
        );
        navigate('/cart');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

 

  const showModal = async (product) => {
    setSelectedProduct(product);
    try {
        const response = await getBids({ product: product._id });
        if (response.success && response.data.length > 0) {
          const highestBid = Math.max(...response.data.map((bid) => bid.productBidAmount));
          setAgreedAmount(highestBid); 
        } else {
          setAgreedAmount(0);
        }
      } catch (error) {
        message.error(error.message);
      }
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const getValues = async () => {
    try {
      const response = await GetItem(productFilters);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getValues();
    
  }, [productFilters, user._id]);

  return (
    <div className="flex gap-4">
      {displayFilters && (
        <Filters
          filters={productFilters}
          setFilters={setProductFilters}
          displayFilters={displayFilters}
          setDisplayFilters={setDisplayFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center gap-5">
          {!displayFilters && (
            <i
              className="ri-filter-3-fill ri-xl"
              onClick={() => setDisplayFilters(!displayFilters)}
            ></i>
          )}
          <SearchInput
            class="custom-search-input typing-effect"
            placeholder="What are you looking for"
          />
        </div>
        <div className={displayFilters ? 'grid grid-cols-4 gap-5' : 'grid grid-cols-5 gap-5'}>
          {products?.map((product) => (
            <div
              className="rounded bg-white border border-gray-200 flex flex-col pb-4 hover:shadow-xl darken cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
              key={product._id}
              onClick={() => navigate(`/product/${product._id} `)}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-52 object-cover rounded-t"
                  src={product.productImages[0]}
                  alt={product.name}
                />
              </div>
              <div className="p-2 mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-black">{product.name}</h3>
                  <div className="bg-white-200 py-1 px-2 text-sm rounded">
                    <span className="text-green-600 font-bold text-2xl">£ {product.price}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{product.productDescription}</p>
                <div className="flex justify-between">
                <button className="bg-custom-color hover:bg-custom-color text-black font-bold py-2 px-4 rounded border border-gray-300 cursor-pointer">
                                        More Details
                                    </button>
                  <button
                    className="text-white font-bold py-2 px-4 rounded border border-gray-300 cursor-pointer"
                    style={{ background: "#191e29" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(product);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          className="modl-gradient text-bold text-black"
          centered
          width={750}
          okText="Move To Cart"
          visible={isModalVisible}
          onOk={() => {
            reference.current.submit();
          }}
          onCancel={handleModalCancel}
          destroyOnClose
        >
          <div>
            <h1 className="text-primary text-bold uppercase text-center font-bold text-2xl">Move To Cart</h1>

            <div style={{ margin: '20px 0' }}>
              <Popover
                className="text-bold text-primary-300 text-lg"
                content={instructionContent}
                overlayStyle={{ backgroundColor: 'black', maxWidth: '400px' }}
              >
                <a href="#">How to purchase this product?</a>
              </Popover>
            </div>

            <Form layout="vertical" ref={reference} onFinish={onSubmit}>
              <Form.Item label="Product Name" name="name" initialValue={selectedProduct?.name || ''}>
                <Input type="text" disabled />
              </Form.Item>
              <Form.Item
                label="Student Email"
                name="studentEmail"
                rules={[
                  { required: true, pattern: /^[a-zA-Z0-9._%+-]+@student\.bham\.ac\.uk$/, message: 'Please enter a valid University email' },
                ]}
                initialValue={user.email}
              >
                <Input type="email" disabled />
              </Form.Item>
              <Form.Item
                label="Enter your Student Id"
                name="studentId"
                initialValue={user.id}
                rules={[{ required: true, pattern: /^\d{7}$/, message: 'Please enter a valid 7-digit Student ID' }]}
              >
                <Input type="text" disabled />
              </Form.Item>

              <Form.Item label="Initial Listed Price" name="price" initialValue={selectedProduct?.price || ''}>
                <Input type="number" disabled />
              </Form.Item>
              <Form.Item
  label="Current Bid Amount"
  name="finalPrice"
  rules={[{ required: true, message: 'Please enter a valid amount' }]}
  initialValue={agreedAmount}
>
  {agreedAmount === 0 ? (
    <button
      className="text-white font-bold py-2 px-4 rounded border border-gray-300 cursor-pointer"
      style={{ background: "#191e29" }}
      onClick={() => navigate(`/product/${selectedProduct._id} `)}
    >
      Be the first one to bid
    </button>
  ) : (
    <Input type="number" disabled />
  )}
</Form.Item>

              <Form.Item
                label="Product Key"
                name="productKey"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the valid product key',
                    validator: (rule, value) =>
                      value === selectedProduct?.productUniqueRef
                        ? Promise.resolve()
                        : Promise.reject('Product key does not match'),
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
