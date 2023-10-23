import { useNavigate } from 'react-router-dom';

const useURLParams = (paramName: string) => {
  const navigate = useNavigate();

  const getParams = (paramName: string) => {
    if (!window.location.search) return [];

    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get(paramName);

    return paramValue ? paramValue.split(',') : [];
  };

  const handleItemClick = (value: string | number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentValues = getParams(paramName);

    if (value === 'any') {
      if (currentValues.includes('any')) {
        searchParams.delete(paramName);
      } else {
        searchParams.delete(paramName);
        searchParams.set(paramName, 'any');
      }
    } else {
      if (currentValues.includes(value.toString())) {
        const index = currentValues.indexOf(value.toString());
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value.toString());
      }

      if (currentValues.length > 0) {
        searchParams.set(paramName, currentValues.join(','));
      } else {
        searchParams.delete(paramName);
      }
    }

    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return {
    selectedValues: getParams(paramName),
    handleItemClick,
  };
};

export default useURLParams;
