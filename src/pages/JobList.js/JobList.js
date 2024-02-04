import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './css/jobList.scss';
import { Button, Card, Input } from 'antd';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TopSearch from './components/TopSearch';
import { joblistActions, joblistInitial } from './store/joblist-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ApiHandler, ApiHandlerTeknorix } from '../../components/api/ApiHandler';



const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  const JobList = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const jobListArray = useSelector(data => data.joblist.JobList);
  let searchOptions= joblistInitial.searchOptions;
  searchOptions = useSelector(data=>data.joblist.searchOptions);

// console.log({jobListArray});
  useEffect(() => {
    const source = axios.CancelToken.source();
    let parameter ={};
    if (searchOptions.jobName) {
      parameter={...parameter,
        q:searchOptions.jobName
      }
    }
    if (searchOptions.department) {
      parameter={...parameter,
        dept:searchOptions.department
      }
    }
    if (searchOptions.location) {
      parameter={...parameter,
        loc:searchOptions.location
      }
    }
    if (searchOptions.function) {
      parameter={...parameter,
        fun:searchOptions.function
      }
    }
    ApiHandlerTeknorix.get("api/v1/jobs",
 {params:parameter,
cancelToken:source.token 
}
    )
    .then(res=>{
      console.log("Res ",res.data);
      dispatch(joblistActions.setJobList(res.data))
    })
    .catch(err=>{
      console.log(err);
    })
    return () => {
      dispatch(joblistActions.setJobList([]));
      source.cancel();
    };
  }, [searchOptions]);


  
  return (
    <div>
     

      <TopSearch />
      <div className="ListContainer">
        <div style={{ height: window.innerHeight / 1.4, overflow: "auto" }}>
          {Array.isArray(jobListArray) &&
            jobListArray.map(({ title, id, ...data }) => {
              return (
                <React.Fragment key={id}>
                  <Card>
                    <Row>
                      <Col md={12} className=" mb-3 ">
                        <h4 className="">{title}</h4>
                        <hr className="title-header" />
                      </Col>
                      <Col md={6} className="  ">
                        <span className="mr-3">
                          <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                          {data.department.title}
                        </span>

                        <span className="mr-3">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="mr-1"
                          />
                          {data.location.title}
                        </span>
                        <span className="mr-3 px-1 jobTypeClass">
                          {data.type}
                        </span>
                      </Col>
                      <Col
                        md={3}
                        className="offset-md-3  d-flex justify-content-end"
                      >
                        <button  color='primary' className="mr-2 btn btn-sm btn-outline-primary px-3" style={{borderRadius:20}}>
                          Apply
                        </button>
                        <Button type='text'>View</Button>
                      </Col>
                    </Row>
                  </Card>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default JobList;