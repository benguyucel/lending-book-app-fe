import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap';

import {useDispatch, useSelector} from 'react-redux'
import {deleteLending, getLending} from '../../features/lend/lendSlice';
import defaultImage from '../../img/say-no.png'
import CountdownTimer from '../CountdownTimer/CountdownTimer';


export default function Lending() {
    const {lending} = useSelector(state => state)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getLending())
    }, [])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [show,
      setShow] = useState(false);
    return (
      <div className='row'>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete this.</Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button
                  variant="danger"
            >
                  Delete
              </Button>
          </Modal.Footer>
      </Modal>
      {lending
          .data
          .map(lend => {
              return (

                  <div className='mb-2 col-md-4' key={lend.id}>
                      <div className="card">
                          <img
                              src={!lend.image_url
                              ? defaultImage
                              : lend.image_url}
                              className="card-img-top"
                              style={{
                              height: 266,
                              objectFit: 'contain'
                          }}
                              alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">{`who has : ${lend.personName} ${lend.surName}` }</h5>
                            
                              <p className="card-text">
                                  Publisher : {lend.publisherName}
                              </p>
                          </div>
                          <div className='card-footer d-flex justify-content-between'>
                              <button
                              onClick={()=>dispatch(deleteLending(lend.id))}
                                  className='btn btn-warning'>Take Back</button>
                            <CountdownTimer countdownTimestampMs={parseInt(lend.deliver_at)}></CountdownTimer>
                          </div>
                      </div>
                  </div>

              )
          })}

  </div>   )
}
