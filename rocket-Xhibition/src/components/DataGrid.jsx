import { Select, Input, Modal, Button, Pagination } from "antd";
import React, { useState, useEffect, Suspense } from "react";

import { useCapsule } from "./CapsuleContext";

const PopupBox = React.lazy(() => import("./PopupBox.jsx"));
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

  const { showModal, allCapsules } = useCapsule();
  const [searchVal, setSearchVal] = useState("");
  const [searchBy, setSearchBy] = useState("Serial No");
  const [currentPage, setCurrentPage] = useState(1);
  const capsulesPerPage = 6;
  let currentCapsules = [];

  const handleChange = (value) => {
    setSearchBy(value);
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
                setCurrentPage(1);
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
      <Suspense fallback={<div>Loading</div>}>
        <PopupBox />
      </Suspense>
    </div>
  );
}

export default DataGrid;
