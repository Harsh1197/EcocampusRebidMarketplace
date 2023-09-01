import React, { useEffect } from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { SetUser } from '../../redux/Users'; // Import your Redux action

const ChatsPage = () => {
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const extractedUsername = user.name;

            try {
                const response = await axios.post(
                    'https://ecocampusrebid.onrender.com/authenticate',
                    { username: extractedUsername }
                );

                const userData = { ...response.data, secret: extractedUsername };
                console.log("UserData:", userData);

                dispatch(SetUser(userData));
            } catch (error) {
                console.error("Authentication error:", error);
            }
        };

        fetchData();
    }, [user.name, dispatch]);

    return (
        <div className='backgroundchat'>
            <PrettyChatWindow
                projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                username={user.user.name}
                secret={user.user.name}
                style={{ height: '80vh' }}
            />
        </div>
    );
};

export default ChatsPage;
