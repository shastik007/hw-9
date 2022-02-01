import React, { useEffect, useState } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false) //state для отоброжения формы входа если value true отоброжаеться homepage , если false форма входа

	useEffect(() => {
		const storedUserLoggedInfo = localStorage.getItem('isLoggedIn')
		if (storedUserLoggedInfo === '1') {
			setIsLoggedIn(true)
		}
	}, [])//useEffect для проверки выполнил ли до этого вход user , проверка выполняетьсяя с помошью localstorage если по указанному ключу значение ровно "1" то тогда стейт отоброжения формы входа становиться true и отоброжаеться home page , useEffect работает один раз когда компонент прооизвел первый ренлер на странице (mounting or (components did mount) )


	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1')
		setIsLoggedIn(true)
	} // Эта функция берет и когда произошел Onsubmit в дочернем элементе передает данные из инпутов и в localstorage добовляет по укзанному ключу "1" это для того чтобы потом  проверить выполнял ли пользователь до этого вход , и изменяет state на false чтобы отрисовать home page на странице 

	const logoutHandler = () => {
		setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
	}// функция которая удаляет данные из localstorage чтобы забыть выполненный вход и отрисовывает форму входа на странице с помощью setIsLoggedIn(false)


	return (
		<React.Fragment>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
				{/*тут мы с помошью логического оператора (и &&) отрисовываем loginpage и homepage смотря на состояние ISLOGGEDIN  */}
			</main>
		</React.Fragment>
	)
}

export default App
