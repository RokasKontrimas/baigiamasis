import styles from "./ItemSettingsComponent.module.scss";
import {deleteItemHandler} from "../../Helpers/Helpers.jsx";

const ItemSettingsComponent = (props) => {
    const {isToggled,item,url,navigate,backLink} = props

    return (
        <>
            {isToggled && (

                <div className={styles.settingsItems}>
                    <i onClick={() => deleteItemHandler(`${url}`, item, navigate,backLink)} className={`fa fa-trash`}></i>
                    <i className={`fa fa-edit`}></i>
                </div>
            )}
        </>
    )
}
export default ItemSettingsComponent
