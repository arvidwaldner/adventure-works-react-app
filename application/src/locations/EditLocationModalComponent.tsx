import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCancel } from "@fortawesome/free-solid-svg-icons";

type FormData = {
    locationName: string;
    costRate: number;
    availability: number;    
};

type EditLocationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirmEdit: (locationName: string, costRate: number, availability: number) => Promise<void>;
    submitting?: boolean;
    locationName?: string;
    costRate?: number;
    availability?: number;     
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({isOpen, onClose, onConfirmEdit, submitting, locationName, costRate, availability}) => {
    const [formData, setFormData] = useState({locationName: locationName || "", costRate: costRate || 0, availability: availability || 0});
    const [errors, setErrors] = useState<{ locationName?: string; costRate?: string; availability?: string }>({});

    const resetForm = () => setFormData({locationName: "", costRate: 0, availability: 0});

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

        if (!formData.locationName) {
            newErrors.locationName = "Location name is required.";
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

        await onConfirmEdit(formData.locationName, formData.costRate, formData.availability);
        handleClose();
    }

    useEffect(() => {
        if (isOpen) {
            setFormData({ locationName: locationName || "", costRate: costRate || 0, availability: availability || 0 });
        }
        else{
            resetForm();
        }
    }, [isOpen, locationName, costRate, availability]);    

    return(
        <>
        <Modal
            className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-auto my-20 outline-none"
            overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center" 
            isOpen={isOpen} 
            onRequestClose={onClose}
            contentLabel="Edit existing Location">            
            <h2 className="text-lg font-semibold mb-4">Edit existing Location</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm">Location Name</label>
                    <input 
                        className="w-full px-3 py-2 border rounded-lg"
                        type="text" 
                        name="locationName" 
                        value={formData.locationName}
                        onChange={handleChange} />
                    {errors.locationName && <p className="text-red-500 text-sm mt-1">{errors.locationName}</p>}
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

export default EditLocationModal;
