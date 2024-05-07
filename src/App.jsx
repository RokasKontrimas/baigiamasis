import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage.jsx";
import CategoryPage from "./Pages/CategoryPage/CategoryPage.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/categories' element={<CategoriesPage/>}/>
                <Route path='/category/:id/:slug' element={<CategoryPage/>}/>
            </Routes>
        </>
    )
}

export default App
