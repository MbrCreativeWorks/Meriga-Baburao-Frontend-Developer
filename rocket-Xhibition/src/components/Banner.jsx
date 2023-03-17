import { Layout } from "antd";
function Banner() {
  const { Header, Content } = Layout;
  const headerStyle = {
    height: "auto",
    backgroundColor: "transparent",
    // backgroundColor: "#f0d9ff",
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
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
        <div className="xhibit-container"></div>
      </Content>
    </div>
  );
}

export default Banner;
