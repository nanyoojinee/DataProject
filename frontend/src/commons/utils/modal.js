import React from 'react';
import Modal from '../components/commons/Modal.jsx';

export const successModal = (message) => {
    <Modal message={message} type="success" />;
};

export const errorModal = (message) => {
    <Modal message={message} type="error" />;
};