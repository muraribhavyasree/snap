import "../../styles/adminreports.css";

export default function AdminOfficers() {

  const officers = [
    {
      id: 1,
      name: "Officer Ramesh",
      department: "Cyber Crime",
      location: "Hyderabad"
    },
    {
      id: 2,
      name: "Officer Suresh",
      department: "Traffic",
      location: "Vizag"
    }
  ];

  return (
    <div className="admin-page">
      <h1>Police Officers</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {officers.map((officer) => (
            <tr key={officer.id}>
              <td>{officer.id}</td>
              <td>{officer.name}</td>
              <td>{officer.department}</td>
              <td>{officer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}