import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "../src/style/Reset.css";
import "../src/style/AppStyle.css";

import SidebarTop from "./components/SidebarTop";
import Sidebar from "./components/Sidebar";
import Top from "./components/Top";
import Home from "./components/Home";
import TeamCreate from "./components/TeamCreate";
import TeamSearch from "./components/TeamSearch";
import Chat from "./components/Chat";
import News from "./components/News";
import Setting from "./components/Setting";
import ProfileCreate from "./components/ProfileCreate";
import ProfileEditComplete from "./components/ProfileEditComplete";
import TeamEdit from "./components/TeamEdit";
import TeamEditComplete from "./components/TeamEditComplete";

import Auth from "./auth/Auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar(boolean) {
    this.setState({
      signedIn: boolean,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.signedIn ? <Sidebar /> : <SidebarTop />}
          <div className="main">
            <Route exact path="/" component={Top} />
            <Route path="/TeamSearch" component={TeamSearch} />
            <Route path="/News" component={News} />
            {/* 以下認証のみ */}
            <Auth toggleSidebar={this.toggleSidebar}>
              <Route path="/Home" component={Home} />
              <Route
                path="/ProfileEditComplete"
                component={ProfileEditComplete}
              />
              <Route path="/TeamEdit" component={TeamEdit} />
              <Route path="/TeamEditComplete" component={TeamEditComplete} />
              <Route path="/TeamCreate" component={TeamCreate} />
              <Route path="/Chat" component={Chat} />
              {/* <Route path="/Profile" component={Profile} /> */}
              <Route path="/ProfileCreate" component={ProfileCreate} />
              <Route
                path="/Setting"
                render={(props) => (
                  <Setting
                    toggleSidebar={(boolean) => this.toggleSidebar(boolean)}
                    {...props}
                  />
                )}
              />
            </Auth>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
