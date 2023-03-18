import { Layout } from "antd";

function Banner() {
  const { Header, Content } = Layout;
  return (
    <div className="xbit-banner-holder">
      <div className="xhibit-container">
        <Header className="xhibit-header-styles">
          <article className="xbit-nav-text">Rocket Xhibition</article>
        </Header>
        <Content style={{ backgroundColor: "transparent" }}>
          <div className="xhibit-banner-box">
            <h1 className="xhibit-banner-heading font-01">
              Rocket <span style={{ color: "#e51e9f" }}> Xhibition</span>
            </h1>
            <h2 className="xhibit-banner-subhead font-01">
              Rocktes Data Visualization
            </h2>
            <article className="xhibit-banner-text font-01">
              Rocket Xhibition is the place where you can explore
              <br /> all rockets data launched by spacX more precisely by Elon
              Musk.
              <br />
              You can search for any rocket by Status, Type, and Reuse Count.
            </article>
          </div>
        </Content>
      </div>
    </div>
  );
}

export default Banner;
