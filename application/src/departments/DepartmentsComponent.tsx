import React, { Component, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import DepartmentDetails from "./DepartmentDetailsComponent";

interface Department {
    departmentId: number,
    name: string,
    groupName: string,
    modifiedDate: string
}


const Departments = () => {

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const departmentsUrl = apiBaseUrl + 'human-resources/departments';
  
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const didFetch = useRef(false);

  const fetchDepartments = async () => {
    try{
      setLoading(true);
      const response = await axios.get(departmentsUrl);      
      setDepartments(response.data as Department[]);
    } catch (e: any) {
      setError(e?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(didFetch.current) return;
    didFetch.current = true;
    fetchDepartments();
  }, []);  

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }


  return (
    <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left" colSpan={2}>Departments (Total: {departments.length})</th>
          <th className="border px-4 py-2 text-left" colSpan={1}>Departments (Total: {departments.length})</th>
          <th className="border px-4 py-2 text-left" colSpan={1}>Departments (Total: {departments.length})</th>
          <th className="border px-4 py-2 text-left" colSpan={1}>
            <button className="px-2 py-1 bg-gray-900 text-black rounded" onClick={fetchDepartments}>
              Refresh
            </button>
          </th>
        </tr>
        <tr>
          <th className="border px-4 py-2 text-left">ID</th>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Group</th>
          <th className="border px-4 py-2 text-left">Modified</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((d) => (
          <DepartmentDetails
            key={d.departmentId}
            departmentId={d.departmentId}
            name={d.name}
            groupName={d.groupName}
            modifiedDate={d.modifiedDate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Departments;