import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import styles from './ToastMessage.module.scss';

const ToastMessage = ({state}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {state && (
                <div className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}>
                    <div className={styles.messageContent}>
                        <i className={`fa ${state.success ? `fa-check ${styles.success}` : `fa-close ${styles.warning}`}`}></i>
                        <p>{state.success || state.warning}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ToastMessage;
