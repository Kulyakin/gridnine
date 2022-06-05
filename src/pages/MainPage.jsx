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
import { DATA, REACT_APP_API_URL } from '../constants/constants'
import Pagination from '../components/Pagination'
import moment from 'moment'
import 'moment/locale/ru'
import { render } from '@testing-library/react'

const MainPage = () => {
    const [result, setResult] = useState([])
    const [lowPrice, setLowPrice] = useState(1)
    const [highPrice, setHighPrice] = useState(200000)

    const [filter, setFilter] = useState([])


    const [pag, setPag] = useState([])
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

    let kek = []
    kek = flights.map((key) => {
        if (key.legs[0].segments.length == 1) {
            key.legs[0].segments.push(DATA)
        } else if (key.legs[1].segments.length == 1) {
            key.legs[1].segments.push(DATA)
        } else if (key.legs[0].segments.length == 2) {
            key.legs[0].segments[1].arrivalCity = {
                "caption": 'kek'
            }
            key.legs[1].segments[0].departureCity = {
                "caption": key.legs[1].segments[0].departureAirport.caption
            } 
        }
        }
    )

    console.log(flights)

// сортировка работает
    const sortByUpperPrice = () => {
        let upFilter = []
        upFilter = flights.sort(upSort)
        upFilter = paginate(flights, pageSize)
        setFilter(() => [...upFilter])
    }

    const sortByLowerPrice = () => {
        let lowFilter = []
        lowFilter = flights.sort(downSort)
        lowFilter = paginate(flights, pageSize)
        setFilter(() => [...lowFilter])
    }

    const sortByTime = () => {
        let sortTime = []
        sortTime = flights.sort(minTimeSort)
        sortTime = paginate(flights, pageSize)
        setFilter(() => [...sortTime])
    }
// сортировка работает
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

    const totalTime = (duration1, duration2) => {
        let minSumm = ''
        minSumm = Number(duration1 + duration2)
        let hours = Math.trunc(minSumm/60);
        let minutes = minSumm % 60;
        return hours + ' ч ' + minutes + ' мин';
    }

    console.log()


    // Форматирование времени
    
    const flightsPaginated = paginate(flights, pageSize)

    useEffect(() => {
        setFilter([...flightsPaginated]) // перерендер при изменение pagesize
    }, [result])

    useEffect(() => {
        setFilter([...filter]) // перерендер при изменение pagesize
    }, [pageSize])
    
    console.log(filter)


    let niceArray = []

    useEffect(() => {
        setFilter(paginate(priceSortirovka(niceArray), pageSize))
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
                                                                            /////// полностью рабочий функционал
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

   //console.log(flights.sort(oneTransferSort))
/*
    function oneTransferCheckbox(array) {
        return array.filter((key) => {
            (key.legs[0].segments.length + key.legs[1].segments.length) === 2
        })
    }
*/
    //console.log(oneTransferCheckbox(flights))

    ////////////// сортировка по пересадкам

    // Сброс

    const handleShowMore = () => {
        setPageSize((pageSize) => pageSize + 2)
    }

    const reset = () => {
            setPageSize((pageSize) => pageSize = 2)
            setFilter([...flightsPaginated])  ///// Полностью рабочий
        }

    // Сброс

    return (
        <Container>
            {filter !== [] && (
                <Row className="mt-3">
                    <Col sm={3}>
                        <div className="sort">
                            <PriceSort
                                sortByUpperPrice={() => sortByUpperPrice()}
                                sortByLowerPrice={() => sortByLowerPrice()}
                                sortByTime={() => sortByTime()}
                            />
                            <ChangeFilter />
                            <PriceFilter
                                setLowPrice={setLowPrice}
                                setHighPrice={setHighPrice}
                            />
                            <AircompanySort />
                            <Reset reset={() => reset()}/>
                        </div>
                    </Col>
                    <Col sm={9}>
                        {filter.map((key) => (
                            <Ticket
                                key={Math.random()}
                                caption={key.carrier.caption}
                                time={time(key.legs[0].segments[0].departureDate)}
                                totalTime={totalTime(key.legs[0].duration, key.legs[1].duration)}

                                departureDate={date(key.legs[0].segments[0].departureDate)}
                                departureCity={key.legs[0].segments[0].departureCity.caption}
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
                        <Pagination handleShowMore={() => handleShowMore()} />
                        <div>{pageSize}</div>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default MainPage
