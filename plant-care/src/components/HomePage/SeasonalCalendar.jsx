import React, { useState, useEffect } from 'react';
import { FaSun, FaTint, FaLeaf, FaSeedling, FaTree, FaPencilAlt, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import '../HomePage-CSS/SeasonalCalendar.css';

// Seasonal tasks data with icons assigned to each task
const seasonalTasks = {
  January: [
    { task: 'Water indoor plants', icon: <FaTint /> },
    { task: 'Prepare soil for spring planting', icon: <FaSeedling /> }
  ],
  February: [
    { task: 'Prune dead branches', icon: <FaTree /> },
    { task: 'Plan for vegetable garden', icon: <FaPencilAlt /> }
  ],
  March: [
    { task: 'Plant spring flowers', icon: <FaSeedling /> },
    { task: 'Fertilize garden beds', icon: <FaLeaf /> }
  ],
  April: [
    { task: 'Start seedlings indoors', icon: <FaSeedling /> },
    { task: 'Mulch garden beds', icon: <FaLeaf /> }
  ],
  May: [
    { task: 'Plant outdoor garden', icon: <FaSeedling /> },
    { task: 'Water regularly', icon: <FaTint /> }
  ],
  June: [
    { task: 'Check for pests', icon: <FaRegArrowAltCircleLeft /> },
    { task: 'Trim plants as needed', icon: <FaTree /> }
  ],
  July: [
    { task: 'Water garden deeply', icon: <FaTint /> },
    { task: 'Harvest early crops', icon: <FaRegArrowAltCircleRight /> }
  ],
  August: [
    { task: 'Prepare garden for fall planting', icon: <FaSeedling /> },
    { task: 'Check irrigation system', icon: <FaRegArrowAltCircleLeft /> }
  ],
  September: [
    { task: 'Plant fall crops', icon: <FaSeedling /> },
    { task: 'Prune fruit trees', icon: <FaTree /> }
  ],
  October: [
    { task: 'Harvest fall crops', icon: <FaRegArrowAltCircleRight /> },
    { task: 'Clean garden tools', icon: <FaPencilAlt /> }
  ],
  November: [
    { task: 'Protect plants from frost', icon: <FaSun /> },
    { task: 'Plant garlic for next year', icon: <FaSeedling /> }
  ],
  December: [
    { task: 'Water indoor plants', icon: <FaTint /> },
    { task: 'Prepare for winter pruning', icon: <FaTree /> }
  ],
};

const SeasonalCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [taskList, setTaskList] = useState([]); 

  useEffect(() => {
    const monthName = new Date(2024, month).toLocaleString('default', { month: 'long' });
    setTaskList(seasonalTasks[monthName] || []); 
  }, [month]);

  const handlePrevMonth = () => setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  const handleNextMonth = () => setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));

  return (
    <section className="seasonal-calendar">
      <h2 style={{fontSize:'38px'}}>Garden Calendar</h2>
      <div className="calendar-nav">
        <button onClick={handlePrevMonth}><FaRegArrowAltCircleLeft /> </button>
        <h3>{new Date(2024, month).toLocaleString('default', { month: 'long' })}</h3>
        <button onClick={handleNextMonth}> <FaRegArrowAltCircleRight /></button>
      </div>
      
      <div className="task-cards">
        {taskList.length > 0 ? (
          taskList.map((taskObj, index) => (
            <div key={index} className="task-card">
              <div className="task-icon">
                {taskObj.icon}
              </div>
              <div className="task-details">
                <h4>{taskObj.task}</h4>
              </div>
            </div>
          ))
        ) : (
          <div className="no-tasks">No tasks available for this month.</div>
        )}
      </div>
    </section>
  );
};

export default SeasonalCalendar;
