import React from 'react';
import Header from './headers/Header';
import SuccessModal from './commons/modal/SuccessModal';
import ErrorModal from './commons/modal/ErrorModal';
import { useRecoilState } from 'recoil';
import { isErrorModalState, isSuccessModalState } from '../stores';
import Footer from './commons/Footers/Footer';
import { useLocation } from 'react-router-dom';

export default function LayoutComponent({ children }) {
  const [isSuccessModal, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [isErrorModal, setIsErrorModal] = useRecoilState(isErrorModalState);

  const onClose = () => {
    setIsScucessModal({ state: false, message: '' });
    setIsErrorModal({ state: false, message: '' });
  };

  const location = useLocation();

  console.log(location);

  return (
    <>
      <Header />
      {children}
      {location.pathname !== '/' && <Footer />}
      {isSuccessModal.state && <SuccessModal onClose={onClose} message={isSuccessModal.message} />}
      {isErrorModal.state && <ErrorModal onClose={onClose} message={isErrorModal.message} />}
    </>
  );
}
