import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8000/companies")
            .then(response => setCompanies(response.data));
    }, []);

    const addCompany = () => {
        axios.post("http://localhost:8000/companies", { name, location })
            .then(() => window.location.reload());
    };

    return (
        <div>
            <h2>Company List</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <button onClick={addCompany}>Add Company</button>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>{company.name} - {company.location}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
