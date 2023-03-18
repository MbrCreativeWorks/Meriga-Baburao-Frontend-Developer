import { Select, Input, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import capsuleImg from "../assets/img/capsule.png";

function DataGrid() {
  const { Search } = Input;

  const [searchBy, setSearchBy] = useState("Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCapsules, setAllCapsules] = useState([]);
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
  const onSearch = (value) => console.log(value);

  const showModal = () => {
    setIsModalOpen(true);
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
                { value: "Status", label: "Status" },
                { value: "Type", label: "Type" },
                { value: "Reuse Count", label: "Reuse Count" },
              ]}
            />
          </div>
          <div>
            <article className="form-label-text">Specify</article>
            <Search
              style={{ width: 280 }}
              placeholder={`Enter ${searchBy}`}
              onSearch={onSearch}
              enterButton
            />
          </div>
        </div>
      </div>

      <div className="xbit-datagrid-holder">
        {allCapsules.map((capsule) => {
          return (
            <div className="datagrid-box" onClick={showModal}>
              <div className="datagrid-image">
                <img src={capsuleImg} width="100%" alt="spacex capsule" />
              </div>

              <div className="grid-text-box">
                <h5 className="grid-box-heading">{capsule.type}</h5>
                <article className="grid-box-status">
                  Capsule is {capsule.status}
                </article>
                <article className="grid-box-status">
                  Reused {capsule.reuse_count} times
                </article>
                <article className="grid-box-status">
                  Original Launch is {capsule.original_launch}
                </article>
                <article className="grid-box-description">
                  {capsule.details}
                </article>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        centered
        title={`Name Full Details`}
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Okay
          </Button>,
        ]}
      >
        <h5 className="grid-box-heading">Name</h5>
        <article className="grid-box-status">Capsule is Active</article>
        <article className="grid-box-status">Reused 0 times</article>
        <article className="grid-box-status">Launched on Date</article>
        <article className="grid-box-description">Some Text</article>
      </Modal>
    </div>
  );
}

export default DataGrid;
