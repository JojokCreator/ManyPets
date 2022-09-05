import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
const Form = () => {
  const navigate = useNavigate()

  const { currentColor } = useStateContext();

  const [name, setName] = useState('your pet');
  const [error, setError] = useState();
  const [data, setData] = useState(JSON.parse(localStorage.getItem('info')));

  function handleChange(e) {
    let obj = data;
    if (e.target.name === 'sprayed') {
      if (e.target.value === 'true') {
        obj[e.target.name] = true;
      } else {
        obj[e.target.name] = false;
      }
    } else {
      obj[e.target.name] = e.target.value;
    }

    setData({ ...obj });
  }

    async function sendData() {
      let response = await fetch('https://lime-witty-sea-lion.cyclic.app/quotes/test@email.com/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let responseInfo = await response.json();
      console.log(responseInfo.message)
        setError(responseInfo.message)
        setData({})
        navigate('/existingquotes')

    }

  useEffect(() => {
    localStorage.setItem('info', JSON.stringify({ ...data }));
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.clear();
    sendData()
  }
  function handleNameChange(e) {
    handleChange(e);
    setName(e.target.value === '' ? 'your pet' : e.target.value);
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
      <form onSubmit={handleSubmit}>
        <div class="relative z-0 mb-6 w-full group">
          <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What gender is {name}</p>
        </div>
        <label htmlFor="Male" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
        <input
          required
          type="radio"
          id="Male"
          name="gender"
          checked={data?.gender === 'male' ? true : false}
          value={'male'}
          onChange={handleChange}
        ></input>
        <label htmlFor="Female" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
        <input
          required
          onChange={handleChange}
          type="radio"
          name="gender"
          checked={data?.gender === 'female' ? true : false}
          id="Female"
          value={'female'}
          class="mb-6"
        ></input>

        <div class="relative z-0 mb-6 w-full group">
          <input
            required
            onChange={handleNameChange}
            type="text"
            id="name"
            name="name"
            defaultValue={data?.name}
            placeholder=" "
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          ></input>
          <label htmlFor="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> What is your furry friend's name</label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input onChange={handleChange} type="text" name="breedType" defaultValue={data?.breedType} placeholder=" " class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
          <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What breed type is {name}</label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            required
            onChange={handleChange}
            id="age"
            type="number"
            name="age"
            defaultValue={data?.age}
            placeholder=" "
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          ></input>
          <label htmlFor="age" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">How old is {name} in months?</label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Has {name} been sprayed or neutered?</p>
        </div>
        <label htmlFor="sprayed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sprayed</label>
        <input
          required
          onChange={handleChange}
          type="radio"
          id="sprayed"
          name="sprayed"
          checked={data?.sprayed === true ? true : false}
          value={true}
        ></input>
        <label htmlFor="neutered" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Neutered</label>
        <input
          required
          onChange={handleChange}
          type="radio"
          name="sprayed"
          checked={data?.sprayed === false ? true : false}
          id="neutered"
          value={false}
          class="mb-6"
        ></input>
        <div class="relative z-0 mb-6 w-full group">
          <input
            required
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            defaultValue={data?.email}
            placeholder=" "
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          ></input>
          <label htmlFor="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What is your email address?</label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
        <input
          required
          onChange={handleChange}
          type="text"
          id="postcode"
          name="postcode"
          defaultValue={data?.postcode}
          placeholder=" "
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        ></input>
        <label htmlFor="postcode" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What is your postcode?</label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
        <input
          required
          onChange={handleChange}
          type="number"
          id="duration"
          name="coverLength"
          defaultValue={data?.coverLength}
          placeholder=" "
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        ></input>
        <label htmlFor="money" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">How many months do you want this to last?</label>
        </div>
        <div class="relative z-0 mb-6 w-full group flex items-center">
        <button
          type="submit"
          style={{ backgroundColor: currentColor }}
          class="text-white focus:ring-4 focus:outline-none hover:opacity-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >Submit</button>
          <p class="ml-6 text-red-800 text-xl">{error}</p>
        </div>
      </form>
    </div>
  );  
}

export default Form