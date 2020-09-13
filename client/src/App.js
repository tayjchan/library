import React from "react";
import { Route, Switch } from "react-router-dom";
import { Button, Popup } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import Booklist from "./pages/Booklist";

function App() {
  const [showAsList, setShowAsList] = React.useState(false);
  const signIn = async () => {
    window.open(
      "https://server-library.herokuapp.com/goodreads/authorize",
      "_self"
    );
  };

  return (
    <main className='App'>
      <h1>library.</h1>
      <div className='buttonGroup'>
        <Popup
          content={showAsList ? "Show as carousel" : "Show as lists."}
          trigger={
            <Button
              circular
              color='teal'
              icon='list ul'
              onClick={() => setShowAsList(!showAsList)}
            />
          }
        />
        <Popup
          content='Go to Goodreads.'
          trigger={
            <Button
              circular
              color='teal'
              icon='goodreads'
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "http://www.goodreads.com";
              }}
            />
          }
        />
        <Popup
          content='Authorize with Goodreads.'
          trigger={
            <Button
              circular
              color='teal'
              icon='sign-in'
              onClick={() => signIn()}
            />
          }
        />
      </div>
      <hr />
      <Switch>
        <Route
          path='/'
          render={(props) => <Home showAsList={showAsList} {...props} />}
          exact
        />
        <Route path='/maybe' component={Booklist} />
      </Switch>
    </main>
  );
}

export default App;
