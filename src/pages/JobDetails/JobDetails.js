import { Button } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom';

 const JobDetails = (props) => {
  const history = useHistory();
  console.log("Details Page");
     return (
    <div>
     <h5>Job Details</h5>
        <Button className='ml-2' onClick={e=>{
            history.push("/")
        }}>Go Back</Button>
    </div>
  )
}
export default JobDetails