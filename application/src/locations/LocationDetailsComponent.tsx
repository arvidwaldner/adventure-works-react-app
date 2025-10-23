import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";

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
            <td>{rowNumber}</td>
            <td>{name}</td>
            <td>{costRate}</td>
            <td>{availability}</td>
            <td>{modifiedDate}</td>
            <td>
                <Button variant="btn btn-outline-secondary" onClick={() => onEditClick(locationId, name, costRate, availability)}>
                    <FontAwesomeIcon icon={faPen} />
                </Button>
            </td>
            <td>
                <Button variant="btn btn-outline-danger" onClick={() => onDeleteClick(locationId, name)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>   
            </td>
        </tr>
    );
};

export default LocationDetails;