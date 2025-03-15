import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form } from '../components/Form'
import { Table } from '../components/Table'
import axios from 'axios'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    gap: 20px;
    
 
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FormContainer = styled.div`
    flex: 1; 
    min-width: 300px; 
`;

const TableContainer = styled.div`
    flex: 2; 
    overflow-x: auto; 
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 20px;
  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;


export const Home = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api");
            setData(res.data.passengers);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const filteredData = data.filter(
        (passenger) =>
            passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            passenger.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <HomeContainer>
            <FormContainer>
                <Form refreshData={getData} />
            </FormContainer>
            <TableContainer>
                <SearchInput
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Table data={filteredData} refreshData={getData} />
            </TableContainer>
        </HomeContainer>
    );
};

