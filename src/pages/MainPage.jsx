import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import AircompanySort from '../components/AircompanySort'
import ChangeFilter from '../components/ChangeFilter'
import PriceFilter from '../components/PriceFilter'
import PriceSort from '../components/PriceSort'
import Ticket from '../components/Ticket'
import Reset from '../components/Reset'
import axios from 'axios'
import { REACT_APP_API_URL } from '../constants/constants'
import Pagination from '../components/Pagination'
import moment from 'moment'
import 'moment/locale/ru'

const MainPage = () => {
    const [result, setResult] = useState([])
    const [lowPrice, setLowPrice] = useState(1)
    const [highPrice, setHighPrice] = useState(200000)

    const [filter, setFilter] = useState()

    const [pageSize, setPageSize] = useState(2) // Кол-во элементов пагинации

    useEffect(() => {
        axios.get(REACT_APP_API_URL).then((res) => {
            setResult(res.data.flights)
        })
    }, [])

    const flights = []
    result.map((key) => {
        return flights.push(key.flight)
    })

    const sortByUpperPrice = () => {
        console.log('Work in progress')
    }

    const sortByLowerPrice = () => {
        return flights.sort(downSort)
    }

    const sortByTime = () => {
        console.log('Work in progress')
    }

    // Пагинация
    const paginate = (flights, pageSize) => {
        let kek = []
        kek = flights.splice(0, pageSize)
        return kek
    }

    // Форматирование времени

    moment.locale('ru')
    const time = (date) => {
        return moment(date).format('H:mm')
    }

    const date = (date) => {
        return moment(date).format('D MMMM dd')
    }
/*
    const totalTime = (date) => {
        return moment().format('HH ч mm мин')
    }
*/
    // Форматирование времени

    const flightsPaginated = paginate(flights, pageSize)

    let niceArray = []

    useEffect(() => {
        setFilter(priceSortirovka(niceArray))
    }, [lowPrice, highPrice])

    function priceSortirovka(niceArray) {
        return (niceArray = flights.filter(
            (key) =>
                Number(key.price.total.amount) <= highPrice &&
                Number(key.price.total.amount) >= lowPrice
        ))
    }

    ////////////// сортировка по цене

    function upSort(a, b) {
        if (Number(a.price.total.amount) < Number(b.price.total.amount)) {
            return -1
        }
        if (Number(a.price.total.amount) > Number(b.price.total.amount)) {
            return 1
        }
        return 0
    }

    //console.log(flights.sort(upSort))

    function downSort(a, b) {
        if (Number(a.price.total.amount) > Number(b.price.total.amount)) {
            return -1
        }
        if (Number(a.price.total.amount) < Number(b.price.total.amount)) {
            return 1
        }
        return 0
    }

    

    ////////////// сортировка по цене
    ////////////// сортировка по времени

    function minTimeSort(a, b) {
        if (
            Number(a.legs[0].duration + a.legs[1].duration) <
            Number(b.legs[0].duration + b.legs[1].duration)
        ) {
            return -1
        }
        if (
            Number(a.legs[0].duration + a.legs[1].duration) >
            Number(b.legs[0].duration + b.legs[1].duration)
        ) {
            return 1
        }
        return 0
    }

    //console.log(flights.sort(minTimeSort))

    ////////////// сортировка по времени
    ////////////// сортировка по пересадкам

    function oneTransferSort(a, b) {
        if (
            Number(a.legs[0].segments.length + a.legs[1].segments.length) <
            Number(b.legs[0].segments.length + b.legs[1].segments.length)
        ) {
            return -1
        }
        if (
            Number(a.legs[0].segments.length + a.legs[1].segments.length) >
            Number(b.legs[0].segments.length + b.legs[1].segments.length)
        ) {
            return 1
        }
        return 0
    }

   // console.log(flights.sort(oneTransferSort))
/*
    function oneTransferCheckbox(array) {
        return array.filter((key) => {
            (key.legs[0].segments.length + key.legs[1].segments.length) === 2
        })
    }
*/
    //console.log(oneTransferCheckbox(flights))

    ////////////// сортировка по пересадкам

    return (
        <Container>
            {flightsPaginated !== [] && (
                <Row className="mt-3">
                    <Col sm={3}>
                        <div className="sort">
                            <PriceSort
                                sortByUpperPrice={sortByUpperPrice}
                                sortByLowerPrice={sortByLowerPrice}
                                sortByTime={sortByTime}
                            />
                            <ChangeFilter />
                            <PriceFilter
                                setLowPrice={setLowPrice}
                                setHighPrice={setHighPrice}
                            />
                            <AircompanySort />
                            <Reset />
                        </div>
                    </Col>
                    <Col sm={9}>
                        {flightsPaginated.map((key) => (
                            <Ticket
                                key={key.price.total.amount}
                                caption={key.carrier.caption}
                                time={time(
                                    key.legs[0].segments[0].departureDate
                                )}
                                departureDate={date(
                                    key.legs[0].segments[0].departureDate
                                )}
                                departureCity={
                                    key.legs[0].segments[0].departureCity
                                        .caption
                                }
                                departureAirport={
                                    key.legs[0].segments[0].departureAirport
                                        .caption
                                }
                                departureUid={
                                    key.legs[0].segments[0].departureAirport.uid
                                }
                                aTime={time(
                                    key.legs[0].segments[1].arrivalDate
                                )}
                                arrivalDate={date(
                                    key.legs[0].segments[1].arrivalDate
                                )}
                                arrivalCity={
                                    key.legs[0].segments[1].arrivalCity.caption
                                }
                                arrivalAirport={
                                    key.legs[0].segments[1].arrivalAirport
                                        .caption
                                }
                                uid={key.legs[0].segments[1].arrivalAirport.uid}
                                price={key.price.total.amount}
                                currency={key.price.total.currency}
                                caption2={key.carrier.caption}
                                aTime2={time(
                                    key.legs[1].segments[1].arrivalDate
                                )}
                                arrivalDate2={date(
                                    key.legs[1].segments[1].arrivalDate
                                )}
                                arrivalCity2={
                                    key.legs[1].segments[1].arrivalCity.caption
                                }
                                arrivalAirport2={
                                    key.legs[1].segments[1].arrivalAirport
                                        .caption
                                }
                                uid2={
                                    key.legs[1].segments[1].arrivalAirport.uid
                                }
                                time2={time(
                                    key.legs[1].segments[1].departureDate
                                )}
                                departureDate2={date(
                                    key.legs[1].segments[1].departureDate
                                )}
                                departureCity2={
                                    key.legs[1].segments[0].departureCity
                                        .caption
                                }
                                departureAirport2={
                                    key.legs[1].segments[0].departureAirport
                                        .caption
                                }
                                departureUid2={
                                    key.legs[1].segments[0].departureAirport.uid
                                }
                            />
                        ))}
                        <Pagination setPageSize={setPageSize} />
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default MainPage
