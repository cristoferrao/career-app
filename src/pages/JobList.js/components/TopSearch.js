import React, { useEffect, useState } from 'react'
import { CloseOutlined, DownOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { joblistActions, joblistInitial } from '../store/joblist-slice'
import { getDepartment, getFunction, getLocation } from '../store/joblis-api'


const selectStyle = {
    width:"100%"
};

const TopSearch = () => {
    const dispatch = useDispatch();
   let options= joblistInitial.searchOptions;
    options = useSelector(data=>data.joblist.searchOptions);
   let optionsList= joblistInitial.optionsList;
   optionsList = useSelector(data=>data.joblist.optionsList);

   const [selectedOptions, setSelectedOptions] = useState([]);


   const setArrayObj = (arr, id, type) => {
     const val = arr.find((c) => c.id == id);
     return {
       id: id,
       type: type,
       name: val?.title,
     };
   };

useEffect(() => {
  const arrayObject = [];
  if (options.department) {
    arrayObject.push(
      setArrayObj(optionsList.department, options.department, "department")
    );
  }
  if (options.location) {
    arrayObject.push(
      setArrayObj(optionsList.location, options.location, "location")
    );
  }
  if (options.function) {
    arrayObject.push(
      setArrayObj(optionsList.function, options.function, "function")
    );
  }
  setSelectedOptions(arrayObject);

  return () => {};
}, [
  optionsList.function,
  optionsList.location,
  optionsList.department,
  options.department,
  options.function,
  options.location,
]);



    useEffect(() => {
        let isCompomentMounted = true;
        if (isCompomentMounted) {
          dispatch(getLocation());
          dispatch(getDepartment());
          dispatch(getFunction());
        }
        return () => {
          isCompomentMounted = false;
        };
    }, []);



  return (
    <div className="TopContainer">
      <Row>
        <Col md={12}>
          <Input
            className="mb-2 antInputClass"
            placeholder="Search For Job"
            value={options.jobName ? options.jobName : ""}
            onChange={(e) => {
              dispatch(joblistActions.setJobName(e.target.value));
            }}
            suffix={<SearchOutlined />}
          />
        </Col>
        <Col md={4}>
          <Select
            allowClear
            placeholder="Department"
            style={selectStyle}
            value={options.department}
            onChange={(e) => dispatch(joblistActions.setDepartmentId(e))}
            options={optionsList.department.map((elm) => {
              return {
                value: elm.id,
                label: elm.title,
              };
            })}
          />
        </Col>
        <Col md={4}>
          <Select
            allowClear
            placeholder="Location"
            style={selectStyle}
            value={options.location}
            onChange={(e) => dispatch(joblistActions.setLocation(e))}
            options={optionsList.location.map((elm) => {
              return {
                value: elm.id,
                label: elm.title,
              };
            })}
          />
        </Col>

        <Col md={4}>
          <Select
            placeholder="Function"
            allowClear
            className='mb-3'
            style={selectStyle}
            value={options.function}
            onChange={(e) => dispatch(joblistActions.setFunction(e))}
            options={optionsList.function.map((elm) => {
              return {
                value: elm.id,
                label: elm.title,
              };
            })}
          />
        </Col>
      </Row>

      <div style={{
            display: "flex",
            justifyContent: "space-between"
      }}>
      <div>
      {selectedOptions.map((data) => {
        return (
          <span 
          key={data.id} 
          className="mr-2   pl-3 pr-2 searchSelctedOptionsText">
            {data.name} &nbsp;&nbsp;
            <CloseOutlined
            
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                switch (data.type) {
                  case "department":
                    dispatch(joblistActions.setDepartmentId(null));
                    break;
                  case "location":
                    dispatch(joblistActions.setLocation(null));
                    break;
                  case "function":
                    dispatch(joblistActions.setFunction(null));
                    break;
                  default:
                    break;
                }
              }}
            />
          </span>
        );
      })}
      </div>

      <div className='d-flex justify-content-end '>
        <div className=' searchFullClear' onClick={e=>{
            dispatch(joblistActions.clearFullSearch());
        }}>
          Clear All  &nbsp;&nbsp;
            <CloseOutlined/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default TopSearch