# Investigación de Mercados Efectiva · Parte 2 (Unidades 5 a 8)

Segunda aplicación web pedagógica del curso. Conserva la estructura, el código y el recorrido de la Parte 1 (unidades 1 a 4), con identidad visual propia (paleta índigo, magenta y aguamarina), avatares nuevos y el contenido de las unidades 5 a 8.

## Criterio académico

Toda la teoría, las actividades, las evaluaciones y las figuras se construyeron exclusivamente con los archivos entregados:

- `Libro PARTE1.docx.pdf` (Inteligencia en la Investigación de Mercados Efectiva, Parte 1): Unidad 5 (páginas 64 a 70 del PDF).
- `Libro PARTE2.docx.pdf` (Inteligencia en la Investigación de Mercados Efectiva, Parte 2): Unidad 6 (páginas 2 a 6), Unidad 7 (páginas 8 a 17) y Unidad 8 (páginas 19 a 27).

No se incorporaron fuentes teóricas de internet. Los videos, las diapositivas y las infografías se elaboraron para este proyecto a partir de esas páginas.

## Unidades

| Unidad | Tema | Recursos educativos |
| --- | --- | --- |
| 5 · Fase 4 | Medición y escalamiento | Video de 5 min y presentación de 10 diapositivas (caso de una cafetería) |
| 6 · Fase 5 | Diseño del cuestionario | Video de 5,5 min e infografía (cuestionario de ejemplo anotado) |
| 7 · Fase 6 | Diseño de la muestra | Video de 6 min e infografía (ocho técnicas de muestreo) |
| 8 · Fase 7 | Trabajo de campo | Video de 5,5 min e infografía (campaña de campo y tasas de desempeño) |

En cada unidad el estudiante sigue el mismo orden que en la Parte 1: proyecto aplicado, teoría, recursos educativos, dos actividades, y evaluación de diez preguntas (80 % para aprobar). Al aprobar cada unidad recibe una insignia; el certificado requiere aprobar las cuatro unidades y la evaluación final integradora.

## Recursos del libro (códigos QR)

Cinco destinos originales: cuatro videos y un podcast, leídos de los códigos QR de las páginas 65 (Parte 1) y 2, 8, 11 y 19 (Parte 2). Están en `assets/book/qr/` y se listan en `BOOK_MEDIA`.

## Simulador

Ocho decisiones que integran las cuatro unidades: estudio, escala, método de recolección, prueba piloto, técnica de muestreo, tamaño de la muestra, capacidad del campo y control del trabajo de campo. Cada elección modifica la coherencia con el estudio, la viabilidad (recursos y tiempo) y el perfil de calidad (precisión de la medición, representatividad y control de calidad).

## Acceso y guardado

El registro y el inicio de sesión usan Supabase con correo y contraseña (los mismos usuarios de la Parte 1). El progreso de esta parte se guarda por separado, en `localStorage` y en `user_metadata.market_research_course_p2_v1`, para no mezclarse con el de la Parte 1.

La clave incluida en el cliente es una clave pública `publishable`; no debe reemplazarse por una clave secreta o de servicio.

## Ejecutar localmente

Desde esta carpeta:

```powershell
python -m http.server 8080
```

Luego abre `http://127.0.0.1:8080/`.

## Estructura principal

- `index.html`: vistas y estructura accesible de la aplicación.
- `src/course-data-four.js`: contenido académico de las unidades 5 a 8, recursos, códigos QR, simulador y créditos.
- `src/main.js`: autenticación, progreso, actividades, evaluaciones, simulador y certificado.
- `src/styles.css`: sistema visual responsive (los colores están definidos en `:root`).
- `assets/characters/`: cuatro avatares vectoriales, cada uno con un rol de investigación de mercados (Vera, medición; Nico, cuestionario; Mila, muestra; Teo, campo).
- `assets/unit-5/` a `assets/unit-8/`: videos, diapositivas, infografías y portadas.
- `assets/book/`: figuras del libro y códigos QR originales.
- `assets/logos/`: logos institucionales para el pie de página y el certificado.
- `assets/libro-parte1.pdf` y `assets/libro-parte2.pdf`: libros para descargar desde la página de Fuentes.
- `vendor/jspdf.umd.min.js`: generación local del certificado.

## Actividades de las unidades

Los textos de cada actividad se pueden personalizar con el campo opcional `copy` de su definición (por ejemplo `pending`, `doneMessage`, `doneToast`), sin tocar el código.
