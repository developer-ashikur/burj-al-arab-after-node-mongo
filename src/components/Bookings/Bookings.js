import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:4000/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    },[loggedInUser.email]);
    return (
        <div>
            <h3>You have {bookings.length} bookings. </h3>
            {
                bookings.map(book => <li>{book.name} From: {new Date(book.checkInDate).toDateString('dd/MM/yyyy')} To: {new Date(book.checkOutDate).toDateString('dd/MM/yyyy')} </li>)
            }
        </div>
    );
};

export default Bookings;