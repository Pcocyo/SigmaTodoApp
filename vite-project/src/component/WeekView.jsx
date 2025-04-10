import React, { useRef,useState } from 'react'
import {Carousel } from 'react-bootstrap'
import { useLocation,useNavigate } from 'react-router-dom';
import { predefinedCalendar } from '../calender';
import HoverButton from './HoverButton';
import Week from './Week';
//redux imports
import { useDispatch, useSelector } from 'react-redux';
const WeekView = () => {

    const location = useLocation()
    const [currentMonth,setCurrentMonth] = useState({...location.state})
    const navigate = useNavigate()

    // redux logic
    const user = useSelector((state)=> state.user)
    // weekGenerate
    const monthDuplicated = [...user.data[currentMonth.month]]
    
    function changeToWeeks(monthArray) {
        const weeks = []
        for (let i = 0; i < monthArray.length; i += 7) {
            weeks.push(monthArray.slice(i, i + 7))
        }
        return weeks
    }
    const week = changeToWeeks(monthDuplicated)

    function handleNextMonth(){
        let month = Object.keys(user.data)[currentMonth.index + 1]
        if(!month){
            month = 'January'
        }
        let index = Object.keys(user.data).indexOf(month) 
        const nextMonth = {
            month: month,
            index: index
        }
        console.log(nextMonth)
        setCurrentMonth({...nextMonth})
    }
    function handlePrevMonth(){
        let month = Object.keys(user.data)[currentMonth.index - 1]
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
            <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
                <HoverButton 
                hoverStyles='#c6a2d0' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handlePrevMonth}>
                        <i className="bi bi-caret-left-square fs-3"></i>
                </HoverButton>
                <HoverButton 
                hoverStyles='#c6a2d0' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handlePrev}>
                        <i className="bi bi-arrow-left-circle fs-3"></i>
                </HoverButton>
                <div className='fs-4'>{currentMonth.month}</div>
                <HoverButton 
                hoverStyles='#c6a2d0' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handleNext}>
                        <i className="bi bi-arrow-right-circle fs-3"></i>
                </HoverButton>

                <HoverButton 
                hoverStyles='#c6a2d0' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px'}}
                onClick={handleNextMonth}>
                        <i className="bi bi-caret-right-square fs-3"></i>
                </HoverButton>
                <HoverButton 
                hoverStyles='#000000' 
                defaultStyles='transparent' 
                defaulTextStyles='#000000'
                additionalStyles={{borderRadius:'100px',border:'1px solid #c39edb'}}
                onClick={()=>{navigate('/year')}}>
                        <i className="bi bi-calendar-date fs-3"></i>
                </HoverButton>
                
            </div>

            <Carousel data-bs-theme="dark" className='min-vh-100' controls={false} interval={null} indicators={false} ref={carouselRef} id="customCarousel">

                {week.map((ele, index) => {
                    const currentWeek = index;
                    return (
                        <Carousel.Item key={index}>
                            <Week weekToDisplay={ele} weekInMonth={currentWeek}currentMonth={currentMonth}/>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </>
    )
}





export default WeekView