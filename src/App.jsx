import {Route, Routes} from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent.jsx";
import AnimalCategoriesPage from "./Pages/AnimalCategoriesPage/AnimalCategoriesPage.jsx";
import CategoryPage from "./Pages/AnimalCategoryPage/AnimalCategoryPage.jsx";
import AnimalsPage from "./Pages/AnimalsPage/AnimalsPage.jsx";
import AnimalPage from "./Pages/AnimalPage/AnimalPage.jsx";
import TreesPage from "./Pages/TreesPage/TreesPage.jsx";
import TreePage from "./Pages/TreePage/TreePage.jsx";
import TreeCategoriesPage from "./Pages/TreeCategoriesPage/TreeCategoriesPage.jsx";
import TreeCategoryPage from "./Pages/TreeCategoryPage/TreeCategoryPage.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path='/' element={<WelcomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/animals/categories' element={<AnimalCategoriesPage/>}/>
                <Route path='animals/category/:id' element={<CategoryPage/>}/>
                <Route path='/animals' element={<AnimalsPage/>}/>
                <Route path='/animal/:id' element={<AnimalPage/>}/>
                <Route path="/trees" element={<TreesPage/>} />
                <Route path="/trees/categories" element={<TreeCategoriesPage/>} />
                <Route path="/trees/category/:id" element={<TreeCategoryPage/>} />
                <Route path="/tree/:id" element={<TreePage/>} />
            </Routes>
        </>
    )
}

export default App
