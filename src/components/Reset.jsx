import React from 'react'
import { Button } from 'react-bootstrap'

const Reset = ({ reset }) => {
    return (
        <div>
            <Button onClick={reset}>Сброс</Button>
        </div>
    )
}

export default Reset
