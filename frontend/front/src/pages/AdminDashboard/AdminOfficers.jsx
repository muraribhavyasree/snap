import { useState, useEffect } from "react";
import axios from "axios";  
import "../../styles/adminreports.css";

export default function AdminOfficers() {
const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH OFFICERS ================= */
  useEffect(() => {

    const fetchOfficers = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/officers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        // REMOVE DUPLICATE USERS
        const uniqueOfficers = [];
        const addedEmails = new Set();
        res.data.forEach((officer) => {
          if (officer.user &&!addedEmails.has(officer.user.email)) {
            addedEmails.add(officer.user.email);

            uniqueOfficers.push({
              _id: officer._id,
              name: officer.user.name,
              email: officer.user.email,
              status: "Active",
            });
          }});
        setOfficers(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }};
    fetchOfficers();

  }, []);


  /* ================= LOADING ================= */
  if (loading) {
    return <h2>Loading...</h2>;
  }
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
          {officers.map((officer,index) => (
            <tr key={officer._id}>
              <td>{index+1}</td>
              <td>{officer.name}</td>
              <td>{officer.rank}</td>
              <td>{officer.station}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}