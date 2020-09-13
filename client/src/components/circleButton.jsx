import React from "react";
import { Button } from "semantic-ui-react";

const CircleButton = ({ icon, onClick }) => (
  <Button circular color='teal' icon={icon} onClick={onClick} />
);

export default CircleButton;
