import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form } from '../components/Form'
import { Table } from '../components/Table'
import axios from 'axios'

const HomeContainer = styled.div`
     /* background-color:red; */
`

export const Home = () => {
    const [data, setData] = useState([]);

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
    return (
        <HomeContainer>
            <Form refreshData={getData} />
            <Table data={data} />
        </HomeContainer>
    )
}
