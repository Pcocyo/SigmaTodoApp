import React, { useState, useRef,useEffect} from 'react'
import { Container, Row, Col, Modal, Button, Form, } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import HoverButton from './HoverButton'
import AddTaskModal from './AddTaskModal'
const Week = ({ weekToDisplay, weekInMonth, currentMonth }) => {
    // modal control
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // daysInMonth ref logic
    const daysInMonth = useRef(null)
    function handleChangeDaysInMonth(days) {
        daysInMonth.current = days
    }
    // redux logic
    const user = useSelector((state) => state.user)


    return (
        <>
            <Container fluid className='' style={{ maxHeight: '100vh', height: '100vh' }} xs={1}>
                <Row className=''style={{height:'auto'}}>
                    {weekToDisplay.map((days, index) => {
                        return (
                            <Col key={index} className='p-1 m-0'
                                >
                                <div className='fs-1' style={{ color: '#9a9a9a' }}>{(weekInMonth * 7) + index + 1}</div>
                                <div className="d-flex flex-column justify-content-center align-items-center gap-2 p-2"
                                style={{                                        
                                    borderColor: '#222222',
                                    borderRight: '2px solid',
                                    borderBottom: '2px solid',
                                    borderRadius: '14px',
                                    height:'inherit'}}>
                                    {days &&
                                        days.map((ele, index) => {
                                            return (
                                                <div className=""
                                                    style={{
                                                        width: '90%', 
                                                        minHeight:'100px',
                                                        height: 'auto',
                                                        backgroundColor:'#cfdedb',
                                                        borderRadius:'14px'
                                                        
                                                    }}>
                                                    <div className="text-center">{ele.taskName}</div>
                                                    <div className="">{ele.taskDescription}</div>
                                                </div>
                                            )
                                        })}
                                    <HoverButton
                                        additionalStyles={{ width: '90%', height: '100px' }}
                                        hoverStyles='#c39edb'
                                        defaultStyles='#222222'
                                        textHoverStyle='#222222'
                                        onClick={() => {
                                            handleChangeDaysInMonth((weekInMonth * 7) + index)
                                            handleShow()
                                        }}>
                                        <i className="bi bi-plus-circle fs-1"></i>
                                    </HoverButton>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <AddTaskModal show={show} handleClose={handleClose} daysInMonth={daysInMonth.current} currentMonth={currentMonth.month} />
        </>
    )
}

export default Week