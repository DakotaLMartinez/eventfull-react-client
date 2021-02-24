import React from "react";
import GroupListItem from './GroupListItem';

const GroupsList = ({groups}) => {
  return (
    <>
      <h1>GroupsList</h1>
      <ul>
        {groups.map(group => <GroupListItem key={group.id} group={group}/>)}
      </ul>
    </>
  );
};

export default GroupsList;
