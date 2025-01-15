import React, { useState } from "react";
import { dataMunicipality } from "../../../services/dataMunicipality";

const MunicipalityListPage = () => {
  const [municipalities, setMunicipalities] = useState(dataMunicipality);

  return (
    <div>
      <h1>Lista de Municipios</h1>
      <ul>
        {municipalities.map((municipality, index) => (
          <div key={index}>
            {index + 1} - {municipality[0]} - <strong>{municipality[1]}</strong>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MunicipalityListPage;
