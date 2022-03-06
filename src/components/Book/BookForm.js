import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {getPublisher} from '../../features/publisher/publisherSlice';
import {getAuthors} from '../../features/author/authorSlice';
import {addBook, editBook} from '../../features/book/bookSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

function BookForm(props) {
    console.log(props.editProp)
    const dispatch = useDispatch();
    const publisher = useSelector(state => state.publisher)
    const author = useSelector(state => state.author)
    const navigate = useNavigate();
    const [book,
        setBook] = useState({name: "", publisher_id: 0, author_id: 0, page_count: "", image_url: ""})
    const [title,
        setTitle] = useState("Add new book");
    const onchangeInput = (event) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value
        })
    }
    const handleChange = (e) => {
        if (props.editProp
            ?.name) {
            const data = {
                id: props.editProp.id,
                ...book,
            }
            dispatch(editBook(data))
            .then(unwrapResult)
            .then(res => {
                toast.success("Book updated succesfully");
                setTimeout(() => {
                    navigate('/books');
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
            dispatch(addBook(book))
                .then(unwrapResult)
                .then(res => {
                    toast.success("Book added succesfully");
                    setTimeout(() => {
                        navigate('/books');
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
    useEffect(() => {
        if (props.editProp
            ?.name) {
            setTitle("Edit book")
            setBook({
                ...book,
                name: props.editProp.name,
                publisher_id: props.editProp.publisher_id,
                author_id: props.editProp.author_id,
                page_count: props.editProp.page_count,
                image_url: props.editProp.image_url
            })
        }
        dispatch(getPublisher())
        dispatch(getAuthors())
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
                            <label htmlFor="bookname" className="form-label">Book Name</label>
                            <input
                                name="name"
                                value={book.name}
                                onChange={onchangeInput}
                                type="text"
                                className="form-control"
                                id="bookname"
                                placeholder="Example input placeholder"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image_url" className="form-label">Image Url Name</label>
                            <input
                                name='image_url'
                                value={book.image_url}
                                onChange={onchangeInput}
                                type="text"
                                className="form-control"
                                id="image_url"
                                placeholder="image url"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publisher" className="form-label">Publisher</label>
                            <select
                                name="publisher_id"
                                value={book.publisher_id}
                                onChange={onchangeInput}
                                id="publisher"
                                className="form-select"
                                aria-label="Default select example">
                                <option value="0">Select Publisher</option>
                                {publisher
                                    .data
                                    .map((data) => {
                                        return (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author_id" className="form-label">Author</label>

                            <select
                                value={book.author_id}
                                onChange={onchangeInput}
                                name="author_id"
                                id="author"
                                className="form-select"
                                aria-label="Default select example">
                                <option value="0">Select Author</option>
                                {author
                                    .data
                                    .map((data) => {
                                        return (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="page_count" className="form-label">Page count</label>
                            <input
                                name='page_count'
                                value={book.page_count}
                                onChange={onchangeInput}
                                type="text"
                                className="form-control"
                                id="page_count"
                                placeholder="Page count"/>
                        </div>
                        <div className="mb-3">
                            <button onClick={handleChange} type="button" className='btn btn-primary'>{title}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default BookForm;
