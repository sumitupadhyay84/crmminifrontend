import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const Login = ({ handleLogin}) => (
    <div class="container" style={{ width: "230px" }}>
    <LoginSocialGoogle
      client_id= {"107590314278-hjfjlqb9dq9e5hj1jprb60hm5k1cogsd.apps.googleusercontent.com"}
      scope="openid profile email"
      access_type="online"
      onResolve={({ provider, data }) => handleLogin(provider, data)}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
    </div>
);

export default Login;