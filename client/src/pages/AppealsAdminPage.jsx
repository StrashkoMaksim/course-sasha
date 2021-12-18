import React, {useEffect, useState} from 'react'
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import trashIcon from "../assets/img/trash.svg";
import Modal from "../components/Modal";

export const AppealsAdminPage = ({ setAuth }) => {
    const [appeals, setAppeals] = useState([])
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [waitForDelete, setWaitForDelete] = useState('')

    useEffect(() => {
        async function fetchAppeals () {
            const response = await axios.get('http://localhost:5000/api/appeal')
            setAppeals(response.data)
        }
        fetchAppeals()
    }, [])

    function showDeleteModal (e) {
        setWaitForDelete(e.currentTarget.attributes['data-delete'].value)
        setDeleteModalVisible(true)
    }

    function hideModal () {
        setDeleteModalVisible(false)
    }

    async function deleteAppeal () {
        const response = await axios.delete('http://localhost:5000/api/appeal', {
            params: { _id: waitForDelete }
        })

        if (response.status === 200) {
            setAppeals(response.data)
            setDeleteModalVisible(false)
        }
    }

    return (
        <AdminLayout setAuth={setAuth}>
            <div className="admin-list">
                {appeals.length > 0 ? appeals.map(appeal => {
                        return (
                            <div className="admin-pet" key={appeal._id} id={appeal._id}>
                                <div className="admin-pet__left">
                                    <div className="admin-pet__img">
                                        <img src={`http://localhost:5000/${appeal.petID.img}`} alt={appeal.petID.name}/>
                                    </div>
                                    <div className="admin-pet__info">
                                        <div className="admin-pet__name">{appeal.name}</div>
                                        <div className="admin-pet__description">
                                            <strong>Кому обращение:</strong> {appeal.petID.name} - {appeal.petID.type}</div>
                                        <div className="admin-pet__description">
                                            <strong>Почта:</strong> {appeal.email}</div>
                                        <div className="admin-pet__description">
                                            <strong>Сообщение:</strong> {appeal.message}</div>
                                    </div>
                                </div>
                                <button className="admin-pet__delete" onClick={showDeleteModal} data-delete={appeal._id}>
                                    <img src={trashIcon} alt="Удалить"/>
                                </button>
                            </div>
                        )
                    })
                    : <p>Обращений нет в базе</p>}
            </div>
            {deleteModalVisible &&
            <Modal hideModal={hideModal}>
                <h3 className="modal__title">Вы уверены, что хотите удалить это обращение?</h3>
                <div className="modal__btns">
                    <button className="modal__danger-btn" onClick={hideModal}>Отменить</button>
                    <button className="modal__success-btn" onClick={deleteAppeal}>Удалить</button>
                </div>
            </Modal>
            }
        </AdminLayout>
    )
}