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
    backgroundColor: "#3f074f",
  };

  return (
    <Layout style={layoutStyles}>
      <Banner />
      <DataGrid />
      <Footer style={footerStyle}>
        Designed By Meriga Baburao @Brainstorm Force
      </Footer>
    </Layout>
  );
}

export default App;
