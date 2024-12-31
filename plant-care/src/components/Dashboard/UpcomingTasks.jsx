import React, { useEffect, useState } from 'react';
import { FaLeaf, FaClock, FaCheckCircle } from 'react-icons/fa';
import './UpcomingTask.css';

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate real-time fetching of data
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, task: 'Repot Aloe Vera', dueIn: 'Tomorrow', status: 'upcoming' },
        { id: 2, task: 'Fertilize Cactus', dueIn: 'Next Week', status: 'upcoming' },
        { id: 3, task: 'Prune Snake Plant', dueIn: 'Completed', status: 'completed' },
      ]);
      setLoading(false);
    }, 1000); // Mock API delay
  }, []);

  return (
    <section className="upcoming-tasks">
      <h2>
        <FaLeaf className="title-icon" /> Upcoming Tasks
      </h2>
      {loading ? (
        <p className="loading-text">Fetching your tasks...</p>
      ) : tasks.length > 0 ? (
        <ul className="timeline">
          {tasks.map((task, index) => (
            <li key={task.id} className="timeline-item">
              <div className={`timeline-dot ${task.status}`} />
              <div className="task-info">
                <div className="task-name">
                  <FaClock className="task-icon" /> {task.task}
                </div>
                <div className="task-due">Due: {task.dueIn}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">
          No upcoming tasks. Your plants are happy! <FaCheckCircle className="check-icon" />
        </p>
      )}
    </section>
  );
};

export default UpcomingTasks;
