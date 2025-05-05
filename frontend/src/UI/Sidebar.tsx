import "../assets/css/header.css";
import "../assets/css/sidebar.css";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { SIDEBAR_MENUS } from "../core/const";

const Sidebar = () => {
  const { activeItem, setActiveItem } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle Search Input Change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Handle Click on Sidebar Items
  const handleClick = (label: string) => {
    if (label === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    setActiveItem(label);
  };

  // Filtered SIDEBAR_MENUS based on the search query
  const filteredMenus = SIDEBAR_MENUS.map((section) => ({
    ...section,
    items: section.items.filter((item: any) =>
      item.label.toLowerCase().includes(searchQuery)
    ),
  }));

  return (
    <div className="sidebar">
      <div className="logo-wrapper">
        <div className="logo-icon"></div>
        <div className="logo">Logo</div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        {/* <div className="search-add" style={{ marginBottom: "20px" }}> */}
        <input
          className="sidebar-search"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredMenus.map((section) => (
        <div className="section" key={section.title}>
          {/* Display the section title only once */}
          {section.items.length > 0 && <h3>{section.title}</h3>}

          {section.items.length > 0 ? (
            section.items.map((item: any) => (
              <div
                key={item.label}
                className={`item ${activeItem === item.label ? "active" : ""} ${item.isLogout ? "logout" : ""
                  }`}
                onClick={() => handleClick(item.label)}
              >
                <span className="icon">{<item.icon />}</span>
                <span>{item.label}</span>
              </div>
            ))
          ) : (
            <p>No matching items</p> // If no items match the search
          )}
        </div>
      ))}

    </div>
  );
};

export default Sidebar;
