import { Layout } from "antd";

import Banner from "./components/Banner";
import DataGrid from "./components/DataGrid";

import "antd/dist/reset.css";
import "./App.css";

function App() {
  const { Footer } = Layout;

  const layoutStyles = {
    backgroundColor: "#f0d9ff",
  };
  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };

  return (
    <Layout style={layoutStyles}>
      <Banner />
      <DataGrid />
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
