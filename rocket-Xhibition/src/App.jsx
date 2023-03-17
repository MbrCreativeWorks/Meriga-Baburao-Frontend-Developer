import Banner from "./components/Banner";
import { Layout } from "antd";

import "antd/dist/reset.css";
import "./App.css";

function App() {
  const { Footer } = Layout;

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };
  return (
    <Layout>
      <Banner />
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
