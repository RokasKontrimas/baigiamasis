import styles from './TextAreaLabeled.module.scss'

const TextAreaLabeled = (props) => {
    const {id, labelName, name, stateValue, onStateChange} = props
    const onStateChangeHandler = (e) => {
        onStateChange(e.target.value)
    }
    return (
        <div className={styles.formControl}>
            <label htmlFor={id}>{labelName}</label>
            <textarea
                id={id}
                name={name}
                value={stateValue}
                onChange={(e) => {
                    onStateChangeHandler(e)
                }}
            >
            </textarea>
        </div>
    )
}
export default TextAreaLabeled
