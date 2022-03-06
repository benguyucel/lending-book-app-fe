import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getAuthorById} from '../../features/author/authorSlice';
import AuthorForm from './AuthorForm';

function EditAuthor() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data,
        setData] = useState(null);
    useEffect(() => {
        dispatch(getAuthorById(id))
            .then(unwrapResult)
            .then(response => {
                setData(response)
            })
            .catch(error => {
                console.log({error})
            })
    }, [dispatch])
    return (<AuthorForm editProp={data}/>);
}

export default EditAuthor;
