import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  //get single user data
  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong while fetching user data.");
    }
  };

  //send updated data to bacekend
  const handleUpdate = async(e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH", // Or PUT based on your API
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        console.log("User updated:", result);
        setError("");
        navigate("/all");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong while updating user data.");
    }
  };

  return (
    <div className="container my-4 p-4 shadow rounded bg-light">
      {error && <div className="alert alert-danger">{error}</div>}

      <h2 className="text-center mb-4">Edit the Data</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="1"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
