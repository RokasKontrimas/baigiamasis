import React from 'react';
import styles from './TextAreaLabeled.module.scss';

const TextAreaLabeled = React.forwardRef((props, ref) => {
    const {id, labelName, name, stateValue, onStateChange, error} = props;

    const onStateChangeHandler = (e) => {
        onStateChange(e.target.value);
    };

    return (
        <div className={styles.formControl}>
            <label htmlFor={id}>{labelName}</label>
            {error && <span className={styles.errorText}>{error.message}</span>}
            <textarea
                id={id}
                name={name}
                value={stateValue}
                onChange={onStateChangeHandler}
                ref={ref}
                className={error ? styles.textareaError : ''}
            ></textarea>
        </div>
    );
});

export default TextAreaLabeled;
