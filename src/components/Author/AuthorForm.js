import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addAuthor, editAuthor} from '../../features/author/authorSlice';
import toast, {Toaster} from 'react-hot-toast';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';

function AuthorForm(props) {

    const navigate = useNavigate();
    const [yazi,
        setYazi] = useState({name: "", image_url: ""})
    const [cardTitle,
        setCartTitle] = useState("Add new Author")
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
            setCartTitle(`Edit Author`)

        }
    }, [props.editProp
            ?.name])

    const dispatch = useDispatch();
    const handeChange = (e) => {
        if (!props.editProp
            ?.name) {
                console.log(yazi)
            dispatch(addAuthor(yazi))
            
                .then(unwrapResult)
                .then(res => {
                    toast.success("Author added succesfully");
                    setTimeout(() => {
                        navigate('/authors');
                    }, 3000);
                })
                .catch(err => {
                    
                   if(typeof err.errorMessage=="object"){
                    err
                    .errorMessage
                    .forEach(error => {
                        toast.error(error.msg);

                    });
                   }else{
                    toast.error(err.errorMessage);
                   }
                })
        } else {
            const data = {
                id: props.editProp.id,
                ...yazi
            }
            dispatch(editAuthor(data))
                .then(unwrapResult)
                .then(res => {
                    toast.success("Author updated succesfully");
                    setTimeout(() => {
                        navigate('/authors');
                    }, 3000);
                })
                .catch((err) => {
                    if(err.errorMessage.length>1){
                        err
                        .errorMessage
                        .forEach(error => {
                            toast.error(error.msg);
                        });
                    }else{
                        toast.error(err.errorMessage);
                    }
                 
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
                            <label htmlFor="authorname" className="form-label">Author Name</label>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                id="authorname"
                                placeholder="enter a new author"
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

export default AuthorForm;
