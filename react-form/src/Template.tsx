import { NavLink } from "react-router-dom";
import styles from "./Template.module.scss";

type TemplateProps = {
  children: React.ReactChild;
};

const Template = ({ children }: TemplateProps) => {
  const activeStyle = {
    fontWeight: "bold",
    color: "red",
  };

  return (
    <div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Basic
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/react-hook-form"
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            React-hook-form
          </NavLink>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Template;
