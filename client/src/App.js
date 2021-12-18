import React, {useEffect, useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes"
import axios from "axios"
import './assets/styles/template.scss'

function App() {
  const [auth, setAuth] = useState({
    isAuth: false,
    role: undefined
  })

  useEffect(() => {
    async function checkToken () {
      if (localStorage && localStorage.getItem('JWT')) {
        const token = localStorage.getItem('JWT').slice(1, -1)
        const response = await axios.post('http://localhost:5000/api/auth/check-auth',
            { token })

        if (response.status === 200) {
          setAuth({
            isAuth: true,
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role
          })
        }
      }
    }
    checkToken()
  }, [])

  const routes = useRoutes(auth, setAuth)

  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  )
}

export default App;
