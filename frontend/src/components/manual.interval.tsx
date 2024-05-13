import { useInput } from "../lib/hooks";
import { store } from "../lib/state";
import "../styles/manual.interval.css";

export default () => {
  const inputFrom = useInput("0", ({}) => {
    return "valid";
  });

  const inputTo = useInput("10000", ({}) => {
    return "valid";
  });

  const save = () => {
    if (!!inputFrom.input.value || !!inputTo.input.value)
      store.update((e) => ({
        filter: {
          ...e.filter,
          from: parseInt(inputFrom.input.value),
          to: parseInt(inputTo.input.value),
        },
      }));
  };

  return (
    <div className="manual-interval">
      {/* <div className="laoding">
        <Loader className="loader" size={30} />
      </div> */}

      <div className="value">
        <span>до</span>
        <input placeholder="до" {...inputTo.input} />
      </div>

      <div className="value">
        <span>от</span>
        <input placeholder="от" {...inputFrom.input} />
      </div>

      <button onClick={save}>сохранять</button>
    </div>
  );
};
