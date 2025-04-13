import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Container,Row,Col } from 'react-bootstrap';
import { predefinedCalendar } from '../calender';

//redux imports
import { useSelector } from 'react-redux';
const YearView = () => {
    const [calenderHover,setCalenderHover] = useState({})

    //redux logic
    const userState = useSelector(state=>state.user)
    
    //component logic
    function handleMouseEnterCalender(id){ 
        setCalenderHover((prevState)=>({...prevState,[id]:true}))
    }
    function handleMouseLeaveCalender(id){
        setCalenderHover((prevState)=>({...prevState,[id]:false}))
    }

    //navigation logic
    const navigate = useNavigate()
    function handleSelectedMonth(month, monthInObjIndex) {
        const newSelection = { month, index: monthInObjIndex };
        navigate('/week', { state: { ...newSelection } })
    }

    return (
        <Container fluid className='h-100 d-flex align-items-center justify-content-center' style={{borderWidth:'2px'}}>
            <Row className=' p-0 m-0 gap-2' style={{ height: '800px', width:'800px' }}>
                {
                    Object.keys(userState.data).map((keys, index) => {  
                        return (
                            <Col       
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            className='p-0 m-0 d-flex justify-content-center ' 
                            style={{ 
                                cursor: 'pointer',
                                color: '#030303',
                                backgroundColor:`${calenderHover[index]?'transparent':index%2==0?"#c8a1d6":"#cfdedb"}`,
                                border:`3px  solid  ${index%2==0?"#c8a1d6":"#cfdedb"}`,
                                borderRadius:'10px'
                            }} 
                                key={index}
                                onMouseEnter={()=>handleMouseEnterCalender(index)}
                                onMouseLeave={()=>handleMouseLeaveCalender(index)}
                                onClick={() => handleSelectedMonth(keys, index)}
                            >
                                <div className="fs-5">{keys}</div>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default YearView