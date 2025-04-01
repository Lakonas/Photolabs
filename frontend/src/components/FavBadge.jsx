import React from "react";
import "../styles/FavBadge.scss"; // Import styles

const FavBadge = ({ count }) => {
  return (
    <div className="fav-badge">
      {count > 0 && <span className="fav-badge__count">{count}</span>}
    </div>
  );
};

export default FavBadge;
