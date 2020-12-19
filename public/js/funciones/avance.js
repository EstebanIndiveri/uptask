import Swal from "sweetalert2";

export const actualizarAvance=()=>{
    //select exist taks
    const tareas=document.querySelectorAll('li.tarea');

    if(tareas.length){

    //complete tasks
        const tareasCompletas=document.querySelectorAll('i.completo');

    //calcaular avancce
        const avance= Math.round((tareasCompletas.length / tareas.length ) * 100);

    //mostrar avance
    const porcentaje= document.querySelector("#porcentaje");
    porcentaje.style.width=avance+'%';

        if(avance===100){
            Swal.fire('¡Completaste el proyecto!')
        }
    }
   

}