import React from 'react'
import { Form } from 'react-bootstrap'

const AircompanySort = () => {
    return (
        <Form>
            <h3>Авиакомпании</h3>
            {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                        className="text"
                        type={type}
                        id={`default-${type + '5'}`}
                        label={` - ${'Polish Airlines'}`}
                    />
                    <Form.Check
                        className="text"
                        type={type}
                        id={`default-${type + '6'}`}
                        label={` - ${'Аэрофлот'}`}
                    />
                </div>
            ))}
        </Form>
    )
}

export default AircompanySort
