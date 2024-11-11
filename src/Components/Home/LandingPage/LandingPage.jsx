import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <section className="landingPage">
      {/* <div className="cursor"></div> */}
      <div className="center1">
        <div className="sentencesDiv">
          <h1> GROW</h1>
        </div>
        <div className="sentencesDiv">
          <h1 className="target">INSPIRE</h1>
        </div>
        <div className="sentencesDiv">
          <h1 className="target">CONNECT</h1>
        </div>
        <div className="sentencesDiv">
          <h1 className="target">DISCOVER</h1>
        </div>
      </div>

      <div className="center2">
        <div>
          <h3>
            <Link>EDUCATIONAL</Link>
          </h3>
          <h3>
            <Link>MYSTERY</Link>
          </h3>
          <h3>
            <Link>HISTORY</Link>
          </h3>
          <h3>
            <Link>ADVENTURE</Link>
          </h3>
        </div>
        <div>
          <h3>
            <Link to={"logIn"}>JOIN FOR MORE</Link>
          </h3>
        </div>
        <div>
          <h3>
            <Link>COMEDY</Link>
          </h3>
          <h3>
            <Link>ROMANCE</Link>
          </h3>
          <h3>
            <Link>HORROR</Link>
          </h3>
          <h3>
            <Link>BIOGRAPHY</Link>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
