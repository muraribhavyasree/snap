import "../../styles/adminreports.css";

export default function AdminLocations() {

  const locations = [
    {
      id: 1,
      area: "Hyderabad",
      cases: 45
    },
    {
      id: 2,
      area: "Vizag",
      cases: 28
    },
    {
      id: 3,
      area: "Vijayawada",
      cases: 17
    }
  ];

  return (
    <div className="admin-page">
      <h1>Crime Locations</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Total Cases</th>
          </tr>
        </thead>

        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.area}</td>
              <td>{location.cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}