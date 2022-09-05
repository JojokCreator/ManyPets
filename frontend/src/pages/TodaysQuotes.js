import React, { useEffect, useState } from 'react'

const ExistingQuotes = () => {
  let [quotes, setQuotes] = useState([])
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      let response = await fetch('https://lime-witty-sea-lion.cyclic.app/quotes/todays/quotes', {
        method: 'Get',
      });
      let data = await response.json();
      setQuotes(data)
      setIsLoading(false)
    }
    getData()
  }, []);

  return (
    <div>
      {(isLoading === true) ?
        <div className="m-20">Loading...</div>
        :
        <div className="overflow-x-auto relative mt-20">
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
        </div>}
    </div>
  )
}

export default ExistingQuotes