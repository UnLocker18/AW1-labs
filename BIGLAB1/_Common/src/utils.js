import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const filterToUrl = (filterText) => filterText.toLowerCase().replaceAll(' ', '_');

const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);
  
    React.useEffect( () => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, [] );
  
    return { width };
}

const applyFilter = (selected, list) => {

    switch (selected) {
        case 'all':
            return list;
        case 'important':
            return (list.filter(task => task.isUrgent));
        case 'today':
            return (list.filter(task => {
                if (dayjs(task.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) return true;
                else return false;
            }));

        case 'next_7_days':
            return (list.filter(task => {
                if (dayjs(task.date).isBetween(
                    dayjs().startOf('d').add(1, 'day').subtract(1, 'minute'), dayjs().startOf('d').add(8, 'day')
                )) return true;
                else return false;
            }));
        case 'private':
            return (list.filter(task => task.isPrivate));
        default:
            return undefined;
    }
}

export { filterToUrl, useViewport, applyFilter };