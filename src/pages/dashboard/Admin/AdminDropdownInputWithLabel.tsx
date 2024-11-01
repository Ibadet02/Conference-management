import React from 'react';
import useGetUsers from '../../../hooks/useGetUsers';
import { AdminDropdownInputWithLabelProps } from '../../../types/dashboard/Admin/props';

const AdminDropdownInputWithLabel: React.FC<AdminDropdownInputWithLabelProps> = ({handleSlectedReviewerChange, selectedReviewerId}) => {
  const collectionName = 'reviewerUsers';
  const { users, loading } = useGetUsers(collectionName);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <label>Select Reviewer:</label>
      <select
        name="assignedReviewers"
        value={selectedReviewerId}
        onChange={(e) => handleSlectedReviewerChange(e)}
      >
        <option value="">Select...</option>
        {users.map((user: any) => (
          <option key={user.id} value={user.id}>
            {`${user.firstName} ${user.lastName}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdminDropdownInputWithLabel;
