import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Button, ColorPicker, ConfigProvider } from 'antd';
import { Components } from 'antd/es/date-picker/generatePicker';
import { Provider } from 'react-redux';
import store from './redux/redux_store';
import { SearchProvider } from './Context/Search';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SearchProvider>
      <ConfigProvider theme={
        {
          components: {
            Button: {
              colorPrimary: '#38434c',
              colorPrimaryHover: '#38434c',
              borderRadius: '2px'
            }
          },
          token: {
            borderRadius: '2px',
            colorPrimary: '#154c79',
          }
        }}>
        <App />
      </ConfigProvider>
    </SearchProvider>
  </Provider>
);



reportWebVitals();
