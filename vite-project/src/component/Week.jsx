import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Modal, Button, Form, } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import HoverButton from './HoverButton'
import AddTaskModal from './AddTaskModal'
import AddTimerModal from './AddTimerModal'
const Week = ({ weekToDisplay, weekInMonth, currentMonth }) => {
    // modal control
    const [showAddTask, setShowAddTask] = useState(false);
    const [showAddTimer, setShowAddTimer] = useState(false);

    const handleCloseAddTask = () => setShowAddTask(false);
    const handleShowAddTask = () => setShowAddTask(true);
    const handleCloseTimer = () => setShowAddTimer(false);
    const handleShowAddTimer = () => setShowAddTimer(true);
    // daysInMonth ref logic
    const daysInMonth = useRef(null)
    function handleChangeDaysInMonth(days) {
        daysInMonth.current = days
    }
    //timer logic
    const [timer, setTimer] = useState(null)
    useEffect(() => {
        // If the timer reaches 0, show an alert and stop the timer
        if (timer !== null && timer === 0) {
            alert("Time's up!");
            return;
        }

        // Set up the timer to decrease the time every 1 second
        const timerId = setInterval(() => {
            setTimer((prevTime) => prevTime - 1);
        }, 1000);

        // Cleanup function to clear the interval
        return () => clearInterval(timerId);
    }, [timer]); // Only re-run the effect when `time` changes

    // redux logic
    const user = useSelector((state) => state.user)


    return (
        <>
            <Container fluid className='' style={{ maxHeight: '100vh', height: '100vh' }} xs={1}>
                <Row className='' style={{ height: 'auto' }}>
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
                                        backgroundColor: '#151515',
                                        height: 'inherit'
                                    }}>
                                    {days &&
                                        days.map((ele, index) => {
                                            return (
                                                <div className="d-flex flex-column align-items-center"
                                                    style={{
                                                        width: '90%',
                                                        minHeight: '100px',
                                                        border: '1px solid #c39edb',
                                                        height: 'auto',
                                                        backgroundColor: '#222222',
                                                        color: '#FFFFFF',
                                                        borderRadius: '14px'
                                                    }}
                                                    key={index}>
                                                    <div className="text-center fs-4">{ele.taskName}</div>
                                                    <div className="fs-5 text-start w-100">{ele.taskDescription}</div>
                                                    <div className="">
                                                        <HoverButton
                                                            hoverStyles='#c6a2d0'
                                                            defaultStyles='#000000'
                                                            defaulTextStyles='#c6a2d0'
                                                            textHoverStyle='#000000'
                                                            additionalStyles={{
                                                                borderRadius: '100px',
                                                                border: '1px solid #c6a2d0'
                                                            }}
                                                            onClick={handleShowAddTimer}>
                                                            <i className='bi bi-alarm-fill'></i>
                                                        </HoverButton>
                                                    </div>
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
                                            handleShowAddTask()
                                        }}>
                                        <i className="bi bi-plus-circle fs-1"></i>
                                    </HoverButton>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <AddTaskModal show={showAddTask} handleClose={handleCloseAddTask} daysInMonth={daysInMonth.current} currentMonth={currentMonth.month} />
            <AddTimerModal show={showAddTimer} handleClose={handleCloseTimer} setTimer={setTimer} />
        </>
    )
}

export default Week