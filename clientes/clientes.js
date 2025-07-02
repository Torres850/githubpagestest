function agregarFila() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const tipoDocumento = document.getElementById("Tipo_documento").value;
  const numeroDocumento = document.getElementById("Numero_documento").value;


  // Validar que no estén vacíos
  if (!nombre || !apellido || !tipoDocumento |!numeroDocumento) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Crear la nueva fila
  const tabla = document.getElementById("tablaBody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>  
    <td>${apellido}</td>
    <td>${tipoDocumento}</td>
    <td>${numeroDocumento}</td>
  
    <td>
    <button class="btn btn-warning btn-sm" onclick="abrirModalEditar(this)">✏️</button>
    </td>
  `;
  tabla.appendChild(fila);

  // Limpiar campos después de agregar
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("tipoDocumento").value = "";
  document.getElementById("numeroDocumento").value = "";
  
}



function eliminarPorFiltro() {
  const nombreBuscado = document.getElementById("buscarNombre").value.trim().toLowerCase();
  const apellidoBuscado = document.getElementById("buscarApellido").value.trim().toLowerCase();
  const filas = document.querySelectorAll("#tablaBody tr");
  let eliminado = false;

  filas.forEach(fila => {
    const nombre = fila.cells[0].textContent.trim().toLowerCase();
    const apellido = fila.cells[1].textContent.trim().toLowerCase();

    if (
      (nombreBuscado && nombre === nombreBuscado) ||
      (apellidoBuscado && apellido === apellidoBuscado)
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
  document.getElementById("buscarNombre").value = "";
  document.getElementById("buscarApellido").value = "";
}


let filaEditando = null;

function abrirModalEditar(boton) {
  filaEditando = boton.closest("tr");

  // Obtener los valores de la fila
  const celdas = filaEditando.getElementsByTagName("td");

  document.getElementById("editNombre").value = celdas[0].textContent.trim();
  document.getElementById("editApellido").value = celdas[1].textContent.trim();
  document.getElementById("editTipo_documento").value = celdas[2].textContent.trim();
  document.getElementById("editNumero_documento").value = celdas[3].textContent.trim();

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
  modal.show();
}

function guardarEdicion() {
  if (!filaEditando) return;

  // Leer los nuevos valores del modal
  const nuevoNombre = document.getElementById("editNombre").value;
  const nuevoApellido = document.getElementById("editApellido").value;
  const nuevoTipodocumento = document.getElementById("editTipo_documento").value;
  const nuevoNumerodocumento = document.getElementById("editNumero_documento").value;

  // Actualizar la fila
  const celdas = filaEditando.getElementsByTagName("td");
  celdas[0].textContent = nuevoNombre;
  celdas[1].textContent = nuevoApellido;
  celdas[2].textContent = nuevoTipodocumento;
  celdas[3].textContent = nuevoNumerodocumento;
  

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
  modal.hide();
}
