import { Layout } from "antd";

function Banner() {
  const { Header, Content } = Layout;
  const headerStyle = {
    height: "auto",
    backgroundColor: "transparent",
    padding: "30px 135px",
  };
  const contentStyle = {
    backgroundColor: "transparent",
  };
  return (
    <div className="xbit-banner-holder">
      <Header style={headerStyle}>
        <article className="xbit-nav-text">Rocket Xhibition</article>
      </Header>
      <Content style={contentStyle}>
        <div className="xhibit-container">
          <div className="xhibit-banner-box">
            <h1 className="xhibit-banner-heading font-01">
              Rocket <span style={{ color: "#e51e9f" }}> Xhibition</span>
            </h1>
            <h3 className="xhibit-banner-subhead font-01">
              Rocktes Data Visualization
            </h3>
            <article className="xhibit-banner-text font-01">
              Rocket Xhibition is the place where you can explore
              <br /> all rockets data launched by spacX more precisely by Elon
              Musk.
              <br />
              You can search for any rocket by Status, Type, and Reuse Count.
            </article>
          </div>
        </div>
      </Content>
    </div>
  );
}

export default Banner;
