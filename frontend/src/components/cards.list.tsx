import { useEffect, useState } from "react";
import { useFetch } from "../lib/hooks";
import { store } from "../lib/state";
import Card from "./card";
import { Photo } from "../lib/types";
import Skelton from "./skelton";
import Pagination from "./pagination";

export default () => {
  const { from, to, update, orderBy, text } = store.useListen((e) => e.filter);
  const [updated, setUpdated] = useState<number>();
  const [current, setCurrent] = useState(1);
  const [ids, setIds] = useState<{ photo: Photo; i: number }[]>();

  const isFiltered = from !== 0 && to !== 10000;

  const validLength = () => {
    let result = { from, to };

    if (!ids) return result;
    if (!isFiltered) return result;

    if (to > ids.length) result.to = ids.length;
    if (from < 0) result.from = 0;

    if (from >= to) result.from = to - 1;

    return result;
  };

  const { call, data, loading } = useFetch({
    url:
      "?" +
      new URLSearchParams({
        min: validLength().from.toString(),
        max: (validLength().from - validLength().to).toString(),
      }),
    requestInit: { method: "GET" },
  });

  const updateIds = () =>
    setIds(() => {
      let result = data?.photos
        .map((e: Photo, i: number) => ({
          photo: e.id,
          i: i + validLength().from,
          title: e.title,
        }))
        .filter((e: Photo) => e.title.includes(text));

      if (orderBy) result = result.reverse();
      return result;
    });

  const refreshCall = () =>
    call({
      url:
        "?" +
        new URLSearchParams({
          min: validLength().from.toString(),
          max: (validLength().from - validLength().to).toString(),
        }).toString(),
      requestInit: { method: "GET" },
    });

  useEffect(() => {
    if (!!data && !ids) {
      setUpdated(() => update);
      updateIds();
      return;
    }

    if (!data && !ids) {
      setUpdated(() => update);
      refreshCall();
      return;
    }

    if (!!updated && update != updated && !!data && !!ids) {
      setUpdated(() => update);
      setIds(() => undefined);
      refreshCall();
      return;
    }
  }, [from, update, data]);

  return (
    <div className="card-list">
      {loading &&
        Array.from({ length: 10 }).map((_, i) => <Skelton key={i * 8888} />)}
      {ids &&
        ids
          .slice(validLength().from, validLength().to)
          .slice((current - 1) * 10, current * 10)
          .map((e) => <Card key={e.i} count={e.i} id={e.photo.id} />)}
      {ids && (
        <Pagination
          current={current}
          max={ids.slice(validLength().from, validLength().to).length}
          setCurrent={setCurrent}
        />
      )}
    </div>
  );
};
