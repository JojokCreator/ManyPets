import './App.css';
import { useState } from 'react';
function App() {
  const [name, setName] = useState('your pet');
  function handleSubmit(e) {
    e.preventDefault();
    let inputs = e.target.elements;
    console.log(e.target.elements);
    console.log(inputs[0].value);
    let obj = {
      species: inputs[0].checked ? inputs[0].value : inputs[1].value,
      name: inputs[4].value,
      gender: inputs[2].checked ? inputs[2].value : inputs[3].value,
      breedType: inputs[5].value,
      breed: 'Pedigree',
      age: inputs[6].value,
      sprayed: inputs[7].checked ? true : false,
      address: inputs[11].value,
      email: inputs[10].value,
      coverLength: inputs[12].value,
    };
    console.log('obj', obj);
  }
  function handleNameChange(e) {
    console.log(e.target.value);
    setName(e.target.value === '' ? 'your pet' : e.target.value);
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Is {name} a dog or a cat?</p>
        <label htmlFor="dog">Dog</label>
        <input type="radio" id="dog" name="species" value={'dog'}></input>
        <label htmlFor="cat">Cat</label>
        <input type="radio" name="species" id="cat" value={'cat'}></input>

        <p>What gender is {name}</p>
        <label htmlFor="Male">Male</label>
        <input type="radio" id="Male" name="gender" value={'male'}></input>
        <label htmlFor="Female">Female</label>
        <input type="radio" name="gender" id="Female" value={'female'}></input>
        <label htmlFor="name"> What is your furry friend's name</label>
        <input onChange={handleNameChange} type="text" id="name"></input>

        <label>What breed type is {name}</label>
        <input type="text"></input>

        <label htmlFor="age">How old is {name} in months?</label>
        <input id="age" type="number"></input>

        <p>Has {name} been sprayed or neutered?</p>
        <label htmlFor="sprayed">Sprayed</label>
        <input type="radio" id="sprayed" name="status"></input>
        <label htmlFor="neutered">Neutered</label>
        <input type="radio" name="status" id="neutered"></input>

        <label htmlFor="money">
          How much did you pay or donate for {name}?
        </label>
        <input type="number" id="money"></input>
        <label htmlFor="email">What is your email address?</label>
        <input type="email" id="email"></input>
        <label htmlFor="postcode">What is your postcode?</label>
        <input type="text" id="postcode"></input>
        <label htmlFor="money">How many months do you want this to last?</label>
        <input type="number" id="duration"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
