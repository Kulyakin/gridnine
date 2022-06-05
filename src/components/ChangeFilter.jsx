import React from 'react'
import { Form } from 'react-bootstrap'

const ChangeFilter = ({ oneTransfer, withoutTransfer }) => {
    return (
        <Form>
            <h3 className="mb-3">Фильтровать</h3>
            {['checkbox'].map((type) => (
                <div key={`default-${type + '1'}`} className="mb-3">
                    <Form.Check
                        className="text"
                        type={type}
                        name='group1'
                        id={`default-${type + '2'}`}
                        label={` - 1 пересадка`}
                        onChange={oneTransfer}
                    />
                    <Form.Check
                        className="text"
                        type={type}
                        name='group1'
                        id={`default-${type}`}
                        label={` - без пересадок`}
                        onChange={withoutTransfer}
                    />
                </div>
            ))}
        </Form>
    )
}

export default ChangeFilter
