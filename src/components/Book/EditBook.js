import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../features/book/bookSlice';

import BookForm from './BookForm';

function EditBook() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [book,
        setBook] = useState(null);
    useEffect(() => {
        dispatch(getBookById(id))
            .then(unwrapResult)
            .then(response => {
                setBook(response)
            })
            .catch(err => {
                console.log({err})
            })
    }, [dispatch])
    return (<BookForm editProp={book}/>);
}

export default EditBook;
