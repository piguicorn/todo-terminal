const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        pageSize: 8,
        choices: [
            {
                value: '1',
                name: `${"1".green}. Crear tarea`,
            },
            {
                value: '2',
                name: `${"2".green}. Listar tareas`,
            },
            {
                value: '3',
                name: `${"3".green}. Listar tareas completadas`,
            },
            {
                value: '4',
                name: `${"4".green}. Listar tareas pendientes`,
            },
            {
                value: '5',
                name: `${"5".green}. Completar tarea(s)`,
            },
            {
                value: '6',
                name: `${"6".green}. Borrar tarea`,
            },
            {
                value: '0',
                name: `${"0".green}. Salir`,
            },
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('======================'.cyan);
    console.log('Seleccione una opción');
    console.log('======================'.cyan);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

// pausa

const inquirerPausa = async () => {

    const confirmacion = [
        {
            type: 'input',
            name: 'opcion',
            message: `Presione ${'ENTER'.cyan} para continuar.`
        }
    ];

    console.log('\n');
    await inquirer.prompt(confirmacion);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value) {
                if( value.length == 0) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { descripcion } = await inquirer.prompt(question);
    return descripcion;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const index = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + '. Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;

    // {
    //    value: tarea.id,
    //    name: `${"1".green}. Crear tarea`,
    // },
}

const confirmar = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const index = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`,
            checked: tarea.completadoEn ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);

    return ids;

}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}