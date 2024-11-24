import fetch from "unfetch";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
};
///Sintomas por paciente

export const getAllSintomasYPaciente =  () =>
    fetch("api/v1/sintomas/paciente/todos")
        .then(checkStatus);

export const addNewSintomaPaciente = (sintomaPaciente) =>
    fetch("api/v1/sintomas/paciente/paciente/sintoma", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sintomaPaciente)
    }).then(checkStatus);

export const deleteSintomaPaciente = (sintomaId) =>
    fetch(`api/v1/sintomas/paciente/paciente/sintoma/${sintomaId}`, {
        method: "DELETE"
    }).then(checkStatus);

//Sintomas

export const getAllSintomas =  () =>
    fetch("api/v1/sintomas/todos")
        .then(checkStatus);

export const addNewSintoma = (sintoma) =>
    fetch("api/v1/sintomas/sintoma", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sintoma)
    }).then(checkStatus);

export const deleteSintoma = (sintomaId) =>
    fetch(`api/v1/sintomas/sintoma/${sintomaId}`, {
        method: "DELETE"
    }).then(checkStatus);

export const updateSintoma = (sintoma) =>
    fetch("api/v1/sintomas/sintoma", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sintoma)
    }).then(checkStatus);

// Pacientes

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
