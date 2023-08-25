import React from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import "./App.css";

const ChatsPage = (props) => {
    return (
        <div className='backgroundchat'>
            <PrettyChatWindow
                projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID} 
                username={props.user.username}
                secret={props.user.secret}
                style={{ height: '100vh' }}
            />
        </div>

    );
};

export default ChatsPage;














