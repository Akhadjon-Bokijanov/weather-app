import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ img, min, max, temp, day, dt }) => {
    return (
            <div 
            data-testid="card-test-id"
            style={{ border: '1px #999 solid', borderRadius: 11, cursor: 'pointer', minHeight: 106, minWidth: 106, margin: 3}}>
            <div style={{padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <strong>{day}</strong>
                </div>
                <div>
                    <img src={img} alt="weather img" width={60} height={60} />
                </div>
                {
                    temp ? <div style={{textAlign: 'center'}}>{temp}{'\u00b0'}</div>
                    : <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <div>{min}{'\u00b0'}</div>
                        <div style={{ marginLeft: 10 }}>{max}{'\u00b0'}</div>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Card
