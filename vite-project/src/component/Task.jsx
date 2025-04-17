import React,{useState,useEffect} from 'react'
import HoverButton from './HoverButton'
import AddTimerModal from './AddTimerModal';
import EditTaskModal from './EditTaskModal';

const Task = ({ taskName, taskDescription, dataAttr }) => {
    const [showAddTimer, setShowAddTimer] = useState(false);
    const handleCloseTimer = () => setShowAddTimer(false);
    const handleShowAddTimer = () => setShowAddTimer(true);
      //timer logic
      const [timer, setTimer] = useState(null)
      useEffect(() => {
          // If the timer reaches 0, show an alert and stop the timer
          if (timer !== null && timer === 0) {
              alert("Time's up!");
              return;
          }
          else if (timer){
            const timerId = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
    
            // Cleanup function to clear the interval
            return () => clearInterval(timerId);
          }

      }, [timer]); // Only re-run the effect when `time` changes
      
      const [showEditModal,setShowEditModal] = useState(false)
      const handleShowEditModal = ()=> setShowEditModal(true)
      const handleCloseEditModal = ()=> setShowEditModal(false)
  
    return (
        <>  
            <div className="text-center fs-4 m-2">
                {taskName}
            </div>
            <div className="fs-5 text-start w-100">
                {taskDescription}
            </div>
            <div className="">
            <div className="m-2">
                <HoverButton
                    hoverStyles='#c6a2d0'
                    defaultStyles='#000000'
                    defaulTextStyles='#c6a2d0'
                    textHoverStyle='#000000'
                    additionalStyles={{
                        borderRadius: '100px',
                        border: '1px solid #c6a2d0',
                        marginRight:'5px'
                    }}
                    onClick={handleShowAddTimer}>
                    <i className='bi bi-alarm-fill'></i>
                </HoverButton>
                <HoverButton
                    hoverStyles='#c6a2d0'
                    defaultStyles='#000000'
                    defaulTextStyles='#c6a2d0'
                    textHoverStyle='#000000'
                    additionalStyles={{
                        borderRadius: '100px',
                        border: '1px solid #c6a2d0'
                    }}
                    onClick={handleShowEditModal}>
                    Edit
                </HoverButton>
                </div>
            </div>
            <AddTimerModal show={showAddTimer} handleClose={handleCloseTimer} setTimer={setTimer} />
            <EditTaskModal show={showEditModal} handleClose={handleCloseEditModal} dataAttr={dataAttr}/>
        </>
    )
}

export default Task