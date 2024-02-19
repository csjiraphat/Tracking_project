import React,{useState} from 'react';
import './App.css';

function App() {  
  const [data,setData]=useState([])
  const addData=()=>{ setData([...data,{value:Math.random()}]) }

return (
<div className="App">
  <button onClick={addData}> เพิ่มข้อมูล </button>
  <ul className="list-group list-group-flush">
  {data.map(item=>(<li className="list-group-item">{item.value}</li>))}  </ul>

</div>
 );
}
export default App;

