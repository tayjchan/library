import React from "react";
import NeedToAuthorizeDimmer from "../components/needToAuthorizeDimmer";

const Booklist = () => {
  return (
    <NeedToAuthorizeDimmer>
      <div>
        <h2>Books I haven't decided if I want to read or not</h2>
        <ul>
          <li>The Tenant by Katrine Engberg</li>
          <li>The Singapore Grip by J. G. Farrell</li>
        </ul>
      </div>
    </NeedToAuthorizeDimmer>
  );
};

export default Booklist;
