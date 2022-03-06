import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getBookById } from '../../features/book/bookSlice';

export default function BookDetail() {
    const {id} = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBookById(id))
    }, [dispatch])

    return (
  <div></div>
    )
}
