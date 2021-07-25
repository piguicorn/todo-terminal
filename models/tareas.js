const Tarea = require("./tarea");
require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor () {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []) {
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea( descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // 1. Tarea :: completada | Pendiente
        // completada en verde, pendiente en rojo

        this.listadoArr.forEach(( tarea, index ) => {

            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${(index+1+'.').green} ${descripcion} :: ${estado}`)
        });
    }

    listarPendientesCompletadas ( completadas = true ) {
        const listaFiltrada = this.listadoArr.filter(el => completadas ? el.completadoEn : !el.completadoEn);

        listaFiltrada.forEach(( tarea, index ) => {

            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${(index+1+'.').green} ${descripcion} :: ${estado}`)
        });
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach(id => {
            const tarea = this._listado[id];

            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;