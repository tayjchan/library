import React from "react";
import { Route, Switch } from "react-router-dom";
import { Button, Popup } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import Booklist from "./pages/Booklist";

function App() {
  const signIn = async () => {
    window.open("http://localhost:4000/auth/goodreads", "_self");
    // await addBook("YCopgPhwWx");
  };

  return (
    <main className='App'>
      <h1>library.</h1>
      <div className='buttonGroup'>
        <Popup
          content='Show as lists.'
          trigger={<Button circular color='teal' icon='list ul' />}
        />
        <Popup
          content='Go to Goodreads.'
          trigger={<Button circular color='teal' icon='goodreads' />}
        />
        <Popup
          content='Sign-in via Google.'
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
        <Route path='/' component={Home} exact />
        <Route path='/maybe' component={Booklist} />
      </Switch>
    </main>
  );
}

export default App;
