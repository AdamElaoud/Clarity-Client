import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from "./store/store";
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store = {store}>
                <QueryClientProvider client = {queryClient}>
                    <App />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);