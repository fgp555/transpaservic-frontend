import React, { useState } from "react";
import "./SystemDesignsPage.css";
import { ButtonComponent } from "./_components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "../../store/themeSlice";
import { InputComponent } from "./_components/InputComponent";
import { CardComponent } from "./_components/CardComponent";
import { TableComponent } from "./_components/TableComponent";
import { SelectComponent } from "./_components/SelectComponent";
import { SwitchComponent } from "./_components/SwitchComponent";
import { CheckBoxComponent } from "./_components/CheckBoxComponent";
import { PaginationComponent } from "./_components/PaginationComponent";
import { ChipComponent } from "./_components/ChipComponent";
import { SearchComponent } from "./_components/SearchComponent";
import { AlertComponent } from "./_components/AlertComponent";

const SystemDesigns = () => {
  const theme = useSelector((state) => state.theme.theme); // Obtén el tema actual desde el store
  const dispatch = useDispatch();
  const handleToggleTheme = (event) => {
    event.preventDefault();
    dispatch(toggleTheme()); // Alternar entre dark y light mode
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
  ];

  // ========== toggleSwitch ==========
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => {
    setIsSwitchOn((prevState) => !prevState);
  };

  // ========== CheckBoxComponent ==========
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  // ========== PaginationComponent ==========
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ========== ChipComponent ==========

  const [chips, setChips] = useState(["Etiqueta 1", "Etiqueta 2", "Etiqueta 3"]);

  const handleRemoveChip = (chipToRemove) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  const handleChipClick = (chip) => {
    alert(`Hiciste clic en: ${chip}`);
  };
  // ========== SearchComponent ==========

  const handleSearch = (query) => {
    alert(`Buscando: ${query}`);
  };

  // ========== AlertComponent ==========
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    // Ocultar la alerta después de 5 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // ==========  ==========
  return (
    <div className="SystemDesignsPage">
      <NavLink to="/" onClick={handleToggleTheme}>
        <button className="btn btn-primary">
          <i className={theme === "dark" ? "icon-moon" : "icon-sun"}></i>
          <span>{theme === "dark" ? "Modo Oscuro" : "Modo Claro"}</span>
        </button>
      </NavLink>

      <section>
        <br />
        <h1>Sistema de Diseño</h1>
        <br />
        {/* {sidebar && (darkMode ? <img className="logo" src="/logo.svg" alt="" /> : <img className="logo" src="/logo-dark.svg" alt="" />)} */}
      </section>
      <section>
        {/* Buttons */}
        <h2>Buttons</h2>
        <ButtonComponent label="Ver Detalles" variant="primary" />
        <ButtonComponent label="Editar" variant="secondary" />
        <ButtonComponent label="Eliminar" variant="secondary" />
        <ButtonComponent label="Imprimir" variant="secondary" />
        <ButtonComponent label="Descargar" variant="secondary" />
        <ButtonComponent label="Enviar" variant="secondary" />
        <ButtonComponent label="Cargando..." variant="primary" disabled />
        <ButtonComponent label="Pequeño" size="small" />
        <ButtonComponent label="Mediano" size="medium" />
        <ButtonComponent label="Grande" size="large" />
      </section>
      <section>
        {/* Inputs */}
        <h2>Inputs</h2>
        <InputComponent />
      </section>
      <section>
        {/* Cards */}
        <h2>Cards</h2>
        <CardComponent title="Card 1" description="This is a description of the first card." />
      </section>
      <section>
        {/* TableComponent */}
        <h2>TableComponent</h2>
        <TableComponent columns={["Column 1", "Column 2", "Column 3"]} data={[{ "Column 1": "Value 1", "Column 2": "Value 2", "Column 3": "Value 3" }]} />
      </section>
      <section>
        {/* SelectComponent */}
        <h2>SelectComponent</h2>
        <SelectComponent options={options} value={selectedOption} onChange={handleChange} placeholder="Elige una opción" />
      </section>

      <section>
        {/* SwitchComponent */}
        <h2>SwitchComponent</h2>
        <SwitchComponent isOn={isSwitchOn} handleToggle={toggleSwitch} label="Modo Oscuro" />
        <p>Estado: {isSwitchOn ? "Encendido" : "Apagado"}</p>
      </section>

      <section>
        {/* CheckBoxComponent */}
        <h2>CheckBoxComponent</h2>
        <CheckBoxComponent label="Aceptar términos y condiciones" isChecked={isChecked} onToggle={handleToggle} />
        <p>Estado: {isChecked ? "Seleccionado" : "No seleccionado"}</p>
      </section>
      <section>
        <h2>Paginación</h2>
        <p>Página actual: {currentPage}</p>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
      <section>
        {/* ChipComponent */}
        <h2>ChipComponent</h2>
        <div className="chip-list">
          {chips.map((chip, index) => (
            <ChipComponent key={index} label={chip} onRemove={() => handleRemoveChip(chip)} onClick={() => handleChipClick(chip)} removable />
          ))}
        </div>
      </section>
      <section>
        <h2>Componente de Búsqueda</h2>
        <SearchComponent onSearch={handleSearch} />
      </section>
      <section>
        <h2>Componente de Alerta con Temporizador</h2>
        {/* Botón que activa la alerta */}
        <button onClick={handleShowAlert} className="btn btn-primary">
          Mostrar Alerta
        </button>
        {/* Mostrar la alerta si el estado showAlert es true */}
        {showAlert && <AlertComponent type="success" message="¡Operación realizada con éxito!" onClose={closeAlert} />}{" "}
      </section>
    </div>
  );
};

export default SystemDesigns;
