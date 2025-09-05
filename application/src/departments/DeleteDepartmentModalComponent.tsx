import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCancel, faWarning } from "@fortawesome/free-solid-svg-icons";

type DeleteDepartmentModalProps = {
  isOpen: boolean;
  onCancelDelete: () => void;           
  onConfirmDelete: () => void;
  departmentName: string;   
};

const DeleteDepartmentModal: React.FC<DeleteDepartmentModalProps> = ({isOpen, onConfirmDelete, onCancelDelete, departmentName}) => {
    
    return (
        <>
        {isOpen && (
            <Modal
                className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-auto my-20 outline-none"
                overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center" 
                isOpen={isOpen} 
                onRequestClose={onCancelDelete}
                contentLabel="Remove existing Department">            
                <h2 className="text-lg font-semibold mb-4">Remove department: {departmentName}?</h2>

                <div className="flex justify-end gap-2">
                    <div className="grid grid-cols-4 gap-4">
                        <div className='col-span-2 ...'>
                            <button type="button" title="Cancel" onClick={onCancelDelete} className="px-4 py-2 rounded-lg border">
                            Cancel <FontAwesomeIcon icon={faCancel} />
                        </button>    
                        </div>
                        <div className='col-span-2 ...'>
                            <button type="submit" title='Remove' onClick={onConfirmDelete} className="px-4 py-2 rounded-lg border">
                                 Remove <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    </div>                    
                </div>                
            </Modal>
        )}
        </>
    );    
};

export default DeleteDepartmentModal;