import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsmobile from "./aws-exports";
import QRCode from "qrcode.react";

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    qrCode: []
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => this.setState({ user }));
    // rest of existing code omitted
  }

  addTTOP = () => {
    Auth.setupTOTP(this.state.user).then(code => {
      const authCode =
        "otpauth://totp/AWSCognito:" +
        this.state.user.username +
        "?secret=" +
        code +
        "&issuer=AWSCognito";
      this.setState({ qrCode: authCode });
    });
  };

  setPreferredMFA = authType => {
    Auth.verifyTotpToken(this.state.user, this.state.challengeAnswer).then(() => {
      Auth.setPreferredMFA(this.state.user, authType)
        .then(data => console.log("MFA update success: ", data))
        .catch(err => console.log("MFA update error: ", err));
    });
  };

  render() {
    // if (this.props.authState == "signedIn") {
    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //           Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //         <a
    //           className="App-link"
    //           href="https://reactjs.org"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           Learn React
    //         </a>
    //       </header>
    //     </div>
    //   );
    // } else {
    //   return null;
    // }
    if (this.props.authState == "signedIn") {
      return (
        <div className="app-container">
          <button onClick={this.addTTOP} style={{ border: "1px solid #ddd", width: 125 }}>
            <p>Add TOTP</p>
          </button>
          {this.state.qrCode !== "" && (
            <div>
              <QRCode value={this.state.qrCode} />
            </div>
          )}
          <br />
          <button
            onClick={() => this.setPreferredMFA("TOTP")}
            style={{ border: "1px solid #ddd", width: 125 }}
          >
            <p>Prefer TOTP</p>
          </button>
          <br />
          <input
            placeholder="TOTP Code"
            onChange={e =>
              this.setState({
                challengeAnswer: e.target.value
              })
            }
            style={{ border: "1px solid #ddd", height: 35 }}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

// export default withAuthenticator(App, true);
export default App;
