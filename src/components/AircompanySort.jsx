import React from 'react'
import { Form } from 'react-bootstrap'

const AircompanySort = ({ companySort }) => {
    return (
        <Form>
            <h3>Авиакомпании</h3>
            {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                        className="text"
                        type={type}
                        id={`default-${type + '5'}`}
                        label={` - ${'Air France'}`}
                        onClick={() => companySort('Air France')}
                    />
                    <Form.Check
                        className="text"
                        type={type}
                        id={`default-${type + '6'}`}
                        label={` - ${'KLM'}`}
                        onClick={() => companySort('KLM')}
                    />
                </div>
            ))}
        </Form>
    )
}

export default AircompanySort
