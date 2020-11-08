const { default: Swal } = require("sweetalert2");
import axios from 'axios';

const btnEliminar=document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click',(e)=>{
         const urlProyecto=e.target.dataset.proyectoUrl;
        //  console.log(urlProyecto);

        Swal.fire({
            title:'¿Estas seguro?',
            text:'El proyecto se eliminará totalmente',
            type:'warning',
            showCancelButton:true,
            confirmButtonColor:'#8A6AC7',
            cancelButtonColor:'#c17171',
            confirmButtonText:'Si, eliminar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.value){

                //petixión axios
                const url=`${location.origin}/proyectos/${urlProyecto}`
                // console.log(url);
                // return;
                axios.delete(url,{params:{urlProyecto}})
                    .then(function(resp){
                        // console.log(resp);
                        Swal.fire(
                            '¡Eliminado!',
                            'El proyecto se ha eliminado correctamente',
                            'success',
                        );
                        //redirect
                        setTimeout(() => {
                            window.location.href='/';
                        }, 1500);
                    }).catch(()=>{
                        Swal.fire({
                            type:'error',
                            title:'Hubo un error',
                            text:'No se pudo eliminar el proyecto'
                        })
                    })
            }
        })
    })
}
export default btnEliminar;