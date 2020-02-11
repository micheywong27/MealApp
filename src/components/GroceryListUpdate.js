import React from 'react';

// class GroceryListUpdate extends React.Component{
//     render(){
//         return(
//             <div className="profile">
//                 <h1>Update Grocery List</h1>
//                 {/* <h3>
//                     {
//                         this.props.existingEntries.map(item => {
//                             return  <h2>♦ {item}</h2>
//                         })

//                     }
//                     </h3> */}
//             </div>
//         )
//     }
// }

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;

// export default GroceryListUpdate;
