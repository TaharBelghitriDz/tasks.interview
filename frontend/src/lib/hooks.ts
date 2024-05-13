import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { DataState, UseFetch } from "./types";

export const useFetch: UseFetch = (args) => {
  const [loading, setIsloading] = useState<DataState["loading"]>(false);
  const [error, setError] = useState<DataState["error"]>(null);
  const [data, setData] = useState<DataState["data"]>(null);
  const [call, setCall] = useState(0);

  const fetchData = async (
    prms: typeof args,
    signal?: AbortController["signal"]
  ) => {
    setIsloading(() => true);

    await fetch(`http://localhost:8080${prms.url ? prms.url : ""}`, {
      ...prms.requestInit,
      headers: {
        ...prms.requestInit.headers,
        "Content-Type": "application/json",
      },
      signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          setIsloading(() => false);
          setError(() => null);
          setData(() => res);
        }, 1000);
      })
      .catch(() => {
        setIsloading(() => false);
        setData(() => null);
        setError(() => "Unable to fetch data");
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    call != 0 && fetchData(args, controller.signal);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [call]);

  return {
    call: async (prms) => {
      if (prms) return await fetchData(prms);

      setData(() => null);
      setCall(() => Date.now());
    },
    loading,
    error,
    data,
  };
};

export function useIsVisible(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const useInput = (
  args: string,
  validation?: (args: { value: string; state: string }) => string | void
) => {
  const [state, setState] = useState(args);

  const onChange = useCallback(
    ({
      target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (validation && !!!validation({ value, state })) || setState(() => value),
    []
  );

  return {
    setState,
    input: {
      value: state,
      onChange,
    },
  };
};
