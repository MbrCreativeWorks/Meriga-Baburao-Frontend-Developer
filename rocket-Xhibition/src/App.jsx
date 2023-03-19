import React, { Suspense } from "react";
import { Layout } from "antd";

import { CapsuleProvider } from "./components/CapsuleContext";

import Banner from "./components/Banner";
const DataGrid = React.lazy(() => import("./components/DataGrid.jsx"));

import "antd/dist/reset.css";
import "./App.css";

function App() {
  const { Footer } = Layout;

  return (
    <CapsuleProvider>
      <Layout className="xhibit-layout-styles">
        <Banner />
        <Suspense fallback={<div>Loading</div>}>
          <DataGrid />
        </Suspense>
        <Footer className="xhibit-footer-styles">
          Designed By Meriga Baburao <br />
          For Brainstorm Force Task
        </Footer>
      </Layout>
    </CapsuleProvider>
  );
}

export default App;
