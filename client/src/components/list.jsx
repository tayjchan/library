import React from "react";
import { Loader } from "semantic-ui-react";

const List = ({ items, onClickItem }) => {
  return (
    <div className='List'>
      <ul>
        {items ? (
          items.length > 0 ? (
            items.map(({ bookId, title, author }) => (
              <li
                draggable
                key={bookId}
                data-bookid={bookId}
                onClick={(e) => onClickItem && onClickItem(e)}
              >
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
