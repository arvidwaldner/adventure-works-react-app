import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";

interface DepartmentProps {
  departmentId: number;
  rowNumber: number;
  name: string;
  groupName: string;
  modifiedDate: string;
  onDeleteClick: (departmentId: number, departmentName: string) => void;
  onEditClick: (departmentId: number, departmentName: string, groupName: string) => void;
}

const DepartmentDetails: React.FC<DepartmentProps> = ({  
  departmentId,
  rowNumber,
  name,
  groupName,
  modifiedDate,
  onDeleteClick,
  onEditClick  
}) => {

  return (
    <tr>
      <td>{rowNumber}</td>
      <td className="border border-gray-300 px-4 py-2">{name}</td>
      <td>{groupName}</td>
      <td>{modifiedDate}</td>
      <td>
        <Button variant="btn btn-outline-secondary" 
          title={`Edit department: ${name}`}
          onClick={() => onEditClick(departmentId, name, groupName)}>
          <FontAwesomeIcon icon={faPen} />
        </Button>
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <Button variant="btn btn-outline-danger"
          title={`Remove department: ${name}`}
          onClick={() => onDeleteClick(departmentId, name)}>
          <FontAwesomeIcon icon={faTrashCan} />        
        </Button>         
      </td>
    </tr>
  );
};

export default DepartmentDetails;