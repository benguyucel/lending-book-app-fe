import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react'
import {addPerson, editPerson} from '../../features/person/personSlice';
import {useNavigate} from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import {useDispatch} from 'react-redux';

function PersonForm(props) {
    const navigate = useNavigate();
    const [person,
        setPerson] = useState({name: "", sur_name: "", adress: null})
    const [title,
        setTitle] = useState("Add new person");
    const dispatch = useDispatch();

    const handleChange = () => {
        if (!props.editProp
            ?.name) {
            dispatch(addPerson(person))
                .then(unwrapResult)
                .then(res => {
                    toast.success("Person added succesfully");
                    setTimeout(() => {
                        navigate('/person');
                    }, 1200);
                })
                .catch((err) => {
                    err
                        .errorMessage
                        .forEach(error => {
                            toast.error(error.msg);
                        });
                })
        } else {
            const data = {
                id: props.editProp.id,
                ...person,
            }
            dispatch(editPerson(data))
            .then(unwrapResult)
            .then(res => {
                toast.success("Person updated succesfully");
                setTimeout(() => {
                    navigate('/person');
                }, 1200);
            })
            .catch((err) => {
                err
                    .errorMessage
                    .forEach(error => {
                        toast.error(error.msg);
                    });
            })
        }

    }
    const onchangeInput = (event) => {
        setPerson({
            ...person,
            [event.target.name]: event.target.value
        })

    }

    useEffect(() => {
        if (props.editProp
            ?.name) {
                setTitle("Edit Person")
            setPerson({
                ...person,
                name: props.editProp.name,
                sur_name: props.editProp.sur_name,
                adress: props.editProp.adress
            })
        }

    }, [props.editProp
            ?.name])

    return (
        <div>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <form className="row g-3">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                value={person.name}
                                onChange={onchangeInput}
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sur_name" className="form-label">Sur Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={person.sur_name}
                                onChange={onchangeInput}
                                id="sur_name"
                                name="sur_name"
                                placeholder="Sur Name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="adress" className="form-label">Adress</label>
                            <textarea
                                onChange={onchangeInput}
                                name="adress"
                                className="form-control"
                                id="adress"
                               value={person.adress}
                               rows="3">
                               
                            </textarea>
                        </div>
                        <button onClick={handleChange} type="button" className="btn btn-primary">{title}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PersonForm
