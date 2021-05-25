import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isBetween);
dayjs.extend(isToday);

const filterToUrl = filterText => filterText.toLowerCase().replaceAll(' ', '_');

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width };
};

const applyFilter = (selected, list) => {
  switch (selected) {
    case 'all':
      return list;
    case 'important':
      return list.filter(task => task.isUrgent);
    case 'today':
      return list.filter(task => {
        if (dayjs(task.date).isToday()) return true;
        else return false;
      });

    case 'next_7_days':
      return list.filter(task => {
        if (
          dayjs(task.date).isBetween(
            dayjs().startOf('d').add(1, 'day').subtract(1, 'minute'),
            dayjs().startOf('d').add(8, 'day')
          )
        )
          return true;
        else return false;
      });
    case 'private':
      return list.filter(task => task.isPrivate);
    default:
      return undefined;
  }
};

const jsonMapper= (tasks) =>{
  return tasks.map(task => {
    return {
      id: task.id,
      description: task.description,
      isPrivate: task.private===1,
      isUrgent: task.important===1,
      date: (task.deadline ? dayjs(task.deadline) : ""),
      completed: task.completed
    }
  });
}

const jsonMapperInverse= (task)=>{
    return {
      id: task.id,
      description: task.description,
      private: task.isPrivate,
      important: task.isUrgent,
      deadline: (task.date ? task.date.format('YYYY-MM-DD hh:mm') : null),
      completed: task.completed
  }
}

export { filterToUrl, useViewport, applyFilter, jsonMapper, jsonMapperInverse };
