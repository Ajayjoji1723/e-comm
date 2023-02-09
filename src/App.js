import { useState } from 'react'

import './App.css';

function App() {
  const [data,setData] = useState([])

  const [search,setSearch] = useState('')
  
  const [selectedCategory, setSelectedCategory] = useState(null);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  console.log(selectedCategory)

  const onChangeSearch= async (e)=>{
    setSearch(e.target.value)
    let searchValue = e.target.value
    const response = await fetch(`https://e-commerce-filtering.onrender.com/products/?${selectedCategory}=${searchValue}`)
      let data = await response.json()
      setData(data)
  }
  
  console.log(data)

  return (
    <div className="App">
      <h1>Welcome to E commerce Application</h1>
      <form className='form-container'>
      <select onChange={handleCategoryChange} className='select'>
              <option value="search">name</option>
              <option value="brand">brand</option>
              <option value="color">color</option>
              <option value="rating">rating</option>
          </select>
      <input type="search" placeholder='Search products here..' className='input' onChange={onChangeSearch} value={search}/>
      </form>
      {search !== ''? (data.map(each=>(
      <ul className='item-list' key={each.name}>
        <div>
          <li>{each.name}</li>
          <li>{`Brand : ${each.brand}`}</li>
          <li>{`Price : ${each.price}/-`}</li>
          <li>{`Color : ${each.color}`}</li>
          <li>{`Rating : ${each.rating}`}</li>
        </div>
        <img src={each.image_url} className="w-25" alt={each.name}/>
      </ul>))):(
      <p>No Records Found</p>)}
    </div>
  );
}

export default App;
