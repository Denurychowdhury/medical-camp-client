import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Camp from '../Components/Camp';

const Available = () => {

    const [camps, setCamps] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/camps')
            .then(data => {
                console.log(data);
                setCamps(data.data)
            })
    }, [])
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Available camps</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {
                    camps.map(i => <Camp camp={i}></Camp>)
                }
            </div>
        </div>
    );
};

export default Available;