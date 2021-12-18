import React from 'react'
import MainLayout from "../components/MainLayout";

export const ContactsPage = () => {
    return (
        <div>
            <MainLayout>
                <h1 className="main-h1">Как с нами связаться?</h1>
                <div className="contacts">
                    <div className="contacts__info">
                        <p className="contacts__item">
                            <strong>Телефон: </strong>
                            <a href="tel:+7 (999) 999-99-99">+7 (999) 999-99-99</a>
                        </p>
                        <p className="contacts__item">
                            <strong>Почта: </strong>
                            <a href="mailto:mail@mail.ru">mail@mail.ru</a>
                        </p>
                        <p className="contacts__item">
                            <strong>Адрес: </strong>
                            г. Хабаровск, ул. Серышева, д. 47
                        </p>
                    </div>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A7b43d20b37b7e529b551f52f39fa8572ad674b9deff7ae14ed99cc6a242083d6&amp;source=constructor"
                        width="100%" height="400" frameBorder="0">
                    </iframe>
                </div>
            </MainLayout>
        </div>
    )
}