import { isValidElement, useSyncExternalStore } from "react";

const isObject = (item: any) =>
  typeof item === "object" && !Array.isArray(item);

const merge = (target: any, source: any) => {
  const isDeep = (prop: any) =>
    isObject(source[prop]) &&
    target.hasOwnProperty(prop) &&
    isObject(target[prop]) &&
    !isValidElement(source[prop]) &&
    !isValidElement(target[prop]);

  const replaced: any = Object.getOwnPropertyNames(source)
    .map((prop) => ({
      [prop]: isDeep(prop) ? merge(target[prop], source[prop]) : source[prop],
    }))
    .reduce((a, b) => ({ ...a, ...b }), {});

  return {
    ...target,
    ...replaced,
  };
};

export const createState = <T>(state: T) => {
  const listeners = new Set<() => void>();

  const subscribe = (clbk: () => void) => {
    listeners.add(clbk);
    return () => listeners.delete(clbk);
  };

  let newState = state;

  const update = (args: (state: T) => Partial<T>) => {
    newState = merge(newState, args(newState));
    listeners.forEach((l) => l());
    return newState;
  };

  const useListen = <S>(field: (s: T) => S) =>
    useSyncExternalStore(subscribe, () => field(newState));

  return { state: newState, useListen, update };
};

export type StateType = typeof state;

const state = {
  modal: {
    isOpen: false,
    component: null as null | JSX.Element | string,
  },
  pagination: {
    pageLength: 10,
    max: 100,
    min: 1,
    current: 1,
  },
  intervals: {
    start: 0,
    end: 0,
  },
  filter: {
    orderBy: false,
    text: "",
    from: 0,
    to: 10000,
    update: Date.now(),
  },
};

export const store = createState(state);

export const storeFunctions = {
  openModal: (args: JSX.Element) =>
    store.update(() => ({ modal: { isOpen: true, component: args } })),
};
