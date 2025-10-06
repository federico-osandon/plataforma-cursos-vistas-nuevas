import React from "react";
import CursosList from "../../components/cursos/CursosList";
import AuthLayout from "../AuthPages/AuthPageLayout";

const cursos = [
  {
    id: 1,
    titulo: "React desde cero",
    descripcion: "Aprende React y desarrolla aplicaciones modernas.",
    imagen: "/images/cards/card-01.jpg",
  },
  {
    id: 2,
    titulo: "Node.js avanzado",
    descripcion: "Domina el backend con Node.js y Express.",
    imagen: "/images/cards/card-02.jpg",
  },
  {
    id: 3,
    titulo: "Diseño UX/UI",
    descripcion: "Crea interfaces atractivas y funcionales.",
    imagen: "/images/cards/card-03.jpg",
  },
  {
    id: 4,
    titulo: "Python para data science",
    descripcion: "Analiza datos y crea modelos predictivos con Python.",
    imagen: "/images/cards/card-04.jpg",
  },
];

export default function CursosPublicos() {
  return (   
    <div className="p-6" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
      <h1 className="text-2xl font-bold mb-6 text-white">
        Todos los cursos digitales
      </h1>
      <CursosList cursos={cursos} />
    </div>        
  );
}
