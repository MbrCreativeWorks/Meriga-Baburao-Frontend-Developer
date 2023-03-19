import { Modal, Button } from "antd";
import { useCapsule } from "./CapsuleContext";
import capsuleImg from "../assets/img/capsule.png";

function PopupBox() {
  const { isModalOpen, handleOk, showCapsule } = useCapsule();

  return (
    <Modal
      centered
      title={`Full Details of ${showCapsule.type}`}
      open={isModalOpen}
      onOk={() => handleOk(false)}
      closable={false}
      width={640}
      footer={[
        <Button
          className="mar-t-20"
          key="submit"
          type="primary"
          onClick={() => handleOk(false)}
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
  );
}

export default PopupBox;
