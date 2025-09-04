import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import DepartmentDetails from "./DepartmentDetailsComponent";
import AddDepartmentModal from "./AddDepartmentModalComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

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
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const didFetch = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const successToast = () => toast.success("Succesfully added new department.");
  const failureToast = () => toast.error("Failed to add new department.");

  const fetchDepartments = async () => {
    setShowLoadingSpinner(true);
    try{
      const response = await axios.get(departmentsUrl);
      setDepartments(response.data as Department[]);
    } catch (e: any) {
      setError(e?.message ?? "Network error");      
      failureToast();
    } finally {
      setTimeout(() => setShowLoadingSpinner(false), 500);
    }
  }

  useEffect(() => {
    if(didFetch.current) return;
    didFetch.current = true;
    fetchDepartments();
  }, []);  

  const handleAddSubmit = async (form: { departmentName: string; groupName: string }) => {
    setSubmitting(true);
    setShowLoadingSpinner(true);
    try{
      const response = await axios.post(departmentsUrl, {
        name: form.departmentName,
        groupName: form.groupName
      });
      
      if(response.status === 201) {
        setIsAddOpen(false);
        successToast();
        await fetchDepartments();
      } else {
        setError(`Failed to add department: ${response.statusText}`);
        failureToast();
      }      
    } catch (e: any) {
      setError(e?.message ?? "Network error");
      failureToast();
    } finally {
        setSubmitting(false);
        setTimeout(() => setShowLoadingSpinner(false), 500);
    } 
  }  

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className="relative">
      {showLoadingSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <ClipLoader color="#0a0a0aff" loading={showLoadingSpinner} size={60} />
        </div>
      )}
      <div className={showLoadingSpinner ? "blur-sm pointer-events-none select-none" : ""}>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left" colSpan={4}>Departments (Total: {departments.length})</th>
              <th className="border px-4 py-2 text-left" colSpan={1}>
                <button className="px-2 py-1 bg-gray-900 text-black rounded" onClick={fetchDepartments}>
                  Refresh <FontAwesomeIcon icon={faArrowsRotate} size="lg"/>
                </button>
              </th>
              <th className="border px-4 py-2 text-left" colSpan={1}>
                <button className="px-2 py-1 bg-gray-900 text-black rounded" onClick={() => setIsAddOpen(true)}>
                  Add new <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </button>
              </th>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Group</th>
              <th className="border px-4 py-2 text-left">Modified</th>
              <th className="border px-4 py-2 text-left">Edit</th>
              <th className="border px-4 py-2 text-left">Remove</th>
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
      </div>
    </div>    
    <AddDepartmentModal
      isOpen={isAddOpen}
      onClose={() => setIsAddOpen(false)}
      onSubmit={async (form) => {
        await handleAddSubmit(form);
        setIsAddOpen(false);
      }}
      submitting={submitting}
    />
    </>
  );
};

export default Departments;