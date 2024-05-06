import './App.css'
import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default App
