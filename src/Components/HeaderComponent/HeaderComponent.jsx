import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import styles from './HeaderComponent.module.scss';

const HeaderComponent = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const returnNavLink = (path, title, styleClass) => {
        return (
            <NavLink to={`/${path}`}>
                {({isActive}) => (
                    <span className={isActive ? styleClass : ''}>{title}</span>
                )}
            </NavLink>
        );
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className={isNavOpen ? (`${styles['open-nav']} ${styles.navPadding}`) : ''}>
            {!isNavOpen && (
                <div className={styles.mobileLogoWrapper}>
                    <NavLink to='/'>
                        <img src={Logo} alt='Logo image'/>
                    </NavLink>

                </div>
            )}
            <nav>
                <div className={styles.logoWrapper}>
                    <NavLink to='/'>
                        <img src={Logo} alt='Logo image'/>
                    </NavLink>
                </div>

                <ul>
                    <li className={styles.dropdown}>
                        <button className={styles.dropdownButton}>Create</button>
                        <div className={styles.dropdownContent}>
                            {returnNavLink('hi', 'Obacki', styles.active)}
                        </div>
                    </li>
                    <li></li>
                    <li>{returnNavLink('test', 'Obacki', styles.active)}</li>
                </ul>
            </nav>
            <i
                className={`fa fa-bars ${styles.faBars}`}
                onClick={toggleNav}
            ></i>
        </header>
    );
};

export default HeaderComponent;
