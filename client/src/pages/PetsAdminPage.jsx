import React, {useEffect, useState} from 'react'
import AdminLayout from "../components/AdminLayout"
import AdminHeader from "../components/AdminHeader"
import axios from "axios"
import Modal from "../components/Modal";
import trashIcon from '../assets/img/trash.svg'

export const PetsAdminPage = ({ setAuth }) => {
    const [pets, setPets] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [waitForDelete, setWaitForDelete] = useState('')

    useEffect(() => {
        async function fetchPets () {
            const response = await axios.get('http://localhost:5000/api/pet')
            setPets(response.data)
        }
        fetchPets()
    }, [])

    function showAddModal () {
        setAddModalVisible(true)
    }

    function showDeleteModal (e) {
        setWaitForDelete(e.currentTarget.attributes['data-delete'].value)
        setDeleteModalVisible(true)
    }

    function hideModal () {
        setAddModalVisible(false)
        setDeleteModalVisible(false)
    }

    async function addPet (e) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const response = await axios.post('http://localhost:5000/api/pet', formData)

        if (response.status === 201) {
            setPets(response.data.pets)
            setAddModalVisible(false)
        }
    }

    async function deletePet () {
        const response = await axios.delete('http://localhost:5000/api/pet', {
            params: { _id: waitForDelete }
        })

        if (response.status === 200) {
            setPets(response.data.pets)
            setDeleteModalVisible(false)
        }
    }

    return (
        <AdminLayout setAuth={setAuth}>
            <AdminHeader title="Все питомцы" btnText="Добавить питомца" onClick={showAddModal} />
            <div className="admin-list">
                {pets.length > 0 ? pets.map(pet => {
                    return (
                        <div className="admin-pet" key={pet._id} id={pet._id}>
                            <div className="admin-pet__left">
                                <div className="admin-pet__img">
                                    <img src={`http://localhost:5000/${pet.img}`} alt={pet.name}
                                         title={pet.name} />
                                </div>
                                <div className="admin-pet__info">
                                    <div className="admin-pet__name">{pet.name} - {pet.type}</div>
                                    <div className="admin-pet__description">{pet.description}</div>
                                </div>
                            </div>
                            <button className="admin-pet__delete" onClick={showDeleteModal} data-delete={pet._id}>
                                <img src={trashIcon} alt="Удалить"/>
                            </button>
                        </div>
                    )
                })
                : <p>Питомцев нет в базе</p>}
            </div>
            {addModalVisible &&
            <Modal hideModal={hideModal}>
                <form className="add-food" onSubmit={addPet}>
                    <h3 className="modal__title">Добавить питомца</h3>
                    <div className="modal__field">
                        <label>Имя питомца</label>
                        <input type="text" name="name" required/>
                    </div>
                    <div className="modal__field">
                        <label>Семейство питомца</label>
                        <input type="text" name="type" required/>
                    </div>
                    <div className="modal__field">
                        <label>История</label>
                        <textarea type="text" name="description" required></textarea>
                    </div>
                    <div className="modal__field">
                        <label>Изображение</label>
                        <input type="file" accept=".jpg" name="img" required/>
                    </div>
                    <button className="modal__success-btn" type="submit">Добавить питомца</button>
                </form>
            </Modal>
            }
            {deleteModalVisible &&
            <Modal hideModal={hideModal}>
                <h3 className="modal__title">Вы уверены, что хотите удалить этого питомца?</h3>
                <div className="modal__btns">
                    <button className="modal__danger-btn" onClick={hideModal}>Отменить</button>
                    <button className="modal__success-btn" onClick={deletePet}>Удалить</button>
                </div>
            </Modal>
            }
        </AdminLayout>
    )
}