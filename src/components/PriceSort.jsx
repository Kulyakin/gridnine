import React from 'react'
import { Form } from 'react-bootstrap'

const PriceSort = ({ sortByLowerPrice, sortByUpperPrice, sortByTime }) => {
    return (
        <Form className="mt-3">
            <h3>Сортировать</h3>
            {['radio'].map((type) => (
                <div key={`default-${type}`} className="mb-3 mt-3">
                    <Form.Check
                        className="text"
                        name="group1"
                        type={type}
                        id={`default-${type}`}
                        label={` - по возрастанию цены`}
                        onClick={sortByUpperPrice}
                    />
                    <Form.Check
                        className="text"
                        name="group1"
                        type={type}
                        id={`default-${type}`}
                        label={` - по убыванию цены`}
                        onClick={sortByLowerPrice}
                    />
                    <Form.Check
                        className="text"
                        name="group1"
                        type={type}
                        id={`default-${type}`}
                        label={` - по времени в пути`}
                        onClick={sortByTime}
                    />
                </div>
            ))}
        </Form>
    )
}

export default PriceSort
