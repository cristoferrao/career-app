import React, { useEffect } from "react";
import "./css/jobList.scss";
import { Button, Card, Empty, Input, Spin } from "antd";
import { LoadingOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TopSearch from "./components/TopSearch";
import { joblistActions, joblistInitial } from "./store/joblist-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  ApiHandler,
  ApiHandlerTeknorix,
} from "../../components/api/ApiHandler";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import { Loader } from "../../components/Antd/Loader";

const JobList = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const jobListArray = useSelector((data) => data.joblist.JobList);
  let searchOptions = joblistInitial.searchOptions;
  searchOptions = useSelector((data) => data.joblist.searchOptions);

  const [isLoading, setIsLoading] = useState(false);

  // console.log({jobListArray});
  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    let parameter = {};

    // Conditional Object if filter there then only object is added so that no null/empty data is passed
    if (searchOptions.jobName) {
      parameter = { ...parameter, q: searchOptions.jobName };
    }
    if (searchOptions.department) {
      parameter = { ...parameter, dept: searchOptions.department };
    }
    if (searchOptions.location) {
      parameter = { ...parameter, loc: searchOptions.location };
    }
    if (searchOptions.function) {
      parameter = { ...parameter, fun: searchOptions.function };
    }

    ApiHandlerTeknorix.get("api/v1/jobs", {
      params: parameter,
      cancelToken: source.token,
    })
      .then((res) => {
        const finalArr = [];
        res.data.forEach((element) => {
          if (
            !finalArr.find(
              (elm) => elm?.departmentId === element?.department?.id
            )
          ) {
            finalArr.push({
              departmentId: element?.department?.id,
              departmentName: element?.department?.title,
              jobs: res.data.filter(
                (c) => c.department.id === element?.department?.id
              ),
            });
          }
        });
        console.log("Res ", finalArr);
        dispatch(joblistActions.setJobList(finalArr));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    dispatch(joblistActions.settingToLocalStorage());
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
          {isLoading ? (
          <Loader />
          ) : Array.isArray(jobListArray) && jobListArray.length !== 0 ? (
            jobListArray.map((element, i) => {
              console.log({ element });
              return (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "white",
                    marginBottom: 5,
                  }}
                >
                  <div
                    className="   pb-2 px-2 mb-1 "
                    style={{ borderRadius: 4 }}
                  >
                    <h4 className="mb-1 mt-1 ml-1 ">
                      {element?.departmentName}
                    </h4>
                    <hr className="title-header ml-1" />
                  </div>
                  {element?.jobs.map(({ id, title, ...data }) => {
                    return (
                      <Card key={id}>
                        <Row>
                          <Col md={12} className=" mb-1 ">
                            <h5 className="mb-1">{title}</h5>
                          </Col>
                          <Col
                            md={6}
                            className=" pl-4 "
                            style={{ color: "grey" }}
                          >
                            <span className="mr-3">
                              <FontAwesomeIcon
                                icon={faBuilding}
                                className="mr-1"
                              />
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
                            <button
                              color="primary"
                              className="mr-2 btn btn-sm btn-outline-primary px-3"
                              style={{ borderRadius: 20 }}
                              onClick={() => {
                                window.open(data.applyUrl, "_blank");
                              }}
                            >
                              Apply
                            </button>
                            <Button
                              type="text"
                              onClick={(e) => {
                                history.push("/JobDetails/" + id);
                              }}
                            >
                              View
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <>
              <Empty description="No Jobs Found...!" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
