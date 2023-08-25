import React from 'react';
import { Modal, message, notification } from 'antd';
import Divider from './Divider';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DeleteNotification } from '../apiIntegration.js/notifications';

function Notifications({ alerts, reloadAlert, displayAlert, setDisplayAlert }) {
    const navigate = useNavigate();

    const deleteNotification = async (id) => {
        try {
            const result = await DeleteNotification(id);
            if (result.success) {
                message.success(result.message);
                reloadAlert();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleDeleteNotification = (id) => {
        deleteNotification(id);
        setDisplayAlert(false);
    };

    return (
        <Modal
            width={800}
            centered
            title={<h2 style={{ textAlign: 'center', color: '#1f2937' }}>Notifications</h2>} // Centered title
            footer={null}
            visible={displayAlert}
            onCancel={() => setDisplayAlert(false)}
            bodyStyle={{ backgroundColor: '#1f2937', color: 'white' , borderRadius: '10px'}} 
        >
            <div className="flex gap-2 flex-col">
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <div
                            className="flex gap-1 flex-col border border-solid p-2 border-white-300 rounded"
                            key={alert._id}
                            onClick={() => {
                                navigate(alert.onClick);
                                setDisplayAlert(false);
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-white text-lg">{alert.title}</h3> 
                                <i
                                    className="ri-delete-bin-line cursor-pointer text-white" 
                                    onClick={() => handleDeleteNotification(alert._id)}
                                ></i>
                            </div>
                            <span className="text-lg text-gray-400 cursor-pointer"> 
                                {alert.message}
                            </span>
                            <h3 className="text-white-500 text-sm">
                                {moment(alert.createdAt).fromNow()}
                            </h3>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-white">No new notifications</div> 
                )}
            </div>
        </Modal>
    );
}

export default Notifications;
