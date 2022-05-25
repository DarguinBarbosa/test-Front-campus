export interface course{
    id_curso?:number
    nombre_curso:string 
    calificacion:string 
    descripcion_contenido:string 
    areas_BP:string
    areas_OP :string
    cargo_BP:string
    cargo_OP :string
    HCertificado:number
    C_P_evalucion:number
    Ciudad:string
    T_M_Evaluacion:number
    observaciones:string
    nombre:string
    apellidos:string
    correos:string
    modulo?:number
    archivos?:string
    urlArchivo?:string
}

export interface Module{
    id_modulo?:number
    descripcion_m:string 
    tema?:number 
}

export interface Route{
    id_ruta?:number
    nombre_ruta:string 
}


export interface Topic{
    id_tema?:number
    nombre_tema:string 
    ruta:number
}