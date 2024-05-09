import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <ContainerComponent>
            <div style={{textAlign: "center"}}>
                <h1>
                    Page not found.
                    <Link to='/'>Go back.</Link>
                </h1>
            </div>
        </ContainerComponent>
    )
}
export default NotFoundPage
