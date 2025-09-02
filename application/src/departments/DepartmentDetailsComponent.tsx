import React from "react";

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
    </tr>
  );
};

export default DepartmentDetails;