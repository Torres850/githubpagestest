function agregarFila() {
  const codigo = document.getElementById("codigo").value;
  const nombre = document.getElementById("nombre").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio_unitario = parseFloat(document.getElementById("precio_unitario").value);

  // Calcular el precio total
  const precio_total = cantidad * precio_unitario;

  // Mostrar el total en el campo
  document.getElementById("precio_total").value = precio_total.toFixed(2);

  // Validar que no estén vacíos
  if (!codigo || !nombre || isNaN(cantidad) || isNaN(precio_unitario)) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Crear la nueva fila
  const tabla = document.getElementById("tablaBody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${codigo}</td>  
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>$${precio_unitario.toFixed(2)}</td>
    <td>$${precio_total.toFixed(2)}</td>
    <td>
    <button class="btn btn-warning btn-sm" onclick="abrirModalEditar(this)">✏️</button>
    </td>
  `;
  tabla.appendChild(fila);

  // Limpiar campos después de agregar
  document.getElementById("codigo").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio_unitario").value = "";
  document.getElementById("precio_total").value = "";
}



function eliminarPorFiltro() {
  const codigoBuscado = document.getElementById("buscarCodigo").value.trim().toLowerCase();
  const nombreBuscado = document.getElementById("buscarNombre").value.trim().toLowerCase();
  const filas = document.querySelectorAll("#tablaBody tr");
  let eliminado = false;

  filas.forEach(fila => {
    const codigo = fila.cells[0].textContent.trim().toLowerCase();
    const nombre = fila.cells[1].textContent.trim().toLowerCase();

    if (
      (codigoBuscado && codigo === codigoBuscado) ||
      (nombreBuscado && nombre === nombreBuscado)
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
  document.getElementById("buscarCodigo").value = "";
  document.getElementById("buscarNombre").value = "";
}

let filaEditando = null;

function abrirModalEditar(boton) {
  filaEditando = boton.closest("tr");

  // Obtener los valores de la fila
  const celdas = filaEditando.getElementsByTagName("td");

  document.getElementById("editCodigo").value = celdas[0].textContent.trim();
  document.getElementById("editNombre").value = celdas[1].textContent.trim();
  document.getElementById("editCantidad").value = celdas[2].textContent.trim();
  document.getElementById("editPrecioUnitario").value = parseFloat(celdas[3].textContent.replace("$", "").trim());

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
  modal.show();
}

function guardarEdicion() {
  if (!filaEditando) return;

  // Leer los nuevos valores del modal
  const nuevoCodigo = document.getElementById("editCodigo").value;
  const nuevoNombre = document.getElementById("editNombre").value;
  const nuevaCantidad = parseInt(document.getElementById("editCantidad").value);
  const nuevoPrecio = parseFloat(document.getElementById("editPrecioUnitario").value);
  const nuevoTotal = nuevaCantidad * nuevoPrecio;

  // Actualizar la fila
  const celdas = filaEditando.getElementsByTagName("td");
  celdas[0].textContent = nuevoCodigo;
  celdas[1].textContent = nuevoNombre;
  celdas[2].textContent = nuevaCantidad;
  celdas[3].textContent = `$${nuevoPrecio.toFixed(2)}`;
  celdas[4].textContent = `$${nuevoTotal.toFixed(2)}`;

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
  modal.hide();
}
