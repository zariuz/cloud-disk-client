import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../../assets/img/navbar-logo.svg';
import './navbar.scss';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/user/userReducer';
import {getFiles, searchFiles} from '../../api/file';
import {showLoader} from '../../reducers/appReducer';

const Navbar: React.FC = () => {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const currentDir = useSelector((state: any) => state.files.currentDir);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  function searchChangeHandler(e: any) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      // @ts-ignore
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== '') {
      setSearchTimeout(
        // @ts-ignore
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">MERN CLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className="navbar__search"
            type="text"
            placeholder="Название файла..."
          />
        )}
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Регистрация</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
