import React, {useState} from 'react';
import './registration.scss';
import Input from '../../utils/input/Input';
import {registration} from '../../api/user';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('email', email);
  console.log('password', password);

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль..."
      />
      <button className="registration__btn" onClick={() => registration(email, password)}>
        Войти
      </button>
    </div>
  );
};

export default Registration;
