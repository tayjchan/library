import React from "react";
import { Loader } from "semantic-ui-react";

const List = ({ items }) => {
  return (
    <div style={{ maxHeight: 200, overflow: "auto" }}>
      <ul>
        {items ? (
          items.length > 0 ? (
            items.map(({ bookId, title, author }) => (
              <li draggable key={bookId}>
                {title} by {author}
              </li>
            ))
          ) : (
            <div style={{ margin: "0 auto" }}>No books found.</div>
          )
        ) : (
          <Loader inline='centered' active />
        )}
      </ul>
    </div>
  );
};

export default List;
