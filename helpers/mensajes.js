require('colors');

const mostrar_menu = () => {

    return new Promise( resolve => {
    
        console.log(`${'1'.cyan}. Crear tarea`);
        console.log(`${'2'.cyan}. Listar tareas`);
        console.log(`${'3'.cyan}. Listar tareas completadas`);
        console.log(`${'4'.cyan}. Listar tareas pendientes`);
        console.log(`${'5'.cyan}. Completar tarea(s)`);
        console.log(`${'6'.cyan}. Borrar tarea`);
        console.log(`${'7'.cyan}. Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Seleccione una opción: ', (opt) => {
            console.log({opt});
            readline.close();
            resolve(opt)
        });
    });


}

const pausa = () => {
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`Presione ${'ENTER'.cyan} para continuar.`, (opt) => {
            readline.close();
            resolve();
        });
    })

}

module.exports = {
    mostrar_menu,
    pausa
}