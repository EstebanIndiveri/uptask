import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../funciones/avance';


const tareas=document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click',e=>{
        if(e.target.classList.contains('fa-check-circle')){
            // console.log('actualizando');
            const icono=e.target;
            const idTarea=icono.parentElement.parentElement.dataset.tarea;
            const nameTarea=icono.parentElement.parentElement.dataset.name;
            // console.log(idTarea);
            // console.log(nameTarea);

            // req: /tareas/:id
            const url=`${location.origin}/tareas/${idTarea}`;
            // console.log(url);

            axios.patch(url,{idTarea}).then((res)=>{
                // console.log(res);
                if(res.status===200){
                    icono.classList.toggle('completo');
                    actualizarAvance();
                }
            })
        }
        if(e.target.classList.contains('fa-trash')){
            const tareaHtml=e.target.parentElement.parentElement;
            const idTarea=tareaHtml.dataset.tarea
            const nameTarea=tareaHtml.dataset.name;
            // console.log(tareaHtml);
            // console.log(idTarea);
            Swal.fire({
                title:'¿Desea borrar esta tarea?',
                text:'La tarea se eliminará permanentemente',
                type:'warning',
                showCancelButton:true,
                confirmButtonColor:'#8A6AC7',
                cancelButtonColor:'#c17171',
                confirmButtonText:'Si, eliminar',
                cancelButtonText:'Cancelar'
            }).then((result)=>{
                if(result.value){
                    //Delete por axios
                    const url=`${location.origin}/tareas/${idTarea}`;
                    axios.delete(url,{params:{idTarea,nameTarea}}).then((res)=>{
                        if(res.status===200){
                            tareaHtml.parentElement.removeChild(tareaHtml)
                            let mensajeBack=res.data;
                            let newMsj=mensajeBack.split("//");
                            // console.log(newMsj)
                            let titleMsj=newMsj[0];
                            // let nameTaskMsj=newMsj[1];
                            let statusOk=newMsj[1];
                            Swal.fire({
                                icon:'success',
                                title:'Tarea Eliminada',
                                html:`<b>${titleMsj}</b> <br> ${statusOk}`
                            });
                            actualizarAvance();
                        }
                    })
                }
            })
        }
    })

}
export default tareas;