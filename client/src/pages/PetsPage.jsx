import React, {useEffect, useState} from 'react'
import MainLayout from "../components/MainLayout";
import axios from "axios";
import Modal from "../components/Modal";
import {Link} from "react-router-dom";

export const PetsPage = ({ auth }) => {
    const [pets, setPets] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedID, setSelectedID] = useState(0)
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)

    useEffect(() => {
        async function fetchPets () {
            const response = await axios.get('http://localhost:5000/api/pet')

            if (response.status === 200) {
                setPets(response.data)
            }
        }
        fetchPets()
    }, [])

    const showModal = (e) => {
        setModalVisible(true)
        setSelectedID(e.currentTarget.attributes['id'].value)
    }

    const hideModal = () => {
        setModalVisible(false)
        setIsSuccessfulSubmit(false)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        formData.append('name', auth.name)
        formData.append('email', auth.email)

        const response = await axios.post('http://localhost:5000/api/appeal', formData)

        if (response.status === 201) {
            setIsSuccessfulSubmit(true)
        }
    }

    return (
        <>
            <MainLayout>
                <h1 className="main-h1">Все наши питомцы</h1>
                <div className="pet-list">
                    {pets.length > 0 ? pets.map(pet => {
                            return (
                                <div className="pet-list__card" key={pet._id}>
                                    <div className="pet-list__img">
                                        <img src={"http://localhost:5000/" + pet.img} alt={pet.name}/>
                                    </div>
                                    <p className="pet-list__name">{pet.name} - {pet.type}</p>
                                    <p className="pet-list__description">{pet.description}</p>
                                    {auth.isAuth ?
                                        <button className="pet-list__btn" onClick={showModal} id={pet._id}>
                                            Хочу помочь!
                                        </button>
                                        : <Link to="/admin" className="pet-list__btn">Хочу помочь!</Link>
                                    }
                                </div>
                            )
                        })
                        : <p>Питомцев нет в базе</p>}
                </div>
            </MainLayout>
            {modalVisible &&
                <Modal hideModal={hideModal}>
                    {isSuccessfulSubmit ?
                        <h3 className="modal__title">Спасибо за ваше обращение!</h3>
                        : <>
                            <h3 className="modal__title">Оставить обращение</h3>
                            <form onSubmit={submitHandler}>
                                <div className="modal__field">
                                    <label>Ваше сообщение</label>
                                    <textarea type="text" name="message" required></textarea>
                                </div>
                                <input type="hidden" name="petID" value={selectedID}/>
                                <button className="modal__success-btn" type="submit">Отправить обращение</button>
                            </form>
                        </>
                    }
                </Modal>
            }
        </>
    )
}