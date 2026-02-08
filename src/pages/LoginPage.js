// pages/LoginPage.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoginPage = ({ onLogin }) => {
  const theme = useSelector((state) => state.theme);
  const currentTheme = theme.mode === 'system' ? theme.systemPreference : theme.mode;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Restaurant Menu Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Menu Management System
          </p>
        </div>
        
        <div className="mb-8 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Login Info
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Username: admin<br />
            Password: admin
          </p>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User name
            </label>
            <input
              type="text"
              defaultValue="admin"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
             Password
            </label>
            <input
              type="password"
              defaultValue="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            当前主题: {currentTheme === 'dark' ? '深色模式' : '浅色模式'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;