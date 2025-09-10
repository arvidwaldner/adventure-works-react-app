import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

interface LocationProps {
    locationId: number,
    rowNumber: number,
    name: string,
    costRate: number,
    availability: number,
    modifiedDate: string,
    onDeleteClick: (locationId: number, locationName: string) => void;
    onEditClick: (locationId: number, locationName: string, costRate: number, availability: number) => void;
}

const LocationDetails: React.FC<LocationProps> = ({
    locationId,
    rowNumber,
    name,
    costRate,
    availability,
    modifiedDate,
    onDeleteClick,
    onEditClick
}) => {
    return (
        <tr>
            <td className="border px-4 py-2">{rowNumber}</td>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{costRate}</td>
            <td className="border px-4 py-2">{availability}</td>
            <td className="border px-4 py-2">{modifiedDate}</td>
            <td className="border px-4 py-2">
                <button onClick={() => onEditClick(locationId, name, costRate, availability)}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </td>
            <td className="border px-4 py-2">
                <button onClick={() => onDeleteClick(locationId, name)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </td>
        </tr>
    );
};

export default LocationDetails;