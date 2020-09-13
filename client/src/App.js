import React from "react";
import { Route, Switch } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import "./App.css";
import Home from "./pages/Home";
import Booklist from "./pages/Booklist";
import CircleButton from "./components/circleButton";

function App() {
  const [showAsList, setShowAsList] = React.useState(false);
  const signIn = async () => {
    window.open(
      "https://server-library.herokuapp.com/goodreads/authorize",
      "_self"
    );
  };

  const goToGoodreads = (e) => {
    e.preventDefault();
    window.location.href = "http://www.goodreads.com";
  };

  return (
    <main className='App'>
      <h1>library.</h1>
      <div className='buttonGroup'>
        <Popup
          content={showAsList ? "Show as carousel" : "Show as lists."}
          trigger={
            <CircleButton
              icon='list ul'
              onClick={() => setShowAsList(!showAsList)}
            />
          }
        />
        <Popup
          content='Go to Goodreads.'
          trigger={
            <CircleButton icon='goodreads' onClick={(e) => goToGoodreads(e)} />
          }
        />
        <Popup
          content='Authorize with Goodreads.'
          trigger={<CircleButton icon='sign-in' onClick={() => signIn()} />}
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
