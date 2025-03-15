import axios from "axios";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Photo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
    border: none;
    display: flex;
    padding: 6px;
   align-items: center;
    background-color: #4CAF50;
    color: white;
    border-radius: 6px;
`

export const Table = ({ data, isLoading, error, refreshData }) => {
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/delete/${id}`);
            console.log(res.data);
            alert(`${res.data.passenger.name} deleted`)
            refreshData();
        } catch (error) {
            console.error("Error deleting passenger:", error.response?.data || error.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <StyledTable>
                <thead>
                    <tr>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Age</TableHeader>
                        <TableHeader>Gender</TableHeader>
                        <TableHeader>Contact</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Photo</TableHeader>
                        <TableHeader>ID Card</TableHeader>
                        <TableHeader>Action</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {data.map((passenger) => (
                        <TableRow key={passenger._id}>
                            <TableData>{passenger.name}</TableData>
                            <TableData>{passenger.age}</TableData>
                            <TableData>{passenger.gender}</TableData>
                            <TableData>{passenger.contact || "-"}</TableData>
                            <TableData>{passenger.email || "-"}</TableData>
                            <TableData>
                                {passenger.photo ? (
                                    <Photo
                                        src={`http://localhost:8080/uploads/${passenger.photo}`}
                                        alt="Passenger"
                                    />
                                ) : (
                                    "-"
                                )}
                            </TableData>
                            <TableData>
                                {passenger.idCard ? (
                                    <a
                                        href={`http://localhost:8080/uploads/${passenger.idCard}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View ID
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </TableData>
                            <TableData>
                                <DeleteButton onClick={() => handleDelete(passenger._id)}>delete</DeleteButton>
                            </TableData>

                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </Container>
    );
};