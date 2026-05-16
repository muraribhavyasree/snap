import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/adminreports.css";

export default function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Matches DB field names exactly: area, city, state, pincode
  const [area, setArea] = useState(""); 
  const [city, setCity] = useState("");
  const [state, setState] = useState("Andhra Pradesh");
  const [pincode, setPincode] = useState("");

  /* ================= FETCH LOCATIONS ================= */
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/admin/locations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  /* ================= ADD LOCATION FUNCTION ================= */
  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      // ✅ Key Fix: Using 'area' key so your backend routes map it correctly
      const newLocation = {
        area: area.toLowerCase(), // Lowercase formatting matching your screen
        city: city.toUpperCase(), // Uppercase formatting matching your screen
        state,
        pincode
      };

      const response = await axios.post(
        "http://localhost:3000/api/admin/locations",
        newLocation,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Append server-verified object to state
      setLocations([...locations, response.data]);
      alert("Location Added Successfully!");

      // Clear standard form inputs
      setArea("");
      setCity("");
      setPincode("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add location");
    }
  };

  if (loading) return <h2>Loading location data...</h2>;

  return (
    <div className="admin-page">
      <h1>Crime Locations</h1>

      {/* ================= ADD LOCATION FORM ================= */}
      <form onSubmit={handleAddLocation} className="add-location-form" style={{ marginBottom: "25px", display: "grid", gap: "10px", maxWidth: "400px" }}>
        <h3>Add New Crime Location</h3>
        
        <input 
          type="text" 
          placeholder="Area Name (e.g., anantapur)" 
          required 
          value={area} 
          onChange={(e) => setArea(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="City (e.g., ANANTHAPUR)" 
          required 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="State (e.g., Andhra Pradesh)" 
          required 
          value={state} 
          onChange={(e) => setState(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Pincode (e.g., 515110)" 
          required 
          value={pincode} 
          onChange={(e) => setPincode(e.target.value)} 
        />
        
        <button type="submit" className="add-btn">Save Location</button>
      </form>

      {/* ================= DATA TABLE ================= */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Area</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {locations.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No location data found</td>
            </tr>
          ) : (
            locations.map((location, index) => (
              <tr key={location._id || location.id}>
                <td>{index + 1}</td> 
                {/* ✅ Reads directly from correct DB schema variables */}
                <td>{location.area || "N/A"}</td>
                <td>{location.city || "N/A"}</td>
                <td>{location.state || "N/A"}</td>
                <td>{location.pincode || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
