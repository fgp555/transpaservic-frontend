import React, { useEffect, useState } from "react";
import { municipalityService } from "../../../services/apiMunicipality";

const MunicipalityListPage = () => {
  const [municipalities, setMunicipalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const data = await municipalityService.getAll();
        setMunicipalities(data);
      } catch (err) {
        setError("Error fetching municipalities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipalities();
  }, []);

  if (loading) return <div>Cargando municipios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Municipios</h1>
      <ul>
        {municipalities.map((municipality) => (
          <li key={municipality.id}>
            {municipality.department} - <strong>{municipality.name}</strong>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(municipalities, null, 2)}</pre>
    </div>
  );
};

export default MunicipalityListPage;
