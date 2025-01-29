import React, { useEffect, useState } from "react";
import "./Sign.css";
import emailImg from "../../components/Images/email.png";
import lock from "../../components/Images/lock.png";
import show from "../../components/Images/show.png";
import hide from "../../components/Images/hide.png";
import logo from "../../components/Images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNotify from "../../hooks/useNotify";
// import "../Admin"

function Signin() {



  const {notify} = useNotify();

  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  const [move, setMove] = useState();
  const [move2, setMove2] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()  

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {

      return notify("Please fill in all the details.", "error")
    }
  
    await login(email, password);
    
      
  };

  useEffect(()=>{
    if(error === false)
      {
        console.log("Successfully logged in")
        notify("Successfully logged in", "success")
        // sendSms();
        // sendEmail();
        setTimeout(() => navigate('/'), 1000); 
      }
  },[error])
  
  

  const handleEmailClick = () => {
    setMove({
      top: "-15px",
    });

    if (!password) {
      setMove2({
        top: "13px",
      });
    }
    setIsVisible(false);
    setPassInput("password");
  };

  const handlePasswordClick = () => {
    setMove2({
      top: "-15px",
    });

    if (!email) {
      setMove({
        top: "13px",
      });
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [passInput, setPassInput] = useState("password");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setPassInput(isVisible ? "password" : "text");
  };

  return (
    
    <>
    <div className="backButton">
  <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
    <button className="backBtn">← Back to Home</button>
  </Link>
</div>

     <div className="signupMain">
        <div className="signup">
          <img src={logo} alt="logo" style={{ width: "20%" }} />

          <div className="signupHeading">Log in</div>
          <form onSubmit={handleSubmit}>
            <div className="signupContent">
              <input
                type="email"
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label>
                <img src={emailImg} alt="email" />
                <p>
                  Email Address <span>*</span>
                </p>
              </label>
            </div>

            <div className="signupContent1">
              <div className="ip">
                <input
                  type={passInput}
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label>
                  <img src={lock} alt="lock" />
                  <p>
                    Password <span>*</span>
                  </p>
                </label>
                <div className="eye" onClick={toggleVisibility}>
                  <img src={isVisible ? show : hide} alt="visibility toggle" />
                </div>
              </div>
            </div>

            <div className="signupBtns">
              {/* {error === false ? <p className="success">Successfully logged in!!</p>:<p className="error">{error}</p>} */}
            
              <div className="signupBtn">
                {/* <Link
                  to={"/"}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                > */}
                  <button className="lbn">LOG IN</button>
                {/* </Link> */}
              </div>

              <p className="or">OR</p>

              <div className="loginBtn">
                <Link
                  to={"/signup"}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <button>REGISTER</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>



      
      <ToastContainer/>
    </>
  );
}

export default Signin;
