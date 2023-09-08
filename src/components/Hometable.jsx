import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/baseUrl';

function Hometable({displayData,removeUser}) {
  console.log(displayData);
  return (
    <>
    <Table  hover className='mt-3 shadow rounded'>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Profile</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {
          displayData.length>0?displayData.map((item,index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{item.fname} {item.lname}</td>
            <td>{item.email}</td>
            <td>{item.mobile}</td>
            <td><button className={item.status==="Active"?"btn btn-success":"btn btn-danger"}>{item.status}</button></td>
            <td> <img style={{width:'80px',height:'80px',borderRadius:'50%'}} src={`${BASE_URL}/uploads/${item.profile}`} alt="profile" /> </td>
            <td >
              {/* view */}
             <Link to={`/view/${item._id}`} > <i className="fa-solid fa-eye text-light fs-4 me-2"></i></Link>
              {/* edit */}
              <Link to={`/edit/${item._id}`} ><i className="fa-solid fa-pen text-info fs-4"></i></Link>
              {/* delete */}
             <span > <i onClick={()=>removeUser(item._id)} className="fa-solid fa-trash fs-4 text-danger ms-2"></i></span>
            </td>
          </tr>
          )):
          <tr className='mt-5 w-100 text-light ps-5 fs-3'>
            Nothing to display!!!!
          </tr>
        }
       
        
      </tbody>
    </Table>

    </>
  )
}

export default Hometable