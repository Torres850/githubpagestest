function agregarFila() {
  const plan = document.getElementById("tipo_plan").value;
  const inicio = document.getElementById("fecha_inicio").value;
  const fin = document.getElementById("fecha_fin").value;
  const estado = document.getElementById("estado").value;


  // Validar que no estén vacíos
  if (!plan || !inicio || !fin |!estado) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Crear la nueva fila
  const tabla = document.getElementById("tablaBody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${plan}</td>  
    <td>${inicio}</td>
    <td>${fin}</td>
    <td class="estado">${estado}</td>
    <td>
     <button class="btn btn-warning btn-sm" onclick="abrirModalEditar(this)">✏️</button>
     <label class="switch">
      <input type="checkbox" class="estado-toggle" onchange="toggleEstado(this)" checked>
      <span class="slider"></span>
    </label>
     </td>
  
  `;
  tabla.appendChild(fila);

  // Limpiar campos después de agregar
  document.getElementById("plan").value = "";
  document.getElementById("inicio").value = "";
  document.getElementById("fin").value = "";
  document.getElementById("estado").value = "";
  
}



function eliminarPorFiltro() {
  const planBuscado = document.getElementById("buscarPlan").value.trim().toLowerCase();
  const estadoBuscado = document.getElementById("buscarEstado").value.trim().toLowerCase();
  const filas = document.querySelectorAll("#tablaBody tr");
  let eliminado = false;

  filas.forEach(fila => {
    const plan = fila.cells[0].textContent.trim().toLowerCase();
    const estado = fila.cells[1].textContent.trim().toLowerCase();

    if (
      (planBuscado && plan === planBuscado) ||
      (estadoBuscado && estado === estadoBuscado)
    ) {
      fila.remove();
      eliminado = true;
    }
  });

  if (eliminado) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));
    modal.hide(); // Cierra el modal si se eliminó algo
  } else {
    alert("No se encontró ningún registro con ese código o nombre.");
  }

  // Limpiar campos
  document.getElementById("buscarPlan").value = "";
  document.getElementById("buscarEstado").value = "";
}


let filaEditando = null;

function abrirModalEditar(boton) {
  filaEditando = boton.closest("tr");

  // Obtener los valores de la fila
  const celdas = filaEditando.getElementsByTagName("td");

  document.getElementById("editTipo_plan").value = celdas[0].textContent.trim();
  document.getElementById("editInicio").value = celdas[1].textContent.trim();
  document.getElementById("editFin").value = celdas[2].textContent.trim();
  document.getElementById("editEstado").value = celdas[3].textContent.trim();

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
  modal.show();
}

function guardarEdicion() {
  if (!filaEditando) return;

  // Leer los nuevos valores del modal
  const nuevoPlan = document.getElementById("editTipo_plan").value;
  const nuevoinicio = document.getElementById("editInicio").value;
  const nuevofin = document.getElementById("editFin").value;
  const nuevoestado = document.getElementById("editEstado").value;

  // Actualizar la fila
  const celdas = filaEditando.getElementsByTagName("td");
  celdas[0].textContent = nuevoPlan;
  celdas[1].textContent = nuevoinicio;
  celdas[2].textContent = nuevofin;
  celdas[3].textContent = nuevoestado;
  

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
  modal.hide();
}

function toggleEstado(input) {
  const fila = input.closest("tr");
  const estadoCelda = fila.cells[3]; // columna de estado

  if (input.checked) {
    estadoCelda.textContent = "Activo";
  } else {
    estadoCelda.textContent = "Inactivo";
  }
}
