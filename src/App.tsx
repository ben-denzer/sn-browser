import React from 'react';

function App() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="inline text-3xl font-bold tracking-tight text-gray-900 sm:block sm:text-4xl">Enter your url</h2>
        <form className="mt-8 sm:flex">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              https://
            </span>
            <input
              type="text"
              name="company-website"
              id="company-website"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-gray-500 sm:text-sm placeholder-gray-400"
              placeholder="example.com"
            />
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-5 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go
            </button>
          </div>
        </form>
        <div className="relative flex items-center mt-5">
          <div className="flex h-5 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-6 w-6 rounded border-gray-700 text-gray-800 focus:ring-gray-500"
            />
          </div>
          <div className="ml-3 text-md">
            <label htmlFor="comments" className="font-medium text-gray-800">
              "Bookmark" this url for later use
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
