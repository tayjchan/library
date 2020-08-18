import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import SectionRow from "./components/section";

const books = [
  { title: "Title1", description: "Description1" },
  { title: "Title2", description: "Description2" },
  { title: "Title3", description: "Description3" },
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

const colors = ["#7B40E4", "#D363D8", "#F18A92", "#F4CD83", "#71EAD7"];

function App() {
  const getColor = (index) => {
    switch (index % 5) {
      case 0:
        return colors[0];
      case 1:
        return colors[1];
      case 2:
        return colors[2];
      case 3:
        return colors[3];
      case 4:
        return colors[4];
      default:
        return colors[0];
    }
  };

  return (
    <div className='App'>
      <h1>library.</h1>
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
      <h2>add.</h2>
      <Segment>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Book Title' placeholder='' />
            <Form.Input fluid label='Author' placeholder='' />
          </Form.Group>
          <Button type='submit'>Search</Button>
        </Form>
        <div style={{ padding: "16px 0" }}>
          <h3>SEARCH RESULTS</h3>
          <Button.Group>
            <Button>Add to read.</Button>
            <Button.Or />
            <Button>Add to later.</Button>
          </Button.Group>
          <Message
            info
            content='This book has also been added to your list in Goodreads.'
          />
        </div>
      </Segment>
    </div>
  );
}

export default App;
