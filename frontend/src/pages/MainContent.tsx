import Header from "./components/Header";
import Table from "./components/Table";

const MainContent = () => {
  return (
    <div style={{ flex: 1 }}>
      {/* HEADER */}
      <Header />
      {/* TABLE */}
      <Table />
    </div>
  );
};

export default MainContent;
