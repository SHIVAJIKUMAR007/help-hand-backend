import React, { useEffect } from "react";
import styled from "styled-components";
import Signup from "./Signup";
import Home from "./Home";
import Header from "./Header";
import EditProfile from "./EditProfile";
import Profile from "./Profile";
import { Route, Switch } from "react-router-dom";
import Signin from "./Signin";
import Search from "./Search";
import Error404 from "./Error404";
import AllChat from "./chat/AllChat";
import Chat from "./chat/Chat";
import { isUserSaved } from "../action";
import { useDispatch, useSelector } from "react-redux";
import Suspend from "./Suspend";
import OnePost from "./OnePost";
import Footer from "./Footer";
import Term from "./term/Term";
import Contact from "./term/Contact";
import Privacy from "./term/Privacy";
import About from "./term/About";
import Prohibited from "./term/Prohibited";

function App() {
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserSaved());
  }, [dispatch]);
  return (
    <Container>
      <Header />
      <ScrollDiv>
        {user ? (
          user.active === false ? (
            <Switch>
              <Route component={Suspend} />
              <TermNav />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/editProfile" component={EditProfile} />
              <Route exact path="/post/:id" component={OnePost} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/chat" component={AllChat} />
              <Route exact path="/chat/:id" component={Chat} />
              <Route exact path="/search/:toSearch" component={Search} />
              <TermNav />

              <Route component={Error404} />
            </Switch>
          )
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Signin} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/post/:id" component={OnePost} />
            <Route exact path="/profile/:id" component={Profile} />
            <TermNav />

            <Route component={Home} />
          </Switch>
        )}
      </ScrollDiv>
      <Footer />
    </Container>
  );
}

const TermNav = () => {
  return (
    <>
      <Route exact path="/terms" component={Term} />
      <Route exact path="/about" component={About} />
      <Route exact path="/privacy-policy" component={Privacy} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/prohibited" component={Prohibited} />
    </>
  );
};

export default App;

const ScrollDiv = styled.div`
  flex: 1;
  width: 100%;
  min-height: 90vh;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
