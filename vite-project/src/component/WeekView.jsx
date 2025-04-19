import React, { useRef,useState } from 'react'
import {Carousel } from 'react-bootstrap'
import { useLocation,useNavigate } from 'react-router-dom';
import { predefinedCalendar } from '../calender';
import HoverButton from './HoverButton';
import Week from './Week';
//redux imports
import { useDispatch, useSelector } from 'react-redux';
const WeekView = ({isMobile}) => {

    const location = useLocation()
    const [currentMonth,setCurrentMonth] = useState({...location.state})
    const navigate = useNavigate()

    // redux logic
    const user = useSelector((state)=> state.user)
    // weekGenerate
    const monthDuplicated = [...user.data[currentMonth.month]]
    const dayToDisplay = isMobile? 3:7
    
    function changeToWeeks(monthArray) {
        const weeks = []
        for (let i = 0; i < monthArray.length; i += dayToDisplay) {
            weeks.push(monthArray.slice(i, i + dayToDisplay))
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
            <div className="d-flex flex-wrap justify-content-center gap-1 align-items-center mt-2 border border-danger w-100">
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
                <h6 className=''>{currentMonth.month}</h6>
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
                            <Week weekToDisplay={ele} weekInMonth={currentWeek}currentMonth={currentMonth} dayToDisplay={dayToDisplay}/>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </>
    )
}





export default WeekView