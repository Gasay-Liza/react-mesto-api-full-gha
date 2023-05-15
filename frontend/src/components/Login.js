import React, {useCallback, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


function Login({onLogin,isLoggedIn}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onLogin(formValue.email, formValue.password);
    },[onLogin, formValue])

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/', { replace: true })
        }
    }, );

    return (
        <div className="login">
            <h1 className="login__header">
                Вход
            </h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="login__label">
                    <input required
                           className="login__input"
                           placeholder='Email'
                           id="email"
                           name="email"
                           type="email"
                           onChange={handleChange}
                           value={formValue.email}/>
                </label>

                <label htmlFor="password" className="login__label">
                    <input required
                           className="login__input"
                           placeholder='Пароль'
                           id="password"
                           name="password"
                           type="password"
                           onChange={handleChange}
                           value={formValue.password}
                    />
                </label>

                <div className="login__button-container">
                    <button type="submit" className="login__submit">Войти</button>
                </div>
            </form>

        </div>
    )
}

export default Login;