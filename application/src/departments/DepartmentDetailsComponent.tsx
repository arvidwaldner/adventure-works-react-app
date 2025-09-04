import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

interface DepartmentProps {
  departmentId: number;
  name: string;
  groupName: string;
  modifiedDate: string;
}

const DepartmentDetails: React.FC<DepartmentProps> = ({  
  departmentId,
  name,
  groupName,
  modifiedDate,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">{departmentId}</td>
      <td className="border border-gray-300 px-4 py-2">{name}</td>
      <td className="border border-gray-300 px-4 py-2">{groupName}</td>
      <td className="border border-gray-300 px-4 py-2">{modifiedDate}</td>
      <td className="border border-gray-300 px-4 py-2"><FontAwesomeIcon icon={faPen} /></td>
      <td className="border border-gray-300 px-4 py-2"><FontAwesomeIcon icon={faTrashCan} /></td>
    </tr>
  );
};

export default DepartmentDetails;