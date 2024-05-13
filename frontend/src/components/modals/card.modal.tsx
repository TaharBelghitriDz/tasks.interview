import "../../styles/card.css";
import { useFetch } from "../../lib/hooks";
import { useEffect, useState } from "react";
import { Photo } from "../../lib/types";
import { CardModalSkelton } from "../skelton";
import { store } from "../../lib/state";
import { Loader } from "@geist-ui/icons";
import { AddUpdatePhotoModal } from "./add.photo";

export default (props: { count: number; id: number }) => {
  const [data, setData] = useState<Photo | null>(null);

  const params = new URLSearchParams({
    min: props.count.toString(),
    max: "1",
  });

  const fetch = useFetch({
    url: "?" + params.toString(),
    requestInit: { method: "GET" },
  });

  const removeApi = useFetch({
    requestInit: { method: "DELETE", body: JSON.stringify({ id: data?.id }) },
  });

  useEffect(() => {
    if (removeApi.data) {
      store.update((e) => ({
        modal: { component: null, isOpen: false },
        filter: { ...e.filter, update: Date.now() },
      }));
      return undefined;
    }

    if (!fetch.data) fetch.call();
    else setData(() => (fetch.data as any).photos[0]);
  }, [fetch.data, removeApi.data]);

  const update = () => {
    if (data)
      store.update(() => ({
        modal: {
          isOpen: true,
          component: <AddUpdatePhotoModal update={data} />,
        },
      }));
  };

  if (data)
    return (
      <div className="card card-modal">
        {removeApi.loading && (
          <div className="laoding">
            <Loader className="loader" size={30} />
          </div>
        )}

        <img width={300} height={300} alt={data.title} src={data.url} />
        <div className="content">
          <div className="details">
            <span> id : {data.id}</span>
          </div>
          <span className="title">{data.title}</span>
        </div>
        <div className="action">
          <button className="btn-green" onClick={update}>
            изменить
          </button>
          <button className="btn-red" onClick={() => removeApi.call()}>
            удалить
          </button>
        </div>
      </div>
    );
  return <CardModalSkelton />;
};
