import "../styles/pagination.css";

export default (props: {
  current: number;
  max: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) => {
  let maxPage = props.max;

  const validLength = props.max / 10;
  const extraLength = props.max % 10;

  if (extraLength > 0) maxPage = Math.floor(validLength) + 1;
  else maxPage = validLength;

  const standard = {
    current: props.current,
    max: maxPage,
    min: 1,
    next: props.current + 1,
    previous: props.current - 1,
  };

  const elemnts = () => {
    if (maxPage == 1)
      return {
        max: null,
        next: null,
        previous: null,
        min: null,
      };

    if (maxPage == 2)
      if (standard.current == 2)
        return {
          ...standard,
          max: null,
          next: null,
          previous: null,
        };
      else return { ...standard, min: null, next: null, previous: null };

    if (standard.current == 1)
      return { ...standard, previous: null, min: null };

    if (standard.current == standard.max)
      return { ...standard, max: null, next: null };

    if (standard.current + 1 == standard.max)
      return { ...standard, next: null };

    if (standard.current - 1 == standard.min)
      return { ...standard, previous: null };

    return standard;
  };

  const onNavigateClick = (selected: number) => {
    props.setCurrent(() => selected);
  };

  if (standard.max == 0) return null;

  return (
    <div className="pagination">
      {!!elemnts().min && (
        <button onClick={() => onNavigateClick(standard.min)} className="btn">
          {standard.min}
        </button>
      )}
      {!!elemnts().previous && (
        <button
          onClick={() => onNavigateClick(standard.previous)}
          className="btn"
        >
          {standard.previous}
        </button>
      )}

      <button className="btn selected">{standard.current}</button>

      {!!elemnts().next && (
        <button onClick={() => onNavigateClick(standard.next)} className="btn">
          {standard.next}
        </button>
      )}
      {!!elemnts().max && (
        <button onClick={() => onNavigateClick(standard.max)} className="btn">
          {standard.max}
        </button>
      )}
    </div>
  );
};
