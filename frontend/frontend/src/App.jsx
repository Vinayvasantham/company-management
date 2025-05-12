import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/companies")
            .then(response => setCompanies(response.data));
    }, []);

    const addCompany = async () => {
    try {
        await axios.post("http://127.0.0.1:8000/companies", {
            name: name,
            location: location,
        });
        window.location.reload();
    } catch (error) {
        console.error("Error adding company:", error);
    }
    };

    return (
        <div>
            <h2>Company List</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <button onClick={addCompany}>Add Company</button>
            <ul>
                {companies.map((company) => (
                     <li key={company.id}>
                        {company.id} - {company.name} - {company.location}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>a
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
