import React from 'react'
import { Form } from 'react-bootstrap'

const PriceFilter = ({ setLowPrice, setHighPrice, lowPrice, highPrice }) => {
    return (
        <Form>
            <h3 className="mb-3">Цена</h3>
            <div className="label">
                <p>От</p>
                <Form.Control
                    size="sm"
                    type="number"
                    value={lowPrice}
                    onChange={(key) => setLowPrice(key.target.value)}
                />
            </div>
            <br />
            <div className="label mb-4">
                <p>До</p>
                <Form.Control
                    className="text"
                    size="sm"
                    type="number"
                    value={highPrice}
                    onChange={(key) => setHighPrice(key.target.value)}
                />
            </div>
        </Form>
    )
}

export default PriceFilter
