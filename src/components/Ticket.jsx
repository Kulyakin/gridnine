import React from 'react'

import { Button, Row } from 'react-bootstrap'
import { Clock, ArrowRight } from 'react-bootstrap-icons'

const Ticket = ({
    total,
    caption,
    arrivalDate,
    arrivalCity,
    arrivalAirport,
    uid,
    departureCity,
    departureAirport,
    departureUid,
    price,

    caption2,
    arrivalDate2,
    arrivalCity2,
    arrivalAirport2,
    uid2,
    departureCity2,
    departureAirport2,
    departureUid2,
    departureDate2,
    departureDate,
    time,
    time2,
    aTime,
    aTime2,
    totalTime
}) => {
    return (
        <Row className="mt-4">
            <div className="head">
                <div className="price">{price + ' ₽'}</div>
                <div className="priceInfo mb-1">
                    {'Стоимость для одного взрослого пасажира'}
                </div>
            </div>
            <div>
                <div className="d-flex gap-1 mt-3">
                    <div>{`${departureCity}, ${departureAirport} `}</div>
                    <div className="tag">{`(${departureUid})`}</div>
                    <div className="tag">
                        <ArrowRight />
                    </div>
                    <div>{`${arrivalCity}, ${arrivalAirport} `}</div>
                    <div className="tag">{`(${uid})`}</div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <div>
                        <div>{`${time} ${departureDate}`}</div>
                    </div>
                    <div>
                        <Clock /> {totalTime}
                    </div>
                    <div>{`${aTime} ${arrivalDate}`}</div>
                </div>
                {total > 600 ? 
                <div className="wrap">
                        <div className="item"></div>
                        <div className="transfer">1 пересадка</div>
                        <div className="item"></div>
                    </div> : 
                    <div className="wrap">
                        <div className="item"></div>
                        <div className="transfer">Без пересадок</div>
                        <div className="item"></div>
                    </div>}
                <div>{'Рейс выполняет ' + caption}</div>
                <div className="hr mt-1" />
                {aTime2 &&
                    <div>
                    <div className="d-flex gap-1 mt-3">
                        <div>{`${departureCity2}, ${departureAirport2} `}</div>
                        <div className="tag">{`(${departureUid2})`}</div>
                        <div className="tag">
                            <ArrowRight />
                        </div>
                        <div>{`${arrivalCity2}, ${arrivalAirport2} `}</div>
                        <div className="tag">{`(${uid2})`}</div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <div>{`${time2} ${departureDate2}`}</div>
                        <div>
                            <Clock /> {totalTime}
                        </div>
                        <div>{`${aTime2} ${arrivalDate2}`}</div>
                    </div>
                    {total > 600 ? 
                <div className="wrap">
                        <div className="item"></div>
                        <div className="transfer">1 пересадка</div>
                        <div className="item"></div>
                    </div> : 
                    <div className="wrap">
                        <div className="item"></div>
                        <div className="transfer">Без пересадок</div>
                        <div className="item"></div>
                    </div>}
                    <div>{'Рейс выполняет ' + caption2}</div>
                </div>
                }
            </div>
            <Button
                style={{ background: '#ffb368', color: 'white' }}
                variant="warning"
                onClick={() => {
                    alert('Work in progress')
                }}
            >
                ВЫБРАТЬ
            </Button>
        </Row>
    )
}

export default Ticket
