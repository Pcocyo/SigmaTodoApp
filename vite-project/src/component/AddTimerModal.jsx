import React, { useState } from 'react'
import { Modal, Button, Form, } from 'react-bootstrap'

import HoverButton from './HoverButton'

const AddTimerModal = ({ show, handleClose,setTimer }) => {
    const [minutes,setMinutes] = useState(null)
    function handleSubmit(e){
        e.preventDefault()
        setTimer(minutes)
        handleClose()
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <div className=''
                style={
                    {
                        backgroundColor: '#000000',
                        padding: '24px',
                        color: '#FFFFFF',
                        borderRadius: '5px'
                    }
                }
            >
                <Modal.Header
                    style={{
                        borderBottom: '0px'
                    }}>
                    <Modal.Title>Schedule reading time</Modal.Title>
                </Modal.Header>
                <Modal.Body
                >
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Set Timer (minutes)</Form.Label>
                            <Form.Control
                                type='numbers'
                                style={{
                                    backgroundColor: '#151515',
                                    color: '#ffffff',
                                    border: '1px solid #c39edb'
                                }} 
                                onChange={(e)=>setMinutes(e.target.value)}
                                value={minutes}
                                />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        borderTop: 'none'
                    }}>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <HoverButton
                        hoverStyles='#c39edb'
                        defaultStyles='#222222'
                        textHoverStyle='#222222'
                        type='submit'
                        additionalStyles={{border:'2px solid #c39edb'}}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Submit
                    </HoverButton>
                </Modal.Footer>
            </div>
        </Modal>
    )
}
export default AddTimerModal