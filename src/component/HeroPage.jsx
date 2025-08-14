import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HeroPage = () => {
  const [animate, setAnimate] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        Loading user data...
      </div>
    );
  }

  // Calculate hours and minutes from totalMinutes
  const hours = Math.floor(user.totalMinutes / 60);
  const minutes = user.totalMinutes % 60;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1
        className={`text-4xl font-bold mb-4 transform transition-opacity duration-1000 ease-out ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        Welcome back, {user.name}!
      </h1>

      <div className="mb-8 max-w-md w-full bg-gray-800 rounded-lg p-6 text-gray-200 space-y-4 shadow-lg">
        <div
          className={`transform transition-opacity duration-1000 ease-out delay-300 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <strong>Total Hours Worked:</strong> {hours}h {minutes}m
        </div>

        <div
          className={`transform transition-opacity duration-1000 ease-out delay-500 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <strong>Total Tasks:</strong> {user.tasks.length}
        </div>
      </div>

      <p
        className={`max-w-xl text-center mb-8 text-gray-300 transform transition-opacity duration-1200 ease-out delay-700 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        Chronotrex helps you track your tasks efficiently and manage your time better.
        Here's how it works:
      </p>

      <div className="max-w-3xl space-y-6 text-gray-200">
        {[
          {
            title: '1. Create Tasks',
            desc: 'Add your daily tasks with estimated time duration.',
            delay: 900,
          },
          {
            title: '2. Track Progress',
            desc: 'Start working on tasks and update your progress in real-time.',
            delay: 1100,
          },
          {
            title: '3. Review and Improve',
            desc: 'Check your completed tasks and analyze time spent for better planning.',
            delay: 1300,
          },
        ].map(({ title, desc, delay }) => (
          <section
            key={title}
            className={`transform transition-opacity duration-1000 ease-out delay-[${delay}ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p>{desc}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HeroPage;
