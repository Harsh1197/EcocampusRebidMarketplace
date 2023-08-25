import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Upload, message, Popconfirm } from 'antd';
import { UpdateItem, uploadImage } from '../../apiIntegration.js/catalogue';


function ProductImages({ productSelected, setCatalogueForm, getValues }) {
    const [imageArray = [], setImageArray] = React.useState(productSelected.productImages);
    const [file = null, setFile] = React.useState(null);
    const [preview = false, setPreview] = React.useState(true);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', productSelected._id);
            const response = await uploadImage(formData);


            if (response.success) {
                message.success(response.message);
                setImageArray([...imageArray, response.data])
                setPreview(false);
                setFile(null)

                getValues();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleFileChange = (info) => {
        const { file } = info;
        setFile(file);
    };
    const handleDelete = async (image) => {
        try {
            const imgArrayUpdated = imageArray.filter((img) => img !== image);
            const updatedProduct = { ...productSelected, imageArray: imgArrayUpdated };
            const response = await UpdateItem(
                productSelected._id,
                updatedProduct
            )
            if (response.success) {
                message.success(response.message);
                setImageArray(imgArrayUpdated);
                getValues();
            }
            else {
                throw new Error(response.message)
            }
        }
        catch (error) {

        }
    }
    return (
        <div>
            <div className="flex">
                {imageArray.map((image) => (
                    <div key={image} className="flex mb-5 gap-6 rounded border border-gray-300 p-2 relative">
                        <img className="h-40 w-40 object-cover rounded" src={image} alt="" />
                        <Popconfirm
                            title="Are you sure to delete this image?"
                            onConfirm={() => handleDelete(image)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className="absolute top-2 right-2" type="link" icon={<DeleteOutlined />} style={{ color: 'black' }} />
                        </Popconfirm>
                    </div>
                ))}
            </div>
            <Upload
                listType="picture"
                beforeUpload={() => false}
                onChange={(info) => {
                    handleFileChange(info)
                    setPreview(true);
                }}
                fileList={file ? [file] : []}
                showUploadList={preview}
            >
                <Button type="dashed">Upload Image</Button>
            </Upload>

            <div className="flex justify-end gap-5">
                <Button type="primary" onClick={() => setCatalogueForm(false)}>
                    Cancel
                </Button>
                <Button type="primary" onClick={handleUpload} disabled={!file}>
                    Upload
                </Button>
            </div>
        </div>
    );
}

export default ProductImages;