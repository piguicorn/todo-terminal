const { 
    inquirerMenu, 
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist 
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {

    console.clear();

    const tareas = new Tareas();
    let opt = '';

    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // crear tarea
                const descripcion = await leerInput('Description: ');
                
                const tarea = new Tarea(descripcion);
                tareas._listado[tarea.id] = tarea;
                break;

            case '2': // listar todas las tareas
                tareas.listadoCompleto();
                break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                //console.log(ids);
                break;

            case '6': // borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0') {
                    const ok = await confirmar('Delete this task?');
                    if ( ok ) {
                        tareas.borrarTarea(id);
                        console.log('Task deleted');
                    }
                }

                break;
        }

        guardarDB(tareas.listadoArr);

        await inquirerPausa()
    } while ( opt !== '0')


}

main();