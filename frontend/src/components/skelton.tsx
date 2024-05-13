import { MoreVertical } from "@geist-ui/icons";
import "../styles/card.css";
import { forwardRef } from "react";

const fakeData = {
  albumId: 2,
  id: 80,
  title: "et corrupti nihil cumque",
  url: "https://via.placeholder.com/600/a0c998",
  thumbnailUrl: "https://via.placeholder.com/150/a0c998",
};

export default forwardRef<HTMLDivElement>(function (_, ref) {
  return (
    <div ref={ref} className="card skelton">
      <img
        width={200}
        height={200}
        alt={fakeData.title}
        src={fakeData.thumbnailUrl}
      />

      <div className="content">
        <div className="details">
          <span> id : {fakeData.id}</span>
          <MoreVertical size={20} className="card-icon" />
        </div>
        <span>{fakeData.title}</span>
      </div>
    </div>
  );
});

export const CardModalSkelton = () => {
  return (
    <div className="card card-modal skelton">
      <img alt={fakeData.title} src={fakeData.url} />

      <div className="content">
        <div className="details">
          <span> id : {fakeData.id}</span>
          <MoreVertical size={20} className="card-icon" />
        </div>
        <span>{fakeData.title}</span>
        <div className="action">
          <button className="btn-red">remove</button> <button>modify</button>
        </div>
      </div>
    </div>
  );
};
