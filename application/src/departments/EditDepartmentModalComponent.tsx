import React, { useState, useEffect, use } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCancel } from "@fortawesome/free-solid-svg-icons";

type FormData = {
  departmentName: string;
  groupName: string;
};

type EditDepartmentModalProps = {
    isOpen: boolean;
    onClose: () => void;               
    onConfirmEdit: (departmentName: string, groupName: string) => Promise<void>;
    error?: string | null;
    departmentName?: string;
    groupName?: string; 
}


const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({isOpen, onClose, onConfirmEdit, departmentName, groupName}) => {
    const [formData, setFormData] = useState({ departmentName: departmentName || "", groupName: groupName || "" });
    const [errors, setErrors] = useState<{ groupName?: string; departmentName?: string }>({});
          
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!formData.groupName || formData.groupName === "Select group") {
            newErrors.groupName = "Please select a valid group name.";
        }

        if (!formData.departmentName) {
            newErrors.departmentName = "Department name is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        await onConfirmEdit(formData.departmentName, formData.groupName);
        onClose();
    }

    useEffect(() => {
        if(isOpen){
            // When modal opens, set form data from props
            setFormData({ departmentName: departmentName || "", groupName: groupName || "" });
        } else {
            // When modal closes, reset form data
            setFormData({ departmentName: "", groupName: "" });
        }        
    }, [isOpen, departmentName, groupName]);    

    return(
        <>
        <Modal
            className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-auto my-20 outline-none"
            overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center" 
            isOpen={isOpen} 
            onRequestClose={onClose}
            contentLabel="Edit existing Department">            
            <h2 className="text-lg font-semibold mb-4">Edit existing Department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm">Department Name</label>
                    <input 
                        className="w-full px-3 py-2 border rounded-lg"
                        type="text" 
                        name="departmentName" 
                        value={formData.departmentName}
                        onChange={handleChange} />
                    {errors.departmentName && <p className="text-red-500 text-sm mt-1">{errors.departmentName}</p>}
                </div>                
                <div className="mb-4">
                    <label className="block text-sm">Group Name</label>
                    <select
                        className="w-full px-3 py-2 border rounded-lg"
                        name="groupName"
                        value={formData.groupName}
                        onChange={handleChange}>
                        
                        <option value="">Select group</option>
                        <option value="Research and Development">Research and Development</option>
                        <option value="Sales and Marketing">Sales and Marketing</option>
                        <option value="Inventory Management">Inventory Management</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Executive General and Administration">Executive General and Administration</option>
                        <option value="Quality Assurance">Quality Assurance</option>                        
                        <option value="Other">Other</option>
                    </select>
                    {errors.groupName && <p className="text-red-500 text-sm mt-1">{errors.groupName}</p>}
                </div>
                <div className="flex justify-end gap-2">
                    <div className="grid grid-cols-4 gap-4">
                        <div className='col-span-2 ...'>
                            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">
                            Cancel <FontAwesomeIcon icon={faCancel} />
                        </button>    
                        </div>
                        <div className='col-span-2 ...'>
                            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500">
                                Save <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    </div>                    
                </div>
            </form>
        </Modal>
        </>
    );
};

export default EditDepartmentModal;