import React, {useEffect, useState} from 'react'
import MainLayout from "../components/MainLayout"
import Slider from "react-slick"
import {Link} from "react-router-dom";
import axios from "axios";

export const IndexPage = () => {
    const [lastPets, setLastPets] = useState([])

    useEffect(() => {
        async function fetchLastPets () {
            const response = await axios.get('http://localhost:5000/api/pet/few')

            if (response.status === 200) {
                setLastPets(response.data)
            }
        }
        fetchLastPets()
    }, [])

    const sliderSettings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }

    return (
        <MainLayout>
            {lastPets.length > 0 ?
                <>
                    <h1 className="main-h1">Этим малышам нужна ваша любовь</h1>
                    <Slider {...sliderSettings} className="index-slider">
                        {lastPets.map(pet => {
                            return (
                                <div className="index-slider__slide" key={pet._id}>
                                    <div className="index-slider__img">
                                        <img src={'http://localhost:5000/' + pet.img} alt={pet.name}/>
                                    </div>
                                    <p className="index-slider__name">{pet.name} - {pet.type}</p>
                                    <p className="index-slider__description">{pet.description}</p>
                                </div>
                            )
                        })}
                    </Slider>
                    <div className="center-wrapper">
                        <Link to="/pets" className="index-all">Все наши питомцы</Link>
                    </div>
                </>
            : <p>В базе нет питомцев</p>}
        </MainLayout>
    )
}