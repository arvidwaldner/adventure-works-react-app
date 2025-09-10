import React, { use, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { successToast, failureToast } from "../utils/toastUtils";
import LocationDetails from "./LocationDetailsComponent";
import AddLocationModal from "./AddLocationModalComponent";
import DeleteLocationModal from "./DeleteLocationModalComponent";
import EditLocationModal from "./EditLocationModalComponent";

interface Location {
    locationId: number,
    name: string,
    costRate: number,
    availability: number,
    modifiedDate: string
}

const Locations = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const locationsUrl = apiBaseUrl + 'production/locations';
    const didFetch = useRef(false);

    const [locations, setLocations] = useState<Location[]>([]);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [addLocationModalOpen, setAddLocationModalOpen] = useState(false);

    const [deleteLocationModalOpen, setDeleteLocationModalOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{ locationId: number; locationName: string } | null>(null);

    const [editLocationModalOpen, setEditLocationModalOpen] = useState(false);
    const [pendingEdit, setPendingEdit] = useState<{ locationId: number; locationName: string; costRate: number; availability: number } | null>(null);

    const fetchAllLocations = async () => {
        setShowLoadingSpinner(true);
        try {
            const response = await axios.get(locationsUrl);
            setLocations(response.data);
        } catch (e: any) {
            setError(e?.message ?? "Network error");
            failureToast(`Failed to fetch locations: ${e?.message ?? "Network error"}`);
        } finally {
            setTimeout(() => setShowLoadingSpinner(false), 500);
        }
    };

    const handleAddNewLocationClick = () => {
        setAddLocationModalOpen(true);
    }

    const handleAddNewLocationConfirm = async (form: {name: string, costRate: number, availability: number}) => {
        setSubmitting(true);
        setShowLoadingSpinner(true);

        try {
              const response = await axios.post(locationsUrl, {
                name: form.name,
                costRate: form.costRate,
                availability: form.availability
              });

              if(response.status === 201) {
                setAddLocationModalOpen(false);
                successToast(`New location ${response.data.name}, added successfully`);
                await fetchAllLocations();
              }
        } catch (e: any) {
            setError(e?.message ?? "Network error");
            failureToast(`Failed to add new location: ${e?.message ?? "Network error"}`);
        } finally {
            setSubmitting(false);
            setTimeout(() => setShowLoadingSpinner(false), 1500);
        }
    }

    const handleDeleteClick = (locationId: number, locationName: string) => {
        setDeleteLocationModalOpen(true);
        setPendingDelete({ locationId, locationName });
    }

    const handleDeleteConfirm = async () => {
      if(pendingDelete){
        await deleteLocation(pendingDelete.locationId, pendingDelete.locationName);
        setDeleteLocationModalOpen(false);
        setPendingDelete(null);
      }
    }

    const deleteLocation = async(locationId: number, locationName: string) => {
             
        setSubmitting(true);
        setShowLoadingSpinner(true);
        try{
          const response = await axios.delete(`${locationsUrl}/${locationId}`);

          if(response.status === 204) {
            successToast(`Successfully removed location: ${locationName}`);
            await fetchAllLocations();
          } else {
            failureToast("Failed to remove location: " + locationName + ". " + response.statusText);
          }
          } catch (e: any) {
          setError(e?.message ?? "Network error");
          failureToast(`Failed to remove location: ${locationName} - ${e?.message ?? "Network error"}`);
          } finally {
          setSubmitting(false);
          setTimeout(() => setShowLoadingSpinner(false), 1500);
        }
    }

    const handleEditClick = (locationId: number, locationName: string, costRate: number, availability: number) => {
        setPendingEdit({ locationId, locationName, costRate, availability });        
        setEditLocationModalOpen(true);
    }

      const handleEditCancel = () => {
        setEditLocationModalOpen(false);
        setPendingEdit(null);
    }

    const handleEditLocationConfirm = async (locationName: string, costRate: number, availability: number) => {
        if(pendingEdit) {
          await editLocation(pendingEdit.locationId, locationName, costRate, availability);
          setEditLocationModalOpen(false);
          setPendingEdit(null);
        }
    }

    const editLocation = async(locationId: number, locationName: string, costRate: number, availability: number) => {
        setSubmitting(true);
        setShowLoadingSpinner(true);

        try{
          const response = await axios.put(`${locationsUrl}/${locationId}`, {
            name: locationName,
            costRate: costRate,
            availability: availability
          });

          if(response.status === 204) {
            successToast(`Location updated successfully`);
            await fetchAllLocations();
          }
          else{
            failureToast("Failed to update location. " + response.statusText);
          }
        } catch (e: any) {
          setError(e?.message ?? "Network error");
          failureToast(`Failed to update location - ${e?.message ?? "Network error"}`);
        } finally {
            setSubmitting(false);
            setTimeout(() => setShowLoadingSpinner(false), 1500);
        }
    }

    useEffect(() => {
        if(didFetch.current) return;
        didFetch.current = true;
        fetchAllLocations();
    }, []);

    
    return(
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
              <th className="border px-4 py-2 text-left" colSpan={5}>Locations (Total: {locations.length})</th>
              <th className="border px-4 py-2 text-left" colSpan={1}>
                <button className="px-2 py-1 bg-gray-900 text-black rounded" onClick={fetchAllLocations}>
                  Refresh <FontAwesomeIcon icon={faArrowsRotate} size="lg"/>
                </button>
              </th>
              <th className="border px-4 py-2 text-left" colSpan={1}>
                <button className="px-2 py-1 bg-gray-900 text-black rounded" onClick={handleAddNewLocationClick}>
                  Add new <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                </button>
              </th>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Cost Rate</th>
              <th className="border px-4 py-2 text-left">Availability</th>
              <th className="border px-4 py-2 text-left">ModifiedDate</th>
              <th className="border px-4 py-2 text-left">Edit</th>
              <th className="border px-4 py-2 text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((l) => (
              <LocationDetails 
                key={l.locationId}
                locationId={l.locationId}
                rowNumber={locations.indexOf(l) + 1}
                name={l.name}
                costRate={l.costRate}
                availability={l.availability}
                modifiedDate={l.modifiedDate}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
              />
            ))}
          </tbody>
        </table>      
      </div>
    </div>
    <AddLocationModal
        isOpen={addLocationModalOpen}
        onClose={() => setAddLocationModalOpen(false)}
        onSubmit={async (form) => {
          await handleAddNewLocationConfirm(form);
          setAddLocationModalOpen(false);
        }}
        submitting={submitting}
      />

      <DeleteLocationModal
        isOpen={deleteLocationModalOpen}
        onCancelDelete={() => setDeleteLocationModalOpen(false)}
        onConfirmDelete={handleDeleteConfirm}
        locationName={pendingDelete?.locationName ?? ""}
      />

      <EditLocationModal
        isOpen={editLocationModalOpen}
        onClose={handleEditCancel}
        onConfirmEdit={handleEditLocationConfirm}
        submitting={submitting}
        locationName={pendingEdit ? pendingEdit.locationName : ""}
        costRate={pendingEdit ? pendingEdit.costRate : 0}
        availability={pendingEdit ? pendingEdit.availability : 0}
      />

      </>
    );
}

export default Locations;