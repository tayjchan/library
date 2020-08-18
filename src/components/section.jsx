import React from "react";
import ColorBlock from "./colorBlock";
import { Grid } from "semantic-ui-react";

const SectionRow = ({ title, books, getColorWithIndex }) => {
  return (
    <Grid.Row>
      <Grid.Column width={2}>
        <h2>{title}</h2>
      </Grid.Column>
      <Grid.Column style={{ display: "flex" }}>
        {books.map((book, index) => {
          return (
            <ColorBlock
              key={book.title + "_" + index}
              title={book.title}
              color={getColorWithIndex(index)}
            />
          );
        })}
      </Grid.Column>
    </Grid.Row>
  );
};

export default SectionRow;
