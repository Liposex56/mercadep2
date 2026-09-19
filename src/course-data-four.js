window.COURSE_CREDITS = [
  {
    name: "Mg. Jhonn Jairo Angarita López",
    role: "Docente · Universidad Pedagógica y Tecnológica de Colombia (UPTC)",
    summary: "Trabaja en gerencia estratégica, gerencia de mercados, investigación aplicada, TIC en educación y modernización de la gestión pública.",
    credentials: [
      "Administrador de Empresas · Especialista en Informática para la Docencia",
      "Magíster en TIC Aplicadas a la Educación · Magíster en Administración",
      "En formación doctoral en Administración"
    ],
    more: "Su experiencia articula los ámbitos académico, empresarial y público, con énfasis en el diseño, la implementación y la evaluación de estrategias orientadas al fortalecimiento institucional y al desarrollo territorial. Abarca administración, gestión humana, gerencia estratégica y de mercados, investigación, tecnologías de la información y la comunicación, formulación de políticas públicas y gestión organizacional. Ha formulado y estructurado políticas públicas, modelos de gestión y estrategias de fortalecimiento institucional en el sector público bajo los lineamientos del Modelo Integrado de Planeación y Gestión (MIPG), orientando su trabajo hacia la generación de valor público, el mejoramiento continuo y la toma de decisiones basada en evidencia."
  },
  {
    name: "Fabio Camargo Morales",
    role: "Profesor titular · Universidad Pedagógica y Tecnológica de Colombia (UPTC)",
    summary: "Articula la gestión universitaria, el mercadeo, la administración, la investigación y la innovación pedagógica.",
    credentials: [
      "Profesional en Administración Industrial · Especialista en Alta Gerencia en Mercadotecnia",
      "Magíster en Educación",
      "ORCID: 0000-0003-1470-8539"
    ],
    more: "En la UPTC ha sido Director de la Escuela de Administración de Empresas, Director de Investigaciones, Director de Posgrados y Decano de la Facultad Seccional Chiquinquirá (2022-2026). Su línea de investigación abarca administración y mercadeo, educación, pensamiento crítico, innovación pedagógica, TIC, realidad aumentada y ambientes virtuales de aprendizaje. Entre sus publicaciones figuran trabajos sobre marketing con realidad aumentada, didácticas para la enseñanza de la Administración, formación docente en pensamiento crítico y comercialización de productos regionales; es coautor del libro «Potenciando Inteligencias Colectivas con Herramientas» (Editorial UPTC) y creador del Seminario Internacional y la Feria Empresarial Universitaria."
  },
  {
    name: "PhD. Olga Nájar Sánchez",
    role: "Docente · Universidad Pedagógica y Tecnológica de Colombia (UPTC)",
    summary: "Investiga en TIC aplicadas a la educación, ambientes virtuales de aprendizaje, gestión del conocimiento y sociedad del conocimiento.",
    credentials: [
      "Ingeniera de Sistemas · Especialista en Informática para la Docencia",
      "Magíster en Tecnologías de la Información Aplicadas a la Educación",
      "Doctorado en Formación en la Sociedad del Conocimiento"
    ],
    more: "Coordina el grupo de investigación en Ambientes Educativos Virtuales de la UPTC y la línea de investigación en TIC aplicadas a la educación de las maestrías en Educación y en Ambientes Educativos mediados por TIC. En la UPTC se ha desempeñado como Decana de la Facultad de Ciencias de la Educación y como Vicerrectora Académica. Ha participado como investigadora principal y coinvestigadora en proyectos de cooperación con la Universidad Carlos III de Madrid, con énfasis en software educativo, entornos virtuales de aprendizaje y gestión del conocimiento."
  }
];
window.COURSE_DATA = [
  {
    id: 5,
    phase: "Fase 4",
    title: "Medición y escalamiento",
    short: "Aprende a asignar números o etiquetas a los atributos que interesan al estudio y a elegir la escala y la técnica de escalamiento adecuadas.",
    source: "Libro PARTE1.docx.pdf",
    pages: "PDF, páginas 64-70",
    figure: {
      src: "assets/book/parte1-p067-escalas-basicas.png",
      alt: "Ilustración de las escalas básicas de medición: nominal, ordinal, de intervalo y de razón",
      caption: "Las cuatro escalas básicas de medición"
    },
    project: {
      title: "Define cómo vas a medir",
      context: "Ya tienes el problema, el diseño y el plan de información de tu investigación. Ahora debes decidir qué característica medirás y con qué escala.",
      task: "Elige un atributo de tu estudio (por ejemplo satisfacción, preferencia o imagen de marca), decide si necesita una o varias dimensiones y selecciona la escala básica y la técnica de escalamiento que usarás.",
      deliverable: "Ficha de medición: atributo, dimensiones, escala básica, técnica de escalamiento y forma de registrar la respuesta.",
      prompts: [
        "¿Qué atributo o característica medirás y por qué interesa a la decisión de tu estudio?",
        "¿Tu medición necesita una o varias dimensiones? Justifica tu respuesta con un ejemplo.",
        "¿Qué escala básica y qué técnica de escalamiento usarás, y cómo registrará su respuesta cada participante?"
      ]
    },
    theory: [
      {
        id: "5.1",
        title: "Medición y escalas",
        content: `<p>La medición es el proceso de asignar números o etiquetas a las características de objetos o personas siguiendo reglas previamente establecidas. El objetivo no es medir a las personas o cosas en sí mismas, sino las propiedades o atributos que interesan al investigador. Las reglas funcionan como una guía que indica qué hacer en cada paso del proceso.</p><p>Escalar consiste en generar un continuo sobre el cual se ubican los objetos medidos. Las escalas pueden ser <strong>unidimensionales</strong>, cuando miden un solo atributo (por ejemplo, la sensibilidad al precio con una sola pregunta o con varios ítems que se suman en un índice), o <strong>multidimensionales</strong>, cuando captan varias dimensiones de un mismo concepto (por ejemplo, la imagen de marca en términos de prestigio, innovación, confianza y cercanía al consumidor).</p>`
      },
      {
        id: "5.2",
        title: "Escalas básicas de medición",
        content: `<p>Existen cuatro escalas básicas, de la que menos información aporta a la que más aporta:</p><p><strong>Nominal.</strong> Los números funcionan solo como etiquetas o identificadores; no hay orden ni distancia entre ellos. Las categorías son mutuamente excluyentes y colectivamente exhaustivas. Ejemplos: el número de cédula, el código postal o la marca preferida.</p><p><strong>Ordinal.</strong> Permite establecer un orden o jerarquía, pero las diferencias entre los rangos no son necesariamente iguales. Ejemplos: las posiciones en una carrera, las escalas de preferencia («más gustado / menos gustado») o los niveles socioeconómicos.</p><p><strong>De intervalo.</strong> Las distancias numéricas entre los puntos son iguales y el cero es arbitrario; permite comparar diferencias entre los objetos, pero no proporciones. Ejemplo: calificar el desempeño en una escala de 0 a 10.</p><p><strong>De razón.</strong> Es la escala más completa: tiene un cero absoluto que indica ausencia total de la característica. Permite clasificar, ordenar, medir diferencias y calcular proporciones. Ejemplos: la edad, los ingresos, el número de unidades compradas o el tiempo de consumo.</p>`
      },
      {
        id: "5.3",
        title: "Técnicas de escalamiento",
        content: `<p><strong>Escalas comparativas.</strong> El entrevistado juzga un objeto frente a otro u otros dentro de un mismo conjunto de estímulos; los resultados son ordinales y deben interpretarse de manera relativa. Incluyen la <em>comparación pareada</em> (se presentan dos estímulos y se elige cuál posee más la característica), la <em>clasificación por orden</em> (ordenar varios elementos de mayor a menor) y la <em>suma constante</em> (distribuir un total fijo, generalmente 100 puntos, entre varios atributos).</p><p><strong>Escalas no comparativas.</strong> Cada estímulo se califica de forma independiente y, por regla general, los datos se tratan como de intervalo. Pueden ser de <em>clasificación continua</em> (una marca sobre una línea entre dos extremos opuestos) o <em>por reactivos</em>, con tres variantes: <strong>Likert</strong> (grado de acuerdo, normalmente en cinco categorías, de «totalmente en desacuerdo» a «totalmente de acuerdo»), <strong>diferencial semántico</strong> (siete puntos entre adjetivos opuestos; al graficar las medias se obtiene un perfil perceptual) y <strong>Stapel</strong> (escala vertical con un solo adjetivo y valores de +5 a −5).</p>`
      }
    ],
    resources: [
      {
        id: "u5-video-medicion",
        type: "video",
        title: "Medición y escalamiento",
        description: "Video narrado de cinco minutos sobre el concepto de medición, las cuatro escalas básicas y las técnicas de escalamiento comparativas y no comparativas.",
        src: "assets/unit-5/medicion-y-escalamiento.mp4",
        poster: "assets/unit-5/portada-video-medicion.jpg",
        source: "Recurso educativo · Unidad 5"
      },
      {
        id: "u5-gallery-escalas",
        type: "gallery",
        title: "Diapositivas: del atributo a la escala",
        description: "Presentación de diez diapositivas que recorre la medición, las escalas básicas y las técnicas de escalamiento con ejemplos.",
        preview: "assets/unit-5/portada-diapositivas.png",
        slides: Array.from({ length: 10 }, (_, index) => `assets/unit-5/slides/slide-${String(index + 1).padStart(2, "0")}.png`),
        note: "La presentación reúne las diez ideas centrales de la Unidad 5, en el mismo orden de la teoría.",
        source: "Recurso educativo · Unidad 5"
      }
    ],
    activities: [
      {
        id: "u5-escalas",
        type: "sort",
        icon: "▦",
        title: "Clasifica por tipo de escala",
        instruction: "Ubica cada ejemplo en la escala básica de medición a la que corresponde: nominal, ordinal, de intervalo o de razón.",
        tip: "Pregúntate qué permite hacer el número: solo identificar (nominal), ordenar (ordinal), comparar diferencias con un cero arbitrario (intervalo) o calcular proporciones porque el cero indica ausencia total (razón).",
        copy: {
          itemsLabel: "Ejemplos de medición",
          pending: "Selecciona un ejemplo y después la escala que le corresponde.",
          doneMessage: "Todos los ejemplos están en su escala.",
          doneToast: "¡Clasificación de escalas correcta!"
        },
        categories: [
          { id: "nominal", label: "Nominal" },
          { id: "ordinal", label: "Ordinal" },
          { id: "intervalo", label: "De intervalo" },
          { id: "razon", label: "De razón" }
        ],
        items: [
          { id: "cedula", text: "Número de cédula de cada encuestado", category: "nominal" },
          { id: "marca", text: "Marca de gaseosa preferida", category: "nominal" },
          { id: "carrera", text: "Puesto de llegada en una carrera: primero, segundo, tercero", category: "ordinal" },
          { id: "socio", text: "Nivel socioeconómico del hogar", category: "ordinal" },
          { id: "desempeno", text: "Calificación del desempeño de un vendedor de 0 a 10", category: "intervalo" },
          { id: "semantico", text: "Puntaje de 1 a 7 de un anuncio entre dos adjetivos opuestos", category: "intervalo" },
          { id: "unidades", text: "Número de unidades compradas en el mes", category: "razon" },
          { id: "ingreso", text: "Ingreso mensual del hogar en pesos", category: "razon" }
        ]
      },
      {
        id: "u5-tecnicas",
        type: "method",
        icon: "⚖",
        title: "Elige la técnica de escalamiento",
        instruction: "Para cada situación de medición, selecciona la técnica de escalamiento que se está aplicando.",
        tip: "Fíjate en cómo responde el participante: si compara estímulos entre sí es una escala comparativa; si califica cada estímulo por separado es no comparativa. Luego busca la pista: «distribuir 100 puntos», «ordenar de mayor a menor», «adjetivos opuestos», «de +5 a −5»…",
        copy: {
          itemLabel: "Situación",
          selectPlaceholder: "Selecciona una técnica",
          checkLabel: "Comprobar técnicas",
          pending: "Elige la técnica de escalamiento para cada situación.",
          doneMessage: "Cada situación tiene su técnica de escalamiento.",
          missToast: "Algunas técnicas no corresponden a la situación.",
          doneToast: "¡Técnicas de escalamiento identificadas!"
        },
        methods: ["Comparación pareada", "Clasificación por orden", "Suma constante", "Escala de Likert", "Diferencial semántico", "Escala de Stapel", "Clasificación continua"],
        cases: [
          { id: "pareada", need: "Se muestran dos productos a la vez y se pregunta cuál tiene en mayor grado la característica de interés.", correct: 0 },
          { id: "orden", need: "Se pide ordenar varias marcas de la más preferida a la menos preferida.", correct: 1 },
          { id: "suma", need: "Se pide repartir 100 puntos entre varios atributos según la importancia de cada uno.", correct: 2 },
          { id: "likert", need: "Se mide el grado de acuerdo con afirmaciones, de 1 (totalmente en desacuerdo) a 5 (totalmente de acuerdo).", correct: 3 },
          { id: "semantica", need: "Se evalúa un concepto en siete puntos entre pares de adjetivos opuestos y se grafican las medias.", correct: 4 },
          { id: "stapel", need: "Se califica de +5 a −5 qué tan bien un adjetivo describe una marca.", correct: 5 }
        ]
      }
    ],
    badge: { icon: "⚖", title: "Maestro de la medición", description: "Distinguiste las escalas básicas y elegiste la técnica de escalamiento adecuada para cada necesidad." },
    support: [
      { q: "¿Qué diferencia hay entre medir y escalar?", a: "Medir es asignar números o etiquetas a los atributos que interesan siguiendo reglas establecidas; escalar es generar un continuo sobre el cual se ubican los objetos medidos." },
      { q: "¿Cómo distingo las cuatro escalas básicas?", a: "Pregunta qué permite hacer el número: identificar (nominal), ordenar (ordinal), comparar diferencias con un cero arbitrario (intervalo) o calcular proporciones porque el cero es absoluto (razón)." }
    ],
    quiz: [
      { q: "En investigación de mercados, medir consiste en:", options: ["Medir a las personas o a los objetos en sí mismos para clasificarlos", "Preguntar la opinión de los encuestados sin reglas previas", "Asignar números o etiquetas a las características de objetos o personas siguiendo reglas establecidas", "Calcular el tamaño de la población que se estudiará"], correct: 2, feedback: "La medición asigna números o etiquetas a los atributos que interesan al investigador, siguiendo reglas previamente establecidas; no mide a las personas o cosas en sí mismas." },
      { q: "¿Cuál escala tiene un cero absoluto que indica ausencia total de la característica medida?", options: ["La escala de razón", "La escala nominal", "La escala ordinal", "La escala de intervalo"], correct: 0, feedback: "La escala de razón es la más completa: por su cero absoluto permite clasificar, ordenar, medir diferencias y calcular proporciones, como en la edad o los ingresos." },
      { q: "En una escala nominal, los números funcionan como:", options: ["Distancias iguales entre las categorías", "Etiquetas o identificadores, sin orden ni distancia entre ellos", "Posiciones ordenadas de mayor a menor", "Cantidades con las que se calculan proporciones"], correct: 1, feedback: "En la escala nominal los números solo identifican categorías (como el número de cédula o el código postal); no indican orden ni distancia." },
      { q: "Una escala de Likert de cinco categorías mide principalmente:", options: ["El orden en que el encuestado clasifica varias marcas", "La distribución de 100 puntos entre varios atributos", "El grado de acuerdo o desacuerdo con una serie de afirmaciones", "La posición de una marca entre adjetivos opuestos"], correct: 2, feedback: "La escala de Likert mide el grado en que la persona está de acuerdo o en desacuerdo con afirmaciones favorables o desfavorables hacia el objeto de estudio." },
      { q: "¿Qué distingue a las escalas comparativas de las no comparativas?", options: ["En las comparativas el encuestado juzga un objeto frente a otros; en las no comparativas cada estímulo se califica de forma independiente", "Las comparativas usan siempre siete puntos y las no comparativas cinco", "Las comparativas solo se usan en encuestas por internet", "Las comparativas tienen cero absoluto y las no comparativas no"], correct: 0, feedback: "En las escalas comparativas se juzga un objeto frente a otros y los resultados se interpretan de manera relativa; en las no comparativas cada estímulo se califica por separado." }
    ]
  },
  {
    id: 6,
    phase: "Fase 5",
    title: "Diseño del cuestionario",
    short: "Construye un cuestionario que reduzca el error de respuesta, desde la información requerida hasta la prueba piloto.",
    source: "Libro PARTE2.docx.pdf",
    pages: "PDF, páginas 2-6",
    figure: {
      src: "assets/unit-6/figura-embudo-cuestionario.png",
      alt: "Esquema del orden de las preguntas de un cuestionario con enfoque de embudo",
      caption: "El orden del cuestionario: de lo general a lo específico"
    },
    project: {
      title: "Diseña el cuestionario de tu estudio",
      context: "Ya sabes qué vas a medir y con qué escala. Ahora debes convertir esa medición en preguntas claras, ordenadas y probadas.",
      task: "Define la información que necesitas y el método de recolección, redacta tres preguntas de distinto tipo evitando términos ambiguos y decide en qué orden las presentarás y cómo harás la prueba piloto.",
      deliverable: "Borrador del cuestionario: información requerida, método de recolección, tres preguntas redactadas, orden y plan de prueba piloto.",
      prompts: [
        "¿Qué información necesitas obtener y con qué método de recolección aplicarás el cuestionario?",
        "Redacta tres preguntas de tu estudio: una de opción múltiple, una dicotómica y una de escala. Evita términos ambiguos.",
        "¿En qué orden presentarás las preguntas y cómo harás la prueba piloto (a quiénes y cuántas personas)?"
      ]
    },
    theory: [
      {
        id: "6.1",
        title: "Concepto y primeros pasos",
        content: `<p>Un cuestionario es una técnica estructurada de recolección de datos que consiste en una serie de preguntas, orales o escritas, que los encuestados deben responder. Un buen cuestionario ofrece a la gerencia información útil para decidir, cumple los requisitos de edición, codificación y procesamiento de datos, y reduce al mínimo el <strong>error de respuesta</strong>: la diferencia entre las respuestas verdaderas y las que finalmente quedan registradas.</p><p>El diseño avanza por pasos. (1) <strong>Especificar la información requerida</strong>: se construye un modelo del problema con sus componentes y variables. (2) <strong>Elegir el método de recolección</strong>: entrevista personal, cuestionario autoaplicado, encuesta telefónica o encuesta por internet. (3) <strong>Determinar el contenido de las preguntas</strong>: toda pregunta debe tener un propósito claro y evitar preguntas dobles o que induzcan respuestas sesgadas. (4) <strong>Superar la incapacidad o falta de disposición</strong> del encuestado para responder: con preguntas más sencillas, menor esfuerzo mental y ejemplos que faciliten la respuesta.</p>`
      },
      {
        id: "6.2",
        title: "Estructura y redacción de las preguntas",
        content: `<p>Las preguntas pueden ser <strong>no estructuradas</strong>, cuando el entrevistado responde con sus propias palabras (por ejemplo, «¿Qué opina del nuevo servicio de delivery?»), o <strong>estructuradas</strong>, cuando presentan alternativas de respuesta predefinidas: de <em>opción múltiple</em> (se elige una o más alternativas), <em>dicotómicas</em> (solo dos opciones, como sí o no) y <em>de escala</em> (capturan la intensidad del sentimiento del entrevistado).</p><p>Para redactarlas y evitar errores en las respuestas, Malhotra recomienda: definir el tema en términos de quién, qué, dónde y cuándo; emplear un vocabulario adecuado al nivel educativo de los encuestados; evitar términos ambiguos o de doble sentido, como «ocasionalmente», «a veces», «a menudo» o «regularmente»; evitar las preguntas inductoras, que llevan a responder de cierta manera; y utilizar enunciados tanto positivos como negativos.</p>`
      },
      {
        id: "6.3",
        title: "Orden, formato y prueba piloto",
        content: `<p>Para <strong>ordenar</strong> las preguntas: las iniciales deben ser interesantes, sencillas y no intimidantes, y a veces requieren un filtro para calificar al encuestado. Existen tres clases de información: <em>básica</em> (el tema de estudio), <em>de clasificación</em> (edad, nivel socioeconómico, género, estado civil) y <em>de identificación</em> (nombre, dirección, correo, teléfono). Las preguntas delicadas, incómodas o aburridas nunca van al inicio. Se sigue el <strong>enfoque de embudo</strong>, de lo general a lo específico, para que las respuestas detalladas no influyan en las amplias, y se agota cada tema antes de pasar al siguiente, con cuidado en las preguntas de filtro o ramificadas.</p><p>Luego se elige el <strong>formato y el diseño gráfico</strong> (secciones claras, preguntas numeradas y un número único por cuestionario) y se cuida su <strong>reproducción</strong>: buena presentación, columnas para preguntas con muchas opciones y sin amontonar preguntas. Antes de lanzarlo se hace una <strong>prueba piloto</strong> con 15 a 30 personas parecidas a las que responderán la encuesta real: se prueba todo (contenido, redacción, orden, formato, dificultad e instrucciones) y, tras cada revisión importante, se repite con una nueva muestra.</p>`
      }
    ],
    resources: [
      {
        id: "u6-video-cuestionario",
        type: "video",
        title: "Diseño del cuestionario",
        description: "Video narrado de cinco minutos y medio sobre el error de respuesta, los nueve pasos del diseño, el tipo de preguntas, el orden en embudo y la prueba piloto.",
        src: "assets/unit-6/diseno-del-cuestionario.mp4",
        poster: "assets/unit-6/portada-video-cuestionario.jpg",
        source: "Recurso educativo · Unidad 6"
      },
      {
        id: "u6-infografia-cuestionario",
        type: "image",
        title: "Ruta visual del diseño del cuestionario",
        description: "Infografía panorámica con los nueve pasos del diseño, los tipos de pregunta, las reglas de redacción y el orden del cuestionario.",
        src: "assets/unit-6/infografia-diseno-cuestionario.png",
        preview: "assets/unit-6/infografia-diseno-cuestionario.png",
        source: "Infografía educativa · Unidad 6"
      }
    ],
    activities: [
      {
        id: "u6-pasos",
        type: "sequence",
        icon: "↕",
        title: "Ordena los pasos del diseño",
        instruction: "Selecciona los nueve pasos del proceso de diseño de un cuestionario en el orden en que deben realizarse.",
        tip: "Piensa en lo que necesitas saber antes de cada paso: primero qué información hace falta y cómo la recolectarás; después qué se pregunta y cómo se redacta; al final cómo se ordena, se presenta y se reproduce.",
        copy: {
          doneToast: "¡Proceso de diseño en el orden correcto!"
        },
        items: [
          { id: "informacion", text: "Especificar la información requerida" },
          { id: "metodo", text: "Elegir el método de recolección de datos" },
          { id: "contenido", text: "Determinar el contenido de las preguntas" },
          { id: "disposicion", text: "Superar la incapacidad o falta de disposición para responder" },
          { id: "estructura", text: "Establecer la estructura de las preguntas" },
          { id: "redaccion", text: "Determinar la redacción de las preguntas" },
          { id: "orden", text: "Organizar las preguntas en el orden adecuado" },
          { id: "formato", text: "Elegir el formato y el diseño gráfico" },
          { id: "reproduccion", text: "Reproducir el cuestionario" }
        ]
      },
      {
        id: "u6-preguntas",
        type: "audit",
        icon: "✎",
        title: "Revisa la redacción de las preguntas",
        instruction: "Lee cada pregunta y decide si puede conservarse tal como está o si debe reformularse antes de la prueba piloto.",
        tip: "Una pregunta bien redactada trata un solo asunto, usa palabras claras para los encuestados, evita términos como «a menudo» o «a veces» y no sugiere la respuesta. Si falla en alguno de esos puntos, hay que reformularla.",
        copy: {
          useLabel: "Conservar la pregunta",
          rejectLabel: "Reformular la pregunta",
          pending: "Evalúa si cada pregunta es clara, de un solo asunto y sin inducir la respuesta.",
          doneMessage: "Las cuatro preguntas fueron evaluadas correctamente.",
          retryMessage: "Revisa cada pregunta: ¿trata un solo tema, es clara y no sugiere la respuesta?",
          doneToast: "¡Revisión de preguntas completada!"
        },
        sources: [
          { id: "doble", title: "«¿Le gustan el precio y la calidad de nuestros productos?»", detail: "Pregunta con dos temas en una sola respuesta posible.", correct: "reject", feedback: "Es una pregunta doble: si a la persona le gusta la calidad pero no el precio, no sabría cómo responder. Conviene separarla en dos preguntas." },
          { id: "ambigua", title: "«¿Compra usted productos orgánicos a menudo?»", detail: "Usa un término de frecuencia sin definir cuántas veces.", correct: "reject", feedback: "«A menudo» es un término ambiguo: cada persona lo interpreta distinto. Es mejor preguntar por una frecuencia concreta, por ejemplo, cuántas veces al mes." },
          { id: "inductora", title: "«¿No cree que nuestro excelente servicio merece la máxima calificación?»", detail: "Incluye un juicio favorable antes de pedir la opinión.", correct: "reject", feedback: "Es una pregunta inductora: sugiere la respuesta esperada. Debe formularse de manera neutral." },
          { id: "clara", title: "«¿Cuántas veces al mes compra usted productos de aseo en supermercado?»", detail: "Define el tema, la frecuencia y el lugar de compra.", correct: "use", feedback: "Está bien formulada: trata un solo asunto, define quién, qué, dónde y cuándo, y usa un vocabulario sencillo." }
        ]
      }
    ],
    badge: { icon: "✎", title: "Arquitecto de cuestionarios", description: "Ordenaste el proceso de diseño y detectaste preguntas mal formuladas." },
    support: [
      { q: "¿Por qué es importante la prueba piloto?", a: "Porque permite detectar y corregir preguntas confusas, instrucciones poco claras y errores de diseño antes de aplicar el cuestionario definitivo, con un grupo de 15 a 30 personas parecidas a las que responderán." },
      { q: "¿En qué orden van las preguntas?", a: "De lo general a lo específico, como un embudo. Las iniciales deben ser sencillas y no intimidantes; las delicadas, como ingresos o datos personales, van hacia el final." }
    ],
    quiz: [
      { q: "Uno de los objetivos clave al diseñar un cuestionario es:", options: ["Aumentar el número de preguntas abiertas", "Reducir el error de respuesta, es decir, la diferencia entre las respuestas verdaderas y las registradas", "Evitar que los encuestados conozcan el tema del estudio", "Sustituir la prueba piloto por una revisión interna"], correct: 1, feedback: "Reducir el error de respuesta es uno de los objetivos clave: busca que lo registrado se parezca lo más posible a lo que el encuestado realmente piensa o hace." },
      { q: "¿Qué debe hacerse primero al desarrollar un cuestionario?", options: ["Redactar las preguntas definitivas", "Imprimir y numerar los cuestionarios", "Realizar la prueba piloto", "Especificar la información requerida"], correct: 3, feedback: "El primer paso es especificar la información requerida: se construye un modelo del problema con sus componentes y variables para saber qué datos hacen falta." },
      { q: "Una pregunta que ofrece solo dos alternativas de respuesta, como sí o no, es:", options: ["De opción múltiple", "Dicotómica", "No estructurada", "De escala"], correct: 1, feedback: "Las preguntas dicotómicas ofrecen solo dos opciones. Las de opción múltiple ofrecen varias y las de escala capturan la intensidad del sentimiento." },
      { q: "Según el enfoque de embudo, el orden de las preguntas debe ir:", options: ["De lo específico a lo general, con las preguntas personales al inicio", "De lo general a lo específico, con las preguntas delicadas hacia el final", "Al azar, para que el encuestado no se acostumbre", "Con las preguntas más difíciles primero, para filtrar a los encuestados"], correct: 1, feedback: "El enfoque de embudo va de lo más amplio a lo más concreto, y las preguntas delicadas, incómodas o aburridas se dejan para el final." },
      { q: "¿Para qué sirve la prueba piloto?", options: ["Para aplicar el cuestionario definitivo a toda la muestra", "Para elegir el diseño gráfico del informe final", "Para calcular el tamaño de la muestra", "Para aplicar el cuestionario a un grupo pequeño y corregir fallas antes del lanzamiento"], correct: 3, feedback: "La prueba piloto se aplica a un grupo pequeño (de 15 a 30 personas) para detectar y corregir preguntas confusas, instrucciones poco claras y errores de diseño." }
    ]
  },
  {
    id: 7,
    phase: "Fase 6",
    title: "Diseño de la muestra",
    short: "Define a quién le preguntarás: población, marco de muestreo, técnica y tamaño de la muestra.",
    source: "Libro PARTE2.docx.pdf",
    pages: "PDF, páginas 8-17",
    figure: {
      src: "assets/unit-7/figura-factores-muestreo.png",
      alt: "Factores críticos para la selección del diseño de muestreo apropiado",
      caption: "Factores para elegir el diseño de muestreo"
    },
    project: {
      title: "Diseña la muestra de tu estudio",
      context: "Ya tienes tu cuestionario. Ahora debes decidir a quién se lo aplicarás y cuántas personas participarán.",
      task: "Define la población meta de tu estudio, el marco de muestreo que usarías, la técnica de muestreo que elegirías y una estimación del tamaño de la muestra.",
      deliverable: "Plan de muestreo: población meta, marco, técnica, tamaño de la muestra y justificación.",
      prompts: [
        "¿Cuál es la población meta de tu estudio (elemento, unidad de muestreo, extensión y tiempo)?",
        "¿Qué marco de muestreo usarías y qué técnica de muestreo elegirías? Justifica tu decisión.",
        "¿Qué tamaño de muestra propones y qué factores (precisión, presupuesto, tiempo) tuviste en cuenta?"
      ]
    },
    theory: [
      {
        id: "7.1",
        title: "Muestreo, población y muestra",
        content: `<p>El muestreo consiste en tomar una parte pequeña de la población (la muestra) para estudiarla y, a partir de sus resultados, describir o hacer inferencias sobre toda la población de la que salió. Elegir el diseño de muestreo adecuado exige considerar los objetivos del estudio, el grado de precisión, los recursos disponibles, el marco de tiempo, el conocimiento de la población objetivo, el alcance de la investigación y las necesidades de análisis estadístico.</p><p>Conceptos clave: la <strong>población</strong> o universo es el conjunto completo de personas, hogares, empresas u objetos con las características de interés; el <strong>censo</strong> recopila información de absolutamente todos los elementos; la <strong>muestra</strong> es solo un subgrupo elegido para realizar el estudio; y el <strong>error de muestreo</strong> se presenta cuando la muestra no representa perfectamente a la población, lo que genera diferencias entre los resultados obtenidos y la realidad.</p>`
      },
      {
        id: "7.2",
        title: "Proceso del diseño de la muestra",
        content: `<p>El proceso sigue cinco decisiones. (1) <strong>Definir la población meta</strong>: incluye el elemento (la unidad de la que se quiere información), la unidad de muestreo y la extensión (límites geográficos y periodo considerado); las preguntas filtro ayudan a saber quién pertenece a ella. (2) <strong>Determinar el marco de muestreo</strong>: el listado o herramienta que permite localizar a los elementos, como una guía telefónica actualizada, el registro de clientes, un directorio comercial o una base de datos de correos; debe ser lo más completo y vigente posible. (3) <strong>Elegir la técnica de muestreo</strong>. (4) <strong>Determinar el tamaño de la muestra</strong>. (5) <strong>Ejecutar el proceso</strong>, para asegurar la coherencia entre lo planificado y la recolección efectiva de datos.</p>`
      },
      {
        id: "7.3",
        title: "Técnicas de muestreo y tamaño de la muestra",
        content: `<p><strong>Muestreo no probabilístico.</strong> No usa el azar, sino el juicio del investigador; es más barato y rápido, pero se desconoce la probabilidad de seleccionar cada unidad y, por tanto, el error. Incluye el muestreo por <em>conveniencia</em> (elementos accesibles, útil sobre todo en la fase exploratoria), por <em>juicio</em> (el investigador elige según su criterio o experiencia), por <em>cuotas</em> (se fijan categorías de control, como 50 % de mujeres y 50 % de hombres, y se completan a criterio del entrevistador) y de <em>bola de nieve</em> (un grupo inicial refiere a otras personas con el mismo perfil).</p><p><strong>Muestreo probabilístico.</strong> Cada elemento tiene una probabilidad conocida de ser elegido. Incluye el <em>aleatorio simple</em> (todos tienen la misma probabilidad; se numera el marco y se generan números aleatorios), el <em>sistemático</em> (se elige cada i-ésimo elemento con i = N ÷ n; por ejemplo, 50 000 ÷ 1 000 = 50), el <em>estratificado</em> (se divide la población en estratos homogéneos y se muestrea cada uno de forma aleatoria simple) y el <em>por conglomerados</em> (se seleccionan grupos completos, útil en poblaciones dispersas).</p><p><strong>Tamaño de la muestra.</strong> Depende de la importancia de la decisión, el tipo de análisis, el presupuesto y criterios estadísticos como el nivel de confianza (95 % → k = 1,96; 99 % → k = 2,576) y si la población es finita (menos de 100 000 elementos) o infinita. Para población infinita: n = Z² · p · q ÷ d². Para población finita: n = N · Z² · p · q ÷ [d² · (N − 1) + Z² · p · q].</p>`
      }
    ],
    resources: [
      {
        id: "u7-video-muestra",
        type: "video",
        title: "Diseño de la muestra",
        description: "Video narrado de seis minutos sobre población y muestra, el proceso de diseño, las técnicas probabilísticas y no probabilísticas y el cálculo del tamaño de la muestra.",
        src: "assets/unit-7/diseno-de-la-muestra.mp4",
        poster: "assets/unit-7/portada-video-muestra.jpg",
        source: "Recurso educativo · Unidad 7"
      },
      {
        id: "u7-infografia-muestra",
        type: "image",
        title: "Guía visual para elegir la muestra",
        description: "Infografía panorámica con el proceso de diseño de la muestra, las ocho técnicas de muestreo y las fórmulas del tamaño de la muestra.",
        src: "assets/unit-7/infografia-diseno-muestra.png",
        preview: "assets/unit-7/infografia-diseno-muestra.png",
        source: "Infografía educativa · Unidad 7"
      }
    ],
    activities: [
      {
        id: "u7-casos",
        type: "branch",
        icon: "⌁",
        title: "Elige la técnica de muestreo",
        instruction: "Resuelve cuatro casos. En cada uno, elige la técnica de muestreo que corresponde a la situación descrita.",
        tip: "Busca la pista en cada caso: «según su experiencia» apunta al juicio; «50 % de mujeres y 50 % de hombres» a las cuotas; «recomienda a otras personas» a la bola de nieve; y «cada elemento numerado con números aleatorios» al aleatorio simple.",
        copy: {
          pending: "Elige una técnica de muestreo para cada caso y observa la explicación.",
          doneMessage: "Los cuatro casos tienen una técnica de muestreo coherente.",
          doneToast: "¡Técnicas de muestreo identificadas!"
        },
        scenarios: [
          { id: "juicio", prompt: "Una empresa va a lanzar un producto y elige las ciudades que, según su conocimiento del sector, son las más representativas para probarlo.", options: ["Muestreo por juicio", "Muestreo por cuotas", "Muestreo de bola de nieve", "Muestreo aleatorio simple"], correct: 0, feedback: "El investigador elige a los participantes con base en su propio criterio o experiencia previa: es muestreo por juicio." },
          { id: "cuotas", prompt: "Se necesita una muestra con 50 % de mujeres y 50 % de hombres, que el entrevistador completa según su conveniencia.", options: ["Muestreo por juicio", "Muestreo por cuotas", "Muestreo de bola de nieve", "Muestreo aleatorio simple"], correct: 1, feedback: "Se fijan categorías de control (cuotas) y luego se completan a criterio del entrevistador, sin procedimiento aleatorio: es muestreo por cuotas." },
          { id: "bola", prompt: "Se busca a un grupo poco frecuente y difícil de localizar: cada persona encuestada recomienda a otras que cumplen el mismo perfil.", options: ["Muestreo por juicio", "Muestreo por cuotas", "Muestreo de bola de nieve", "Muestreo aleatorio simple"], correct: 2, feedback: "Se parte de un pequeño grupo inicial que refiere a otros con el mismo perfil, y estos a su vez a otros: es muestreo de bola de nieve." },
          { id: "simple", prompt: "Se dispone del marco de muestreo completo con cada elemento numerado, y un programa de computador genera los números aleatorios que definen la muestra.", options: ["Muestreo por juicio", "Muestreo por cuotas", "Muestreo de bola de nieve", "Muestreo aleatorio simple"], correct: 3, feedback: "Cada elemento tiene exactamente la misma probabilidad de ser elegido: es muestreo aleatorio simple." }
        ]
      },
      {
        id: "u7-formulas",
        type: "fill",
        icon: "∑",
        title: "Completa los conceptos y el cálculo",
        instruction: "Completa el texto con los términos y el cálculo del muestreo sistemático que aparecen en la teoría de esta unidad.",
        tip: "Relee la tarjeta 7.3: en el muestreo aleatorio simple todos tienen la misma probabilidad de ser elegidos; el intervalo se calcula dividiendo el tamaño de la población (N) entre el de la muestra (n), y se considera finita una población con menos de 100 000 elementos.",
        copy: {
          pending: "Completa los cuatro espacios y comprueba el texto.",
          doneMessage: "El texto sobre muestreo quedó completo.",
          doneToast: "¡Conceptos de muestreo completados!"
        },
        parts: [
          "En el muestreo aleatorio ",
          { id: "simple", answers: ["simple"], placeholder: "una palabra" },
          " todos los elementos tienen la misma probabilidad de ser elegidos. En el muestreo sistemático, el intervalo se calcula dividiendo el tamaño de la población (N) entre el tamaño de la ",
          { id: "muestra", answers: ["muestra"], placeholder: "una palabra" },
          " (n): si N = 50 000 y n = 1 000, el intervalo es ",
          { id: "intervalo", answers: ["50", "cincuenta"], placeholder: "un número" },
          ". Además, una población se considera ",
          { id: "finita", answers: ["finita"], placeholder: "una palabra" },
          " cuando tiene menos de 100 000 elementos."
        ]
      }
    ],
    badge: { icon: "◍", title: "Estratega de la muestra", description: "Elegiste técnicas de muestreo coherentes y comprendiste cómo se determina el tamaño de la muestra." },
    support: [
      { q: "¿Qué diferencia hay entre población, marco de muestreo y muestra?", a: "La población es el conjunto de elementos con las características de interés; el marco de muestreo es el listado que permite localizarlos; y la muestra es el subgrupo que realmente se estudia." },
      { q: "¿Cuándo elijo un muestreo probabilístico?", a: "Cuando necesitas generalizar los resultados a toda la población con un error conocido: en el probabilístico cada elemento tiene una probabilidad conocida de ser elegido. El no probabilístico es más rápido y barato, pero depende del criterio del investigador y no permite conocer el error." }
    ],
    quiz: [
      { q: "¿En qué consiste el muestreo?", options: ["En recopilar información de absolutamente todos los elementos de la población", "En tomar una parte pequeña de la población para estudiarla y, con sus resultados, describir o inferir sobre toda la población", "En elegir el método de recolección de datos más económico", "En calcular el error del cuestionario antes de aplicarlo"], correct: 1, feedback: "El muestreo toma una parte de la población (la muestra) para estudiarla y, a partir de sus resultados, describir o hacer inferencias sobre toda la población. Recopilar información de todos los elementos es un censo." },
      { q: "¿Qué es el marco de muestreo?", options: ["El error que se comete al elegir una muestra pequeña", "La fórmula con la que se calcula el tamaño de la muestra", "El listado o herramienta que permite localizar a los elementos de la población meta", "El conjunto de preguntas filtro del cuestionario"], correct: 2, feedback: "El marco de muestreo es el listado o herramienta práctica que permite localizar a los elementos de la población meta, como un directorio, un registro de clientes o una base de datos de correos." },
      { q: "En el muestreo no probabilístico:", options: ["Se desconoce la probabilidad de seleccionar cada unidad y, por eso, el porcentaje de error", "Todos los elementos tienen exactamente la misma probabilidad de ser elegidos", "Siempre se necesita un marco de muestreo numerado", "El error de muestreo siempre es cero"], correct: 0, feedback: "El muestreo no probabilístico se basa en el juicio del investigador y no en el azar; por eso se desconoce la probabilidad de selección de cada unidad y el error. Es más barato y rápido." },
      { q: "En un muestreo sistemático con N = 50 000 y n = 1 000, ¿cuál es el intervalo de muestreo?", options: ["20", "500", "1 000", "50"], correct: 3, feedback: "El intervalo se calcula dividiendo el tamaño de la población entre el de la muestra: 50 000 ÷ 1 000 = 50. Se elige un punto de partida al azar y luego cada 50 elementos." },
      { q: "Una empresa divide a su población en subgrupos homogéneos y en cada uno elige una muestra aleatoria simple. Esta técnica es el muestreo:", options: ["Por conveniencia", "Estratificado", "De bola de nieve", "Por cuotas"], correct: 1, feedback: "El muestreo estratificado divide la población en estratos homogéneos y luego selecciona elementos de cada uno mediante muestreo aleatorio simple." }
    ]
  },
  {
    id: 8,
    phase: "Fase 7",
    title: "Trabajo de campo",
    short: "Planifica, organiza y controla la recolección de datos: personal, tiempo, presupuesto, supervisión y validación.",
    source: "Libro PARTE2.docx.pdf",
    pages: "PDF, páginas 19-27",
    figure: {
      src: "assets/book/parte2-p022-proceso-campo.png",
      alt: "Proceso del trabajo de campo: selección, capacitación, supervisión, validación y evaluación de los encuestadores",
      caption: "Proceso del trabajo de campo y recolección de datos"
    },
    project: {
      title: "Planifica el trabajo de campo",
      context: "Ya tienes cuestionario y muestra. Ahora debes organizar cómo, cuándo y con quién se recolectarán los datos.",
      task: "Describe la programación del tiempo, el presupuesto y el personal de tu trabajo de campo, y define cómo capacitarás, supervisarás y evaluarás a los encuestadores.",
      deliverable: "Plan de trabajo de campo: cronograma, presupuesto, perfil y capacitación del personal, controles y medidas de desempeño.",
      prompts: [
        "¿Cuál sería tu programación del tiempo y qué rubros principales incluiría tu presupuesto?",
        "¿Qué perfil tendrían tus encuestadores y qué tareas incluiría su capacitación (contacto inicial, sondeo, registro y cierre)?",
        "¿Cómo supervisarías y validarías el trabajo de campo y qué medidas de desempeño usarías?"
      ]
    },
    theory: [
      {
        id: "8.1",
        title: "Concepto y planificación del trabajo de campo",
        content: `<p>El trabajo de campo es el procedimiento de contactar a los encuestados, aplicar los cuestionarios o formularios de observación, anotar los datos y remitir la información íntegra para su análisis posterior. Es la fase de recopilación de datos primarios y una etapa clave, porque permite identificar errores en el proceso de investigación.</p><p>Kinnear y Taylor identifican cuatro aspectos en su planeación y control: la <strong>programación del tiempo</strong> (inicio, fin y secuencia de actividades, con plazos realistas), el <strong>presupuesto</strong> (los costos asignados a cada actividad, que se relaciona estrechamente con el tiempo), el <strong>personal</strong> (personal calificado, con responsabilidades y criterios de desempeño claros) y la <strong>medición del desempeño</strong> (no solo las entrevistas completadas, sino también los rechazos esperados, los contactos fallidos y las tasas de respuesta, rechazo, contacto y elegibilidad). Los investigadores pueden crear su propia estructura de recolección o contratar agencias especializadas.</p>`
      },
      {
        id: "8.2",
        title: "Selección y capacitación de los encuestadores",
        content: `<p>El proceso de trabajo de campo abarca cinco momentos: <strong>selección, capacitación, supervisión, validación y evaluación</strong> de los encuestadores. Para seleccionar, se elaboran las especificaciones del proyecto según el método de recolección, se definen las características requeridas del personal y se recluta a candidatos idóneos.</p><p>La capacitación garantiza que todos apliquen el cuestionario de manera uniforme. Debe cubrir: el <em>contacto inicial</em> (con comentarios convincentes que resalten la importancia de participar), el <em>planteamiento de las preguntas</em> (conocer el cuestionario, seguir su orden, leerlas despacio y repetir las no comprendidas), el <em>sondeo</em> (repetir la pregunta, repetir la respuesta, hacer una pausa silenciosa, estimular o tranquilizar, provocar una aclaración y usar comentarios neutrales), el <em>registro de las respuestas</em> (con las palabras exactas del encuestado, sin resumir ni parafrasear) y la <em>terminación de la entrevista</em>, agradeciendo el tiempo y dejando una impresión positiva.</p>`
      },
      {
        id: "8.3",
        title: "Supervisión, validación y evaluación",
        content: `<p>La <strong>supervisión</strong> verifica que los encuestadores apliquen fielmente lo aprendido. Incluye el <em>control de calidad y corrección</em> (revisión y corrección diaria de los cuestionarios, y registro de horas y gastos), el <em>control del muestreo</em> (que se siga el plan y no se elijan unidades convenientes), el <em>control de fraudes</em> (por ejemplo, cuestionarios inventados sin contacto real con el encuestado) y el <em>control de la oficina central</em> (validación de datos y detección de anomalías antes del análisis).</p><p>La <strong>validación</strong> confirma que las entrevistas son auténticas: los supervisores contactan del 10 % al 25 % de los encuestados para verificar la duración, la calidad percibida y los datos básicos. La <strong>evaluación</strong> de los encuestadores considera el costo y el tiempo, las tasas de respuesta, la calidad de la entrevista (introducción, exactitud, sondeo sin sesgos, manejo de temas sensibles, competencias interpersonales y cierre) y la calidad de los datos (anotaciones legibles, saltos correctos, transcripción literal y pocas omisiones).</p>`
      }
    ],
    resources: [
      {
        id: "u8-video-campo",
        type: "video",
        title: "Trabajo de campo",
        description: "Video narrado de cinco minutos y medio sobre la planificación del trabajo de campo, la selección y capacitación de los encuestadores, la supervisión y la validación.",
        src: "assets/unit-8/trabajo-de-campo.mp4",
        poster: "assets/unit-8/portada-video-campo.jpg",
        source: "Recurso educativo · Unidad 8"
      },
      {
        id: "u8-infografia-campo",
        type: "image",
        title: "Ruta visual del trabajo de campo",
        description: "Infografía panorámica con la planificación, el proceso de cinco etapas, las técnicas de sondeo y los controles de supervisión.",
        src: "assets/unit-8/infografia-trabajo-campo.png",
        preview: "assets/unit-8/infografia-trabajo-campo.png",
        source: "Infografía educativa · Unidad 8"
      }
    ],
    activities: [
      {
        id: "u8-radar",
        type: "hotspot",
        icon: "⌖",
        title: "Radar de la planificación de campo",
        instruction: "Explora el tablero y encuentra los cuatro aspectos que se planifican y controlan en el trabajo de campo. Ojo: hay tareas que pertenecen a otras fases.",
        tip: "Los cuatro aspectos son: la programación del tiempo, el presupuesto, el personal y la medición del desempeño. Las demás tareas del tablero pertenecen a otras fases de la investigación.",
        copy: {
          boardLabel: "Tablero de la planificación del trabajo de campo",
          foundLabel: "aspectos encontrados",
          hint: "Pulsa cada punto del tablero para saber si se planifica durante el trabajo de campo.",
          pending: "Encuentra los cuatro aspectos que se planifican y controlan en el trabajo de campo.",
          hitToast: "Aspecto de la planificación encontrado.",
          missToast: "Esa tarea pertenece a otra fase de la investigación.",
          doneToast: "¡Encontraste los cuatro aspectos de la planificación!"
        },
        spots: [
          { id: "tiempo", label: "Programación del tiempo", detail: "Inicio, fin y secuencia de actividades con plazos realistas.", correct: true },
          { id: "presupuesto", label: "Presupuesto", detail: "Costos asignados a cada actividad de la programación.", correct: true },
          { id: "personal", label: "Selección y gestión del personal", detail: "Personal calificado con responsabilidades y criterios de evaluación claros.", correct: true },
          { id: "desempeno", label: "Medición del desempeño", detail: "Entrevistas completadas, rechazos esperados, contactos fallidos y otras tasas.", correct: true },
          { id: "problema", label: "Definición del problema", detail: "Es la primera fase de la investigación, anterior al trabajo de campo.", correct: false },
          { id: "diseno", label: "Elección del diseño de investigación", detail: "Se decide antes de planificar la recolección de datos.", correct: false },
          { id: "tabulacion", label: "Tabulación de los datos", detail: "Ocurre después de la recolección, en el procesamiento de la información.", correct: false },
          { id: "informe", label: "Redacción del informe final", detail: "Es la última fase: comunicar los hallazgos.", correct: false }
        ]
      },
      {
        id: "u8-sondeo",
        type: "method",
        icon: "☰",
        title: "Identifica la técnica de sondeo",
        instruction: "Para cada situación de una entrevista, selecciona la técnica de sondeo que aplica el entrevistador.",
        tip: "Relee la tarjeta 8.2: repetir la pregunta con las mismas palabras, repetir literalmente la respuesta mientras se registra, esperar en silencio con una pausa, tranquilizar al encuestado que vacila o pedir una aclaración con cortesía.",
        copy: {
          itemLabel: "Situación",
          selectPlaceholder: "Selecciona una técnica de sondeo",
          checkLabel: "Comprobar técnicas",
          pending: "Elige la técnica de sondeo que aplica el entrevistador en cada situación.",
          doneMessage: "Cada situación tiene su técnica de sondeo.",
          missToast: "Algunas técnicas de sondeo no corresponden.",
          doneToast: "¡Técnicas de sondeo identificadas!"
        },
        methods: ["Repetir la pregunta", "Repetir la respuesta del encuestado", "Hacer una pausa o sondeo silencioso", "Estimular o tranquilizar al encuestado", "Provocar una aclaración"],
        cases: [
          { id: "repetir-pregunta", need: "El encuestado no responde y el entrevistador vuelve a leer la pregunta con las mismas palabras.", correct: 0 },
          { id: "repetir-respuesta", need: "Mientras anota, el entrevistador repite en voz alta lo que el encuestado acaba de decir.", correct: 1 },
          { id: "pausa", need: "El entrevistador guarda silencio unos segundos, con una mirada expectante, para que la persona amplíe su respuesta.", correct: 2 },
          { id: "tranquilizar", need: "El encuestado duda y el entrevistador dice: «Aquí no hay respuestas correctas o incorrectas; solo queremos conocer su opinión».", correct: 3 },
          { id: "aclaracion", need: "El entrevistador dice: «No entiendo muy bien lo que quiere decir, ¿sería tan amable de ampliar un poco más?».", correct: 4 }
        ]
      }
    ],
    badge: { icon: "⚑", title: "Líder de campo", description: "Planificaste, capacitaste y controlaste el trabajo de campo para obtener datos confiables." },
    support: [
      { q: "¿Qué incluye planificar el trabajo de campo?", a: "Cuatro aspectos: la programación del tiempo, el presupuesto, la selección y gestión del personal y la medición del desempeño." },
      { q: "¿Cómo se comprueba que las entrevistas fueron reales?", a: "Con la supervisión (control de calidad, del muestreo, de fraudes y de la oficina central) y con la validación: se contacta del 10 % al 25 % de los encuestados para verificar que la entrevista ocurrió." }
    ],
    quiz: [
      { q: "¿Qué comprende el trabajo de campo?", options: ["Elegir el diseño de investigación y redactar el informe", "Tabular las respuestas y calcular las medias", "Definir el problema y desarrollar el enfoque", "Contactar a los encuestados, aplicar los cuestionarios, registrar los datos y remitir la información para su análisis"], correct: 3, feedback: "El trabajo de campo es el procedimiento de contactar a los encuestados, ejecutar los cuestionarios o formularios de observación, anotar los datos y remitir la información íntegra para el análisis." },
      { q: "¿Cuáles son los cuatro aspectos clave de la planeación y el control del trabajo de campo?", options: ["Problema, diseño, muestra y cuestionario", "Programación del tiempo, presupuesto, personal y medición del desempeño", "Selección, capacitación, tabulación e informe", "Población, marco, técnica y tamaño de la muestra"], correct: 1, feedback: "Kinnear y Taylor identifican la programación del tiempo, el presupuesto, la selección y gestión del personal y la medición del desempeño." },
      { q: "¿Para qué sirve la validación del trabajo de los encuestadores?", options: ["Para capacitar a los encuestadores antes de salir a campo", "Para calcular el presupuesto total del estudio", "Para confirmar que las entrevistas son auténticas, contactando del 10 % al 25 % de los encuestados", "Para reemplazar la supervisión diaria"], correct: 2, feedback: "La validación confirma que los entrevistadores realizaron entrevistas genuinas: los supervisores contactan del 10 % al 25 % de los encuestados para verificar duración, calidad percibida y datos básicos." },
      { q: "Repetir literalmente la respuesta del encuestado mientras se registra es una técnica de:", options: ["Sondeo", "Validación", "Muestreo", "Tabulación"], correct: 0, feedback: "Es una de las técnicas de sondeo: estimula al encuestado a ampliar o aclarar su respuesta. Otras son repetir la pregunta, hacer una pausa silenciosa, tranquilizarlo y provocar una aclaración." },
      { q: "Además del número de entrevistas completadas, para medir el desempeño conviene especificar:", options: ["Solo el costo total del estudio", "El color y el formato del cuestionario impreso", "Los rechazos esperados, los contactos fallidos y otros indicadores relevantes", "El número de preguntas abiertas del cuestionario"], correct: 2, feedback: "Frecuentemente solo se mide el número de entrevistas completadas, pero es esencial especificar también los rechazos esperados, los contactos fallidos y otros indicadores relevantes." }
    ]
  }
];

window.BOOK_MEDIA = [
  {
    id: "book-u5-escalas",
    unitId: 5,
    page: 65,
    type: "video",
    title: "Escalas básicas de medición",
    description: "Infografía animada que acompaña la explicación de las escalas nominal, ordinal, de intervalo y de razón.",
    qr: "assets/book/qr/unidad-5-escalas.png",
    qrUrl: "https://q.me-qr.com/ddemeld9",
    originalUrl: "https://drive.google.com/file/d/1-fTHRjq2gHmy-oHKQBYMTJ0J458F1d_c/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1-fTHRjq2gHmy-oHKQBYMTJ0J458F1d_c/preview"
  },
  {
    id: "book-u6-cuestionario",
    unitId: 6,
    page: 2,
    type: "video",
    title: "Proceso de diseño de cuestionarios",
    description: "Infografía animada sobre los pasos que se siguen para diseñar un cuestionario.",
    qr: "assets/book/qr/unidad-6-cuestionario.png",
    qrUrl: "https://q.me-qr.com/c2ou8q4s",
    originalUrl: "https://drive.google.com/file/d/1rfRWeRpIOEBZHYmr5VUKuLqCbPKn36B-/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1rfRWeRpIOEBZHYmr5VUKuLqCbPKn36B-/preview"
  },
  {
    id: "book-u7-muestra",
    unitId: 7,
    page: 8,
    type: "video",
    title: "Diseño de la muestra",
    description: "Podcast audiovisual que introduce el muestreo, la población y el proceso de diseño de la muestra.",
    qr: "assets/book/qr/unidad-7-muestra.png",
    qrUrl: "https://q.me-qr.com/iqq77f4q",
    originalUrl: "https://drive.google.com/file/d/1ig73vXjMWkbABFhe5vWcqWTUL_8_RHuh/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1ig73vXjMWkbABFhe5vWcqWTUL_8_RHuh/preview"
  },
  {
    id: "book-u7-tecnicas",
    unitId: 7,
    page: 11,
    type: "video",
    title: "Técnicas de muestreo",
    description: "Infografía animada que compara las técnicas de muestreo probabilístico y no probabilístico.",
    qr: "assets/book/qr/unidad-7-tecnicas-muestreo.png",
    qrUrl: "https://q.me-qr.com/g7jxu08g",
    originalUrl: "https://drive.google.com/file/d/1xQ2TgJbIyIatAaxwj8OvQHmq52UrWd_D/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1xQ2TgJbIyIatAaxwj8OvQHmq52UrWd_D/preview"
  },
  {
    id: "book-u8-planificacion",
    unitId: 8,
    page: 19,
    type: "audio",
    title: "Planificación del trabajo de campo",
    description: "Podcast sobre la programación del tiempo, el presupuesto, el personal y la medición del desempeño en el trabajo de campo.",
    qr: "assets/book/qr/unidad-8-planificacion-campo.png",
    qrUrl: "https://q.me-qr.com/p89iofzv",
    originalUrl: "https://drive.google.com/file/d/1rtt2houf-dJc-9utraa4oxIDEVQcMScc/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1rtt2houf-dJc-9utraa4oxIDEVQcMScc/preview"
  }
];

window.SIMULATOR_STEPS = [
  {
    id: "situation",
    unitId: 5,
    eyebrow: "Unidad 5 · Estudio",
    title: "Elige el estudio que quieres diseñar",
    prompt: "¿Qué necesita medir la organización?",
    voice: "Primero elige el estudio. Cada caso pide medir algo distinto y tiene una población distinta; eso orientará la escala, el cuestionario y la muestra que elegirás.",
    options: [
      {
        id: "satisfaction",
        label: "Medir la satisfacción de los clientes de un servicio",
        detail: "Una empresa con una base completa de 20 000 clientes quiere saber qué tan de acuerdo están con varias afirmaciones sobre su servicio antes de decidir si lo amplía.",
        impact: "El estudio deberá medir actitudes (grado de acuerdo) y permitir generalizar los resultados a todos los clientes.",
        strength: "Parte de una decisión concreta y de una población con un marco de muestreo completo.",
        risk: "Una muestra que no represente a los clientes llevaría a decidir con información sesgada."
      },
      {
        id: "preference",
        label: "Conocer qué sabor de una bebida prefieren los estudiantes",
        detail: "En una feria universitaria se quiere una primera lectura del orden de preferencia entre tres sabores, con poco presupuesto y poco tiempo.",
        impact: "La medición deberá comparar los sabores entre sí y aceptar una muestra rápida de participantes accesibles.",
        strength: "Es una decisión acotada, de bajo costo y con respuesta inmediata.",
        risk: "Los resultados serán una primera aproximación y no representarán a toda la población."
      },
      {
        id: "image",
        label: "Evaluar la imagen de una tienda en dos grupos de edad",
        detail: "Se quiere describir la imagen de la tienda con adjetivos opuestos y comparar a jóvenes y adultos, con proporciones definidas por edad.",
        impact: "La medición deberá captar percepciones en varias dimensiones y garantizar la presencia de ambos grupos de edad.",
        strength: "Permite construir un perfil perceptual comparable entre grupos.",
        risk: "Si un grupo queda subrepresentado, la comparación pierde validez."
      }
    ]
  },
  {
    id: "scale",
    unitId: 5,
    eyebrow: "Unidad 5 · Escalamiento",
    title: "Selecciona la técnica de escalamiento",
    prompt: "¿Qué escala se ajusta mejor a lo que quieres medir?",
    voice: "Elige la escala. Likert mide grado de acuerdo, la clasificación por orden compara alternativas, el diferencial semántico perfila una imagen entre adjetivos opuestos y la nominal solo etiqueta categorías.",
    options: [
      {
        id: "likert",
        label: "Escala de Likert (5 categorías)",
        detail: "Mide el grado de acuerdo o desacuerdo con afirmaciones, de «totalmente en desacuerdo» a «totalmente de acuerdo».",
        impact: "Las respuestas podrán sumarse o analizarse afirmación por afirmación como datos de intervalo.",
        strength: "Es sencilla de responder y de analizar.",
        risk: "No compara directamente unos estímulos con otros."
      },
      {
        id: "rank",
        label: "Clasificación por orden (escala comparativa)",
        detail: "El encuestado ordena varios elementos de mayor a menor según un atributo, por ejemplo la preferencia.",
        impact: "Los datos serán ordinales: indican el orden, pero no cuánto más se prefiere un elemento que otro.",
        strength: "Compara directamente los estímulos entre sí.",
        risk: "Los resultados solo pueden interpretarse de manera relativa."
      },
      {
        id: "semantic",
        label: "Diferencial semántico (7 puntos)",
        detail: "Evalúa un concepto entre pares de adjetivos opuestos y permite graficar un perfil perceptual con las medias.",
        impact: "Las medias por par de adjetivos formarán el perfil de imagen del concepto evaluado.",
        strength: "Identifica fortalezas y debilidades de un concepto.",
        risk: "Exige elegir con cuidado los pares de adjetivos."
      },
      {
        id: "nominal",
        label: "Escala nominal (categorías)",
        detail: "Asigna números o etiquetas que solo identifican categorías, sin orden ni distancia.",
        impact: "Podrás clasificar a los encuestados, pero no medir intensidad ni orden.",
        strength: "Sirve para identificar y agrupar.",
        risk: "No mide actitudes ni preferencias."
      }
    ]
  },
  {
    id: "collection",
    unitId: 6,
    eyebrow: "Unidad 6 · Recolección",
    title: "Elige cómo se aplicará el cuestionario",
    prompt: "¿Qué método de recolección usarás?",
    voice: "El método de recolección condiciona el cuestionario. Internet es rápido y económico, el teléfono ofrece contacto directo y la entrevista personal permite mostrar materiales, pero cuesta más tiempo y recursos.",
    options: [
      {
        id: "web",
        label: "Encuesta por internet",
        detail: "Permite mostrar imágenes o elementos multimedia y llegar rápido a muchos encuestados.",
        impact: "La aplicación será rápida y económica, con menos control sobre quién responde.",
        strength: "Reduce costos y tiempo de aplicación.",
        risk: "Puede excluir a personas sin acceso o con poca disposición a responder."
      },
      {
        id: "phone",
        label: "Encuesta telefónica",
        detail: "Exige preguntas cortas y una descripción verbal precisa de los conceptos.",
        impact: "Habrá contacto directo con los encuestados, pero con un cuestionario breve y sin apoyos visuales.",
        strength: "Ofrece contacto directo a un costo moderado.",
        risk: "No permite mostrar imágenes ni aplicar instrumentos largos."
      },
      {
        id: "personal",
        label: "Entrevista personal",
        detail: "Permite mostrar productos, imágenes o videos en un entorno con mínimas restricciones.",
        impact: "Habrá mayor control y apoyo visual, con más tiempo y recursos.",
        strength: "Mayor control de la aplicación y de la calidad de la información.",
        risk: "Es la alternativa que más recursos y tiempo demanda."
      }
    ]
  },
  {
    id: "pilot",
    unitId: 6,
    eyebrow: "Unidad 6 · Prueba piloto",
    title: "Decide cómo probar el cuestionario",
    prompt: "¿Qué prueba piloto realizarás antes del lanzamiento?",
    voice: "Antes de salir a campo conviene probar el cuestionario. Decide si lo harás con un grupo pequeño, con revisiones repetidas o si prefieres no hacerlo.",
    options: [
      {
        id: "none",
        label: "Sin prueba piloto",
        detail: "Se aplica el cuestionario definitivo directamente.",
        impact: "Se ahorra tiempo, pero cualquier error llegará sin corregir al trabajo de campo.",
        strength: "No consume tiempo ni presupuesto adicional.",
        risk: "Preguntas confusas o instrucciones poco claras se detectarán demasiado tarde."
      },
      {
        id: "small",
        label: "Piloto de 15 a 30 personas",
        detail: "Se prueban contenido, redacción, orden, formato e instrucciones con personas parecidas a los encuestados.",
        impact: "Se corregirán las fallas del instrumento antes de aplicarlo.",
        strength: "Es el tamaño recomendado para detectar fallas con poco costo.",
        risk: "Requiere tiempo para revisar y ajustar el cuestionario."
      },
      {
        id: "large",
        label: "Piloto ampliado con repetición",
        detail: "Se hace una nueva prueba con otra muestra después de cada revisión importante.",
        impact: "El instrumento quedará muy depurado, con mayor inversión de tiempo y recursos.",
        strength: "Máxima depuración del cuestionario.",
        risk: "Puede consumir recursos que hagan falta en el campo."
      }
    ]
  },
  {
    id: "sampling",
    unitId: 7,
    eyebrow: "Unidad 7 · Técnica",
    title: "Selecciona la técnica de muestreo",
    prompt: "¿Cómo elegirás a los participantes?",
    voice: "Elige la técnica de muestreo. Conveniencia y cuotas no usan el azar; aleatorio simple y estratificado sí, y permiten generalizar con error conocido, pero exigen un marco de muestreo y más recursos.",
    options: [
      {
        id: "convenience",
        label: "Muestreo por conveniencia",
        detail: "Se reúne una muestra de elementos accesibles, a discreción del entrevistador.",
        impact: "La muestra se completará rápido y a bajo costo, sin conocer la probabilidad de selección.",
        strength: "Es rápido y económico, y útil en fases exploratorias.",
        risk: "Se desconoce el error y la muestra puede no representar a la población."
      },
      {
        id: "quota",
        label: "Muestreo por cuotas",
        detail: "Se fijan cuotas (por ejemplo, 50 % de cada grupo) y se completan a criterio del entrevistador.",
        impact: "Se garantizará la presencia de cada grupo definido, sin usar el azar.",
        strength: "Asegura proporciones por grupo a un costo moderado.",
        risk: "La selección dentro de cada cuota no es aleatoria."
      },
      {
        id: "simple",
        label: "Muestreo aleatorio simple",
        detail: "Cada elemento del marco de muestreo tiene la misma probabilidad de ser elegido.",
        impact: "Necesitarás un marco completo y numerado para sortear a los participantes.",
        strength: "Permite generalizar los resultados a la población con error estimable.",
        risk: "Exige un marco de muestreo completo y actualizado."
      },
      {
        id: "stratified",
        label: "Muestreo estratificado",
        detail: "La población se divide en estratos homogéneos y en cada uno se elige una muestra aleatoria simple.",
        impact: "Cada estrato quedará representado y los resultados podrán compararse entre ellos.",
        strength: "Combina representatividad y comparación entre grupos.",
        risk: "Requiere conocer bien los estratos y tiene mayor costo de diseño."
      }
    ]
  },
  {
    id: "size",
    unitId: 7,
    eyebrow: "Unidad 7 · Tamaño",
    title: "Define el tamaño de la muestra",
    prompt: "¿Cuántas personas participarán?",
    voice: "El tamaño de la muestra equilibra precisión, representatividad y viabilidad. Una muestra mayor da más precisión, pero cuesta más tiempo y presupuesto.",
    options: [
      {
        id: "n30",
        label: "Muestra pequeña (30 personas)",
        detail: "Sirve para una primera aproximación al tema.",
        impact: "El trabajo será rápido y barato, pero con muy poca precisión.",
        strength: "Es la opción más económica y rápida.",
        risk: "Con tan pocos participantes no se pueden generalizar los resultados."
      },
      {
        id: "n100",
        label: "Muestra intermedia (100 personas)",
        detail: "Ofrece un equilibrio entre costo y precisión para estudios de alcance limitado.",
        impact: "Los resultados serán más estables, sin llegar a un margen de error estricto.",
        strength: "Equilibra alcance, tiempo y presupuesto.",
        risk: "Puede quedarse corta si se busca inferir a una población grande."
      },
      {
        id: "n385",
        label: "Muestra amplia (385 personas)",
        detail: "Resultado de la fórmula para población infinita con 95 % de confianza (Z = 1,96), p = q = 0,5 y error máximo de 5 %.",
        impact: "Los resultados tendrán la precisión que exige una inferencia con nivel de confianza conocido.",
        strength: "Mayor precisión y representatividad.",
        risk: "Es la muestra que más tiempo y presupuesto demanda."
      }
    ]
  },
  {
    id: "capacity",
    unitId: 8,
    eyebrow: "Unidad 8 · Planificación",
    title: "Configura el tiempo y el presupuesto del campo",
    prompt: "¿Con qué capacidad cuenta el trabajo de campo?",
    voice: "Ahora planifica el campo. La programación del tiempo y el presupuesto están estrechamente relacionados; esta elección define si tu ruta cabe o no en los recursos disponibles.",
    options: [
      {
        id: "limited",
        label: "Capacidad limitada",
        detail: "80 puntos de recursos y 10 semanas simuladas.",
        impact: "El plan necesitará priorizar decisiones de menor demanda.",
        strength: "Obliga a concentrarse en lo esencial.",
        risk: "Una ruta exigente puede superar la capacidad disponible."
      },
      {
        id: "balanced",
        label: "Capacidad intermedia",
        detail: "120 puntos de recursos y 18 semanas simuladas.",
        impact: "La ruta tendrá margen para combinar decisiones de demanda media.",
        strength: "Equilibra alcance, tiempo y control.",
        risk: "Todavía exige priorizar si se eligen técnicas y muestras muy exigentes."
      },
      {
        id: "broad",
        label: "Capacidad amplia",
        detail: "170 puntos de recursos y 28 semanas simuladas.",
        impact: "La ruta podrá sostener decisiones de mayor demanda y más controles.",
        strength: "Permite una muestra amplia y mayor control del campo.",
        risk: "Más recursos no corrigen una escala o una muestra mal elegidas."
      }
    ]
  },
  {
    id: "control",
    unitId: 8,
    eyebrow: "Unidad 8 · Control",
    title: "Define el control del trabajo de campo",
    prompt: "¿Cómo supervisarás y validarás el trabajo de los encuestadores?",
    voice: "Por último, decide el control. La supervisión revisa la calidad y el muestreo; la validación confirma que las entrevistas fueron reales. Puedes volver atrás si quieres cambiar alguna decisión.",
    options: [
      {
        id: "none",
        label: "Sin supervisión ni validación",
        detail: "Los encuestadores trabajan de forma independiente.",
        impact: "Se ahorran recursos, pero no habrá forma de detectar errores o fraudes.",
        strength: "No consume recursos adicionales.",
        risk: "Los cuestionarios inventados o incompletos pasarían al análisis."
      },
      {
        id: "basic",
        label: "Supervisión diaria y control del muestreo",
        detail: "Los supervisores revisan y corrigen los cuestionarios cada día y controlan que se siga el plan de muestreo.",
        impact: "La calidad de los datos se controlará durante el trabajo de campo.",
        strength: "Detecta errores y desviaciones a tiempo.",
        risk: "No verifica por sí sola que las entrevistas sean auténticas."
      },
      {
        id: "full",
        label: "Supervisión más validación del 10 % al 25 %",
        detail: "Además de supervisar, se contacta del 10 % al 25 % de los encuestados para confirmar que la entrevista ocurrió.",
        impact: "Se protege la integridad de los datos y se detectan posibles fraudes.",
        strength: "Máximo control de calidad y de autenticidad.",
        risk: "Aumenta el costo y el tiempo del trabajo de campo."
      }
    ]
  }
];
