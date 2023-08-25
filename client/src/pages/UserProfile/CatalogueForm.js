import { Col, Form, Input, Row, Tabs, message, Switch, Checkbox } from 'antd'

import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { AddItem, UpdateItem } from '../../apiIntegration.js/catalogue';
import { useSelector } from 'react-redux';
import ProductImages from './ProductImages';


function CatalogueForm({ productSelected, catalogueForm, getValues, setCatalogueForm }) {

    const [uniqueKey, setUniqueKey] = useState('');

    useEffect(() => {
        generateUniqueKey();
    }, [catalogueForm]);

    const generateUniqueKey = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]);
        const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
        const generatedKey = randomLetters.join('') + randomNumbers.join('');
        setUniqueKey(generatedKey);
        reference.current.setFieldsValue({ productUniqueRef: generatedKey });
    };

    const priceValidator = (_, value) => {
        if (value && value <= 5) {
            return Promise.reject(new Error('Price must be greater than £5'));
        }
        return Promise.resolve();
    };

    const ageValidator = (_, value) => {
        if (value && value <= 0) {
            return Promise.reject(new Error('Age must be greater than 0'));
        }
        return Promise.resolve();
    };

    const uniqueRefValidator = (_, value) => {
        const pattern = /^[A-Z]{3}\d{3}$/;
        if (value && !pattern.test(value)) {
            return Promise.reject(new Error('Unique Reference Key should have 3 uppercase alphabets followed by 3 numbers'));
        }
        return Promise.resolve();
    };

    const rules = {
        name: [
            { required: true, message: 'Please enter the name' },
        ],
        description: [
            { required: true, message: 'Please enter the item description' },
        ],
        category: [
            { required: true, message: 'Please select a category' },
        ],
        condition: [
            { required: true, message: 'Please select a condition' },
        ],
        price: [
            { required: true, message: 'Please enter the price' },
            { validator: priceValidator },
        ],
        age: [
            { required: true, message: 'Please enter the product age' },
            { validator: ageValidator },
        ]
        , productUniqueRef: [
            { required: true, message: 'Please enter the Unique Product Key' },
            { validator: uniqueRefValidator },
        ]
    }

    const productCondition = [
        {
            name: "billAvailability",
            label: "Product Bill"
        },
        {
            name: "warranty",
            label: "Under Warranty"
        },
        {
            name: "accesoriesAvailability",
            label: " Accessories Available"

        }
    ]
    const [tabSelected = "Key-1", setTabSelected] = React.useState("Key-1");

    const reference = React.useRef(null);

    const { user } = useSelector(state => state.users)
    const onSubmit = async (values) => {
        try {
            let response = null;


            if (!productSelected) {
                values.productStatus = "Pending"
                values.productSeller = user._id;

                response = await AddItem(values);
            }
            else {
                response = await UpdateItem(productSelected._id, values)
            }


            if (response.success) {
                getValues();
                message.success(response.message);
                setCatalogueForm(false);
            }
        }
        catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        if (productSelected) {
            reference.current.setFieldsValue(productSelected)
        }
    }, [productSelected])
    return (
        <Modal className='modl-gradient' centered width={950} title="" open={catalogueForm}
            okText="Save" onOk={() => {
                reference.current.submit();
            }}
            onCancel={() =>
                setCatalogueForm(false)
            }
            {...(tabSelected === 'Key-2' && { footer: false })}
        >

            <div>
                <h1 className='text-primary uppercase text-center font-semibold text-4xl'>{productSelected ? "Edit Product" : "Add Product"}</h1>
                <Tabs defaultActiveKey='Key-1' activeKey={tabSelected} onChange={(key) => setTabSelected(key)}>

                    <Tabs.TabPane tab="General" key='Key-1'>
                        <Form ref={reference} layout="vertical" onFinish={onSubmit}>
                            <Form.Item label="Name" name='name' rules={rules.name}>
                                <Input type='text'></Input>
                            </Form.Item>
                            <Form.Item name='productDescription' label="Item Description" rules={rules.description}>
                                <Input.TextArea />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Category" name="productCategory" rules={rules.category}>
                                        <select style={{ width: '220px' }}>
                                            <option value=""> Select Category</option>
                                            <option value="TextBooks">Books and Media</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Sports">Sports and Fitness</option>
                                            <option value="Fashion">Fashion and Accessories</option>
                                        </select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="condition" label="Condition" rules={rules.condition} >
                                        <select style={{ width: '220px' }} >
                                            <option >Select Product Condition</option>
                                            <option value="excellent">Excellent</option>
                                            <option value="very-good">Very Good</option>
                                            <option value="good">Good</option>
                                            <option value="average">Average</option>
                                            <option value="fair">Fair</option>
                                            <option value="poor">Poor</option>
                                            {/* Add more options for different condition levels */}
                                        </select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Price" name='price' rules={rules.price} style={{ width: '220px' }}>
                                        <Input addonBefore="£"
                                            placeholder="Enter price" type='number'></Input>
                                    </Form.Item>
                                </Col>


                                <Col span={7} style={{ display: 'flex', alignItems: 'center' }} >
                                    <Form.Item label="Product Age" name='productAge' rules={rules.age} style={{ width: '120px' }}>
                                        <Input type='number'></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={14}>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                        {productCondition.map((item) => {
                                            return <Form.Item label={item.label} name={item.name} style={{ marginBottom: 0, width: '30%' }}> <Input type='checkbox' value={item.name} onChange={(e) => {
                                                reference.current.setFieldsValue({
                                                    [item.name]: e.target.checked
                                                })
                                            }}

                                                checked={reference.current?.getFieldValue(item.name)}
                                            ></Input></Form.Item>
                                        })}
                                    </div>
                                </Col>

                            </Row>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Show Bids" name="showBids" valuePropName="checked">
                                        <Checkbox className="larger-checkbox"
                                            onChange={(e) => {
                                                reference.current.setFieldsValue({
                                                    showBids: e.target.checked
                                                });
                                            }}
                                            checked={reference.current?.getFieldValue("showBids")}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Unique Product Key" name='productUniqueRef' rules={rules.productUniqueRef}>
                                        <Input type='text' value={uniqueKey} readOnly></Input>
                                    </Form.Item>
                                </Col>
                            </Row>



                        </Form>


                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Product Images" key='Key-2'
                        disabled={!productSelected}>
                        <ProductImages getValues={getValues} productSelected={productSelected} setCatalogueForm={setCatalogueForm}></ProductImages>
                    </Tabs.TabPane>
                </Tabs>
            </div>

        </Modal >
    )
}

export default CatalogueForm
