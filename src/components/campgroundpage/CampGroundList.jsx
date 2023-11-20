import React from 'react'

export default function CampGroundList(props) {
    const {id,handleItemInfo} = props; 
  return (
    <li className={"list-group-item text-center"} id={id}  onClick={handleItemInfo}>
    Info {id}
  </li>
  )
}
