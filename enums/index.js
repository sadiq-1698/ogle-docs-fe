export const NEW = "new";
export const BLANK = "blank";
export const RESUME = "resume";

export const SAMPLE_RESUME_MD = `<br><br>
<h1>Resume</h1>
<h2>Emily</h2>
<hr />
<br>
<p>Interests</p>
<ul>
  <li>Drawing</li>
  <li>Photography</li>
  <li>Design</li>
  <li>Programming</li>
  <li>Computer Science</li>
</ul>
<p>Skills</p>
<ul>
  <li>Web Design with HTML & CSS</li>
</ul>
<p>Education</p>
<ul>
  <a href="http://www.wiltonhighschool.org/pages/Wilton_High_School">
    <li>Wilton High School</li>
  </a>
  <!--Link-->
  <a href="https://www.silvermineart.org/">
    <li>Silvermine School of Arts</li>
  </a>
  <li>Codeacademy</li>
</ul>
<p>Experience</p>
<ul>
  <li>Student Technology Intern for Wilton School District</li>
  <li>Babysitter</li>
</ul>
<p>Extracurriculars</p>
<ul>
  <li>Recycling Club</li>
  <li>Gardening Club</li>
  <li>Book Club</li>
</ul>`;

export const BLANK_DOC = { _id: "new", name: "Blank", content: " " };
export const RESUME_DOC = {
  _id: "resume",
  name: "Resume",
  content: SAMPLE_RESUME_MD,
};

export const LOGIN_FIELDS = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

export const REGISTER_FIELDS = [
  {
    labelText: "Name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Name",
  },
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm_password",
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    autoComplete: "confirm_password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];
