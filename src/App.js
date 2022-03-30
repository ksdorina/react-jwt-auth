import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Adattorles from "./sajatosztalyok/Adattorles"
import Felhasznalok from "./sajatosztalyok/Felhasznalok"
import Emlektorles from "./sajatosztalyok/Emlektorles"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        ÉN könyv
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="Adattorles">Élménytörlés</Nav.Link>
          <Nav.Link href="Emlektorles">Emléktörlés</Nav.Link>
          <Nav.Link href="Felhasznalok">Felhasználók</Nav.Link>
        </Nav>
        
        {currentUser ? (
        
        <Nav>
          <Nav.Link href="/profile">
            {currentUser.username}
          </Nav.Link>

          <Nav.Link eventKey={2} href="/login" onClick={this.logOut}>
            Kijelentkezés
          </Nav.Link>
        </Nav>
          ) : (
            <Nav>
            <Nav.Link href="/login">
              Bejelentkezés
            </Nav.Link>
  
            <Nav.Link eventKey={2} href="/register">
              Regisztráció
            </Nav.Link>
          </Nav>
        )}

      </Navbar.Collapse>
    </Navbar>


        {/*..................................régi................................*/}
     

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Adattorles" component={Adattorles} />
            <Route path="/Felhasznalok" component={Felhasznalok} />
            <Route path="/Emlektorles" component={Emlektorles} />


          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
