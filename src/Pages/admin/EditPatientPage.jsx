import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../../contexts/PatientContext";
import { nanoid } from 'nanoid';
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


const AddPatientPage = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {patients, updatePatient} = useContext(PatientContext);

  const currentPatient = patients?.find(p => p.id === id);

  const [wordOneName, worldTwoName] = currentPatient.name.split(" ");

  const [firstName, setFirstName] = useState(wordOneName);
  const [lastName, setLastName] = useState(worldTwoName);
  const [phoneNum, setphoneNum] = useState(currentPatient.phoneNum);
  const [emailAddress, setemailAddress] = useState(currentPatient.emailAddress);
  const [country, setCountry] = useState(currentPatient.country);
  const [city, setCity] = useState(currentPatient.city);
  const [street, setStreet] = useState(currentPatient.street);
  const [IdGenerator, _] = useState(currentPatient.id);
  const [procedure, setProcedure] = useState(currentPatient.procedure);
  const [status, setStatus] = useState(currentPatient.status)


  console.log(currentPatient);

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    updatePatient(IdGenerator, {
      id: IdGenerator,
      name: firstName + " " + lastName,
      phoneNum: phoneNum,
      emailAddress:emailAddress,
      country: country,
      city: city,
      street: street,
      currentStatus: status,
      lastUpdated: new Date().toISOString(),
      procedure: procedure
    })

    navigate('/dashboard')
  }

  if (!currentPatient) {
    return <div>Patient not found</div>;
    }


  return (
      <>
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center p-3">Update Patient</h1>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
        <form className="space-y-6" onSubmit={submitForm}>
          <div>
            <h2 className="text-3xl font-bold text-black">Personal Information</h2>
          </div>
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
        <div>
          <div>
            <h2 className="text-3xl font-bold text-black mb-2 ">Medical Information</h2>
          </div>

          <div className="flex flex-wrap gap-6">
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

            <div className="flex-1 min-w-[200px]">
              <label htmlFor="procedure" className="block text-xl font-bold mb-3">Procedure</label>
              <input
                required
                type="text"
                id="procedure"
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                className="w-full border-2 border-gray-300 px-3 py-3 rounded-lg"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="block mx-auto w-full text-lg bg-blue-500 font-medium text-white py-4 rounded-md hover:bg-blue-600 transition">Update Patient</button>
        </form>
      </div>
      </>

  );
};

export default AddPatientPage;