import React, { useState } from "react";
import "./UniversityGraduateList.css";
import "./UniversityGraduateList.module.css";

const UniversityGraduateList = () => {
  const universities = ["CIT-U", "USC-SC", "USJR-Main"];
  const collegeDepartments = ["BSCpE", "BSCS", "BSIT"];

  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const handleMouseEnter = () => {
    setExpanded(true);
    setTimeout(() => {
      setShowText(true);
    }, 150);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
    setShowText(false);
  };

  return (
    <div className="university-graduate-list">
      <div className="list">
        <div className="list-child" />
        <div className="list-item" />
        <div className="list-inner" />
        <div className="line-div" />
        <div className="list-child1" />
        <div className="list-child2" />
        <div className="list-child3" />
        <div className="list-child4" />
        <div className="list-child5" />
        <div className="list-child6" />
        <div className="list-child7" />
        <div className="list-child8" />
        <div className="list-child9" />
        <div className="frame">
          <div className="frame1">
            <div className="list-text">Adrian Andaya</div>
            <div className="list-text">July 23, 2023</div>
          </div>
          <div className="frame2">
            <div className="list-text">CIT-U</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame3">
          <div className="frame4">
            <div className="list-text">Kyla Galang</div>
            <div className="list-text">June 27, 2023</div>
          </div>
          <div className="frame5">
            <div className="list-text">USC-SC</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame6">
          <div className="frame7">
            <div className="list-text">Althea Cabrera</div>
            <div className="list-text">June 27, 2023</div>
          </div>
          <div className="frame2">
            <div className="list-text">CIT-U</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame9">
          <div className="frame10">
            <div className="list-text">Shawn Estrella</div>
            <div className="list-text">June 20, 2023</div>
          </div>
          <div className="frame11">
            <div className="list-text">CIT-U</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame12">
          <div className="frame13">
            <div className="list-text">Sasha Ventura</div>
            <div className="list-text">June 11, 2023</div>
          </div>
          <div className="frame14">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame15">
          <div className="frame16">
            <div className="list-text">Alonso Herrera</div>
            <div className="list-text">June 4, 2023</div>
          </div>
          <div className="frame14">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame18">
          <div className="frame19">
            <div className="list-text">Lucas Santiago</div>
            <div className="list-text">May 21, 2023</div>
          </div>
          <div className="frame14">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame21">
          <div className="frame22">
            <div className="list-text">Princess Lucero</div>
            <div className="list-text">May 16, 2023</div>
          </div>
          <div className="frame14">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame24">
          <div className="frame25">
            <div className="list-text">Blessica Lara</div>
            <div className="list-text">May 3, 2023</div>
          </div>
          <div className="frame26">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame27">
          <div className="frame28">
            <div className="list-text">Bryan Patricio</div>
            <div className="list-text">April 18, 2023</div>
          </div>
          <div className="frame14">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame30">
          <div className="frame25">
            <div className="list-text">Blessica Lara</div>
            <div className="list-text">May 3, 2023</div>
          </div>
          <div className="frame26">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame33">
          <div className="frame28">
            <div className="list-text">Bryan Patricio</div>
            <div className="list-text">April 18, 2023</div>
          </div>
          <div className="frame14">
            <div className="list-text">USJR-Main</div>
            <button className="view">View</button>
          </div>
        </div>
        <div className="frame36">
          <div className="frame37">
            <div className="list-text">Jayson Mahinay</div>
            <div className="list-text">April 12, 2023</div>
          </div>
          <div className="frame38">
            <div className="list-text">CIT-U</div>
            <button className="view">View</button>
          </div>
        </div>
      </div>
      <div className="action">Action</div>
      <div className="university">University</div>
      <div className="date-created">Date Created</div>
      <div className="name">Name</div>
      <input className="search" placeholder="Search" type="text" />
      <button className="sort" />
      <div className="graduate-list">Graduate List</div>
      <div className="filters">
        <select className="college-department-dropdown">
          <option value="">Select a Department</option>
          {collegeDepartments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
        <div className="college-department">College Department</div>
        <select className="university-dropdown">
          <option value="">Select a University</option>
          {universities.map((university, index) => (
            <option key={index} value={university}>
              {university}
            </option>
          ))}
        </select>
        <div className="university1">University</div>
        <div className="div">
          <input className="child" type="checkbox" />
          <div className="div1">2018</div>
        </div>
        <div className="div2">
          <input className="child" type="checkbox" />
          <div className="div1">2019</div>
        </div>
        <div className="div4">
          <div className="rectangle-parent">
            <input className="child" type="checkbox" />
            <div className="div1">2020</div>
          </div>
        </div>
        <div className="div6">
          <input className="child" type="checkbox" />
          <div className="div1">2021</div>
        </div>
        <div className="div8">
          <input className="child" type="checkbox" />
          <div className="div1">2022</div>
        </div>
        <div className="div10">
          <input className="child" type="checkbox" />
          <div className="div1">2023</div>
        </div>
        <div className="date-graduated">Date Graduated</div>
        <button className="filters1">
          <div className="filters2">FILTERS</div>
        </button>
      </div>
      <div
        className={`sidebar ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="account">
          <img className="account-icon" alt="" src="/images/vector7.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">Account</span>
          )}
        </button>
        <button className="university-icon">
          <img className="university-icon1" alt="" src="/images/vector6.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">University List</span>
          )}
        </button>
        <button className="roles-and-permissions">
          <img
            className="roles-and-permissions1"
            alt=""
            src="/images/vector2.svg"
          />
          {isExpanded && showText && (
            <span className="sidebar-text">Roles and Permissions</span>
          )}
        </button>
        <button className="users-icon">
          <img className="users-icon1" alt="" src="/images/users-icon-1.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">Graduate List</span>
          )}
        </button>
        <button className="admin-list">
          <img className="admin-list-icon" alt="" src="/images/vector11.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">Admin List</span>
          )}
        </button>
        <button className="home-icon">
          <img className="home-icon1" alt="" src="/images/home-icon.svg" />
          {isExpanded && showText && <span className="sidebar-text">Home</span>}
        </button>
      </div>
      <div className="header">
        <button className="universecity">
          <img className="vector-icon" alt="" src="/images/LogoNavBar.png" />
        </button>
        <button className="notification-bell">
          <img
            className="notification-icon"
            alt=""
            src="/images/notification.svg"
          />
        </button>
      </div>
      <button className="button">
        <img className="search-icon" alt="" src="/images/search.svg" />
      </button>
    </div>
  );
};

export default UniversityGraduateList;
