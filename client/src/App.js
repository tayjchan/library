import React from "react";
import { Route, Switch } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import "./App.css";
import Home from "./pages/Home";
import Booklist from "./pages/Booklist";
import CircleButton from "./components/circleButton";
import { withRouter } from "react-router";

function Main(props) {
  const [showAsList, setShowAsList] = React.useState(true);
  const signIn = async () => {
    window.open(
      "https://server-library.herokuapp.com/goodreads/authorize",
      "_self"
    );
  };

  React.useEffect(() => {
    setShowAsList(sessionStorage.getItem("listView"));
  }, [setShowAsList]);

  const goToGoodreads = (e) => {
    e.preventDefault();
    window.location.href = "http://www.goodreads.com";
  };

  const toggleListView = () => {
    const newState = !showAsList;
    setShowAsList(newState);
    sessionStorage.setItem("listView", newState);
  };

  return (
    <main className='App'>
      <h1 onClick={() => props.history.push("/")}>library.</h1>
      <div className='buttonGroup'>
        <Popup
          content={showAsList ? "Show as carousel" : "Show as lists."}
          trigger={
            <CircleButton icon='list ul' onClick={() => toggleListView()} />
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

const App = withRouter(Main);
export default App;
