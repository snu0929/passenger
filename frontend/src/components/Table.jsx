import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const Table = ({ data }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((passenger, index) => (
                        <TableRow key={index}>
                            <TableData>{passenger.name}</TableData>
                            <TableData>{passenger.age}</TableData>
                            <TableData>{passenger.gender}</TableData>
                            <TableData>{passenger.contact || "-"}</TableData>
                            <TableData>{passenger.email || "-"}</TableData>
                            <TableData>
                                {passenger.photo ? (
                                    <img
                                        src={`http://localhost:8080/uploads/${passenger.photo}`}
                                        alt="Passenger"
                                        style={{ width: "40px", height: "40px", borderRadius: "4px" }}
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
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </Container>
    );
};
