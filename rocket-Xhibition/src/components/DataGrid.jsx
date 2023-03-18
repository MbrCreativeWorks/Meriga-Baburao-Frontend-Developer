import { Select, Input, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import capsuleImg from "../assets/img/capsule.png";

function DataGrid() {
  const { Search } = Input;

  const [searchBy, setSearchBy] = useState("Type");
  const [searchVal, setSearchVal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCapsules, setAllCapsules] = useState([]);
  const [showCapsule, setShowCapsule] = useState({});
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
  const onSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const showModal = (capsule) => {
    setIsModalOpen(true);
    setShowCapsule(capsule);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="xhibit-container">
      <div className="xbit-searchform-holder">
        <div className="form-elements-holder">
          <div>
            <article className="form-label-text">Search By</article>
            <Select
              defaultValue="Status"
              style={{ width: 200, marginRight: "10px" }}
              onChange={handleChange}
              options={[
                { value: "Type", label: "Type" },
                { value: "Status", label: "Status" },
                { value: "Reuse Count", label: "Reuse Count" },
              ]}
            />
          </div>
          <div>
            <article className="form-label-text">Specify</article>
            <Search
              style={{ width: 280, marginRight: "10px" }}
              placeholder={`Enter ${searchBy}`}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onPressEnter={(e) => onSearch(e)}
              enterButton
            />
          </div>
          <div>
            <Button type="primary" onClick={() => setSearchVal("")}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="xbit-datagrid-holder">
        {allCapsules.filter((capsule) => {
          switch (searchBy) {
            case "Status":
              return capsule.status
                .toLowerCase()
                .includes(searchVal.toLowerCase());
            case "Reuse Count":
              if (capsule.reuse_count) {
                return capsule.reuse_count === Number(searchVal);
              } else return false;
            default:
              return capsule.type
                .toLowerCase()
                .includes(searchVal.toLowerCase());
          }
        }).length === 0 ? (
          <article
            className="grid-box-description"
            style={{ textAlign: "center" }}
          >
            -- No Matching Data --
          </article>
        ) : (
          allCapsules
            .filter((capsule) => {
              switch (searchBy) {
                case "Status":
                  return capsule.status
                    .toLowerCase()
                    .includes(searchVal.toLowerCase());
                case "Reuse Count":
                  if (capsule.reuse_count) {
                    return capsule.reuse_count === Number(searchVal);
                  } else return false;
                default:
                  return capsule.type
                    .toLowerCase()
                    .includes(searchVal.toLowerCase());
              }
            })
            .map((capsule) => {
              return (
                <div
                  key={capsule.capsule_serial}
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
                    <article className="grid-box-description">
                      {capsule.details}
                    </article>
                    <Button className="grid-box-btn" type="primary">
                      More Details
                    </Button>
                  </div>
                </div>
              );
            })
        )}
      </div>
      <Modal
        centered
        title={`Full Details of ${showCapsule.type}`}
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        width={640}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
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
        <article className="grid-box-description">
          Original Launch: {showCapsule.original_launch}
        </article>
        <article className="grid-box-description mar-t-20">
          All Missions Details:
        </article>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {showCapsule.missions &&
            showCapsule.missions.map((mission, index) => {
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
        <article className="grid-box-description mar-t-20">
          {showCapsule.details}
        </article>
      </Modal>
    </div>
  );
}

export default DataGrid;
