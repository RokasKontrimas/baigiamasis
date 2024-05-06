import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default App
