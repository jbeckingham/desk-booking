import jwtDecode from "jwt-decode"

import "./App.css"
import "semantic-ui-css/semantic.min.css"
import {GoogleOAuthProvider} from "@react-oauth/google"
import App from "./App"
import {Header, Container} from "semantic-ui-react"
import moment from "moment"

import {useState, useEffect} from "react"
import {GoogleLogin} from "@react-oauth/google"
import logo from "./moneyhub_teal.png"
import {CookiesProvider} from "react-cookie"
import {useCookies} from "react-cookie"

const Login = () => {
  const [cookies, setCookie] = useCookies(["credential"])

  const [credential, setCredential] = useState(cookies.credential)

  const profile = credential ? jwtDecode(credential) : {}

  const onLoginSuccess = credentialResponse => {
    setCredential(credentialResponse.credential)
    const expiry = moment().add(1, "days").toDate()
    setCookie("credential", credentialResponse.credential, {expires: expiry})
  }
  return (
    <>
      <Container className="logoDiv" textAlign="center">
        <img className="moneyhubLogo" src={logo} alt={"logo"} />
      </Container>

      {credential ? (
        <App />
      ) : (
        <div class="loginButtonContainer">
          <GoogleOAuthProvider clientId="1073576890488-7qnqolkv12d7mkrpsfdu1qo6dv2giogo.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={credentialResponse => {
                onLoginSuccess(credentialResponse)
              }}
              onError={() => {
                console.log("Login Failed")
              }}
            />
          </GoogleOAuthProvider>
        </div>
      )}
    </>
  )
}

export default Login
