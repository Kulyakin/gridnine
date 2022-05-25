import React from 'react'

const Pagination = ({ setPageSize }) => {
    return (
        <div className="mt-3 mb-3 buttondiv">
            <button
                className="button"
                onClick={() => setPageSize((pageSize) => pageSize + 2)}
            >
                Показать еще
            </button>
        </div>
    )
}

export default Pagination
