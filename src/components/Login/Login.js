import React, { useState, useEffect } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState('')
	const [emailIsValid, setEmailIsValid] = useState(false)
	const [enteredPassword, setEnteredPassword] = useState('')
	const [passwordIsValid, setPasswordIsValid] = useState(false)
	const [formIsValid, setFormIsValid] = useState(false)
	// states для проверки валидности email , password , form и для  получения values from inputs

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('valid')
			setFormIsValid(
				enteredEmail.includes('@') && enteredPassword.trim().length > 6,
			)
		}, 2500)
		return () => clearTimeout(identifier)
	}, [setFormIsValid, enteredEmail, enteredPassword])

	//useEffect для проверки валидности  значений из формы (c помошью debounce , debounce это когда useEffect реагирует на depend через некоторое время ) , тут в переменную identifier засунули setTimeout чтобы потом мы смогли очистить timeout  в итоге мы получем что у нас валидация работает через 2500 sec после того как user написал данные , и так каждый раз 

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value)
	}
	//получаем данные c помошью to way data binding

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value)
	}
	//получаем данные c помошью to way data binding

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes('@'))
	}
	// тут мы еще раз проверяем на валидность email это происходит с помошью event onblur (это событие происходит когда объект теряет фокус в нашем случае это инпут email и если email валидный то тогда setEmailIsValid(true) это знчит мы убираем красный бордер и бекграунд об ошибке валидности )

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6)
	}

	// это тоже что и проверка email 

	const submitHandler = (event) => {
		event.preventDefault()
		props.onLogin(enteredEmail, enteredPassword)
	}

	// здесь мы берем данные из стейтов и передаем в родительский элемент с помошью lifting up (родительская функция берет данные и вытаскивает их к себе, preventDefault() останаывливает сботия браузера "обновления страницы")

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={enteredEmail}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={enteredPassword}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
