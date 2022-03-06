import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import {getPerson, getPersonbyId} from '../../features/person/personSlice';
import PersonForm from './PersonForm'

function EditPerson() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [person,
        setPerson] = useState();
    useEffect(() => {
        dispatch(getPersonbyId(id))
            .then(unwrapResult)
            .then(response => {
                setPerson(response)
            })
            .catch(err => {
                console.log({err})
            })
    }, [dispatch])
    console.log(person)
    return (
        <div><PersonForm editProp={person}/></div>
    )
}

export default EditPerson