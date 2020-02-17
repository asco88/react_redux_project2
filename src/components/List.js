import React from 'react';
import { Link } from 'react-router-dom'

function List(props) {
    const sortedList = props.list.sort((a, b) => b.timestamp - a.timestamp)

    return (
        sortedList ? sortedList.map(q => (
            <div key={q.id} className="pricing-features-item">
                <div>
                    <span>{q.author} asks:</span>
                    <Link to={`/question/${q.id}`} className='tweet'>
                        vote
                    </Link>
                </div>
            </div>
        )) : null
    )
}

export default List