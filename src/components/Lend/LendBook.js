import {unwrapResult} from '@reduxjs/toolkit'
import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getBooks} from '../../features/book/bookSlice'
import {lendBook} from '../../features/lend/lendSlice'
import {getPerson} from '../../features/person/personSlice'
import toast, {Toaster} from 'react-hot-toast';

function LendBook() {
    
    const {person, book} = useSelector(state => state)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [lend,
        setlend] = useState({book_id: 0, person_id: 0})
    const onchangeInput = (event) => {
        setlend({
            ...lend,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        dispatch(getBooks())
        dispatch(getPerson())
    }, [])
    const handleChange = () => {
        const date = new Date();
        const afterDay = new Date(date);
        const deliver__date = Math.floor(afterDay.setDate(afterDay.getDate() + 15));
        const created_at= Math.floor(Date.now());
        const addData = {...lend,deliver__date:deliver__date,created_at:created_at}
        console.log(addData)
        dispatch(lendBook(addData))
            .then(unwrapResult)
            .then(res => {
                toast.success("Book lending  succesfully");
                setTimeout(() => {
                    navigate('/books');
                }, 1200);
            })
            .catch((err) => {
toast.error(err.errorMessage)
            })
    }
    return (
        <div>
            <Toaster position="bottom-left" reverseOrder={false}/>

            <div className="card">
                <div className="card-header">
                    Lend Book
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="person" className="form-label">Person</label>
                        <Form.Select name="person_id" value={lend.person_id} onChange={onchangeInput}>
                            <option value="0">Select Person</option>

                            {person
                                .data
                                .map((person,index) => {
                                    return (
                                        <option value={person.id} key={index}>{person.name} {person.sur_name}</option>
                                    )
                                })}
                        </Form.Select>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="book" className="form-label">Book</label>
                        <Form.Select name="book_id" value={lend.book_id} onChange={onchangeInput}>
                            <option value="0">Select Book</option>

                            {book
                                .data
                                .map((book, index) => {

                                    return (
                                        <option key={index} value={book.bookId}>{book.book}</option>
                                    )
                                })}
                        </Form.Select>

                    </div>
                    <button onClick={handleChange} className='btn btn-primary'>Lend This Book</button>
                </div>
            </div>
        </div>

    )
}

export default LendBook