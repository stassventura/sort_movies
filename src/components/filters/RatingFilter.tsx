import SolidStarIcon from '../../icons/SolidStarIcon';
import TransStarIcon from '../../icons/TransStarIcon';
import useURLParams from '../../hooks/useURLParams';

const RatingFilter = () => {
  const { selectedValues, handleItemClick } = useURLParams('rating');

  return (
    <div className="drop pt-5 pl-3 pb-5">
      <span
        className="flex items-center mb-2 cursor-pointer"
        onClick={() => handleItemClick('any')}>
        <input
          type="checkbox"
          className="mr-1"
          checked={selectedValues.includes('any')}
          onChange={() => {}}
        />
        Any rating
      </span>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <span
            key={index}
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => handleItemClick(index + 1)}>
            <input
              type="checkbox"
              className="mr-1"
              checked={selectedValues.includes((index + 1).toString())}
              onChange={() => {}}
            />
            {Array(index + 1)
              .fill(null)
              .map((_, solidIndex) => (
                <SolidStarIcon key={solidIndex} />
              ))}
            {Array(10 - index - 1)
              .fill(null)
              .map((_, transIndex) => (
                <TransStarIcon key={transIndex} />
              ))}
          </span>
        ))}
    </div>
  );
};

export default RatingFilter;
