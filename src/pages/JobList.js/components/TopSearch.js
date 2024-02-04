import React, { useEffect } from 'react'
import { DownOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
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

useEffect(() => {
  console.log('====================================');
  console.log(optionsList);
  console.log('====================================');

  return () => {
    
  }
}, [optionsList])

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
    </div>
  );
}

export default TopSearch