import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  padding: 21px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;

`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;


const Input = styled.input`
  width: 80%;
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const Select = styled.select`
  width: 85%;
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const FileInput = styled(Input)`
  padding: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
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

const RemoveButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #e53935;
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

    const handleRemovePassenger = (index) => {
        const updatedPassengers = [...passengers];
        updatedPassengers.splice(index, 1);
        setPassengers(updatedPassengers);

        // Reset refs
        photoRef.current.splice(index, 1);
        idCardRef.current.splice(index, 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Add passengers data as JSON
            const passengersData = passengers.map(passenger => ({
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender,
                contact: passenger.contact || "",
                email: passenger.email || ""
            }));
            formData.append('passengers', JSON.stringify(passengersData));

            // Add files
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

            // Refresh table data
            refreshData();

            // Reset form
            setPassengers([{
                name: "",
                age: "",
                gender: "",
                contact: "",
                email: "",
                photo: null,
                idCard: null,
            }]);

            // Clear file inputs
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
                        <FormGroup>

                            <Input
                                type="text"
                                name="name"
                                value={passenger.name}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Name"
                                required
                            />
                        </FormGroup>
                        <FormGroup>

                            <Input
                                type="number"
                                name="age"
                                value={passenger.age}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Age"
                                required
                            />
                        </FormGroup>
                        <FormGroup>

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
                        </FormGroup>
                        <FormGroup>

                            <Input
                                type="text"
                                name="contact"
                                value={passenger.contact}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Contact"
                            />
                        </FormGroup>
                        <FormGroup>

                            <Input
                                type="email"
                                name="email"
                                value={passenger.email}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="Email"
                            />
                        </FormGroup>
                        <FormGroup>

                            <FileInput
                                type="file"
                                name="photo"
                                ref={(el) => (photoRef.current[index] = el)}
                                onChange={(e) => handleChange(index, e)}
                                accept="image/png, image/jpeg, image/jpg"
                                required
                            />
                        </FormGroup>
                        <FormGroup>

                            <FileInput
                                type="file"
                                name="idCard"
                                ref={(el) => (idCardRef.current[index] = el)}
                                onChange={(e) => handleChange(index, e)}
                                accept="application/pdf"
                                required
                            />
                        </FormGroup>
                        {index > 0 && (
                            <RemoveButton
                                type="button"
                                onClick={() => handleRemovePassenger(index)}
                            >
                                Remove Passenger
                            </RemoveButton>
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