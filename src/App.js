import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Grid, Button, Popup } from "semantic-ui-react";
import SectionRow from "./components/section";
import AddBookForm from "./components/addBookForm";

const books = [
  { title: "A Series of Unfortunate Events", description: "Description1" },
  { title: "Charlie and the Chocolate Factory", description: "Description2" },
  { title: "Infinite Jest", description: "Description3" },
  { title: "Title4", description: "Description4" },
  { title: "Title5", description: "Description5" },
  { title: "Title6", description: "Description6" },
  { title: "Title7", description: "Description7" },
  { title: "Title8", description: "Description8" },
  { title: "Title9", description: "Description9" },
  { title: "Title11", description: "Description11" },
  { title: "Title12", description: "Description12" },
  { title: "Title13", description: "Description13" },
  { title: "Title14", description: "Description14" },
];

const colors = ["#D363D8", "#F18A92", "#F4CD83", "#71EAD7"];

function App() {
  const getColor = (index) => {
    switch (index % 4) {
      case 0:
        return colors[0];
      case 1:
        return colors[1];
      case 2:
        return colors[2];
      case 3:
        return colors[3];
      default:
        return colors[0];
    }
  };

  return (
    <div className='App'>
      <h1>library.</h1>
      <div className='buttonGroup'>
        <Popup
          content='Show as lists.'
          trigger={<Button circular icon='list ul' />}
        />
        <Popup
          content='Go to Goodreads.'
          trigger={<Button circular icon='goodreads' />}
        />
        <Popup
          content='Sign-in via Google.'
          trigger={<Button circular icon='sign-in' />}
        />
      </div>
      <hr />
      <Grid columns='two' divided>
        <SectionRow
          books={books}
          title='done.'
          getColorWithIndex={(i) => getColor(i)}
        />
        <SectionRow
          books={books}
          title='later.'
          getColorWithIndex={(i) => getColor(i + 2)}
        />
      </Grid>
      <AddBookForm />
    </div>
  );
}

export default App;
