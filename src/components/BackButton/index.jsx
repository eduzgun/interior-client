import React from "react";
import { Link } from "react-router-dom";

function BackButton({ backTo, label }) {
  return (
    <Link to={backTo} className="back-to-button">
      {label}
    </Link>
  );
}

export default BackButton
