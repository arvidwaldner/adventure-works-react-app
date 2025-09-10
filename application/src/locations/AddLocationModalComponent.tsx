import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCancel } from "@fortawesome/free-solid-svg-icons";

type FormData = {
    name: string;
    costRate: number;
    availability: number;    
};

type AddLocationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => Promise<void>;
    submitting?: boolean;    
}

const INITIAL: FormData = { name: "", costRate: 0, availability: 0 };

const AddLocationModal: React.FC<AddLocationModalProps> = ({isOpen, onClose, onSubmit, submitting}) => {
    const [formData, setFormData] = useState(INITIAL);
    const [errors, setErrors] = useState<{ name?: string; costRate?: string; availability?: string }>({});

    const resetForm = () => setFormData(INITIAL);

    const handleClose = () => { 
        resetForm(); 
        onClose(); 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value }) );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: typeof errors = {};

        if (!formData.name) {
            newErrors.name = "Location name is required.";
        }

        if (formData.costRate < 0) {
            newErrors.costRate = "Cost rate must be zero or greater.";
        }

        if (formData.availability < 0) {
            newErrors.availability = "Availability must be zero or greater.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        await onSubmit(formData);
        handleClose();
    }

    useEffect(() => {
        if(!isOpen) {
            resetForm();
            setErrors({});
        }
    }, [isOpen]);

    return(
        <>
        <Modal
            className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-auto my-20 outline-none"
            overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center" 
            isOpen={isOpen} 
            onRequestClose={onClose}
            contentLabel="Add new Location">            
            <h2 className="text-lg font-semibold mb-4">Add new Location</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm">Location Name</label>
                    <input 
                        className="w-full px-3 py-2 border rounded-lg"
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>                
                <div className="mb-4">
                    <label className="block text-sm">Cost Rate</label>
                    <input className="w-full px-3 py-2 border rounded-lg"
                        type="number"
                        name="costRate"
                        step="any"
                        value={formData.costRate}
                        onChange={handleChange} />
                    {errors.costRate && <p className="text-red-500 text-sm mt-1">{errors.costRate}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Availability</label>
                    <input className="w-full px-3 py-2 border rounded-lg"
                        type="number"
                        name="availability"
                        step="1"
                        value={formData.availability}
                        onChange={handleChange} />
                    {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                </div>
                <div className="flex justify-end gap-2">
                    <div className="grid grid-cols-4 gap-4">
                        <div className='col-span-2 ...'>
                            <button type="button" onClick={handleClose} className="px-4 py-2 rounded-lg border">
                            Cancel <FontAwesomeIcon icon={faCancel} />
                        </button>    
                        </div>
                        <div className='col-span-2 ...'>
                            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500" disabled={submitting}>
                                {submitting ? "Saving..." : "Save"} <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    </div>                    
                </div>
            </form>
        </Modal>
        </>
    );
};

export default AddLocationModal;
