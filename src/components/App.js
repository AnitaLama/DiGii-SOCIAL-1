import React from "react";
import logo from "./../logo.jpg";
import './App.css';


function App() {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "25%" }}>
        <div className="col-md col-lg col-sm">
          <header className="App-header">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ width: 500 }}
            />
          </header>
        </div>

        <div className="col-md col-lg col-sm offset-2">
         <h1>Log In</h1>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg rounded-border"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg rounded-border"
              placeholder="Password"
            />
          </div>

          <button type="submit" class="col-md col-lg col-sm btn btn-danger btn-lg rounded-border">Login</button>

          <div className="help-block">
            <h6>Forgot Password</h6>
            <h6>Don't have an account ? <a>Sign Up</a></h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
