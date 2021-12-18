import React from 'react';
import closeIcon from '../assets/img/close.svg'
import '../assets/styles/modal.scss'

function Modal({hideModal, children}) {
    return (
        <div className="modal">
            <div className="modal__outside" onClick={hideModal}></div>
            <div className="modal__body">
                <img src={closeIcon} alt="Закрыть модальное окно" className="modal__close" onClick={hideModal}/>
                {children}
            </div>
        </div>
    );
}

export default Modal;