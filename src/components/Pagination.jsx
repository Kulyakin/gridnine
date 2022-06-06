import React from 'react'

const Pagination = ({ handleShowMore }) => {
    return (
        <div className="mt-3 mb-3 buttondiv">
            <button className="button" onClick={handleShowMore}>
                Показать еще
            </button>
        </div>
    )
}

export default Pagination
