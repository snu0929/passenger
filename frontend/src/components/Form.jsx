import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;

export const Form = ({ refreshData }) => {
    const [passengers, setPassengers] = useState([
        {
            name: "",
            age: "",
            gender: "",
            contact: "",
            email: "",
            photo: null,
            idCard: null,
        },
    ]);

    const photoRef = useRef([]);
    const idCardRef = useRef([]);

    const handleChange = (index, e) => {
        const { name, value, files } = e.target;
        const updatedPassengers = [...passengers];

        if (files) {
            updatedPassengers[index][name] = files[0];
        } else {
            updatedPassengers[index][name] = value;
        }

        setPassengers(updatedPassengers);
    };

    // ✅ Add new passenger row
    const handleAddPassenger = () => {
        setPassengers([
            ...passengers,
            {
                name: "",
                age: "",
                gender: "",
                contact: "",
                email: "",
                photo: null,
                idCard: null,
            },
        ]);
    };

    //Remove a passenger row
    const handleRemovePassenger = (index) => {
        const updatedPassengers = [...passengers];
        updatedPassengers.splice(index, 1);
        setPassengers(updatedPassengers);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Create a copy of the passengers array without the File objects
            const passengersData = passengers.map(passenger => ({
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender,
                contact: passenger.contact || "",
                email: passenger.email || ""
            }));

            // Add the passengers data as a JSON string
            formData.append('passengers', JSON.stringify(passengersData));

            // Add files separately
            passengers.forEach((passenger, index) => {
                if (passenger.photo) {
                    formData.append('photo', passenger.photo);
                }
                if (passenger.idCard) {
                    formData.append('idCard', passenger.idCard);
                }
            });

            const res = await axios.post("http://localhost:8080/api/add", formData);

            console.log(res.data);

            // Refresh table data after submission
            refreshData();

            // Reset form state
            setPassengers([
                {
                    name: "",
                    age: "",
                    gender: "",
                    contact: "",
                    email: "",
                    photo: null,
                    idCard: null,
                },
            ]);

            // Reset file inputs using refs
            photoRef.current.forEach((input) => {
                if (input) input.value = "";
            });
            idCardRef.current.forEach((input) => {
                if (input) input.value = "";
            });

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <FormContainer>
            <h2>Add Passengers</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {passengers.map((passenger, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            name="name"
                            value={passenger.name}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Name"
                            required
                        />
                        <Input
                            type="number"
                            name="age"
                            value={passenger.age}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Age"
                            required
                        />
                        <Select
                            name="gender"
                            value={passenger.gender}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Select>
                        <Input
                            type="text"
                            name="contact"
                            value={passenger.contact}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Contact"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={passenger.email}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Email"
                        />
                        <Input
                            type="file"
                            name="photo"
                            ref={(el) => (photoRef.current[index] = el)}
                            onChange={(e) => handleChange(index, e)}
                            accept="image/png, image/jpeg, image/jpg"
                        />
                        <Input
                            type="file"
                            name="idCard"
                            ref={(el) => (idCardRef.current[index] = el)}
                            onChange={(e) => handleChange(index, e)}
                            accept="application/pdf"
                        />
                        {index > 0 && (
                            <Button
                                type="button"
                                onClick={() => handleRemovePassenger(index)}
                                style={{ backgroundColor: "#f44336" }}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}

                <Button type="button" onClick={handleAddPassenger}>
                    + Add Passenger
                </Button>

                <Button type="submit" style={{ marginTop: "10px" }}>
                    Submit All
                </Button>
            </form>
        </FormContainer>
    );
};
