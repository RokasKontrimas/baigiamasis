import React from 'react'
import styles from "./SettingsToggler.module.scss";

const SettingsToggler = (props) => {
    const {isToggled, handleSettingsToggle} = props
    return (
        <i onClick={(e) => (handleSettingsToggle(e))}
           className={`fa fa-wrench ${styles.settings} ${isToggled ? (styles.isToggled) : ''}`}></i>
    )
}
export default SettingsToggler
