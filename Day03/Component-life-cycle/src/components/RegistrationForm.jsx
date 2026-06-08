import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert("Form Submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="Myanmar">Myanmar</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm;
