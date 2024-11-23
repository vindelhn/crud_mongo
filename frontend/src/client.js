import fetch from "unfetch";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
};

export const getAllPacientes =  () =>
  fetch("api/v1/pacientes/todos")
   .then(checkStatus);

export const addNewPaciente = (paciente) =>
  fetch("api/v1/pacientes/paciente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paciente)
  }).then(checkStatus);

export const deletePaciente = (pacienteId) =>
  fetch(`api/v1/pacientes/paciente/${pacienteId}`, {
    method: "DELETE"
  }).then(checkStatus);

export const updatePaciente = (paciente) =>
  fetch("api/v1/pacientes/paciente", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paciente)
  }).then(checkStatus);
