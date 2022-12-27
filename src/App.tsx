import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import validator from 'validator';

interface Bookmark {
  url: string;
  label: string;
  id: number;
}

const localStorageKey = 'browserBookmarks';

enum InputId {
  url = 'url',
  bookmarkLabel = 'bookmarkLabel',
}

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showUrlError, setShowUrlError] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);
  const [bookmarkBoxIsChecked, setBookmarkBoxIsChecked] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [labelValue, setLabelValue] = useState('');

  useEffect(() => {
    try {
      const storedBookmarks = window.localStorage.getItem(localStorageKey);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (e) {
      // do nothing, continue without bookmarks
    }
  }, []);

  const handleInputChange = (inputId: string, inputValue: string) => {
    switch (inputId) {
      case InputId.url:
        setShowUrlError(false);
        setUrlValue(inputValue);
        break;
      case InputId.bookmarkLabel:
        setLabelValue(inputValue);
        break;
      default:
        break;
    }
  };

  const setInStorage = (bookmarks: Bookmark[]) => {
    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(bookmarks));
    } catch (e) {
      // do nothing, it did not save though
    }
  };

  const addItem = () => {
    const newItem: Bookmark = {
      url: encodeURI(urlValue.trim()),
      label: labelValue.trim() || urlValue.trim(),
      id: Date.now(),
    };

    const updatedBookmarks = [...bookmarks, newItem];
    setBookmarks(updatedBookmarks);
    setInStorage(updatedBookmarks);
  };

  const deleteItem = () => {
    const updatedBookmarks = bookmarks.filter((site) => site.id !== deleteConfirmation);
    setBookmarks(updatedBookmarks);
    setInStorage(updatedBookmarks);
    setDeleteConfirmation(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullUrl = `https://${encodeURI(urlValue.trim())}`;

    if (!validator.isURL(fullUrl)) {
      setShowUrlError(true);
      return;
    }

    if (bookmarkBoxIsChecked) {
      addItem();
    }
    window.location.assign(fullUrl);
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 lg:py-16 lg:px-8">
        <h2 className="inline text-3xl font-bold tracking-tight text-gray-900">Enter a url</h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
              https://
            </span>
            <input
              onChange={(e) => handleInputChange(InputId.url, e.currentTarget.value)}
              value={urlValue}
              type="text"
              id={InputId.url}
              required={true}
              autoFocus={true}
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400"
            />
          </div>
          <div className="mt-3 rounded-md shadow">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-gray-600 bg-gray-600 px-5 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {bookmarkBoxIsChecked ? 'Save and Go' : 'Go'}
            </button>
          </div>
          {showUrlError && <div className="text-lg max-w text-center mt-2">Please enter a valid url</div>}
        </form>
        <div className="relative flex items-center mt-5">
          <div className="flex h-5 items-center">
            <input
              id="shouldBookmark"
              aria-describedby="bookmark-url"
              type="checkbox"
              className="h-6 w-6 rounded border-gray-700 text-gray-800 focus:ring-gray-500"
              onChange={(e) => setBookmarkBoxIsChecked(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-md">
            <label htmlFor="shouldBookmark" className="font-medium text-gray-800">
              Bookmark this url for later use?
            </label>
          </div>
        </div>
        {bookmarkBoxIsChecked && (
          <div className="mt-3">
            <div className="text-md">Label (optional)</div>
            <input
              onChange={(e) => handleInputChange(InputId.bookmarkLabel, e.currentTarget.value)}
              type="text"
              id={InputId.bookmarkLabel}
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400"
            />
          </div>
        )}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Bookmarks
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3">
                        <span className="sr-only">Delete?</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {bookmarks.map((site) => (
                      <tr key={site.id}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm font-medium text-gray-900">
                          <a className="text-gray-800 underline p-3" href={`https://${site.url}`}>
                            {site.label}
                          </a>
                        </td>

                        <td className="relative whitespace-nowrap text-right text-sm pr-5">
                          {deleteConfirmation !== site.id && (
                            <div
                              className="max-w flex justify-end p-3 cursor-pointer"
                              onClick={() => setDeleteConfirmation(site.id)}
                            >
                              <TrashIcon height={20} />
                            </div>
                          )}
                          {deleteConfirmation === site.id && (
                            <div>
                              Are you sure?&nbsp;&nbsp;&nbsp;
                              <span className="cursor-pointer p-3" onClick={deleteItem}>
                                Yes
                              </span>
                              /
                              <span className="cursor-pointer p-3" onClick={() => setDeleteConfirmation(null)}>
                                No
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
