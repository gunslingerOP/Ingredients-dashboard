import { useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function LoginUser() {
  const router = useHistory();

  const [alert, setalert] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [errmsg, seterrmsg] = useState();
  const [errAlert, setErrAlert] = useState(false);
  const poolData = {
    UserPoolId: "us-east-2_y2VE4Ec3S",
    ClientId: "6g3vd73mvq5aku8ld8pcqr3m9k",
  };
  let UserPool = new CognitoUserPool(poolData);

  const handleClose = () => {
    setalert(false);
    setErrAlert(false);
  };

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      console.log("executed");
      return router.push("/home");
    }
  });

  //handling the form data and getting a token with user

  const handlSubmit = () => {
    console.log("works");
    if (!password || !email) {
      seterrmsg("Username and Password cannot be empty");
      setalert(true);

      return;
    } else {
      setalert(false);
    }
    let user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        localStorage.setItem("id_token", data.idToken.jwtToken);
        localStorage.setItem("user_token", data.accessToken.jwtToken);
        localStorage.setItem("username", data.accessToken.payload.username);
        router.push("/home");
      },
      onFailure: (err) => {
        seterrmsg(err.message);
        setErrAlert(true);
        console.error("onFailure: ", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };

  return (
    <body
      id="kt_body"
      className="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading"
    >
      <div className="d-flex flex-column flex-root">
        <div>
          {alert ? (
            <Dialog
              open={alert}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Error!</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {errmsg}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
        </div>

        <div>
          {errAlert ? (
            <Dialog
              open={errAlert}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Invalid credentials!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {errmsg}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
        </div>
        <div className="d-flex flex-column flex-root">
          <div
            className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
            id="kt_login"
          >
            <div
              className="login-aside d-flex flex-column flex-row-auto"
              style={{ backgroundColor: "#F2C98A" }}
            >
              <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
                <a href="# " className="text-center mb-10">
                  <img
                    src={
                      "https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/logos/logo-letter-1.png"
                    }
                    className="max-h-70px"
                    alt=""
                  />
                </a>

                <h3 className="font-weight-bolder text-center font-size-h4 font-size-h1-lg">
                  Access your mind
                  <br />
                  blowing dashboard!
                </h3>
              </div>

              <div
                className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
                style={{
                  backgroundImage:
                    "url(https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/svg/illustrations/login-visual-1.svg",
                }}
              ></div>
            </div>

            <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
              <div className="d-flex flex-column-fluid flex-center">
                <div className="login-form login-signin">
                  <form className="form" id="kt_login_signin_form">
                    <div className="pb-13 pt-lg-0 pt-5">
                      <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                        Welcome to Caesar software!
                      </h3>
                      <span className="text-muted font-weight-bold font-size-h4">
                        New Here?
                        <a
                          href="# "
                          id="kt_login_signup"
                          className="text-primary font-weight-bolder"
                        >
                          Create an Account
                        </a>
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="font-size-h6 font-weight-bolder text-dark">
                        Username
                      </label>
                      <input
                        onChange={(e) => setemail(e.target.value)}
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
                        type="text"
                        name="username"
                      />
                    </div>

                    <div className="form-group">
                      <div className="d-flex justify-content-between mt-n5">
                        <label className="font-size-h6 font-weight-bolder text-dark pt-5">
                          Password
                        </label>
                        <a
                          href=" # "
                          className="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                          id="kt_login_forgot"
                        >
                          Forgot Password ?
                        </a>
                      </div>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg"
                        type="password"
                        name="password"
                      />
                    </div>

                    <div className="pb-lg-0 pb-5">
                      <button
                        type="button"
                        id="kt_login_signin_submit"
                        onClick={handlSubmit}
                        className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        className="btn btn-light-primary font-weight-bolder px-8 py-4 my-3 font-size-lg"
                      >
                        <span className="svg-icon svg-icon-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z"
                              fill="#34A853"
                            />
                            <path
                              d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z"
                              fill="#EB4335"
                            />
                          </svg>
                        </span>
                        Sign in with Google
                      </button>
                    </div>
                  </form>
                </div>

                <div className="login-form login-signup">
                  <form className="form" id="kt_login_signup_form">
                    <div className="pb-13 pt-lg-0 pt-5">
                      <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                        Sign Up
                      </h3>
                      <p className="text-muted font-weight-bold font-size-h4">
                        Enter your details to create your account
                      </p>
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                        type="text"
                        placeholder="Fullname"
                        name="fullname"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                        type="email"
                        placeholder="Email"
                        name="email"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                        type="password"
                        placeholder="Confirm password"
                        name="cpassword"
                      />
                    </div>

                    <div className="form-group">
                      <label className="checkbox mb-0">
                        <input type="checkbox" name="agree" />
                        <span></span>
                        <div className="ml-2">
                          I Agree the
                          <a href=" # ">terms and conditions</a>.
                        </div>
                      </label>
                    </div>

                    <div className="form-group d-flex flex-wrap pb-lg-0 pb-3">
                      <button
                        type="button"
                        id="kt_login_signup_submit"
                        className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        id="kt_login_signup_cancel"
                        className="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                <div className="login-form login-forgot">
                  <form className="form" id="kt_login_forgot_form">
                    <div className="pb-13 pt-lg-0 pt-5">
                      <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                        Forgotten Password ?
                      </h3>
                      <p className="text-muted font-weight-bold font-size-h4">
                        Enter your email to reset your password
                      </p>
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control form-control-solid h-auto py-6 px-6 rounded-lg font-size-h6"
                        type="email"
                        placeholder="Email"
                        name="email"
                      />
                    </div>

                    <div className="form-group d-flex flex-wrap pb-lg-0">
                      <button
                        type="button"
                        id="kt_login_forgot_submit"
                        className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        id="kt_login_forgot_cancel"
                        className="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0">
                <div className="text-dark-50 font-size-lg font-weight-bolder mr-10">
                  <span className="mr-1">2021©</span>
                  <a
                    href="http://keenthemes.com/metronic"
                    className="text-dark-75 text-hover-primary"
                  >
                    Keenthemes
                  </a>
                </div>
                <a
                  href=" # "
                  className="text-primary font-weight-bolder font-size-lg"
                >
                  Terms
                </a>
                <a
                  href=" # "
                  className="text-primary ml-5 font-weight-bolder font-size-lg"
                >
                  Plans
                </a>
                <a
                  href=" # "
                  className="text-primary ml-5 font-weight-bolder font-size-lg"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
