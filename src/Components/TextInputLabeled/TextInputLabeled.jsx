import React from 'react';
import styles from './TextInputLabeled.module.scss';

const TextInputLabeled = React.forwardRef((props, ref) => {
    const {id, labelName, type, name, stateValue, onStateChange, error} = props;

    const onStateChangeHandler = (e) => {
        onStateChange(e.target.value);
    };

    return (
        <div className={styles.formControl}>
            <label className={styles.inputLabel} htmlFor={id}>
                {labelName}
            </label>
            {error && <span className={styles.errorText}>{error.message}</span>}
            <input
                id={id}
                type={type}
                name={name}
                value={stateValue}
                onChange={onStateChangeHandler}
                ref={ref}
                className={error ? styles.inputError : ''}
            />
        </div>
    );
});

export default TextInputLabeled;
