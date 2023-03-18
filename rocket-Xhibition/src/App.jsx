import { Layout } from "antd";

import Banner from "./components/Banner";
import DataGrid from "./components/DataGrid";

import "antd/dist/reset.css";
import "./App.css";

function App() {
  const { Footer } = Layout;

  return (
    <Layout className="xhibit-layout-styles">
      <Banner />
      <DataGrid />
      <Footer className="xhibit-footer-styles">
        Designed By Meriga Baburao <br />
        For Brainstorm Force Task
      </Footer>
    </Layout>
  );
}

export default App;
