import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <h1 style={{ padding: "20px" }}>This is the Home Page Content</h1>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
