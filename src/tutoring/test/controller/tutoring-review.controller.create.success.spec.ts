// Simulación del sistema de reseñas
type Reseña = {
  id: string;
  tutorId: string;
  estudianteId: string;
  contenido: string;
  puntuación: number;
};

let reseñasDB: Reseña[] = [];

// 🟢 Publicar reseña
function publicarReseña(reseña: Reseña) {
  reseñasDB.push(reseña);
  return reseña;
}

// ✏️ Editar reseña
function editarReseña(id: string, nuevoContenido: string, nuevaPuntuación: number) {
  const reseña = reseñasDB.find(r => r.id === id);
  if (reseña) {
    reseña.contenido = nuevoContenido;
    reseña.puntuación = nuevaPuntuación;
  }
  return reseña;
}

// 👀 Visualizar reseñas por tutor
function obtenerReseñasPorTutor(tutorId: string) {
  return reseñasDB.filter(r => r.tutorId === tutorId);
}

// ❌ Eliminar reseña
function eliminarReseña(id: string) {
  const inicial = reseñasDB.length;
  reseñasDB = reseñasDB.filter(r => r.id !== id);
  return reseñasDB.length < inicial;
}

// ------------------ TESTS ------------------

describe('Sistema de reseñas de tutorías', () => {

  beforeEach(() => {
    reseñasDB = []; // Limpiar antes de cada test
  });

  it('🟢 debería publicar una reseña correctamente', () => {
    // Arrange
    const nuevaReseña: Reseña = {
      id: 'r1',
      tutorId: 't1',
      estudianteId: 'e1',
      contenido: 'Muy buen tutor',
      puntuación: 5,
    };

    // Act
    const resultado = publicarReseña(nuevaReseña);

    // Assert
    expect(resultado).toEqual(nuevaReseña);
    expect(reseñasDB.length).toBe(1);
  });

  it('✏️ debería editar una reseña existente', () => {
    // Arrange
    publicarReseña({ id: 'r1', tutorId: 't1', estudianteId: 'e1', contenido: 'Regular', puntuación: 3 });

    // Act
    const actualizada = editarReseña('r1', 'Excelente clase', 5);

    // Assert
    expect(actualizada?.contenido).toBe('Excelente clase');
    expect(actualizada?.puntuación).toBe(5);
  });

  it('👀 debería obtener las reseñas por tutor', () => {
    // Arrange
    publicarReseña({ id: 'r1', tutorId: 't1', estudianteId: 'e1', contenido: 'Genial', puntuación: 4 });
    publicarReseña({ id: 'r2', tutorId: 't1', estudianteId: 'e2', contenido: 'Muy claro', puntuación: 5 });
    publicarReseña({ id: 'r3', tutorId: 't2', estudianteId: 'e3', contenido: 'Confuso', puntuación: 2 });

    // Act
    const reseñasT1 = obtenerReseñasPorTutor('t1');

    // Assert
    expect(reseñasT1.length).toBe(2);
    expect(reseñasT1.every(r => r.tutorId === 't1')).toBe(true);
  });

  it('❌ debería eliminar una reseña por id', () => {
    // Arrange
    publicarReseña({ id: 'r1', tutorId: 't1', estudianteId: 'e1', contenido: 'Básico', puntuación: 3 });

    // Act
    const eliminada = eliminarReseña('r1');

    // Assert
    expect(eliminada).toBe(true);
    expect(reseñasDB.length).toBe(0);
  });
});
