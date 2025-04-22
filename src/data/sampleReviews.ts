import { Review } from "@/types/review";

export const sampleReviews: Review[] = [
  {
    id: "1",
    title: "Invincible",
    type: "series",
    director: "Robert Kirkman",
    year: 2021,
    rating: 5,
    review: `Opinión:
Una serie de superhéroes que revoluciona el género con una historia madura y brutalmente honesta. La animación es espectacular y la narrativa te mantiene al borde del asiento.

Positivo:
- Animación fluida y escenas de acción impactantes
- Desarrollo profundo de personajes y relaciones familiares
- Giros argumentales sorprendentes y consecuencias reales
- Excelente balance entre drama personal y acción superheroica

Negativo:
- Algunas subtramas secundarias quedan sin resolver
- La violencia gráfica puede ser excesiva para algunos espectadores

¿Lo volvería a ver?
¡Absolutamente! Cada episodio tiene capas de detalles que se aprecian mejor en una segunda vista, especialmente conociendo los giros de la trama.`,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNWYwYjAyMzgtNzQyNC00M2JiLWI2ZTQtNzRmZThmOTk4NmRmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    dateWatched: new Date("2023-12-15"),
    createdAt: new Date("2023-12-16"),
    tags: ["superhéroes", "animación", "drama", "acción"]
  },
  {
    id: "2",
    title: "Arcane",
    type: "series",
    director: "Pascal Charrue, Arnaud Delord",
    year: 2021,
    rating: 5,
    review: `Opinión:
Una obra maestra de la animación que trasciende su origen como adaptación de videojuego. La historia de Vi y Jinx es emotiva y desgarradora, con una producción visual sin precedentes.

Positivo:
- Animación revolucionaria que mezcla 2D y 3D
- Banda sonora excepcional
- Desarrollo profundo de personajes y conflictos
- Worldbuilding detallado y fascinante

Negativo:
- La espera entre temporadas es demasiado larga
- Algunas tramas políticas pueden ser complejas de seguir

¿Lo volvería a ver?
Sin duda. Cada escena está tan cuidadosamente elaborada que siempre descubres nuevos detalles y simbolismos.`,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYmU5OWM5ZTAtNjUzOC00NmUyLTgyOWMtMjlkNjdlMDAzMzU1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    dateWatched: new Date("2023-11-20"),
    createdAt: new Date("2023-11-21"),
    tags: ["animación", "fantasía", "drama", "videojuegos"]
  },
  {
    id: "3",
    title: "The Walking Dead",
    type: "series",
    director: "Frank Darabont",
    year: 2010,
    rating: 5,
    review: `Opinión:
Una serie que redefinió el género zombie, centrándose en el drama humano y la supervivencia. A pesar de sus altibajos, mantiene una calidad consistente en la exploración de la naturaleza humana.

Positivo:
- Desarrollo excepcional de personajes a lo largo de las temporadas
- Efectos especiales y maquillaje de zombies increíbles
- Momentos dramáticos memorables
- Exploración profunda de la moral en situaciones extremas

Negativo:
- Algunas temporadas tienen ritmo irregular
- Pérdida de personajes importantes puede ser frustrante

¿Lo volvería a ver?
Sí, especialmente las primeras temporadas. La evolución de los personajes cobra más sentido conociendo su destino final.`,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    dateWatched: new Date("2023-10-01"),
    createdAt: new Date("2023-10-02"),
    tags: ["zombies", "drama", "horror", "supervivencia"]
  },
  {
    id: "4",
    title: "Spider-Man",
    type: "movie",
    director: "Sam Raimi",
    year: 2002,
    rating: 5,
    review: `Opinión:
La película que estableció el estándar para el cine de superhéroes moderno. Tobey Maguire encarna perfectamente la dualidad de Peter Parker/Spider-Man en una historia que equilibra acción y corazón.

Positivo:
- Efectos especiales que se mantienen sorprendentemente bien
- Actuaciones memorables, especialmente Willem Dafoe como Green Goblin
- Banda sonora icónica de Danny Elfman
- Historia de origen perfectamente ejecutada

Negativo:
- Algunos diálogos pueden parecer cursis hoy en día
- CGI ocasionalmente datado

¿Lo volvería a ver?
¡Por supuesto! Es un clásico que no pierde su encanto y establece las bases del género.`,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg",
    dateWatched: new Date("2023-09-15"),
    createdAt: new Date("2023-09-16"),
    tags: ["superhéroes", "acción", "aventura", "clásico"]
  },
  {
    id: "5",
    title: "Spider-Man: Into the Spider-Verse",
    type: "movie",
    director: "Peter Ramsey, Bob Persichetti, Rodney Rothman",
    year: 2018,
    rating: 5,
    review: `Opinión:
Una revolución en la animación cinematográfica que reinventa la historia de Spider-Man. Miles Morales brilla como protagonista en una aventura que celebra la esencia del personaje.

Positivo:
- Estilo visual revolucionario y único
- Historia emotiva y bien estructurada
- Excelente banda sonora
- Humor inteligente y referencias bien integradas

Negativo:
- El estilo visual puede ser abrumador inicialmente
- Algunas subtramas secundarias podrían desarrollarse más

¿Lo volvería a ver?
Definitivamente. Cada visionado revela nuevos detalles visuales y referencias ocultas.`,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg",
    dateWatched: new Date("2023-08-20"),
    createdAt: new Date("2023-08-21"),
    tags: ["animación", "superhéroes", "acción", "multiverso"]
  },
  {
    id: "6",
    title: "Spider-Man: Across the Spider-Verse",
    type: "movie",
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    year: 2023,
    rating: 5,
    review: `Opinión:
Una secuela que supera a su predecesora en ambición y ejecución. Expande el multiverso de Spider-Man de formas sorprendentes mientras mantiene el foco en el desarrollo emocional de Miles.

Positivo:
- Animación aún más impresionante y variada
- Profundización en los temas de identidad y responsabilidad
- Diseños de personajes y universos creativos
- Desarrollo emocional complejo de los personajes

Negativo:
- La trama puede ser confusa para quienes no están familiarizados con el material
- El final en suspenso puede frustrar a algunos

¿Lo volvería a ver?
¡Sin duda! La densidad visual y narrativa hace que cada visionado sea una nueva experiencia.`,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg",
    dateWatched: new Date("2023-06-01"),
    createdAt: new Date("2023-06-02"),
    tags: ["animación", "superhéroes", "acción", "multiverso"]
  }
];
