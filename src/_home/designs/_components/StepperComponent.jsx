import React, { useState } from "react";
import "./StepperComponent.css"; // Asegúrate de tener los estilos adecuados

export const StepperComponent = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="stepper">
      <div className="stepper-header">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`stepper-step ${
              index <= currentStep ? "completed" : ""
            } ${index === currentStep ? "current" : ""}`}
          >
            <span>{step.label}</span>
          </div>
        ))}
      </div>
      <div className="stepper-content">
        <h2>{steps[currentStep].content}</h2>
        <div className="stepper-buttons">
          <button onClick={prevStep} disabled={currentStep === 0}>
            Anterior
          </button>
          <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
