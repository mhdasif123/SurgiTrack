import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../../contexts/PatientContext";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";


const AddPatientPage = () => {
  const {addPatient} = useContext(PatientContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [IdGenerator, setIdGenerator] = useState("");

  const status = "Checked In";
  const navigate = useNavigate();

  useEffect(() => {
    setIdGenerator(nanoid(6));
  },[])

  const submitForm = (e) => {
    e.preventDefault();

    addPatient({
      id: IdGenerator,
      name: firstName + " " + lastName,
      phoneNum: phoneNum,
      emailAddress:emailAddress,
      country: country,
      city: city,
      street: street,
      currentStatus: status,
      lastUpdated: new Date().toISOString()
    })

    navigate('/dashboard')
  }

  return (
      <>
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center p-6">Add New Patient</h1>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <form className="space-y-6" onSubmit={submitForm}>
        {/* Row: First Name + Last Name */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="firstName" className="block text-xl font-bold mb-3">First Name</label>
            <input
              required
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="lastName" className="block text-xl font-bold mb-3">Last Name</label>
            <input
              required
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>
        </div>

        {/* Row: Phone + Email */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="phoneNum" className="block text-xl font-bold mb-3">Telephone</label>
            <input
              required
              type="text"
              id="phoneNum"
              value={phoneNum}
              onChange={(e) => setphoneNum(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="emailAddress" className="block text-xl font-bold mb-3">Email</label>
            <input
              required
              type="email"
              id="emailAddress"
              value={emailAddress}
              onChange={(e) => setemailAddress(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>
        </div>

        {/* Row: Country + City + Street (3 fields on one line) */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="country" className="block text-xl font-bold mb-3">Country</label>
            <input
              required
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="city" className="block text-xl font-bold mb-3">City</label>
            <input
              required
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="street" className="block text-xl font-bold mb-3">Street</label>
            <input
              required
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
            />
          </div>
        </div>

        {/* Row: Status + ID (read-only) */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="status" className="block text-xl font-bold mb-3">Status</label>
            <input
              required
              type="text"
              id="status"
              value={status}
              readOnly
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg cursor-not-allowed"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="id" className="block text-xl font-bold mb-3">ID Generated</label>
            <input
              required
              type="text"
              id="id"
              value={IdGenerator}
              readOnly
              className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg cursor-not-allowed"
            />
          </div>
        </div>
        <button type="submit" className="block mx-auto w-full text-lg bg-blue-500 font-medium text-white py-4 rounded-md hover:bg-blue-600 transition">Add Patient</button>
      </form>
    </div>
    </>

  );
};

export default AddPatientPage;