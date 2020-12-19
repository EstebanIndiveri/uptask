import axios from "axios";

const tareas=document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click',e=>{
        if(e.target.classList.contains('fa-check-circle')){
            // console.log('actualizando');
            const icono=e.target;
            const idTarea=icono.parentElement.parentElement.dataset.tarea;
            console.log(idTarea);

            // req: /tareas/:id
            const url=`${location.origin}/tareas/${idTarea}`;
            // console.log(url);

            axios.patch(url,{idTarea}).then((res)=>{
                console.log(res);
                if(res.status===200){
                    icono.classList.toggle('completo');
                }
            })
        }
    })

}
export default tareas;