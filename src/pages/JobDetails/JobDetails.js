import { Button, Divider, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { ApiHandler } from "../../components/api/ApiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import "./css/jobdetails.scss";
import axios from "axios";
import {
  FacebookFilled,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import IconContainer from "./components/IconContainer";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Loader } from "../../components/Antd/Loader";

const JobDetails = (props) => {
  const history = useHistory();
  const params = useParams();

  // Details Of the Job are saved in this state
  const [detailsData, setDetailsData] = useState(null);
  
  // Others Job Opening state
  const [departmentJobList, setDepartmentJobList] = useState([]);

const [isLoading, setIsLoading] = useState(false);
const [isOtherJobLoading, setIsOtherJobLoading] = useState(true);
  useEffect(() => {
    //Getting the details Page by Parameter Passed in url which is job id
    const source = axios.CancelToken.source();
    setIsLoading(true);
    ApiHandler.get("/api/v1/jobs/" + params?.id, {
      cancelToken: source.token,
    })
      .then((res) => {
        setDetailsData(res.data);
        console.log("Details Page ", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setIsLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, [params]);

  useEffect(() => {
    //Getting the List of opening Jobs By Department
    const source = axios.CancelToken.source();
    if (detailsData?.department?.id) {
      setIsOtherJobLoading(true);
      ApiHandler.get("/api/v1/jobs/", {
        params: { dept: detailsData?.department?.id },
        cancelToken: source.token,
      })
        .then((res) => {
          console.log("Other job opening ", res.data);
          setDepartmentJobList(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          setIsOtherJobLoading(false);
        });
    }

    return () => {
      source.cancel();
    };
  }, [detailsData?.department]);

  // Function To Go Back A page using esc key
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        console.log("Escape key pressed");
        history.goBack();
      }
    };
    // event listener for key pressed
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
    // unounting of event
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  return (
    <div className="px-4 pt-2">
    {isLoading?<Skeleton   />:  <>
      <h5>{detailsData?.industry}</h5>
      <h2>{detailsData?.title}</h2>
      <span className="mr-3">
        <FontAwesomeIcon icon={faBuilding} className="mr-1" />
        {detailsData?.department?.title}
      </span>

      <span className="mr-3">
        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
        {detailsData?.location?.title}
      </span>
      <span className="mr-3 px-1 jobTypeClass">{detailsData?.type}</span>
      </>}
      <br />
      <Button 
        type="primary"
        className="px-5 mt-4"
        style={{ borderRadius: 20 }}
        onClick={() => {
          window.open(detailsData.applyUrl, "_blank");
        }}
      >
        Apply
      </Button>
      <Divider className="my-4 " />
      <Row>
        <Col md={8} lg={8} xl={9} xxl={10}>
        {isLoading? 
        <>
        <Skeleton active  />
        <Skeleton   />
        <Skeleton   />
        <Skeleton   />
        <Skeleton   /> 
        </>
        :
          <div dangerouslySetInnerHTML={{ __html: detailsData?.description }} />
       } </Col>
        <Col md={4} lg={4} xl={3} xxl={2}>
          <div className="otherJobOpeningContainer">
            <h5 style={{ fontWeight: 600 }}>OTHER JOB OPENINGS</h5>
            <hr className="title-header mb-3 " />

            {
            isOtherJobLoading?<Skeleton/>
            :departmentJobList
            .filter(c=>c.id!==detailsData.id)
            .map((elm) => {
              return (
                <div
                  className="mb-3 mx-1"
                  key={elm.id}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    history.push("/JobDetails/" + elm?.id);
                  }}
                >
                  <h6 style={{ fontWeight: 700 }} className="mb-1">
                    {elm.title}
                  </h6>
                  <div style={{ fontSize: 12, color: "#696e8a" }}>
                    <span className="mr-3">
                      <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                      {elm?.department?.title}
                    </span>

                    <span className=" ">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                      {elm?.location?.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <h5 className="mt-5" style={{ fontWeight: 600 }}>
            SHARE JOB OPENINGS
          </h5>
          <hr className="title-header mb-3 " />
          <div className="d-flex">
            <FacebookShareButton url={detailsData?.hostedUrl}>
              <IconContainer>
                <FacebookFilled />
              </IconContainer>
            </FacebookShareButton>

            <LinkedinShareButton url={detailsData?.hostedUrl}>
              <IconContainer>
                <LinkedinOutlined />
              </IconContainer>
            </LinkedinShareButton>

            <TwitterShareButton url={detailsData?.hostedUrl}>
              <IconContainer>
                <TwitterOutlined />
              </IconContainer>
            </TwitterShareButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default JobDetails;
