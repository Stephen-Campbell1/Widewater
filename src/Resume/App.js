import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import favicon from "./assets/favicon.ico";
import socialImage from "./assets/social-image.png";
import appleTouchIcon from "./assets/apple-touch-icon.png";
import toml from "toml";
import "./app.scss";

function dateStringToMonthYear(dateString) {
  const dt = new Date(dateString);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(dt);
  const year = dt.getFullYear();
  return `${month} ${year}`;
}

function convertNoBreakSpace(str) {
  return str.replaceAll(" ", "\u00A0");
}

function formatDateSpan(start, end) {
  return (
    <span>
      {`${convertNoBreakSpace(start)}`} – <wbr />
      {`${convertNoBreakSpace(end)}`}
    </span>
  );
}

function Education(props) {
  return (
    <>
      <div className="RowContainer">
        <p className="Desc DescBold MaxHalf">{`${props.type}`}</p>
        <p className="Desc MaxHalf">{`${dateStringToMonthYear(
          props.completed
        )}`}</p>
      </div>
      <div className="RowContainer">
        <p className="Desc MaxHalf">{`${props.school}`}</p>
        <p className="Desc DescBold MaxHalf">{`${props.gpa}`}</p>
      </div>
      <p className="Desc DescItalic">{`${props.honors}`}</p>
    </>
  );
}

function ProfessionalExperience(props) {
  const takeawayElements = props.takeaways.map((takeaway, index) => {
    return <li key={index}>{`${takeaway}`}</li>;
  });
  return (
    <>
      <div className="RowContainer">
        <p className="Desc DescBold MaxHalf">{`${props.title}`}</p>
        <p className="Desc MaxHalf " style={{ textAlign: "right" }}>
          {formatDateSpan(
            dateStringToMonthYear(props.start),
            dateStringToMonthYear(props.end)
          )}
        </p>
      </div>
      <div className="RowContainer">
        <p className="Desc MaxHalf">{`${props.employer}`}</p>
        <p className="Desc MaxHalf">{`${props.location}`}</p>
      </div>
      <ul className="Bullets Takeaways">{takeawayElements}</ul>
    </>
  );
}

function Project(props) {
  const technologiesUsed = props.TechnologiesUsed.map((ele, index) => {
    const commaStr = props.TechnologiesUsed.length - 1 === index ? "" : ", ";
    return (
      <span key={index}>
        <a href={ele.link}>{`${ele.title}`}</a>
        {commaStr}
      </span>
    );
  });
  const takeawayElements = props.takeaways.map((takeaway, index) => {
    return <li key={index}>{`${takeaway}`}</li>;
  });
  return (
    <>
      <div className="RowContainer">
        <p className="Desc DescBold MaxHalf">{`${props.title}`}</p>
        <p className="Desc MaxHalf" style={{ textAlign: "right" }}>
          {formatDateSpan(
            dateStringToMonthYear(props.start),
            dateStringToMonthYear(props.end)
          )}
        </p>
      </div>
      <p className="Desc MaxHalf">
        <span className="DescBold">Technologies Used: </span>
        {technologiesUsed}
      </p>
      <ul className="Bullets Takeaways">{takeawayElements}</ul>
    </>
  );
}

function Skills(props) {
  const skillStr = props.skillList.map((skill) => skill.name).join(", ");
  return (
    <ul className="Bullets Skills">
      <li>Proficent with {`${skillStr}`}</li>
    </ul>
  );
}

function Section(props) {
  const childVariant = {
    hidden: { opacity: 0, x: -25 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

  return (
    <motion.section
      variants={childVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h2 className="SectionHeader">{props.name}</h2>
      {props.children}
    </motion.section>
  );
}

function NavContainer() {
  return (
    <div className="NavContainer">
      <svg viewBox="0 0 96 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="95.5"
          y="1.24243"
          width="47.2576"
          height="95"
          rx="2.5"
          transform="rotate(90 95.5 1.24243)"
          fill="white"
          stroke="black"
          strokeOpacity="0.3"
        />
        <rect width="48" height="48.2576" rx="3" fill="black" />
        {/* <!-- PROFILE --> */}
        <g>
          <path
            d="M31.6374 31.3385C32.1967 31.2231 32.5294 30.6373 32.2476 30.1406C31.6415 29.0722 30.6917 28.1333 29.4788 27.4167C27.907 26.4882 25.9812 25.9848 24 25.9848C22.0188 25.9848 20.0929 26.4882 18.5211 27.4167C17.3082 28.1333 16.3585 29.0722 15.7524 30.1406C15.4705 30.6373 15.8033 31.2231 16.3626 31.3385V31.3385C21.4011 32.378 26.5988 32.378 31.6374 31.3385V31.3385Z"
            fill="white"
          />
          <ellipse cx="24" cy="19.0555" rx="5" ry="4.94949" fill="white" />
        </g>
        {/* <!-- PROJECTS --> */}
        <g>
          <rect
            x="71.25"
            y="25.9849"
            width="9"
            height="8.90909"
            rx="3"
            fill="black"
          />
          <rect
            x="60"
            y="25.9849"
            width="9"
            height="8.90909"
            rx="3"
            fill="black"
          />
          <rect
            x="60"
            y="14.8485"
            width="9"
            height="8.90909"
            rx="3"
            fill="black"
          />
          <rect
            x="71.25"
            y="14.8485"
            width="9"
            height="8.90909"
            rx="3"
            fill="black"
          />
        </g>
      </svg>
    </div>
  );
}

function ContactContainer(props) {
  return (
    <div className="ContactContainer">
      {/* <!-- GITHUB --> */}
      <a href={props.github}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.026 2C7.13292 1.99937 2.9618 5.54799 2.17838 10.3779C1.39497 15.2079 4.23058 19.893 8.87299 21.439C9.37299 21.529 9.55199 21.222 9.55199 20.958C9.55199 20.721 9.54398 20.093 9.54099 19.258C6.76599 19.858 6.17999 17.92 6.17999 17.92C5.9973 17.317 5.60456 16.7993 5.07299 16.461C4.17299 15.842 5.14199 15.856 5.14199 15.856C5.78266 15.9438 6.34654 16.3235 6.66899 16.884C6.94192 17.3803 7.40174 17.747 7.94629 17.9026C8.49084 18.0583 9.075 17.99 9.56899 17.713C9.61541 17.207 9.84052 16.7341 10.204 16.379C7.98999 16.128 5.66199 15.272 5.66199 11.449C5.6497 10.4602 6.01688 9.5043 6.68799 8.778C6.38434 7.91731 6.4201 6.97325 6.78799 6.138C6.78799 6.138 7.62499 5.869 9.52999 7.159C11.1638 6.71101 12.8881 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0375 9.50423 18.4044 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5611 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.659 15.203 21.874 10.3743C21.089 5.54565 16.918 1.99888 12.026 2Z"
            fill="black"
          />
        </svg>
      </a>
      {/* <!-- MAIL --> */}
      <a href={`mailto:${props.email}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z"
            fill="black"
          />
        </svg>
      </a>

      {/* <!-- LINKEDIN --> */}
      <a href={props.linkedin}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 21H9V9H13V11C13.8526 9.91525 15.1456 9.26857 16.525 9.237C19.0056 9.25077 21.0072 11.2694 21 13.75V21H17V14.25C16.84 13.1326 15.8818 12.3036 14.753 12.306C14.2593 12.3216 13.7932 12.5378 13.4624 12.9046C13.1316 13.2715 12.9646 13.7573 13 14.25V21ZM7 21H3V9H7V21ZM5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5C7 5.53043 6.78929 6.03914 6.41421 6.41421C6.03914 6.78929 5.53043 7 5 7Z"
            fill="black"
          />
        </svg>
      </a>
    </div>
  );
}

function eleMapper(obj, ele) {
  return Object.values(obj).map((props, index) =>
    React.createElement(ele, { key: index, ...props })
  );
}

function App() {
  const [resume, setResume] = useState(null);
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/Stephen-Campbell1/Resume/main/resume.toml"
        );
        const resumeTOMLTxt = await res.text();
        const parsedResume = toml.parse(resumeTOMLTxt);
        setResume(parsedResume);
      } catch (e) {
        console.log(e);
      }
    };
    fetchResume().catch(console.error);
  }, [setResume]);

  if (resume === null) {
    return <div></div>;
  }

  const educationElements = eleMapper(resume.Education, Education);
  const professionalExperienceElements = eleMapper(
    resume.ProfessionalExperience,
    ProfessionalExperience
  );
  const projectElements = eleMapper(resume.Project, Project);
  // const parentVariant = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  // transition: {
  //   duration: 0,
  //   staggerChildren: 0.3,
  // },
  //   },
  // };
  return (
    <motion.div
      className="MainContainer"
      // variants={parentVariant}
      // initial="show"
      // animate="show"
    >
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href={favicon} />
        <meta
          name="description"
          content="Resume and Project site for Stephen Campbell"
        />
        <meta
          property="og:description"
          content="An exposition of Stephen Campbell's resume and projects"
        />
        <meta property="og:title" content="Stephen Campbell's Resume" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={socialImage} />
        <link rel="apple-touch-icon" href={appleTouchIcon} />
        <title>Stephen Campbell's Resume</title>
      </Helmet>

      <div className="HeaderContainer">
        <h1 className="NamePlate">{resume.Contact.name}</h1>
        <ContactContainer
          email={resume.Contact.email}
          github={resume.Contact.github}
          linkedin={resume.Contact.linkedin}
        />
        {/* <NavContainer /> */}
      </div>
      <Section name="Education">{educationElements}</Section>
      <Section name="Professional Experience">
        {professionalExperienceElements}
      </Section>
      <Section name="Projects">{projectElements}</Section>
      <Section name="Skills">
        <Skills skillList={resume.Skills} />
      </Section>
    </motion.div>
  );
}

export default App;
