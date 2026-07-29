import {useState,useEffect} from "react";
import {useFetcher, useNavigate,useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function EditStudent() {
    const {id}=useParams();
    const[name,setName]=useState("");
    const[email, setEmail]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        fetchStudent();
    },[]);

    const fetchStudent=async()=>{

        const response=await
        api.get(`students/${id}/`);

        setName(response.data.name);

        setEmail(response.data.email);

    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        await api.put(`students/${id}/`,{
            name,
            email

        });
        navigate("/students");

    }

return(
    <>
    <Navbar />

<div className="p-8">

<h1 className="text-3xl font-bold mb-5">
Edit Student
</h1>

<form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Student Name"
            className="border p-3 w-full mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Student Email"
            className="border p-3 w-full mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save Student
          </button>

        </form>

</div>
</>

)

}

export default EditStudent;