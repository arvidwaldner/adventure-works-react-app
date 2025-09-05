import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

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
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">{rowNumber}</td>
      <td className="border border-gray-300 px-4 py-2">{name}</td>
      <td className="border border-gray-300 px-4 py-2">{groupName}</td>
      <td className="border border-gray-300 px-4 py-2">{modifiedDate}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button className="border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-yellow focus:border-blue-500 focus:outline-none transition-colors duration-200"
          title={`Edit department: ${name}`}
          onClick={() => onEditClick(departmentId, name, groupName)}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <button className="border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-red focus:border-red-500 focus:outline-none transition-colors duration-200"
          title={`Remove department: ${name}`}
          onClick={() => onDeleteClick(departmentId, name)}>
          <FontAwesomeIcon icon={faTrashCan} />        
        </button>         
      </td>
    </tr>
  );
};

export default DepartmentDetails;