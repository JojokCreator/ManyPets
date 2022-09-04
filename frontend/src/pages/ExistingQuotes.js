import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const ExistingQuotes = () => {
  let [quotes, setQuotes ] = useState([])
  const { currentColor } = useStateContext();
  useEffect(() => {
  async function getData() {
    let response = await fetch('http://localhost:5000/quotes/test@email.com', {
      method: 'Get',
    });
    let data = await response.json();
    setQuotes(data)
  }
  getData()
}, []);

  return (
    <div>
      <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    ID
                </th>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Species
                </th>
                <th scope="col" class="py-3 px-6">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            {quotes.map((quote) =>
            <tr key={quote._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {quote._id.length > 11 ? quote._id.slice(-4) : quote._id}
                </th>
                <td class="py-4 px-6">
                    {quote.name}
                </td>
                <td class="py-4 px-6">
                {quote.species}
                </td>
                <td class="py-4 px-6">
                £{quote.quotationCost}
                </td>
            </tr>
                )}
        </tbody>
    </table>
    <div class="relative z-0 m-6 group flex items-center">
        <button
          type="submit"
          style={{ backgroundColor: currentColor }}
          class="text-white focus:ring-4 focus:outline-none hover:opacity-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >Buy Now</button>
          </div>
</div>
    </div>
  )
}

export default ExistingQuotes