import React from 'react'
import styles from './TextInputLabeled.module.scss'

const TextInputLabeled = (props) => {
    const {id, labelName, type, name, stateValue, onStateChange} = props
    const onStateChangeHandler = (e) => {
        onStateChange(e.target.value)
    }
    return (
        <div className={styles.formControl}>
            <label className={styles.inputLabel} htmlFor={id}>{labelName}</label>
            <input
                id={id}
                type={type}
                name={name}
                value={stateValue}
                onChange={(e) => {
                    onStateChangeHandler(e)
                }}
            />
        </div>
    )
}
export default TextInputLabeled
