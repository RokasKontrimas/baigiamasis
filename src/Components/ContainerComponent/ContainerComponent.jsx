import styles from './ContainerComponent.module.scss'

const ContainerComponent = (props) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}
export default ContainerComponent
