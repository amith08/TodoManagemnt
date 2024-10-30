import {BrowserRouter ,Routes,Route,Navigate } from 'react-router-dom'
import './TodoApp.css'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './Security/AuthContext'
import ProjectTodosComponent from './ProjectTodosComponent'

function AuthenticatedRoute({children}){
    const authContext=useAuth()

    if(authContext.isAuthenticated){
    return children
}
return <Navigate to ="/" />

    
}

export default function ToDoApp(){
    return(
        <div className="ToDoApp">
<AuthProvider>
        <BrowserRouter>
            <HeaderComponent/>
        <Routes>
            
        <Route path='/' element={<LoginComponent/>}/>

        <Route path='/login' element={<LoginComponent/>}/>

        <Route path='/welcome/:username'element={
        <AuthenticatedRoute>
        <WelcomeComponent/>
        </AuthenticatedRoute> 
        }/>

        <Route path='/logout' element={<LogoutComponent/>}/>
        <Route path='*' element={<ErrorComponent/>}/>

<Route
    path='/users/:username/projects/:projectId/todos'
    element={
        <AuthenticatedRoute>
            <ProjectTodosComponent />
        </AuthenticatedRoute>
    }
/>

        </Routes>
       
        </BrowserRouter>
        <FooterComponent/>
        </AuthProvider>
        </div>
    )
}