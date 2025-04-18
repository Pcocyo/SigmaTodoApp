import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
// stylng and component imports
import { Form,Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import HoverButton from './HoverButton'
import { predefinedCalendar } from '../calender'

// redux imports
import { useSelector,useDispatch } from 'react-redux'
import { initializeData, clearData} from '../reducer/userReducer'

const LoginPage = ({setUserLogin}) => {
    const [login,setLogin] = useState(true)
    const [alert,setAlert] = useState('')
    const [username,setUsername] = useState('')
    const [password,setpassword] = useState('')
    const navigate = useNavigate()
    //store initialization
        const dispatch = useDispatch()
    // 
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname === '/'){
            setUsername('')
            setpassword('')
            setUserLogin(false)
            dispatch(clearData())
        }
    },[location.pathname])

    //handling data on localStorage
    useEffect(()=>{
        if(!localStorage.getItem('registeredUser')){
            localStorage.setItem('registeredUser',`[]`)
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        setAlert('')
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'))
        let haveUser = {}
        if(login){
            registeredUser.forEach((ele,index)=>{
                if(ele.username === username){
                    haveUser.username = username
                }
                if(ele.password === password){
                    haveUser.password = password
                    haveUser.data = registeredUser[index].data
                    haveUser.localStorageIndex = index
                }
            })
            if(!haveUser.username){
                setAlert('Database does not recognize username ' + username )
                setUsername('')
                setpassword('')
            }
            if(!haveUser.password){
                setAlert('Wrong password')
                setUsername('')
                setpassword('')
            } 
            else{
                dispatch(initializeData(haveUser))
                setUserLogin(true)
                navigate('/year')
            }
        }else{
            const newUser = {
                username:username,
                password:password,
                data:predefinedCalendar
            }
            registeredUser.push(newUser)
            localStorage.setItem('registeredUser',JSON.stringify(registeredUser))
            dispatch(initializeData({...newUser,localStorageIndex:registeredUser.length-1}))
            setUserLogin(true)
            navigate('/year')
        }
        
    }

    return (
        <div
            className=' d-flex align-items-center justify-content-center'
            style={{ height: '100vh' }}
        >
            <div
                style={{
                    width: '500px',
                    height: '500px',
                    borderRadius: '20px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding:'4em'
                }}
            >
                <p className='h1 text-center'>{login? 'Login':'Signup'}</p>
                {login ?
                    (<p className='fs-5'>No account? 
                        <span 
                        style={{
                            textDecoration:'underline',
                            color:"#c8a1d6",
                            cursor:'pointer',
                            marginLeft:'5px'
                        }}
                        onClick={()=>setLogin(false)}>Signup</span>
                    </p>)
                    :
                    (<p className='fs-5'>Have account?
                        <span 
                        
                        style={{
                            textDecoration:'underline',
                            color:"#c8a1d6",
                            cursor:'pointer',
                            marginLeft:'5px'
                        }}
                        onClick={()=>setLogin(true)}>Login</span>
                    </p>)
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3"
                        style={{
                            borderRadius:'10px',
                            backgroundColor:'#151515'
                        }}
                    >
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="username"  
                            className='fs-5'
                            style={{
                                backgroundColor:'#151515',
                                color:'#ffffff',
                                border:'1px solid #c39edb'
                            }}
                            value={username}                    
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        className='fs-5'
                        style={{
                            backgroundColor:'#151515',
                            color:'#ffffff',
                            border:'1px solid #c39edb'
                        }}
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        />
                    </Form.Group>
                    <HoverButton
                                    hoverStyles='#c39edb'
                                    defaultStyles='#222222'
                                    textHoverStyle='#222222'
                                    type='submit'
                    >
                        Submit
                    </HoverButton>
                    {alert && <p className='mt-4'>{alert}</p>}
                </Form>
            </div>
        </div>
    )
}

export default LoginPage