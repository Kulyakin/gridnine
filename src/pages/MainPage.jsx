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

const MainPage = () => {
    const [result, setResult] = useState([])
    const [lowPrice, setLowPrice] = useState(1)
    const [highPrice, setHighPrice] = useState(200000)
    const [filter, setFilter] = useState([])
    const [filterPaginated, setFilterPaginated] = useState([])
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
                "caption": ''
            }
            key.legs[1].segments[0].departureCity = {
                "caption": key.legs[1].segments[0].departureAirport.caption
            } 
        }
        }
    )

    // Пагинация

    const paginate = (flights, pageSize) => {
        let kek = []
        kek = flights.slice(0, pageSize)
        return kek
    }

    // Пагинация

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

    const total = (duration1, duration2) => {
        let summ = ''
        summ = Number(duration1 + duration2)
        return summ
    }

    // Форматирование времени
    
    useEffect(() => {
        setFilter([...flights])
    }, [result])

    useEffect(() => {
        setFilterPaginated(paginate(filter, pageSize)) // перерендер при изменение pagesize
    }, [filter, pageSize])

    // Сортировки по времени и цене

    const sortByUpperPrice = () => {
        let upFilter = []
        upFilter = flights.sort(upSort)
        setFilter(() => [...upFilter])
        setPageSize((pageSize) => pageSize = 2)
    }

    const sortByLowerPrice = () => {
        let lowFilter = []
        lowFilter = flights.sort(downSort)
        setFilter(() => [...lowFilter])
        setPageSize((pageSize) => pageSize = 2)
    }

    const sortByTime = () => {
        let sortTime = []
        sortTime = flights.sort(minTimeSort)
        setFilter(() => [...sortTime])
        setPageSize((pageSize) => pageSize = 2)
    }

    function upSort(a, b) {
        if (Number(a.price.total.amount) < Number(b.price.total.amount)) {
            return -1
        }
        if (Number(a.price.total.amount) > Number(b.price.total.amount)) {
            return 1
        }
        return 0
    }

    function downSort(a, b) {
        if (Number(a.price.total.amount) > Number(b.price.total.amount)) {
            return -1
        }
        if (Number(a.price.total.amount) < Number(b.price.total.amount)) {
            return 1
        }
        return 0
    }

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

    // Сортировки по времени и цене

    // Сортировка по пересадкам

    function withoutTransferSort(a, b) {
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

    const withoutTransfer = () => {
        let noTransfer = []
        noTransfer = flights.sort(withoutTransferSort)
        setFilter(() => [...noTransfer])
        setPageSize((pageSize) => pageSize = 2)
    }

    function oneTransferSort(a, b) {
        if (
            Number(a.legs[0].duration + a.legs[1].duration) >
            Number(b.legs[0].duration + b.legs[1].duration)
        ) {
            return -1
        }
        if (
            Number(a.legs[0].duration + a.legs[1].duration) <
            Number(b.legs[0].duration + b.legs[1].duration)
        ) {
            return 1
        }
        return 0
    }

    const oneTransfer = () => {
        let oneTransfer = []
        oneTransfer = flights.sort(oneTransferSort)
        setFilter(() => [...oneTransfer])
        setPageSize((pageSize) => pageSize = 2)
    }

    // Сортировка по пересадкам

    // Сортировка по цене из импутов


    useEffect(() => {
        setFilter(priceSortirovka())
    }, [lowPrice, highPrice])

    function priceSortirovka() {
        let niceArray = []
        return (niceArray = flights.filter(
            (key) =>
                Number(key.price.total.amount) <= highPrice &&
                Number(key.price.total.amount) >= lowPrice
        ))
    }

    // Сортировка по цене из импутов

    // Сортировка по Авиакомпании

    function companySort(value) {
        let niceArray = []
        niceArray = flights.filter(
            (key) => key.carrier.caption === value
        )
        return setFilter([...niceArray])
    }


    // Сортировка по Авиакомпании

    // Показать еще

    const handleShowMore = () => {
        setPageSize((pageSize) => pageSize + 2)
    }

    // Показать еще


    // Сброс Фильтров

    const reset = () => {
            setPageSize((pageSize) => pageSize = 2) ///// Полностью рабочий
            setFilter([...flights])
        }

    // Сброс Фильтров

    return (
        <Container>
            {filterPaginated !== [] && (
                <Row className="mt-3">
                    <Col sm={3}>
                        <div className="sort">
                            <PriceSort
                                sortByUpperPrice={() => sortByUpperPrice()}
                                sortByLowerPrice={() => sortByLowerPrice()}
                                sortByTime={() => sortByTime()}
                            />
                            <ChangeFilter 
                            oneTransfer={() => {oneTransfer()}}
                            withoutTransfer={() => {withoutTransfer()}}
                            />
                            <PriceFilter
                                setLowPrice={setLowPrice}
                                setHighPrice={setHighPrice}
                            />
                            <AircompanySort 
                            companySort={companySort}
                            />
                            <Reset reset={() => reset()}/>
                        </div>
                    </Col>
                    <Col sm={9}>
                        {filterPaginated.map((key) => (
                            <Ticket
                                key={Math.random()}
                                caption={key.carrier.caption}
                                time={time(key.legs[0].segments[0].departureDate)}
                                totalTime={totalTime(key.legs[0].duration, key.legs[1].duration)}
                                total={total(key.legs[0].duration, key.legs[1].duration)}

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
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default MainPage