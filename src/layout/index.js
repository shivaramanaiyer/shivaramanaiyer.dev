import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Navigation from "../components/Navigation";
import "../styles/main.scss";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout-container">
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <Navigation menuItems={config.menuItems} />
        <main className="main-content">{children}</main>
      </div>
    );
  }
}
