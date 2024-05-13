import { ArrowUpRight } from "@geist-ui/icons";
import "../styles/card.css";
import Skelton from "./skelton";
import { useEffect, useRef, useState } from "react";
import { useFetch, useIsVisible } from "../lib/hooks";
import { storeFunctions } from "../lib/state";
import CardModal from "./modals/card.modal";

const Card = (props: { count: number; id: number }) => {
  const [data, setData] = useState<null | Record<string, any>>(null);

  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  const params = new URLSearchParams({
    min: props.count.toString(),
    max: "1",
  });

  const fetch = useFetch({
    url: "?" + params.toString(),
    requestInit: { method: "GET" },
  });

  useEffect(() => {
    if (isVisible && !data) fetch.call();

    if (data && props.count != data.count) setData(() => null);

    if (fetch.data)
      setData(() => ({ count: props.count, ...(fetch.data as any).photos[0] }));
  }, [isVisible, fetch.data, props.count]);

  if (!data) return <Skelton ref={ref} />;

  return (
    <div className="card" ref={ref}>
      <img
        className="thumbnail"
        alt={data.title}
        width={200}
        height={200}
        src={data.thumbnailUrl}
      />

      <div className="content">
        <div className="details">
          <span> id : {data.id}</span>
          <ArrowUpRight
            size={20}
            className="card-icon"
            onClick={() => {
              storeFunctions.openModal(
                <CardModal id={props.id} count={props.count} />
              );
            }}
          />
        </div>
        <span className="title">{data.title}</span>
      </div>
    </div>
  );
};

export default Card;
