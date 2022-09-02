import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [name, setName] = useState('your pet');
  // const [amount, setAmount] = useState(1);
  // localStorage.clear();
  const [data, setData] = useState({
    species: 'Dog',
    name: '',
    gender: '',
    breedType: '',
    breed: 'Pedigree',
    age: 0,
    sprayed: '',
    postcode: '',
    email: '',
    coverLength: '',
  });
  const [submit, setSubmit] = useState(false);
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
    // console.log('obj changed', obj);
    setData({ ...obj });
  }
  useEffect(() => {
    async function sendData() {
      let response = await fetch('http://localhost:5000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let responseInfo = await response.json();
      // console.log('fetch res', responseInfo);
    }
    if (submit) {
      sendData();
      setSubmit(false);
    }
  }, [submit, data]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('info'));
    console.log('stored localStorage Data', storedData);
    if (storedData) {
      setData({ ...storedData });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('info', JSON.stringify({ ...data }));
  }, [data]);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target.elements);
    // console.log(inputs[0].value);
    localStorage.clear();
    setSubmit(true);
  }
  function handleNameChange(e) {
    // console.log(e.target.value);
    handleChange(e);
    setName(e.target.value === '' ? 'your pet' : e.target.value);
  }
  function setDefaultValue(e) {
    // console.log(e);
    return data[e.target.name];
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* <p>Is {name} a dog or a cat?</p>
        <label htmlFor="dog">Dog</label>
        <input type="radio" id="dog" name="species" value={'dog'}></input>
        <label htmlFor="cat">Cat</label>
        <input type="radio" name="species" id="cat" value={'cat'}></input> */}

        <p>What gender is {name}</p>
        <label htmlFor="Male">Male</label>
        <input
          required
          type="radio"
          id="Male"
          name="gender"
          value={'male'}
          onChange={handleChange}
        ></input>
        <label htmlFor="Female">Female</label>
        <input
          required
          onChange={handleChange}
          type="radio"
          name="gender"
          id="Female"
          value={'female'}
        ></input>
        <label htmlFor="name"> What is your furry friend's name</label>
        <input
          required
          onChange={handleNameChange}
          type="text"
          id="name"
          name="name"
          defaultValue={setDefaultValue}
        ></input>

        <label>What breed type is {name}</label>
        <input onChange={handleChange} type="text" name="breedType"></input>

        <label htmlFor="age">How old is {name} in months?</label>
        <input
          required
          onChange={handleChange}
          id="age"
          type="number"
          name="age"
        ></input>

        <p>Has {name} been sprayed or neutered?</p>
        <label htmlFor="sprayed">Sprayed</label>
        <input
          required
          onChange={handleChange}
          type="radio"
          id="sprayed"
          name="sprayed"
          value={true}
        ></input>
        <label htmlFor="neutered">Neutered</label>
        <input
          required
          onChange={handleChange}
          type="radio"
          name="sprayed"
          id="neutered"
          value={false}
        ></input>

        <label htmlFor="email">What is your email address?</label>
        <input
          required
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
        ></input>
        <label htmlFor="postcode">What is your postcode?</label>
        <input
          required
          onChange={handleChange}
          type="text"
          id="postcode"
          name="postcode"
        ></input>
        <label htmlFor="money">How many months do you want this to last?</label>
        <input
          required
          onChange={handleChange}
          type="number"
          id="duration"
          name="coverLength"
        ></input>

        {/* <label htmlFor="counter">How many of these pets shall we create?</label>
        <input onChange={handleChange} type="number" id="counter"></input> */}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
