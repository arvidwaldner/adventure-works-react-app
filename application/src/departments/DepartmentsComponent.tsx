import React, { use, useEffect, useRef, useState } from "react";
import axios from 'axios';
import DepartmentDetails from "./DepartmentDetailsComponent";
import AddDepartmentModal from "./AddDepartmentModalComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import DeleteDepartmentModal from "./DeleteDepartmentModalComponent";
import EditDepartmentModal from "./EditDepartmentModalComponent";
import { successToast, failureToast } from "../utils/toastUtils";
import Button from "react-bootstrap/esm/Button";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ departmentId: number; departmentName: string } | null>(null);
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pendingEdit, setPendingEdit] = useState<{ departmentId: number; departmentName: string; groupName: string } | null>(null);

  const fetchDepartments = async () => {
    setShowLoadingSpinner(true);
    try{
      const response = await axios.get(departmentsUrl);
      setDepartments(response.data as Department[]);
    } catch (e: any) {
      setError(e?.message ?? "Network error");      
      failureToast("Failed to fetch departments: " + (e?.message ?? "Network error"));
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
        successToast(`Successfully added new department: ${form.departmentName}`);
        await fetchDepartments();
      } else {
        setError(`Failed to add department: '${form.departmentName}' - ${response.statusText}`);
        failureToast(`Failed to add department: '${form.departmentName}' - ${response.statusText}`);
      }      
    } catch (e: any) {
      setError(e?.message ?? "Network error");
      failureToast(`Failed to add department: '${form.departmentName}' - ${e?.message ?? "Network error"}`);
    } finally {
        setSubmitting(false);
        setTimeout(() => setShowLoadingSpinner(false), 1500);
    } 
  }

  const handleEditClick = (departmentId: number, departmentName: string, groupName: string) => {
    setPendingEdit({ departmentId, departmentName, groupName });
    setEditModalOpen(true);    
  }

  const handleConfirmEdit = async (departmentName: string, groupName: string) => {
    if(pendingEdit) {
      await handleEdit(pendingEdit.departmentId, departmentName, groupName);
      setEditModalOpen(false);
      setPendingEdit(null);
    }
  }

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setPendingEdit(null);
  }

  const handleDeleteClick = (departmentId: number, departmentName: string) => {
    setPendingDelete({ departmentId, departmentName });
    setDeleteModalOpen(true); 
  }

  const handleConfirmDelete = async () => {
    if(pendingDelete) {
      await handleDelete(pendingDelete.departmentId, pendingDelete.departmentName);
      setDeleteModalOpen(false);
      setPendingDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDelete(null);
  }
  
  const handleDelete = async (departmentId: number, departmentName: string) => {
    setSubmitting(true);
    setShowLoadingSpinner(true);
    try{
      await axios.delete(`${departmentsUrl}/${departmentId}`);
      successToast(`Successfully removed department: ${departmentName}`);
      await fetchDepartments();
    } catch (e: any) {
      setError(e?.message ?? "Network error");
      failureToast(`Failed to remove department: ${departmentName} - ${e?.message ?? "Network error"}`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setShowLoadingSpinner(false), 1500);
    }
  }
  
  const handleEdit = async (departmentId: number, departmentName: string, groupName: string) => {
    if (!pendingEdit) return;
    
    setSubmitting(true);
    setShowLoadingSpinner(true);
    try{
      await axios.put(`${departmentsUrl}/${departmentId}`, {
        name: departmentName,
        groupName: groupName
      });
      successToast(`Successfully updated existing department`);
      await fetchDepartments();
    } catch (e: any) {
      setError(e?.message ?? "Network error");
      failureToast(`Failed to update existing department - ${e?.message ?? "Network error"}`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setShowLoadingSpinner(false), 1500);
    }
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
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col" colSpan={4}>Departments (Total: {departments.length})</th>
              <th scope="col" colSpan={1}>
                <Button variant="btn btn-outline-secondary" onClick={fetchDepartments}>
                  Refresh <FontAwesomeIcon icon={faArrowsRotate} size="lg"/>
                </Button>
              </th>
              <th scope="col" colSpan={1}>
                <Button variant="btn btn-outline-secondary" onClick={() => setIsAddOpen(true)}>
                  Add new <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </Button>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Group</th>
              <th>Modified</th>
              <th>Edit</th>
              <th>Remove</th>
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
                rowNumber={departments.indexOf(d) + 1}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
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

    <EditDepartmentModal 
      isOpen={editModalOpen}
      onClose={handleEditCancel}
      onConfirmEdit={handleConfirmEdit}      
      departmentName={pendingEdit ? pendingEdit.departmentName : ""}
      groupName={pendingEdit ? pendingEdit.groupName : ""}
    />

    <DeleteDepartmentModal
      isOpen={deleteModalOpen}
      onCancelDelete={handleCancelDelete}
      onConfirmDelete={handleConfirmDelete}
      departmentName={pendingDelete ? pendingDelete.departmentName : ""}
    />
    </>
  );
};

export default Departments;