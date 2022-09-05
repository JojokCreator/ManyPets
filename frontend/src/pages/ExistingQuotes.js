import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const ExistingQuotes = () => {
  let [quotes, setQuotes] = useState([])
  let [isLoading, setIsLoading] = useState(true)

  const { currentColor } = useStateContext();
  useEffect(() => {
    async function getData() {
      let response = await fetch('https://lime-witty-sea-lion.cyclic.app/quotes/test@email.com', {
        method: 'Get',
      });
      let data = await response.json();
      setQuotes(data)
      setIsLoading(false)
    }
    getData()
  }, []);

  if (isLoading === true) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) =>
              <tr key={quote._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {quote._id.length > 11 ? quote._id.slice(-4) : quote._id}
                </th>
                <td className="py-4 px-6">
                  {quote.name}
                </td>
                <td className="py-4 px-6">
                  £{quote.quotationCost}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="relative z-0 m-6 group flex items-center">
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="text-white focus:ring-4 focus:outline-none hover:opacity-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default ExistingQuotes