import React from "react";
import FileUploadComp from "../../../_components/FileUploadComp/FileUploadComp";

const FileUploadTicket = () => {
  return (
    <aside>
      <h2>Subir Archivos</h2>
      <br />
      <div>
        <label htmlFor="ticketNumber">Numero de ticket</label>
        <br />
        <input type="text" id="ticketNumber" />
      </div>
      <FileUploadComp />
      <button type="submit" className="btn btn-primary">
        Subir
      </button>
    </aside>
  );
};

export default FileUploadTicket;
