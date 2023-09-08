import React, { useState, useEffect,useContext} from 'react'
import { Card, Form, Row, FloatingLabel, Button } from "react-bootstrap";
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allUsers, editUser } from "../services/allApis";
import { updateContext } from "../components/ContextShare";
import { useNavigate,useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


function Edit() {
  const {updateData,setUpdateData}= useContext(updateContext)
  const navigate=useNavigate()

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ]
  const [showSpin, setShowSpin] = useState(true);

  const [normalUserInputs,setNormalUserInputs] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })
  const [status,setStatus] = useState("")
  const [profile,setProfile] =useState("")
  const [preview,setPreview] = useState("")

  const getandsetUserNormalInputs = (e)=>{
    const {name,value} = e.target
    setNormalUserInputs({...normalUserInputs,[name]:value})
  }
  console.log(normalUserInputs);
  console.log(status);
  console.log(profile);

  const {id} = useParams()
  const [existingImg,setExistingImg] = useState("")

  const getuser = async ()=>{
    const {data} = await allUsers("")
    let existingUser = data.find(item=>item._id===id)
    console.log(existingUser);
    setNormalUserInputs(existingUser)
    setStatus(existingUser.status)
    setExistingImg(existingUser.profile)
  }

  useEffect(()=>{
    getuser()
  },[id])

  useEffect(() => {
    if(profile){
      setExistingImg("")
      setPreview(URL.createObjectURL(profile))
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 2000);
  },[profile]);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const {fname,lname,email,mobile,gender,location} = normalUserInputs
    if(!fname || !lname || !email || !mobile || !gender || !location || !status ){
      toast.warning("Please fill the form completely!!!")
    }else{
      // toast.success("form completed")
      const data = new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      profile?data.append("profile",profile):data.append("profile",existingImg)
      data.append("location",location)

      if(profile){
        var headers = {
          "Content-Type":"multipart/form-data"
        }
      }else{
        var headers = ""
      }
      
      //make api call
      const result  = await editUser(id,data,headers)
      console.log(result);
      if(result.status===200){
        setUpdateData(result.data)
        navigate('/')
      }else{
        toast.error("Request Failed")
      }
    }
  }

  return (
    <>
    {
      showSpin?<LoadingSpinner/>:
      <div className="container mb-5">
        <h1 className="text-center ">Update Employee Details</h1>
        <Card className="shodow border rounded p-2 mt-3">
          <div className="image w-100 text-center mb-3">
            <img
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              src={preview?preview:`${BASE_URL}/uploads/${existingImg}`}
              alt=""
            />
          </div>
          <Form>
            <Row>
              <FloatingLabel
                controlId="floatingInputfname"
                label="First Name"
                className="mb-3 col-lg-6"
              >
                <Form.Control type="text" placeholder="First Name" name="fname" value={normalUserInputs.fname}
                onChange={e=>getandsetUserNormalInputs(e)} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInputlname"
                label="Last Name"
                className="mb-3 col-lg-6"
              >
                <Form.Control type="text" placeholder="Last Name" name="lname" value={normalUserInputs.lname} 
                onChange={e=>getandsetUserNormalInputs(e)}/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInputmail"
                label="Email"
                className="mb-3 col-lg-6"
              >
                <Form.Control type="email" placeholder="Email" name="email" value={normalUserInputs.email}
                onChange={e=>getandsetUserNormalInputs(e)}/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInputmobile"
                label="Mobile"
                className="mb-3 col-lg-6"
              >
                <Form.Control type="text" placeholder="Mobile" name="mobile" value={normalUserInputs.mobile}
                onChange={e=>getandsetUserNormalInputs(e)}/>
              </FloatingLabel>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Select Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  name="gender"
                  value={"Male"}
                  label={"Male"}
                  onChange={e=>getandsetUserNormalInputs(e)}
                  checked={normalUserInputs.gender==="Male"?true:false}
                />
                <Form.Check
                  type={"radio"}
                  name="gender"
                  value={"Female"}
                  label={"Female"}
                  onChange={e=>getandsetUserNormalInputs(e)}
                  checked={normalUserInputs.gender==="Female"?true:false}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Select Employee Status</Form.Label>
                <Select  placeholder={status} options={options} onChange={e=>setStatus(e.value)}>
                </Select>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Choose profile picture</Form.Label>
                <Form.Control type="file" name="user_profile" onChange={e=>setProfile(e.target.files[0])}>

                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                 <Form.Label>Employee Location</Form.Label>
                <Form.Control type="text" placeholder="Location" name="location" value={normalUserInputs.location} onChange={e=>getandsetUserNormalInputs(e)} />
              </Form.Group>
              <Button type="submit" variant="primary" onClick={e=>handleSubmit(e)} >Submit</Button>
            </Row>
          </Form>
        </Card>
      </div>
}
<ToastContainer position="top-center" theme="colored" />
    </>
  );
}

export default Edit