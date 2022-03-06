import { unwrapResult } from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getPublisherId} from '../../features/publisher/publisherSlice';
import PublisherForm from './PublisherForm';

function EditPublisher() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data,
        setData] = useState(null);
    useEffect(() => {
        dispatch(getPublisherId(id))
            .then(unwrapResult)
            .then(response => {
                setData(response)
            })
            .catch(error => {
                console.log({error})
            })
    }, [dispatch])
    return (<PublisherForm editProp={data}/>);
}

export default EditPublisher;
