import { useState } from "react";
import { useInput } from "../../lib/hooks";
import "../../styles/filter.css";
import { store } from "../../lib/state";

export default () => {
  const filterInput = useInput("");
  const [value, setValue] = useState(false);

  const save = () => {
    store.update((e) => ({
      modal: { component: null, isOpen: false },
      filter: {
        ...e.filter,
        orderBy: value,
        text: filterInput.input.value as any,
        update: Date.now(),
      },
    }));
  };

  return (
    <div className="card card-modal filter">
      <div className="value">
        <span>фильтр</span>
        <input
          className="text"
          placeholder="фильтр"
          //    type="number"
          {...filterInput.input}
        />
      </div>
      <div className="value">
        <span>сортировать 0 ~ макс</span>
        <input
          className="check-box"
          type="checkbox"
          placeholder="фильтр"
          onChange={({ target: { checked } }) => {
            setValue(() => checked);
          }}
          //    type="number"
        />
      </div>
      <div className="action">
        <button className="btn-green" onClick={save}>
          save
        </button>
      </div>
    </div>
  );
};
