import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';
import { addPublisher, editPublisher } from '../../features/publisher/publisherSlice';

function PublisherForm(props) {
    console.log(props)

    const navigate = useNavigate();
    const [yazi,
        setYazi] = useState({name: "", image_url: ""})
    const [cardTitle,
        setCartTitle] = useState("Add new Publisher")
    const onchangeInput = (event) => {
        setYazi({
            ...yazi,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (props.editProp
            ?.name) {

            setYazi({
                ...yazi,
                name: props.editProp.name,
                image_url: props.editProp.image_url
            })
            setCartTitle(`Edit Publisher`)

        }
    }, [props.editProp
            ?.name])

    const dispatch = useDispatch();
    const handeChange = (e) => {
        if (!props.editProp
            ?.name) {
            dispatch(addPublisher(yazi))
                .then(unwrapResult)
                .then(res => {
                    toast.success("Publisher added succesfully");
                    setTimeout(() => {
                        navigate('/publishers');
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
                ...yazi
            }
            dispatch(editPublisher(data))
            .then(unwrapResult)
            .then(res => {
                toast.success("Publisher added succesfully");
                setTimeout(() => {
                    navigate('/publishers');
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
    return (
        <div>
            <Toaster position="bottom-left" reverseOrder={false}/>
            <div className="card">
                <div className="card-header">
                    {cardTitle}
                </div>
                <div className="card-body">
                    <form className="row g-3">
                        <div className="mb-3">
                            <label htmlFor="authorname" className="form-label">Publisher Name</label>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                id="authorname"
                                placeholder="enter a new publisher"
                                onChange={onchangeInput}
                                value={yazi.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageUrl" className="form-label">Image Url</label>
                            <input
                                name="image_url"
                                type="text"
                                className="form-control"
                                id="imageUrl"
                                placeholder="just enter image url"
                                onChange={onchangeInput}
                                value={yazi.image_url}/>
                        </div>
                        <button onClick={handeChange} type="button" className='btn btn-primary'>{cardTitle}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PublisherForm;
