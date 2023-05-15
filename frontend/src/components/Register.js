import React, {useCallback, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';


function Register({onRegister, isLoggedIn}) {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onRegister(formValue.email, formValue.password);
    },[onRegister, formValue])

    if (isLoggedIn){
        navigate('/', { replace: true })
    }

    return (
        <div className="register">
            <h1 className="register__header">
                Регистрация
            </h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="register__label">
                    <input
                           className="register__input"
                           id="email"
                           name="email"
                           type="email"
                           onChange={handleChange}
                           value={formValue.email}
                           placeholder={'Email'}
                           required
                    />
                </label>

                <label htmlFor="password" className="register__label">
                    <input
                           className="register__input"
                           id="password"
                           name="password"
                           type="password"
                           onChange={handleChange}
                           value={formValue.password}
                           placeholder={'Пароль'}
                           required
                    />
                </label>

                <div className="register__button-container">
                    <button type="submit" className="register__submit">Зарегистрироваться</button>
                </div>
            </form>

            <div className="register__signup">
                <p>Уже зарегистрированы?&nbsp;</p>
                <Link to="/sign-in" className="signup__link">Войти</Link>
            </div>
        </div>
    )
}

export default Register;