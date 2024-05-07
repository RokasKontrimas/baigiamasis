import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage.jsx";
import CategoryPage from "./Pages/CategoryPage/CategoryPage.jsx";
import AnimalsPage from "./Pages/AnimalsPage/AnimalsPage.jsx";
import AnimalPage from "./Pages/AnimalPage/AnimalPage.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/categories' element={<CategoriesPage/>}/>
                <Route path='/category/:id' element={<CategoryPage/>}/>
                <Route path='/animals' element={<AnimalsPage/>}/>
                <Route path='/animal/:id' element={<AnimalPage/>}/>
            </Routes>
        </>
    )
}

export default App
