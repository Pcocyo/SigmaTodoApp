import React, { useState, useRef, useEffect } from 'react'
import { Col, Button, OverlayTrigger } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HoverButton from './HoverButton'
import AddTaskModal from './AddTaskModal'
import EditTaskModal from './EditTaskModal'

// redux imports
import { useDispatch } from 'react-redux'
import { clearData } from '../reducer/userReducer'
const Navigation = ({ setUserLogin, userLogin }) => {
  const [wide, setWide] = useState(false)
  const [isMobile, setIsMobile] = useState(false);


  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);

  //logout logic
  function handleLogout() {
    navigate('/')
  }

  //Viewport logic
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // data logic
  const [todayData, setTodayData] = useState(null)
  const todayDate = new Date().getDate();
  const month = new Date().getMonth()
  let user = useSelector(state => state.user)

  // add task today logic
  const [handleShowAddTask, setHandleShowAddTask] = useState(false)
  
  useEffect(() => {
    if (userLogin) {
      const monthArray = Object.keys(user.data)
      setTodayData(user.data[monthArray[month]][todayDate - 1])
    }
  }, [userLogin,user])

  // edit task today logic
  const [handleShowEditTask, setHandleShowEditTask] = useState(false)
  

  return (
    <>
      {userLogin && (
        <>
          <div className="mt-2">
            <HoverButton
              hoverStyles='#c39edb'
              defaultStyles='transparent'
              textHoverStyle='#151515'
              defaulTextStyles='#c39edb'
              onClick={() => setWide(!wide)}>
              <i className="bi bi-book-half" style={{ fontSize: '20px' }}></i>
            </HoverButton>
            {isMobile && !wide &&
              <>
                <HoverButton
                  hoverStyles='#c39edb'
                  defaultStyles='#222222'
                  textHoverStyle='#222222'
                  onClick={handleLogout}
                  additionalStyles={{ border: '1px solid #c39edb' }}

                >
                  <i className="bi bi-person-x-fill" style={{ fontSize: '20px' }}></i>
                </HoverButton>
                <HoverButton
                  hoverStyles='#c39edb'
                  defaultStyles='#222222'
                  textHoverStyle='#222222'
                  additionalStyles={{ border: '1px solid #c39edb', marginRight: '7px' }}
                  onClick={() => setHandleShowAddTask(true)}>
                  <i className="bi bi-plus-circle" style={{ fontSize: '20px' }}></i>
                </HoverButton>
              </>
            }
          </div>

          <div
            style={{
              position: 'absolute',
              display: `${isMobile ? 'none' : 'block'}`,
              backgroundColor: '#000000', color: '#e3e3e3',
              zIndex: '10',
              top: '0%',
              x: '-100%',
              height: '100%',
              width: '20%',
              transform: `translateX(${wide ? '55%' : '-100%'})`,
              transition: 'transform 0.3s ease-in-out',

            }}
          >
            <div className="m-3  d-flex justify-content-between align-items-center">
              <h3 className='  align-center p-0 mb-0' style={{ height: '100%' }}>Exercise</h3>
              <div className="">

                <HoverButton
                  hoverStyles='#c39edb'
                  defaultStyles='#222222'
                  textHoverStyle='#222222'
                  additionalStyles={{ border: '1px solid #c39edb', marginRight: '7px' }}
                  onClick={() => setHandleShowAddTask(true)}>
                  <i className="bi bi-plus-circle" style={{ fontSize: '20px' }}></i>
                </HoverButton>
                <HoverButton
                  hoverStyles='#c39edb'
                  defaultStyles='#222222'
                  textHoverStyle='#222222'
                  onClick={() => setShow(!show)}
                  ref={buttonRef}
                  additionalStyles={{ border: '1px solid #c39edb' }}
                >
                  <i className="bi  bi-three-dots" style={{ fontSize: '20px' }}></i>
                </HoverButton>
                {show && (
                  <div
                    style={{
                      position: "absolute",
                      top: buttonRef.current?.offsetTop || 0,
                      left: buttonRef.current?.offsetLeft + 4 + buttonRef.current?.offsetWidth || 0,
                      padding: "10px",
                      borderRadius: "5px",
                      zIndex: 1000,
                      boxShadow: "0 4px 6px #252525",
                      backgroundColor: '#252525'
                    }}
                  >
                    <HoverButton
                      hoverStyles='#c39edb'
                      defaultStyles='#222222'
                      textHoverStyle='#222222'
                      onClick={() => setShow(!show)}
                      additionalStyles={{ border: '1px solid #c39edb', marginRight: '4px' }}
                    >
                      <i className="bi bi-x-circle" style={{ fontSize: '20px' }}></i>
                    </HoverButton>
                    <HoverButton
                      hoverStyles='#c39edb'
                      defaultStyles='#222222'
                      textHoverStyle='#222222'
                      onClick={handleLogout}
                      additionalStyles={{ border: '1px solid #c39edb' }}
                    >
                      <i className="bi bi-person-x-fill" style={{ fontSize: '20px' }}></i>
                    </HoverButton>
                  </div>
                )}
              </div>
            </div>
            <div className='mx-3'>
              <h3 className="pb-2" style={{ borderBottom: '1px solid white' }}>today task</h3>
              {todayData && todayData.length ?
                (
                  todayData.map((ele, index) => {
                    console.log(ele)
                    return (
                      <div className="p-2 text-wrap text-break my-2" key={index} style={{
                        border: '2px solid #c39edb', borderRadius: '4px'
                      }}>
                        <div className="">
                          <div className="d-flex justify-content-between align-items-center">
                              <h5>{ele.taskName}</h5>
                            <HoverButton
                                hoverStyles='#c6a2d0'
                                defaultStyles='#000000'
                                defaulTextStyles='#c6a2d0'
                                textHoverStyle='#000000'
                                additionalStyles={{
                                  borderRadius: '4px',
                                  border: '1px solid #c6a2d0'
                                }}
                                onClick={()=>setHandleShowEditTask(true)}>
                                <i className="bi bi-pencil-square"></i>
                              </HoverButton>
                          </div>
                          {ele.taskDescription}
                        </div>
                      </div>
                    )
                  })
                )
                :
                (
                  <>
                    No task today, add task
                  </>
                )
              }
            </div>
          </div>
          <AddTaskModal show={handleShowAddTask} handleClose={() => setHandleShowAddTask(false)} daysInMonth={todayDate - 1} currentMonth={Object.keys(user.data)[month]} />
          <EditTaskModal show={handleShowEditTask} handleClose={()=>setHandleShowEditTask(false)} dataAttr={{currentMonth:Object.keys(user.data)[month],dataIndex:todayDate}}/>
        </>
      )}

    </>
  )
}


export default Navigation