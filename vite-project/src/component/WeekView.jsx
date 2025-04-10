import React, { useRef,useState,useEffect } from 'react'
import { Row, Container, Col, Carousel, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { predefinedCalendar } from '../calender';
import HoverButton from './HoverButton';
const WeekView = () => {

    const location = useLocation()
    const [currentMonth,setCurrentMonth] = useState({...location.state})

    // weekGenerate
    const monthDuplicated = [...predefinedCalendar[currentMonth.month]]
    
    function changeToWeeks(monthArray) {
        const weeks = []
        for (let i = 0; i < monthArray.length; i += 7) {
            weeks.push(monthArray.slice(i, i + 7))
        }
        return weeks
    }
    const week = changeToWeeks(monthDuplicated)

    function handleNextMonth(){
        let month = Object.keys(predefinedCalendar)[currentMonth.index + 1]
        if(!month){
            month = 'January'
        }
        let index = Object.keys(predefinedCalendar).indexOf(month) 
        const nextMonth = {
            month: month,
            index: index
        }
        console.log(nextMonth)
        setCurrentMonth({...nextMonth})
    }
    function handlePrevMonth(){
        let month = Object.keys(predefinedCalendar)[currentMonth.index - 1]
        if(!month){
            month = 'December'
        }
        let index = Object.keys(predefinedCalendar).indexOf(month) 
        const nextMonth = {
            month: month,
            index: index
    }
        
        console.log(nextMonth)
        setCurrentMonth({...nextMonth})
    }
    // corousel control
    const carouselRef = useRef(null);
    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleNext = () => {
        carouselRef.current.next();
    };
    return (
        <>
            <div className="d-flex justify-content-center gap-3 align-items-center">
                <HoverButton 
                hoverStyles='#000000' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handlePrevMonth}>
                        <i className="bi bi-caret-left-square fs-3"></i>
                </HoverButton>
                <HoverButton 
                hoverStyles='#000000' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handlePrev}>
                        <i className="bi bi-arrow-left-circle fs-3"></i>
                </HoverButton>
                <div className='fs-4'>{currentMonth.month}</div>
                <HoverButton 
                hoverStyles='#000000' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handleNext}>
                        <i className="bi bi-arrow-right-circle fs-3"></i>
                </HoverButton>

                <HoverButton 
                hoverStyles='#000000' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handleNextMonth}>
                        <i className="bi bi-caret-right-square fs-3"></i>
                </HoverButton>
                
            </div>

            <Carousel data-bs-theme="dark" className='min-vh-100' controls={false} interval={null} indicators={false} ref={carouselRef} id="customCarousel">

                {week.map((ele, index) => {
                    const currentWeek = index;
                    return (
                        <Carousel.Item key={index}>
                            <Week weekToDisplay={ele} weekInMonth={currentWeek} setCurrentMonth={setCurrentMonth} currentMonth={currentMonth}/>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </>
    )
}
const Week = ({ weekToDisplay, weekInMonth, setCurrentMonth,currentMonth}) => {
    return (
        <Container fluid className='' style={{ maxHeight: '100vh', height: '100vh' }} xs={1}>
            <Row className=''>
                {weekToDisplay.map((days, index) => {
                    return (
                        <Col key={index} className='flex-grow p-1 m-0'
                        style={
                            {
                                borderColor:'#222222',
                                borderRight:'2px solid',
                                borderBottom:'2px solid',
                                borderRadius:'25px'
                            }
                        }>
                            <div className='fs-1' style={{color:'#9a9a9a'}}>{(weekInMonth * 7) + index + 1}</div>
                            <div className="d-flex justify-content-center align-items-center">
                                <HoverButton
                                additionalStyles={{width:'90%',height:'100px'}}
                                hoverStyles='#c39edb'
                                defaultStyles='#222222'
                                textHoverStyle='#222222'>
                                    <i className="bi bi-plus-circle fs-1"></i>
                                </HoverButton>
                            </div> 
                            
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}




export default WeekView