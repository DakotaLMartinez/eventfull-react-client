import React from 'react'

const GroupListItem = ({ group }) => {
  return <li className="" key={group.id}>{group.name}</li>
}

export default GroupListItem