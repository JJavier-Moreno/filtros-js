document.addEventListener('DOMContentLoaded', function () { // * DOMContentLoaded para que cuando el documento se carge se llame directamente a la funcion. Nos aseguramos de que se haya cargado todo el documento HTML

    const formulario = document.querySelector('#formulario');
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('#botones').firstElementChild;
    const btnReset = document.querySelector('#botones button[type="reset"]')
    const spinner = document.querySelector('#spinner');



    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    btnReset.addEventListener('click', resetearFormulario);
    formulario.addEventListener('submit', enviarEmail)

    const correo = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');



        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            correo.email = "";
            correo.asunto = "",
            correo.mensaje = "";

            formulario.reset();


            const exito = document.createElement('P');
            exito.classList.add('bg-green-500', 'rounded-lg', 'p-2','uppercase', 'text-center', 'font-bold', 'mt-10', 'text-white');
            exito.textContent = 'Email enviado correctamente';
            console.log(exito);
            formulario.appendChild(exito);

            setTimeout(()=>{
                exito.remove();
            },2000)

        }, 3000)

    }


    function validar(e) {
        if (e.target.value.trim() === '') { //Importante poner un trim en un formulario
            mostrarAlerta(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            correo[e.target.name] = '';
            validarFormulario();
            return;
        }


        if (e.target.name === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            correo[e.target.name] = '';
            validarFormulario();
            return;

        }

        limpiarAlerta(e.target.parentElement);

        correo[e.target.name] = e.target.value.trim().toLowerCase();


        validarFormulario();




    }

    function mostrarAlerta(mensaje, referencia) {
        //Comprobar si ya existe la alerta
        limpiarAlerta(referencia);


        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('alerta');
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // * Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.alerta');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function validarFormulario() {
        if (Object.values(correo).includes("")) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;


    }

    function resetearFormulario(e) {
        e.preventDefault();

        correo.email = "";
        correo.asunto = "",
            correo.mensaje = "";

        formulario.reset();
        validarFormulario();


    }


})


