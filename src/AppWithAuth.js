import React from "react";
import {
  Greetings,
  ConfirmSignIn,
  RequireNewPassword,
  SignUp,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  TOTPSetup,
  Loading
} from "aws-amplify-react";
import awsmobile from "./aws-exports";
import CustomSignIn from "./CustomSignIn";
import SignIn from "./MySignIn.jsx";
import App from "./App";
import { Authenticator } from "aws-amplify-react/dist/Auth";

class AppWithAuth extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Authenticator hideDefault={true} amplifyConfig={awsmobile}>
          {/* <CustomSignIn /> */}
          <Greetings />
          <SignIn />
          <ConfirmSignIn />
          <RequireNewPassword />
          <SignUp />
          <ConfirmSignUp />
          <VerifyContact />
          <ForgotPassword />
          <TOTPSetup />
          <Loading />
          <App />
        </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
