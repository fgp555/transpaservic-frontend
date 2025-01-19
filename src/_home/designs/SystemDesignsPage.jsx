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
import { ModalComponent } from "./_components/ModalComponent";
import { SnackbarComponent } from "./_components/SnackbarComponent";
import { AccordionComponent } from "./_components/AccordionComponent";
import { BreadcrumbsComponent } from "./_components/BreadcrumbsComponent";
import { MenuComponent } from "./_components/MenuComponent";
import { SpeedDialComponent } from "./_components/SpeedDialComponent";
import { StepperComponent } from "./_components/StepperComponent";
import { TabsComponent } from "./_components/TabsComponent";
import { TableResponsiveComponent } from "./_components/TableResponsiveComponent";

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
  const [showAlert, setShowAlert] = useState({ show: false, type: "", message: "" });

  const handleShowAlert = (type, message) => {
    setShowAlert({ show: true, type, message });
    setTimeout(() => {
      setShowAlert({ show: false, type: "", message: "" });
    }, 3000); // Desaparece después de 3 segundos
  };

  const closeAlert = () => {
    setShowAlert({ show: false, type: "", message: "" });
  };

  // ========== ModalComponent ==========
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ========== SnackbarComponent ==========
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState(""); // success, error, warning

  const openSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  // ========== AccordionComponent ==========
  const accordionItems = [
    {
      title: "Sección 1",
      content: "Este es el contenido de la primera sección del acordeón. Puedes poner más detalles aquí.",
    },
    {
      title: "Sección 2",
      content: "Contenido de la segunda sección. Aquí puedes agregar cualquier información adicional.",
    },
    {
      title: "Sección 3",
      content: "Aquí está el contenido de la tercera sección del acordeón. Puedes incluir más datos aquí.",
    },
  ];

  // ========== BreadcrumbsComponent ==========
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: "Product Detail", link: "/products/1" },
  ];

  // ========== MenuComponent ==========
  const menuItems = [
    { label: "Inicio", link: "/" },
    { label: "Productos", link: "/products" },
    { label: "Servicios", link: "/services" },
    { label: "Contacto", link: "/contact" },
  ];

  // ==========  ==========
  const actions = [
    {
      label: "Editar",
      icon: 1,
      onClick: () => alert("Editar acción"),
    },
    {
      label: "Eliminar",
      icon: 2,
      onClick: () => alert("Eliminar acción"),
    },
    {
      label: "Descargar",
      icon: 3,
      onClick: () => alert("Descargar acción"),
    },
  ];

  // ========== StepperComponent ==========
  const steps = [
    {
      label: "Paso 1",
      content: "Aquí va el contenido para el paso 1. Recoge la información básica.",
    },
    {
      label: "Paso 2",
      content: "Aquí va el contenido para el paso 2. Pide detalles adicionales.",
    },
    {
      label: "Paso 3",
      content: "Aquí va el contenido para el paso 3. Confirma la información y finaliza.",
    },
  ];

  // ========== TabsComponent ==========
  const tabs = [
    {
      label: "Tab 1",
      content: (
        <div>
          <h3>Contenido de la Pestaña 1</h3>
          <p>Este es el contenido de la primera pestaña.</p>
        </div>
      ),
    },
    {
      label: "Tab 2",
      content: (
        <div>
          <h3>Contenido de la Pestaña 2</h3>
          <p>Este es el contenido de la segunda pestaña.</p>
        </div>
      ),
    },
    {
      label: "Tab 3",
      content: (
        <div>
          <h3>Contenido de la Pestaña 3</h3>
          <p>Este es el contenido de la tercera pestaña.</p>
        </div>
      ),
    },
  ];

  // ========== TableResponsiveComponent  ==========
  const data = [
    {
      firstName: "Diego",
      lastName: "Torres",
      email: "copetran1@copetran.com",
      whatsapp: "+51288990011",
      role: "admin",
      transport: {
        name: "Copetran",
      },
    },
    {
      firstName: "Ana",
      lastName: "Gómez",
      email: "ana@mail.com",
      whatsapp: "+5123456789",
      role: "user",
      transport: {
        name: "Transmasivo",
      },
    },
    {
      firstName: "Carlos",
      lastName: "Pérez",
      email: "carlos@mail.com",
      whatsapp: "+573008765432",
      role: "driver",
      transport: null, // Sin transporte asignado
    },
  ];

  // ==========  ==========
  return (
    <div className="SystemDesignsPage">
      <NavLink to="/" onClick={handleToggleTheme}>
        <i className={theme === "dark" ? "icon-moon" : "icon-sun"}></i>
        <button className="btn btn-primary">
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
        <ButtonComponent label="primary" variant="primary" />
        <ButtonComponent label="secondary" variant="secondary" />
        <ButtonComponent label="disabled" variant="primary" disabled />
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
        {/* Buttons para mostrar diferentes tipos de alertas */}
        <h2>Mostrar Alertas</h2>
        <ButtonComponent label="Alerta de Éxito" onClick={() => handleShowAlert("success", "Operación realizada con éxito!")} />
        <ButtonComponent label="Alerta de Error" onClick={() => handleShowAlert("error", "Algo salió mal. Intenta nuevamente.")} />
        <ButtonComponent label="Alerta de Advertencia" onClick={() => handleShowAlert("warning", "Cuidado! Algo podría ir mal.")} />
        <ButtonComponent label="Alerta de Información" onClick={() => handleShowAlert("info", "Esto es solo para tu información.")} />
        {/* Mostrar alerta si está activa */}
        {showAlert.show && <AlertComponent type={showAlert.type} message={showAlert.message} onClose={closeAlert} />}
      </section>

      <section>
        <h2>Mostrar Modal</h2>
        <button onClick={openModal} className="btn btn-primary">
          Mostrar Modal
        </button>

        <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
          <h2>¡Hola! Soy un Modal</h2>
          <p>Este es un contenido dentro del modal. Puedes agregar lo que quieras.</p>
          <button onClick={closeModal} className="btn btn-secondary">
            Cerrar Modal
          </button>
        </ModalComponent>
      </section>
      <section>
        {/* Botones de ejemplo para activar diferentes tipos de Snackbar */}
        <button className="btn" onClick={() => openSnackbar("¡Operación exitosa!", "success")}>
          Mostrar éxito
        </button>
        <button className="btn" onClick={() => openSnackbar("Ocurrió un error", "error")}>
          Mostrar error
        </button>
        <button className="btn" onClick={() => openSnackbar("Advertencia importante", "warning")}>
          Mostrar advertencia
        </button>

        {/* Componente Snackbar */}
        <SnackbarComponent open={snackbarOpen} message={snackbarMessage} onClose={closeSnackbar} type={snackbarType} />
      </section>
      <section>
        <h1>Sistema de Diseño - Accordion</h1>
        {/* Componente Accordion */}
        <AccordionComponent items={accordionItems} />
        <br />
        <AccordionComponent
          items={[
            { title: "Sección 1", content: "Este es el contenido de la primera sección." },
            { title: "Sección 2", content: "Contenido de la segunda sección." },
            { title: "Sección 3", content: "Contenido de la tercera sección." },
          ]}
        />
      </section>
      <section>
        <h2>BreadcrumbsComponent</h2>
        <BreadcrumbsComponent items={breadcrumbItems} />
        {/* Resto del contenido de la página */}
      </section>
      <section>
        <h2>MenuComponent</h2>
        <MenuComponent items={menuItems} />
      </section>
      <section>
        {/* SpeedDialComponent */}
        <h2>SpeedDialComponent</h2>
        <SpeedDialComponent actions={actions} />
      </section>
      <section>
        <h2>Formulario de Varios Pasos</h2>
        <StepperComponent steps={steps} />
      </section>
      <section>
        {/* TabsComponent */}
        <h2>TabsComponent</h2>
        <TabsComponent tabs={tabs} />
      </section>
      <section>
        <h1>Tabla Responsiva</h1>
        <TableResponsiveComponent data={data} />
        </section>
    </div>
  );
};

export default SystemDesigns;
