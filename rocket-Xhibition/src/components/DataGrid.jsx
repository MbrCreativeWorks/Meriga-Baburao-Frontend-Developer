import { Select, Input, Modal, Button, Pagination } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import capsuleImg from "../assets/img/capsule.png";

function DataGrid() {
  const { Search } = Input;
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const [searchBy, setSearchBy] = useState("Serial No");
  const [searchVal, setSearchVal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCapsules, setAllCapsules] = useState([]);
  const [showCapsule, setShowCapsule] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const capsulesPerPage = 6;
  let currentCapsules = [];

  const getAllCapsules = async () => {
    await axios.get("http://localhost:5000/capsules").then((result) => {
      setAllCapsules(result.data);
    });
  };
  useEffect(() => {
    getAllCapsules();
  }, []);

  const handleChange = (value) => {
    setSearchBy(value);
  };

  const showModal = (capsule) => {
    setIsModalOpen(true);
    setShowCapsule(capsule);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchVal, searchBy]);

  let searchedCapsules = allCapsules.filter((capsule) => {
    switch (searchBy) {
      case "Type":
        return capsule.type.toLowerCase().includes(searchVal.toLowerCase());
      case "Status":
        return capsule.status.toLowerCase().includes(searchVal.toLowerCase());
      case "Reuse Count":
        if (capsule.reuse_count || capsule.reuse_count === 0) {
          console.log(
            capsule.reuse_count,
            Number(searchVal),
            capsule.reuse_count === Number(searchVal),
            "count"
          );
          return capsule.reuse_count === Number(searchVal);
        } else return false;
      default:
        return capsule.capsule_serial
          .toLowerCase()
          .includes(searchVal.toLowerCase());
    }
  });
  let indexOfLastPage = currentPage * capsulesPerPage;
  let indexOfFirstPage = indexOfLastPage - capsulesPerPage;
  currentCapsules = searchedCapsules.slice(indexOfFirstPage, indexOfLastPage);
  console.log("kk", showCapsule);
  return (
    <div className="xhibit-container">
      <div className="xbit-searchform-holder">
        <h2 className="form-section-heading">Capsules Data Grid</h2>
        <div className="form-elements-holder">
          <div>
            <article className="form-label-text">Search By</article>
            <Select
              defaultValue="Serial No"
              value={searchBy}
              className="form-select-element"
              onChange={handleChange}
              options={[
                { value: "Serial No", label: "Serial No" },
                { value: "Type", label: "Type" },
                { value: "Status", label: "Status" },
                { value: "Reuse Count", label: "Reuse Count" },
              ]}
            />
          </div>
          <div>
            <article className="form-label-text">Specify</article>
            <Search
              placeholder={`Enter ${searchBy}`}
              className="form-search-element"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              enterButton
            />
          </div>
          <div>
            <Button
              type="primary"
              className="form-reset-element"
              onClick={() => {
                setSearchBy("Serial No");
                setSearchVal("");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          justifyContent:
            currentCapsules.length <= 2 ? "flex-start" : "space-between",
        }}
        className="xbit-datagrid-holder"
      >
        {currentCapsules.length === 0 ? (
          <article
            className="grid-box-description"
            style={{ textAlign: "center" }}
          >
            -- No Data Found --
          </article>
        ) : (
          currentCapsules.map((capsule) => {
            return (
              <div
                key={capsule.capsule_serial}
                style={{
                  marginRight: currentCapsules.length <= 2 ? "2%" : "0",
                }}
                className="datagrid-box relative"
                onClick={(e) => showModal(capsule)}
              >
                <div className="datagrid-image relative">
                  <img src={capsuleImg} width="100%" alt="spacex capsule" />
                  <article className="grid-box-serial">
                    {capsule.capsule_serial}
                  </article>
                </div>
                <div className="grid-text-box ">
                  <h5 className="grid-box-heading">{capsule.type}</h5>
                  <article className="grid-box-status">
                    Reused {capsule.reuse_count} times
                    {capsule.status != "unknown" &&
                      ` and ${capsule.status} now`}
                    .
                  </article>
                  {capsule.details && (
                    <article className="grid-box-description">
                      {capsule.details}
                    </article>
                  )}
                  <Button className="grid-box-btn" type="primary">
                    More Details
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="grid-pagination-hold">
        <Pagination
          onChange={(value) => {
            setCurrentPage(value);
          }}
          pageSize={capsulesPerPage}
          total={searchedCapsules.length}
          current={currentPage}
          hideOnSinglePage={true}
          itemRender={itemRender}
        />
      </div>

      <Modal
        centered
        title={`Full Details of ${showCapsule.type}`}
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        width={640}
        footer={[
          <Button
            className="mar-t-20"
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Close
          </Button>,
        ]}
      >
        <div className="datagrid-image relative">
          <img src={capsuleImg} width="100%" alt="spacex capsule" />
          <article className="grid-box-serial">
            {showCapsule.capsule_serial}
          </article>
        </div>
        <h5 className="grid-box-heading mar-t-20">{showCapsule.type}</h5>
        <article className="grid-box-description ">
          Reused {showCapsule.reuse_count} times
          {showCapsule.status != "unknown" && ` and ${showCapsule.status} now`}.
        </article>
        <article className="grid-box-description">
          Capsule ID: {showCapsule.capsule_id}
        </article>
        {showCapsule.original_launch && (
          <article className="grid-box-description">
            Original Launch: {showCapsule.original_launch}
          </article>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {showCapsule.missions ? (
            <div>
              <article className="grid-box-description mar-t-20">
                All Missions Details:
              </article>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {showCapsule.missions.map((mission, index) => {
                  return (
                    <div key={index} className="grid-box-missions">
                      <article className="grid-box-description">
                        Name: {mission.name}
                      </article>
                      <article className="grid-box-description">
                        Flight: {mission.flight}
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        {showCapsule.details && (
          <article className="grid-box-description mar-t-20">
            Description:
            <br />
            {showCapsule.details}
          </article>
        )}
      </Modal>
    </div>
  );
}

export default DataGrid;
