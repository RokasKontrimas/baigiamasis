import styles from "./ItemSettingsComponent.module.scss";
import {deleteItemHandler} from "../../Helpers/Helpers.jsx";
import {Link} from "react-router-dom";

const ItemSettingsComponent = (props) => {
    const {isToggled,item,url,navigate,backLink,editUrl} = props

    return (
        <>
            {isToggled && (

                <div className={styles.settingsItems}>
                    <i style={{fontSize: "20px", height: "20px"}} onClick={() => deleteItemHandler(`${url}`, item, navigate,backLink)} className={`fa fa-trash`}></i>
                    <Link style={{color: "white",fontSize: "20px", textDecoration: "none", display: "flex"}} to={editUrl}><i className={`fa fa-edit`}></i></Link>
                </div>
            )}
        </>
    )
}
export default ItemSettingsComponent
