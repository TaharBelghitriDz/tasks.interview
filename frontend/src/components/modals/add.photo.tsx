import { Loader } from "@geist-ui/icons";
import { store } from "../../lib/state";
import { useFetch, useInput } from "../../lib/hooks";
import "../../styles/add.photo.css";
import "../../styles/card.css";
import { useEffect, useState } from "react";
import { Photo } from "../../lib/types";

export const AddUpdatePhotoModal = (props: { update: Photo | null }) => {
  const [random] = useState(
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
  );

  const [randomID] = useState(Date.now());

  const title = useInput(props.update?.title || "");
  const id = props.update?.id || randomID;
  const albumId = props.update?.albumId || randomID;
  const thumbnailUrl =
    props.update?.thumbnailUrl || "https://via.placeholder.com/150/" + random;
  const url = props.update?.url || "https://via.placeholder.com/600/" + random;

  const fetch = useFetch({
    requestInit: {
      method: props.update ? "PUT" : "POST",
      body: JSON.stringify({
        title: title.input.value,
        id: id,
        albumId: albumId,
        thumbnailUrl: thumbnailUrl,
        url: url,
      }),
    },
  });

  const save = () => {
    if (title.input.value.length > 0) fetch.call();
  };

  useEffect(() => {
    if (fetch.data)
      store.update((e) => ({
        modal: { isOpen: false, component: null },
        filter: { ...e.filter, update: Date.now() },
      }));
  }, [fetch.data]);

  return (
    <div className="card card-modal">
      {fetch.loading && (
        <div className="laoding">
          <Loader className="loader" size={30} />
        </div>
      )}
      <img width={300} height={300} alt={title.input.value} src={url} />

      <div className="content">
        {id && (
          <div className="details">
            <span> id : {id}</span>
          </div>
        )}
        <textarea placeholder="title" {...title.input} />
      </div>
      <div className="action">
        <button className="btn-green" onClick={save}>
          save
        </button>
      </div>
    </div>
  );
};
