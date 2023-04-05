import React, { Component } from "react";
import JobSeekerRegistration from "./registration/jobSeekerRegistration";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "jobseeker",
    };
  }
  componentDidMount() {
    console.log("Loading...");
  }
  render() {
    return (
      <div>
        <div className="tabSelection">
          <ul className="tabSpacing">
            <li
              style={{ listStyle: "none" }}
              onClick={() => {
                this.setState({ selectedTab: "jobseeker" });
              }}
            >
              Job seeker Registration
            </li>
            <li
              style={{ listStyle: "none" }}
              onClick={() => {
                this.setState({ selectedTab: "recruiter" });
              }}
            >
              Recruiter Registration
            </li>
          </ul>
        </div>
        <div>
          {this.state.selectedTab === "jobseeker" ? (
            <JobSeekerRegistration />
          ) : (
            <h1>Recruiter</h1>
          )}
        </div>
      </div>
    );
  }
}
