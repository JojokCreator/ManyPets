import React, { useEffect, useState } from 'react'

const ExistingQuotes = () => {
  let [quotes, setQuotes ] = useState([])
  
  useEffect(() => {
  async function getData() {
    let response = await fetch('https://lime-witty-sea-lion.cyclic.app/quotes/test@email.com/quotes/todays/quotes', {
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
                    {quote._id}
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
</div>
    </div>
  )
}

export default ExistingQuotes