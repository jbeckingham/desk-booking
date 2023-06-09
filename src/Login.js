import "./App.css"
import "semantic-ui-css/semantic.min.css"
import {GoogleOAuthProvider} from "@react-oauth/google"
import App from "./App"

import {useState, useEffect} from "react"
import {GoogleLogin} from "@react-oauth/google"

const Login = () => {
  const [credential, setCredential] = useState(null)
  return (
    <>
      {credential ? (
        <App />
      ) : (
        <GoogleOAuthProvider clientId="1073576890488-7qnqolkv12d7mkrpsfdu1qo6dv2giogo.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={credentialResponse => {
              setCredential(credentialResponse.credential)
              console.log(credentialResponse)
            }}
            onError={() => {
              console.log("Login Failed")
            }}
          />
        </GoogleOAuthProvider>
      )}
    </>
  )
}

export default Login
