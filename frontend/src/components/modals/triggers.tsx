import { Filter, Plus, Server } from "@geist-ui/icons";
import { store } from "../../lib/state";
import { AddUpdatePhotoModal } from "./add.photo";
import "../../styles/filter.css";
import "../../styles/add.photo.css";
import { useFetch } from "../../lib/hooks";
import { useEffect } from "react";
import FilterModal from "./filter.modal";

export const Triggers = () => {
  const fetch = useFetch({ url: "/update", requestInit: { method: "GET" } });

  const onClick = (modal: "server" | "add" | "filter") => {
    modal === "add" &&
      store.update(() => ({
        modal: {
          component: <AddUpdatePhotoModal update={null} />,
          isOpen: true,
        },
      }));

    modal === "filter" &&
      store.update(() => ({
        modal: {
          component: <FilterModal />,
          isOpen: true,
        },
      }));

    modal == "server" && fetch.call();
  };

  useEffect(() => {
    if (fetch.data) window.location.reload();
  }, [fetch.data]);

  return (
    <div className="triggers-grp-btn">
      <div className="trigger-btn red" onClick={() => onClick("server")}>
        <Server size={24} className="btn-trigger" />
        <span>сервер обновлений</span>
      </div>
      <div className="trigger-btn green" onClick={() => onClick("add")}>
        <Plus size={24} className="btn-trigger" />
        <span>добавлять</span>
      </div>
      <div className="trigger-btn blue" onClick={() => onClick("filter")}>
        <Filter size={24} className="btn-trigger" />
        <span>фильтр</span>
      </div>
    </div>
  );
};
