import React, {useEffect, useState} from "react";
import{ BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import Audience from "./components/Audience";
import Campaign from "./components/Campaign";


function App() {
   const [flag, setFlag] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setFlag(true);
    setName(user.name);
    }
  }, []);

  const handleLogin = (provider, data) => {
    const user = {name:data.name, email:data.email};
    localStorage.setItem('user', JSON.stringify(user));
    setName(data.name);
    setFlag(true);
    console.log(provider, data);
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    setFlag(false);
    setName(null);
  }

  return (
    <Router>
    <div class="container mt-2">
    
      {flag ? (
        <div class="row">
        <div class="col">
        <h2>Hello {name}</h2>
        </div>
        <div class="col">
        <button class="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
        <Audience />
        </div>
      ) : (
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
      )}
      <Routes>
        <Route path="/Campaign" element={<Campaign/>}/>
      </Routes>
    
    </div>
    </Router>
  );
}

export default App;
