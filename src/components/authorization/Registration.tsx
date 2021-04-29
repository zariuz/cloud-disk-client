import React, {useState} from 'react';
import './authorization.scss';
import Input from '../../utils/input/Input';
import {registration} from '../../api/user';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('email', email);
  console.log('password', password);

  return (
    <div className="authorization">
      <div className="authorization__header">Регистрация</div>
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
      <button
        className="authorization__btn"
        onClick={() => registration(email, password)}>
        Зарегистрироваться
      </button>
    </div>
  );
};

export default Registration;
