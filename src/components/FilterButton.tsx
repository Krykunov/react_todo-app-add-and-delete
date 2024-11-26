import React from 'react';

import cn from 'classnames';

type Props = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filterItem: string;
};

const FilterButton: React.FC<Props> = ({
  activeFilter,
  setActiveFilter,
  filterItem,
}) => {
  const filterName = filterItem.charAt(0).toUpperCase() + filterItem.slice(1);
  const handleFilterClick = () => {
    if (activeFilter !== filterItem) {
      setActiveFilter(filterItem);
    }
  };

  return (
    <a
      key={filterItem}
      href={`#/${filterItem}`}
      className={cn('filter__link', {
        selected: activeFilter === filterItem,
      })}
      data-cy={`FilterLink${filterName}`}
      onClick={handleFilterClick}
    >
      {filterName}
    </a>
  );
};

export default FilterButton;
