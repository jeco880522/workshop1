const formulario = document.querySelector('form');
let listarMem = document.getElementById('listarMem');
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busquda'); // COMENTARIO: Hay un error de escritura en el ID, debería ser "busqueda" en lugar de "busquda".
let elementos = [];

const capturarDatos = () => {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    
    let registro = { fname, lname, email };
    elementos.unshift(registro);
    localStorage.setItem("elementos", JSON.stringify(elementos));
    getLocalStorage();
}

// COMENTARIO: Agregar un evento submit al formulario para capturar los datos al enviarlo.
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario.
    capturarDatos();
});

function mostrarDialogo() {
    var panelEmergente = document.getElementById('modal');
    panelEmergente.showModal();
}

function cerrarDialogo() {
    var panelEmergente = document.getElementById('modal');
    panelEmergente.close(); 
    formulario.reset();
}

// COMENTARIO: Mostrar la información almacenada en el localStorage en el elemento HTML con el ID "listarCita".
function getLocalStorage() {
    listarMem.innerHTML = '';
    elementos.forEach((element, index) => {
        const { fname, lname, email } = element;
        listarMem.innerHTML += `
            <tr>
                <td>${fname}</td>
                <td>${lname}</td>
                <td>${email}</td>
                <td>
                    <button onclick="eliminarCita(${index})" class="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// COMENTARIO: Obtener la información almacenada en el localStorage al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    elementos = JSON.parse(localStorage.getItem('elementos')) || [];
    getLocalStorage();
});

// COMENTARIO: Función para eliminar una cita de la lista.
function eliminarCita(index) {
    elementos.splice(index, 1);
    localStorage.setItem("elementos", JSON.stringify(elementos));
    getLocalStorage();
}
