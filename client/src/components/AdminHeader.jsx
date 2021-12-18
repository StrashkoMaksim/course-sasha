import React from 'react';

function AdminHeader({title, btnText, onClick}) {
    return (
        <div className="admin-header">
            <h1 className="admin-header__h1">{title}</h1>
            <button className="admin-header__add" onClick={onClick}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 3.75C10 3.19772 9.55228 2.75 9 2.75C8.44772 2.75 8 3.19772 8 3.75V8H3.75C3.19772 8 2.75 8.44772 2.75 9C2.75 9.55228 3.19772 10 3.75 10H8V14.25C8 14.8023 8.44772 15.25 9 15.25C9.55228 15.25 10 14.8023 10 14.25V10H14.25C14.8023 10 15.25 9.55228 15.25 9C15.25 8.44772 14.8023 8 14.25 8H10V3.75Z"
                          fill="white">
                    </path>
                </svg>
                <span>{btnText}</span>
            </button>
        </div>
    );
}

export default AdminHeader;