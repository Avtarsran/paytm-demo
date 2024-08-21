import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"
import { RecoilRoot } from "recoil"
function App() {
  let navigate = '/signin'
  if(localStorage.getItem("authorization")){
    navigate = '/dashboard'
  }

  return (
    <BrowserRouter>
          <RecoilRoot>

        <Routes>
          <Route path={"/signup"} element={<Signup></Signup>}></Route>
          <Route path={"/signin"} element={<Signin></Signin>}></Route>
          <Route path={"/dashboard"} element={<Dashboard></Dashboard>}></Route>
          <Route path={"/send"} element={<Send></Send>}></Route>
          <Route path="/" element={<Navigate to={navigate} replace />} />
        </Routes>
        </RecoilRoot>

    </BrowserRouter>
  )
}

export default App
