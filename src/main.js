(() => {
  "use strict";

  const SUPABASE_URL = "https://bxxudrezbaxrmwekeyoe.supabase.co";
  const SUPABASE_KEY = "sb_publishable_SnBuzPXugGRag9uAP4NbpQ_HzPhP6BK";
  const PROGRESS_FIELD = "market_research_course_p2_v1";
  const LOCAL_PREFIX = "investigacion_mercados_efectiva_p2_v1";
  const PASSING_SCORE = 80;
  const FINAL_QUIZ_SIZE = 10;
  const REVIEW_QUIZ_MAX = 15;
  const course = Array.isArray(window.COURSE_DATA) ? window.COURSE_DATA : [];
  const courseCredits = Array.isArray(window.COURSE_CREDITS) ? window.COURSE_CREDITS : [];
  const bookMedia = Array.isArray(window.BOOK_MEDIA) ? window.BOOK_MEDIA : [];
  const simulatorSteps = Array.isArray(window.SIMULATOR_STEPS) ? window.SIMULATOR_STEPS : [];
  const SIMULATOR_IDEAL_ROUTES = {
    satisfaction: {
      scale: ["likert"],
      sampling: ["simple", "stratified"],
      explanation: "Medir el grado de acuerdo de todos los clientes se fortalece con una escala de Likert y con un muestreo probabilístico que permita generalizar los resultados."
    },
    preference: {
      scale: ["rank"],
      sampling: ["convenience"],
      explanation: "Ordenar preferencias entre pocas alternativas, en una primera exploración con poco presupuesto, se fortalece con una clasificación por orden y un muestreo por conveniencia."
    },
    image: {
      scale: ["semantic"],
      sampling: ["quota", "stratified"],
      explanation: "Describir la imagen entre adjetivos opuestos y comparar dos grupos de edad se fortalece con un diferencial semántico y con cuotas o estratos que garanticen ambos grupos."
    }
  };
  const SIMULATOR_CAPACITY = {
    limited: { budget: 80, weeks: 10 },
    balanced: { budget: 120, weeks: 18 },
    broad: { budget: 170, weeks: 28 }
  };
  // Decisiones que consumen recursos y aportan evidencia (la capacidad se define en la unidad 8).
  const SIMULATOR_DEMAND_KEYS = ["scale", "collection", "pilot", "sampling", "size", "control"];
  // depth = precisión de la medición · coverage = representatividad · control = control de calidad
  const SIMULATOR_DEMAND = {
    nominal: { budget: 5, weeks: 1, depth: 10, coverage: 0, control: 0 },
    likert: { budget: 8, weeks: 1, depth: 35, coverage: 0, control: 0 },
    rank: { budget: 10, weeks: 1, depth: 30, coverage: 0, control: 0 },
    semantic: { budget: 12, weeks: 2, depth: 40, coverage: 0, control: 0 },
    web: { budget: 15, weeks: 2, depth: 0, coverage: 20, control: 5 },
    phone: { budget: 25, weeks: 3, depth: 0, coverage: 15, control: 10 },
    personal: { budget: 40, weeks: 5, depth: 0, coverage: 10, control: 20 },
    none: { budget: 0, weeks: 0, depth: 0, coverage: 0, control: 0 },
    small: { budget: 10, weeks: 1, depth: 0, coverage: 0, control: 25 },
    large: { budget: 25, weeks: 3, depth: 0, coverage: 0, control: 35 },
    convenience: { budget: 10, weeks: 1, depth: 0, coverage: 10, control: 0 },
    quota: { budget: 18, weeks: 2, depth: 0, coverage: 30, control: 0 },
    simple: { budget: 25, weeks: 3, depth: 0, coverage: 45, control: 0 },
    stratified: { budget: 35, weeks: 4, depth: 0, coverage: 55, control: 0 },
    n30: { budget: 10, weeks: 1, depth: 5, coverage: 5, control: 0 },
    n100: { budget: 28, weeks: 3, depth: 15, coverage: 15, control: 0 },
    n385: { budget: 45, weeks: 5, depth: 30, coverage: 30, control: 0 },
    basic: { budget: 12, weeks: 1, depth: 0, coverage: 0, control: 25 },
    full: { budget: 25, weeks: 2, depth: 0, coverage: 0, control: 40 }
  };
  // "none" existe como opcion en dos decisiones (piloto y control): sus valores son iguales (0).
  const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
  const AVATARS = [
    { id: "vera", name: "Vera", description: "Analista de datos · Medición y escalas", voiceSlot: 0, pitch: 0.9, rate: 0.92 },
    { id: "nico", name: "Nico", description: "Diseñador de encuestas · Cuestionario", voiceSlot: 1, pitch: 1.08, rate: 0.96 },
    { id: "mila", name: "Mila", description: "Especialista en muestreo · Diseño de la muestra", voiceSlot: 2, pitch: 0.95, rate: 0.9 },
    { id: "teo", name: "Teo", description: "Coordinador de campo · Trabajo de campo", voiceSlot: 3, pitch: 1.14, rate: 1 }
  ];
  // Configuración del certificado. Coloca los logos en assets/logos/ con estos nombres.
  // Si un archivo no existe, el certificado simplemente omite ese logo.
  const CERT_CONFIG = {
    institution: "Universidad Pedagógica y Tecnológica de Colombia",
    unit: "Facultad Seccional Chiquinquirá · Escuela de Administración de Empresas",
    moduleName: "Investigación de Mercados Efectiva",
    moduleSubtitle: "Parte 2 · Medición, cuestionario, muestra y trabajo de campo",
    logos: [
      "assets/logos/uptc.png?v=2",
      "assets/logos/facultad-chiquinquira.png?v=2",
      "assets/logos/eae-chiquinquira.png?v=2"
    ]
  };
  const MOTIVATIONS = [
    "Cada paso de tu proyecto convierte una duda en una decisión.",
    "Avanza con calma: una buena medición sostiene toda la investigación.",
    "Tu próxima insignia está más cerca de lo que parece.",
    "Explora, relaciona y comprueba: así se construye una investigación sólida.",
    "Si no sabes qué sigue, abre el apoyo y elige una pregunta."
  ];

  const state = {
    user: null,
    progress: createEmptyProgress(),
    currentUnitId: course[0]?.id || 1,
    authMode: "login",
    syncing: false,
    toastTimer: null,
    syncTimer: null,
    gameSelection: null,
    gameBusy: false,
    practiceActivityId: null,
    quizSession: null,
    supportAnswer: "",
    motivationIndex: 0,
    motivationTimer: null,
    finalQuizQuestions: null,
    reviewQuizQuestions: null,
    reviewQuizAnswers: null,
    simulatorStep: 0
  };

  const byId = (id) => document.getElementById(id);

  function createEmptyProgress() {
    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      projects: {},
      theory: {},
      resources: {},
      practice: {},
      quizzes: {},
      avatar: null,
      finalResult: null,
      simulator: null,
      reviewStats: {}
    };
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeProgress(raw) {
    const clean = createEmptyProgress();
    if (!raw || typeof raw !== "object") return clean;
    clean.projects = raw.projects && typeof raw.projects === "object" ? raw.projects : {};
    clean.theory = raw.theory && typeof raw.theory === "object" ? raw.theory : {};
    clean.resources = raw.resources && typeof raw.resources === "object" ? raw.resources : {};
    clean.practice = raw.practice && typeof raw.practice === "object" ? raw.practice : {};
    clean.quizzes = raw.quizzes && typeof raw.quizzes === "object" ? raw.quizzes : {};
    clean.reviewStats = raw.reviewStats && typeof raw.reviewStats === "object" ? raw.reviewStats : {};
    clean.avatar = typeof raw.avatar === "string" && AVATARS.some((avatar) => avatar.id === raw.avatar) ? raw.avatar : null;
    clean.finalResult = raw.finalResult && typeof raw.finalResult === "object" ? raw.finalResult : null;
    clean.simulator = raw.simulator && typeof raw.simulator === "object"
      ? {
          answers: raw.simulator.answers && typeof raw.simulator.answers === "object" ? raw.simulator.answers : {},
          currentStep: Math.max(0, Number(raw.simulator.currentStep || 0)),
          completed: Boolean(raw.simulator.completed),
          updatedAt: typeof raw.simulator.updatedAt === "string" ? raw.simulator.updatedAt : null
        }
      : null;
    clean.updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : clean.updatedAt;
    return clean;
  }

  function mergeProgress(localRaw, cloudRaw) {
    const local = normalizeProgress(localRaw);
    const cloud = normalizeProgress(cloudRaw);
    const merged = createEmptyProgress();
    merged.avatar = local.avatar || cloud.avatar || null;

    course.forEach((unit) => {
      const key = String(unit.id);
      const localProject = local.projects[key] || {};
      const cloudProject = cloud.projects[key] || {};
      const localResponses = Array.isArray(localProject.responses) ? localProject.responses : [];
      const cloudResponses = Array.isArray(cloudProject.responses) ? cloudProject.responses : [];
      const responses = unit.project.prompts.map((_, index) => {
        const a = String(localResponses[index] || "").trim();
        const b = String(cloudResponses[index] || "").trim();
        return a.length >= b.length ? a : b;
      });
      if (responses.some(Boolean) || localProject.complete || cloudProject.complete) {
        merged.projects[key] = {
          responses,
          complete: Boolean((localProject.complete || cloudProject.complete) && responses.every(Boolean)),
          savedAt: localProject.savedAt || cloudProject.savedAt || null
        };
      }

      const viewed = new Set([
        ...(Array.isArray(local.theory[key]) ? local.theory[key] : []),
        ...(Array.isArray(cloud.theory[key]) ? cloud.theory[key] : [])
      ]);
      if (viewed.size) merged.theory[key] = [...viewed];

      const viewedResources = new Set([
        ...(Array.isArray(local.resources[key]) ? local.resources[key] : []),
        ...(Array.isArray(cloud.resources[key]) ? cloud.resources[key] : [])
      ]);
      if (viewedResources.size) merged.resources[key] = [...viewedResources];

      const localPractice = local.practice[key] || {};
      const cloudPractice = cloud.practice[key] || {};
      const localPracticeTime = Date.parse(localPractice.updatedAt || "") || 0;
      const cloudPracticeTime = Date.parse(cloudPractice.updatedAt || "") || 0;
      const selectedPractice = localPracticeTime >= cloudPracticeTime
        ? localPractice
        : cloudPractice;
      if (Object.keys(selectedPractice).length) {
        const localActivities = localPractice.activities && typeof localPractice.activities === "object" ? localPractice.activities : {};
        const cloudActivities = cloudPractice.activities && typeof cloudPractice.activities === "object" ? cloudPractice.activities : {};
        const activities = {};
        new Set([...Object.keys(localActivities), ...Object.keys(cloudActivities)]).forEach((activityId) => {
          const a = localActivities[activityId] || {};
          const b = cloudActivities[activityId] || {};
          const aTime = Date.parse(a.updatedAt || "") || 0;
          const bTime = Date.parse(b.updatedAt || "") || 0;
          const selected = aTime >= bTime ? a : b;
          activities[activityId] = {
            ...selected,
            complete: Boolean(a.complete || b.complete),
            score: Math.max(Number(a.score || 0), Number(b.score || 0)),
            attempts: Math.max(Number(a.attempts || 0), Number(b.attempts || 0))
          };
        });
        const activityDefinitions = Array.isArray(unit.activities) ? unit.activities : [];
        const mergedActivitiesComplete = Boolean(activityDefinitions.length && activityDefinitions.every((activity) => activities[activity.id]?.complete));
        const mergedActivityScore = activityDefinitions.length
          ? Math.round(activityDefinitions.reduce((sum, activity) => sum + Number(activities[activity.id]?.score || 0), 0) / activityDefinitions.length)
          : 0;
        merged.practice[key] = {
          ...selectedPractice,
          activities,
          attempts: Math.max(Number(localPractice.attempts || 0), Number(cloudPractice.attempts || 0)),
          score: Math.max(Number(localPractice.score || 0), Number(cloudPractice.score || 0), mergedActivityScore),
          complete: Boolean(localPractice.complete || cloudPractice.complete || mergedActivitiesComplete),
          updatedAt: selectedPractice.updatedAt || null
        };
      }

      const localQuiz = local.quizzes[key] || {};
      const cloudQuiz = cloud.quizzes[key] || {};
      const hasLocalQuiz = Object.keys(localQuiz).length > 0;
      const hasCloudQuiz = Object.keys(cloudQuiz).length > 0;
      const localQuizTime = Date.parse(localQuiz.date || "") || 0;
      const cloudQuizTime = Date.parse(cloudQuiz.date || "") || 0;
      const selectedQuiz = !hasLocalQuiz
        ? cloudQuiz
        : !hasCloudQuiz
          ? localQuiz
          : localQuizTime >= cloudQuizTime ? localQuiz : cloudQuiz;
      if (Object.keys(selectedQuiz).length) {
        merged.quizzes[key] = {
          answers: Array.isArray(selectedQuiz.answers) ? selectedQuiz.answers : [],
          score: Number(selectedQuiz.score || 0),
          bestScore: Math.max(
            Number(localQuiz.bestScore ?? localQuiz.score ?? 0),
            Number(cloudQuiz.bestScore ?? cloudQuiz.score ?? 0)
          ),
          passed: Boolean(localQuiz.passed || cloudQuiz.passed),
          attempts: Math.max(Number(localQuiz.attempts || 0), Number(cloudQuiz.attempts || 0)),
          date: selectedQuiz.date || null
        };
      }
    });

    new Set([...Object.keys(local.reviewStats), ...Object.keys(cloud.reviewStats)]).forEach((reviewKey) => {
      const a = local.reviewStats[reviewKey] || {};
      const b = cloud.reviewStats[reviewKey] || {};
      const aTime = Date.parse(a.lastSeen || "") || 0;
      const bTime = Date.parse(b.lastSeen || "") || 0;
      const latest = aTime >= bTime ? a : b;
      merged.reviewStats[reviewKey] = {
        misses: Math.max(Number(a.misses || 0), Number(b.misses || 0)),
        correct: Math.max(Number(a.correct || 0), Number(b.correct || 0)),
        needsReview: Boolean(latest.needsReview),
        lastSeen: latest.lastSeen || null
      };
    });

    const localFinal = local.finalResult || {};
    const cloudFinal = cloud.finalResult || {};
    if (Object.keys(localFinal).length || Object.keys(cloudFinal).length) {
      const selectedFinal = Number(localFinal.score || 0) >= Number(cloudFinal.score || 0) ? localFinal : cloudFinal;
      merged.finalResult = {
        ...selectedFinal,
        score: Math.max(Number(localFinal.score || 0), Number(cloudFinal.score || 0)),
        passed: Boolean(localFinal.passed || cloudFinal.passed)
      };
    }
    const localSimulator = local.simulator || {};
    const cloudSimulator = cloud.simulator || {};
    if (Object.keys(localSimulator).length || Object.keys(cloudSimulator).length) {
      const localTime = Date.parse(localSimulator.updatedAt || "") || 0;
      const cloudTime = Date.parse(cloudSimulator.updatedAt || "") || 0;
      const selectedSimulator = localTime >= cloudTime ? localSimulator : cloudSimulator;
      merged.simulator = {
        answers: selectedSimulator.answers && typeof selectedSimulator.answers === "object" ? selectedSimulator.answers : {},
        currentStep: Math.max(0, Number(selectedSimulator.currentStep || 0)),
        completed: Boolean(selectedSimulator.completed),
        updatedAt: selectedSimulator.updatedAt || null
      };
    }
    merged.updatedAt = new Date().toISOString();
    return merged;
  }

  function localStorageKey() {
    const identity = state.user?.id || state.user?.email || "anonymous";
    return `${LOCAL_PREFIX}:${identity}`;
  }

  function loadLocalProgress() {
    try {
      return normalizeProgress(JSON.parse(localStorage.getItem(localStorageKey()) || "null"));
    } catch {
      return createEmptyProgress();
    }
  }

  function saveLocalProgress() {
    if (!state.user) return;
    state.progress.updatedAt = new Date().toISOString();
    localStorage.setItem(localStorageKey(), JSON.stringify(state.progress));
  }

  function scheduleCloudSync() {
    saveLocalProgress();
    if (!state.user || !supabaseClient) return;
    window.clearTimeout(state.syncTimer);
    state.syncTimer = window.setTimeout(syncCloudProgress, 700);
  }

  async function syncCloudProgress() {
    if (!state.user || !supabaseClient || state.syncing) return;
    state.syncing = true;
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        data: { [PROGRESS_FIELD]: state.progress }
      });
      if (error) throw error;
      if (data?.user) state.user = data.user;
    } catch (error) {
      console.error("No se pudo sincronizar el progreso:", error);
      showToast("Tu avance quedó guardado en este equipo; se sincronizará al recuperar la conexión.");
    } finally {
      state.syncing = false;
    }
  }

  function getUnit(id) {
    return course.find((unit) => unit.id === Number(id));
  }

  function getNextUnit(unit) {
    const index = course.findIndex((item) => item.id === unit.id);
    return index >= 0 ? course[index + 1] || null : null;
  }

  function getProject(unitId) {
    return state.progress.projects[String(unitId)] || { responses: [], complete: false };
  }

  function getTheoryViewed(unitId) {
    return state.progress.theory[String(unitId)] || [];
  }

  function getResourcesViewed(unitId) {
    return state.progress.resources[String(unitId)] || [];
  }

  function getPractice(unitId) {
    return state.progress.practice[String(unitId)] || { matched: [], order: [], attempts: 0, score: 0, complete: false };
  }

  function getQuiz(unitId) {
    return state.progress.quizzes[String(unitId)] || { answers: [], score: 0, bestScore: 0, passed: false, attempts: 0 };
  }

  function isProjectComplete(unit) {
    return Boolean(getProject(unit.id).complete);
  }

  function isTheoryComplete(unit) {
    return unit.theory.every((item) => getTheoryViewed(unit.id).includes(item.id));
  }

  function hasEducationalResources(unit) {
    return Array.isArray(unit.resources) && unit.resources.length > 0;
  }

  function isResourcesComplete(unit) {
    return !hasEducationalResources(unit)
      || unit.resources.every((resource) => getResourcesViewed(unit.id).includes(resource.id));
  }

  function isPracticeComplete(unit) {
    return Boolean(getPractice(unit.id).complete);
  }

  function isQuizPassed(unit) {
    return Boolean(getQuiz(unit.id).passed);
  }

  function getUnitStages(unit) {
    const stages = [
      { label: "Proyecto aplicado", icon: "⌂", done: isProjectComplete(unit) },
      { label: "Teoría", icon: "▤", done: isTheoryComplete(unit) }
    ];
    if (hasEducationalResources(unit)) {
      stages.push({ label: "Recursos educativos", icon: "▶", done: isResourcesComplete(unit) });
    }
    stages.push(
      { label: "Práctica", icon: "◎", done: isPracticeComplete(unit) },
      { label: "Evaluación", icon: "✓", done: isQuizPassed(unit) }
    );
    return stages;
  }

  function getHighestUnlocked() {
    for (const unit of course) {
      if (!isQuizPassed(unit)) return unit.id;
    }
    return course[course.length - 1]?.id || 1;
  }

  function isUnitUnlocked(unit) {
    return Boolean(unit);
  }

  function getUnitProgress(unit) {
    const stages = getUnitStages(unit);
    const completed = stages.filter((stage) => stage.done).length;
    return Math.round((completed / stages.length) * 100);
  }

  function getOverallProgress() {
    if (!course.length) return 0;
    const totals = course.reduce((result, unit) => {
      const stages = getUnitStages(unit);
      result.completed += stages.filter((stage) => stage.done).length;
      result.total += stages.length;
      return result;
    }, { completed: 0, total: 0 });
    return Math.round((totals.completed / totals.total) * 100);
  }

  function getDisplayName() {
    return state.user?.user_metadata?.full_name?.trim()
      || state.user?.email?.split("@")[0]
      || "Estudiante";
  }

  function getInitials(name) {
    return String(name)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "IM";
  }

  function getSelectedAvatar() {
    return AVATARS.find((avatar) => avatar.id === state.progress.avatar) || null;
  }

  function setAuthMessage(message = "", type = "") {
    const element = byId("authMessage");
    element.textContent = message;
    element.className = "form-message";
    if (message) element.classList.add("is-visible", type === "error" ? "is-error" : "is-success");
  }

  function setAuthBusy(busy) {
    const submit = byId("authSubmit");
    submit.disabled = busy;
    submit.textContent = busy
      ? (state.authMode === "login" ? "Ingresando…" : "Creando cuenta…")
      : (state.authMode === "login" ? "Ingresar" : "Crear mi cuenta");
  }

  function updateAuthMode() {
    const signingUp = state.authMode === "signup";
    byId("authTitle").textContent = signingUp ? "Crear cuenta" : "Iniciar sesión";
    byId("authSubtitle").textContent = signingUp
      ? `Regístrate para guardar tu proyecto y avanzar por las ${course.length} unidades.`
      : "Ingresa tus credenciales para continuar.";
    byId("nameField").classList.toggle("is-hidden", !signingUp);
    byId("nameInput").required = signingUp;
    byId("nameInput").autocomplete = signingUp ? "name" : "off";
    byId("passwordInput").autocomplete = signingUp ? "new-password" : "current-password";
    byId("authSubmit").textContent = signingUp ? "Crear mi cuenta" : "Ingresar";
    byId("authModeToggle").textContent = signingUp
      ? "¿Ya tienes cuenta? Inicia sesión"
      : "¿No tienes cuenta? Regístrate aquí";
    setAuthMessage();
  }

  function friendlyAuthError(error) {
    const text = String(error?.message || "").toLowerCase();
    if (text.includes("invalid login credentials")) return "El correo o la contraseña no coinciden.";
    if (text.includes("email not confirmed")) return "Confirma tu correo antes de iniciar sesión.";
    if (text.includes("user already registered")) return "Ese correo ya tiene una cuenta. Inicia sesión.";
    if (text.includes("password")) return "La contraseña debe tener al menos 6 caracteres.";
    if (text.includes("email")) return "Revisa que el correo electrónico sea válido.";
    return "No fue posible completar el acceso. Revisa la conexión e inténtalo nuevamente.";
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    if (!supabaseClient) {
      setAuthMessage("No se pudo cargar el servicio de acceso. Recarga la página.", "error");
      return;
    }
    const name = byId("nameInput").value.trim();
    const email = byId("emailInput").value.trim();
    const password = byId("passwordInput").value;
    if (state.authMode === "signup" && !name) {
      setAuthMessage("Escribe tu nombre completo.", "error");
      return;
    }
    setAuthBusy(true);
    setAuthMessage();
    try {
      if (state.authMode === "signup") {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (error) throw error;
        if (data.session && data.user) {
          await enterApplication(data.user);
        } else {
          state.authMode = "login";
          updateAuthMode();
          byId("emailInput").value = email;
          byId("passwordInput").value = "";
          setAuthMessage("Cuenta creada. Revisa tu correo para confirmar el registro y luego inicia sesión.", "success");
        }
      } else {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await enterApplication(data.user);
      }
    } catch (error) {
      setAuthMessage(friendlyAuthError(error), "error");
    } finally {
      setAuthBusy(false);
    }
  }

  async function enterApplication(user) {
    if (!user) return;
    state.user = user;
    const local = loadLocalProgress();
    const cloud = normalizeProgress(user.user_metadata?.[PROGRESS_FIELD]);
    state.progress = mergeProgress(local, cloud);
    saveLocalProgress();
    byId("loginView").classList.remove("is-active");
    byId("appHeader").hidden = false;
    byId("siteFooter").hidden = false;
    renderHome();
    renderProfile();
    switchView("homeView");
    scheduleCloudSync();
  }

  function showLogin() {
    stopSupportVoice();
    state.user = null;
    byId("appHeader").hidden = true;
    byId("siteFooter").hidden = true;
    document.querySelectorAll("main.view").forEach((view) => view.classList.remove("is-active"));
    byId("loginView").classList.add("is-active");
    closeTheoryModal();
    closeResourceModal();
    closeQuizModal();
    closeBadgeModal();
    closeFinalModal();
    byId("supportWidget").hidden = true;
  }

  async function logout() {
    saveLocalProgress();
    if (supabaseClient) await supabaseClient.auth.signOut();
    showLogin();
    byId("passwordInput").value = "";
    setAuthMessage("Sesión cerrada correctamente.", "success");
  }

  function switchView(viewId) {
    if (!state.user && viewId !== "loginView") return;
    document.querySelectorAll("main.view").forEach((view) => view.classList.remove("is-active"));
    const target = byId(viewId);
    if (!target) return;
    target.classList.add("is-active");
    document.querySelectorAll("[data-view-target]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.viewTarget === viewId && button.classList.contains("nav-button"));
    });
    if (viewId === "homeView") renderHome();
    if (viewId === "mediaView") renderMediaLibrary();
    if (viewId === "creditsView") renderCredits();
    if (viewId === "simulatorView") {
      const record = getSimulatorRecord();
      state.simulatorStep = !simulatorSteps.length
        ? 0
        : record.completed
          ? simulatorSteps.length
          : Math.min(simulatorSteps.length - 1, Math.max(0, Number(record.currentStep || 0)));
      renderSimulator();
    } else {
      stopSupportVoice();
    }
    if (viewId === "profileView") renderProfile();
    if (viewId !== "unitView") toggleSupport(false);
    byId("supportWidget").hidden = viewId !== "unitView";
    if (viewId === "unitView") updateMotivationBubble();
    target.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderHome() {
    const name = getDisplayName().split(/\s+/)[0];
    const overall = getOverallProgress();
    const highest = getHighestUnlocked();
    const passed = course.filter(isQuizPassed).length;
    byId("welcomeTitle").textContent = `Hola, ${name}. Tu investigación comienza aquí.`;
    byId("overallProgressText").textContent = `${overall}%`;
    byId("overallProgressBar").style.width = `${overall}%`;
    byId("overallProgressBar").parentElement.setAttribute("aria-valuenow", String(overall));
    byId("overallProgressCaption").textContent = passed === course.length
      ? `Completaste las ${course.length} unidades. Ya puedes presentar la evaluación final.`
      : passed
        ? `Has aprobado ${passed} de ${course.length} unidades.`
        : "Tu primera estación está lista.";

    byId("continueButton").textContent = passed === course.length
      ? `Revisar Unidad ${course[course.length - 1]?.id}`
      : `${getUnit(highest)?.id === course[0]?.id && overall === 0 ? "Comenzar" : "Continuar"} Unidad ${highest}`;
    renderReviewChallenge();

    byId("unitMap").innerHTML = course.map((unit) => {
      const complete = isQuizPassed(unit);
      const unlocked = isUnitUnlocked(unit);
      const current = unlocked && !complete && unit.id === highest;
      const status = complete ? "Completada" : current ? "En curso" : unlocked ? "Disponible" : "Bloqueada";
      const classes = ["unit-node", complete && "is-complete", current && "is-current", !unlocked && "is-locked"].filter(Boolean).join(" ");
      return `
        <button class="${classes}" type="button" data-unit-id="${unit.id}" ${unlocked ? "" : "disabled"}>
          <div class="unit-node-head"><span class="unit-orb">${complete ? "✓" : unit.id}</span><span class="unit-status">${status}</span></div>
          <h3>${escapeHTML(unit.title)}</h3>
          <p>${escapeHTML(unit.short)}</p>
          <span class="unit-phase">${escapeHTML(unit.phase)}</span>
        </button>`;
    }).join("");

    byId("unitMap").querySelectorAll("[data-unit-id]").forEach((button) => {
      button.addEventListener("click", () => openUnit(Number(button.dataset.unitId)));
    });
    byId("finalChallenge").hidden = false;
    renderAvatarChooser();
  }

  function renderMediaLibrary() {
    const grid = byId("bookMediaGrid");
    if (!grid) return;
    if (!bookMedia.length) {
      grid.innerHTML = `<div class="empty-state"><h2>Recursos en preparación</h2><p>Los materiales multimedia aparecerán aquí.</p></div>`;
      return;
    }
    grid.innerHTML = bookMedia.map((resource) => {
      const typeLabel = resource.type === "audio" ? "Podcast" : "Video";
      const typeIcon = resource.type === "audio" ? "♫" : "▶";
      return `
        <article class="book-media-card">
          <div class="book-media-qr">
            <img src="${escapeHTML(resource.qr)}" alt="Código QR para ${escapeHTML(resource.title)}">
            <span>Escanea para abrir</span>
          </div>
          <div class="book-media-copy">
            <div class="book-media-meta"><span>${typeIcon} ${typeLabel}</span><span>Unidad ${resource.unitId} · p. ${resource.page}</span></div>
            <h2>${escapeHTML(resource.title)}</h2>
            <p>${escapeHTML(resource.description)}</p>
            <div class="book-media-actions">
              <button class="button button-primary" type="button" data-open-book-media="${escapeHTML(resource.id)}">Ver dentro de la app</button>
              <a class="button button-secondary" href="${escapeHTML(resource.qrUrl)}" target="_blank" rel="noopener noreferrer">Abrir destino QR ↗</a>
            </div>
          </div>
        </article>`;
    }).join("");
    grid.querySelectorAll("[data-open-book-media]").forEach((button) => {
      button.addEventListener("click", () => openBookMedia(button.dataset.openBookMedia));
    });
  }

  function renderCredits() {
    const grid = byId("creditsGrid");
    if (!grid) return;
    const people = Array.isArray(courseCredits) ? courseCredits : [];
    if (!people.length) {
      grid.innerHTML = `<div class="empty-state"><h2>Créditos en preparación</h2></div>`;
      return;
    }
    grid.innerHTML = people.map((person) => `
      <article class="credits-card">
        <p class="credits-person">${escapeHTML(person.name || "")}</p>
        ${person.role ? `<p class="credits-role">${escapeHTML(person.role)}</p>` : ""}
        ${person.summary ? `<p>${escapeHTML(person.summary)}</p>` : ""}
        ${Array.isArray(person.credentials) && person.credentials.length
          ? `<ul>${person.credentials.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`
          : ""}
        ${person.more
          ? `<details class="credits-more"><summary>Saber más</summary><p>${escapeHTML(person.more)}</p></details>`
          : ""}
      </article>`).join("");
  }

  function openBookMedia(resourceId) {
    const resource = bookMedia.find((item) => item.id === resourceId);
    if (!resource) return;
    const typeLabel = resource.type === "audio" ? "Podcast" : "Video";
    byId("resourceModalTitle").textContent = resource.title;
    byId("resourceModalSource").textContent = `Unidad ${resource.unitId} · página ${resource.page} del PDF`;
    byId("resourceModalBody").innerHTML = `
      <div class="book-media-player">
        <iframe src="${escapeHTML(resource.previewUrl)}" title="${typeLabel}: ${escapeHTML(resource.title)}" allow="autoplay; fullscreen" allowfullscreen loading="eager"></iframe>
        <div class="resource-study-note">
          <strong>Recurso original de «Inteligencia en la Investigación de Mercados Efectiva»</strong>
          <p>Puedes reproducirlo aquí, escanear el código QR o abrir el destino original en una pestaña nueva.</p>
          <div class="embedded-resource-actions">
            <img src="${escapeHTML(resource.qr)}" alt="Código QR para ${escapeHTML(resource.title)}">
            <a class="button button-secondary" href="${escapeHTML(resource.qrUrl)}" target="_blank" rel="noopener noreferrer">Abrir destino original ↗</a>
          </div>
        </div>
      </div>`;
    const modal = byId("resourceModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function getSimulatorRecord() {
    const record = state.progress.simulator;
    if (!record || typeof record !== "object") return { answers: {}, currentStep: 0, completed: false, updatedAt: null };
    const answers = record.answers && typeof record.answers === "object" ? record.answers : {};
    const firstMissing = simulatorSteps.findIndex((step) => !answers[step.id]);
    const allAnswered = firstMissing === -1;
    return {
      ...record,
      answers,
      currentStep: allAnswered ? Math.max(0, Number(record.currentStep || 0)) : Math.max(0, firstMissing),
      completed: Boolean(record.completed && allAnswered)
    };
  }

  function saveSimulatorRecord(nextRecord) {
    state.progress.simulator = {
      answers: nextRecord.answers && typeof nextRecord.answers === "object" ? nextRecord.answers : {},
      currentStep: Math.max(0, Number(nextRecord.currentStep || 0)),
      completed: Boolean(nextRecord.completed),
      updatedAt: new Date().toISOString()
    };
    scheduleCloudSync();
  }

  function getSimulatorSelection(step, record) {
    return step.options.find((option) => option.id === record.answers?.[step.id]) || null;
  }

  function getSimulatorOptionLabel(stepId, optionId) {
    const step = simulatorSteps.find((item) => item.id === stepId);
    return step?.options.find((option) => option.id === optionId)?.label || "";
  }

  function getSimulatorRouteMetrics(record) {
    const answers = record.answers || {};
    const demand = { budget: 0, weeks: 0, depth: 0, coverage: 0, control: 0 };
    SIMULATOR_DEMAND_KEYS.forEach((key) => {
      const impact = SIMULATOR_DEMAND[answers[key]];
      if (!impact) return;
      Object.keys(demand).forEach((metric) => { demand[metric] += Number(impact[metric] || 0); });
    });
    const capacity = SIMULATOR_CAPACITY[answers.capacity] || null;
    let feasibility = null;
    if (capacity && demand.budget && demand.weeks) {
      const budgetFit = Math.min(100, Math.round((capacity.budget / demand.budget) * 100));
      const timeFit = Math.min(100, Math.round((capacity.weeks / demand.weeks) * 100));
      feasibility = Math.round((budgetFit + timeFit) / 2);
    }
    return {
      demand,
      capacity,
      feasibility,
      feasibilityLabel: feasibility === null ? "Por calcular" : feasibility >= 90 ? "Viable" : feasibility >= 70 ? "Ajustada" : "Supera la capacidad",
      evidence: {
        depth: Math.min(100, demand.depth),
        coverage: Math.min(100, demand.coverage),
        control: Math.min(100, demand.control)
      }
    };
  }

  function listSimulatorLabels(stepId, ids) {
    return ids.map((id) => { const label = getSimulatorOptionLabel(stepId, id); return label.charAt(0).toLowerCase() + label.slice(1); }).join(" o ");
  }

  function getSimulatorAnalysis(record) {
    const answers = record.answers || {};
    const answeredCount = simulatorSteps.filter((step) => Boolean(answers[step.id])).length;
    const ideal = SIMULATOR_IDEAL_ROUTES[answers.situation] || null;
    const notes = [];
    let coherence = null;

    if (ideal && (answers.scale || answers.sampling)) {
      coherence = 40;
      if (answers.scale) {
        if (ideal.scale.includes(answers.scale)) {
          coherence += 30;
        } else {
          coherence += 8;
          notes.push(`La escala elegida no responde de forma directa a lo que pide el estudio. Prueba ${listSimulatorLabels("scale", ideal.scale)}.`);
        }
      }
      if (answers.sampling) {
        if (ideal.sampling.includes(answers.sampling)) {
          coherence += 30;
        } else {
          coherence += 8;
          notes.push(`La técnica de muestreo elegida puede no dar la representatividad que necesita este estudio. Compara con ${listSimulatorLabels("sampling", ideal.sampling)}.`);
        }
      }
      coherence = Math.min(100, coherence);
    }

    if (answers.situation === "satisfaction" && answers.size === "n30") {
      notes.push("Con 30 personas no es posible generalizar la satisfacción de 20 000 clientes; conviene una muestra mayor.");
    }
    if (answers.pilot === "none") {
      notes.push("Sin prueba piloto, los errores del cuestionario llegarán sin corregir al trabajo de campo.");
    }
    if (answers.control === "none") {
      notes.push("Sin supervisión ni validación no se puede comprobar que las entrevistas sean auténticas.");
    }

    let label = "Por comprobar";
    if (coherence !== null) label = coherence >= 90 ? "Coherencia alta" : coherence >= 70 ? "Coherencia media" : "Necesita ajustes";

    const metrics = getSimulatorRouteMetrics(record);
    let endingTitle = "Ruta en construcción";

    let outcome = "Elige un estudio para comenzar a observar cómo cada decisión modifica la ruta.";
    const nextStep = simulatorSteps.find((step) => !answers[step.id]);
    if (answeredCount > 0 && answeredCount < simulatorSteps.length) {
      outcome = nextStep
        ? `La ruta ya reaccionó a ${answeredCount} decisiones. Falta definir: ${nextStep.title.toLowerCase()}.`
        : outcome;
    } else if (answeredCount === simulatorSteps.length) {
      if (coherence >= 90 && metrics.feasibility >= 90) {
        endingTitle = "Final: plan sólido y viable";
        outcome = "La escala y la técnica de muestreo responden al estudio, y la demanda estimada cabe dentro de los recursos del trabajo de campo.";
      } else if (coherence >= 90) {
        endingTitle = "Final: buen diseño, recursos insuficientes";
        outcome = "La ruta es coherente con el estudio, pero necesita reducir la muestra, el tiempo o los controles para poder ejecutarse.";
      } else if (metrics.feasibility >= 90) {
        endingTitle = "Final: plan viable, evidencia desalineada";
        outcome = "La ruta cabe en los recursos disponibles, pero puede producir datos que no respondan directamente al estudio.";
      } else {
        endingTitle = "Final: replanteamiento necesario";
        outcome = "La ruta combina una desalineación con el estudio y una demanda superior a la capacidad del campo. Conviene cambiar más de una decisión.";
      }
    }

    return {
      answeredCount,
      completion: Math.round((answeredCount / Math.max(1, simulatorSteps.length)) * 100),
      coherence,
      label,
      outcome,
      endingTitle,
      notes,
      ideal,
      metrics
    };
  }

  function getSimulatorDecisionFeedback(step, selected, record) {
    if (!selected) return step.voice;
    const analysis = getSimulatorAnalysis(record);
    if (step.id === "scale" && analysis.ideal) {
      return analysis.ideal.scale.includes(selected.id)
        ? `${selected.impact} Esta elección es coherente con el estudio seleccionado.`
        : `${selected.impact} Atención: para ese estudio, ${listSimulatorLabels("scale", analysis.ideal.scale)} ofrecería una relación más directa.`;
    }
    if (step.id === "sampling" && analysis.ideal) {
      return analysis.ideal.sampling.includes(selected.id)
        ? `${selected.impact} Esta elección completa una ruta coherente.`
        : `${selected.impact} Atención: la representatividad de esta técnica puede no responder al estudio seleccionado; compara con ${listSimulatorLabels("sampling", analysis.ideal.sampling)}.`;
    }
    if (["capacity", "control"].includes(step.id) && analysis.metrics.feasibility !== null) {
      return `${selected.impact} Con las decisiones actuales, la viabilidad estimada es ${analysis.metrics.feasibility}% (${analysis.metrics.feasibilityLabel.toLowerCase()}).`;
    }
    return selected.impact || step.voice;
  }

  function renderSimulatorLiveState(record) {
    const analysis = getSimulatorAnalysis(record);
    const situation = getSimulatorOptionLabel("situation", record.answers?.situation) || "Selecciona un estudio";
    const meterValue = analysis.coherence === null ? 0 : analysis.coherence;
    const meterText = analysis.coherence === null ? analysis.label : `${analysis.coherence}% · ${analysis.label}`;
    const { demand, capacity, feasibility, feasibilityLabel } = analysis.metrics;
    return `
      <section class="simulator-live-state" aria-live="polite" aria-label="Estado de la simulación">
        <div class="simulator-live-heading">
          <div><small>Caso activo</small><strong>${escapeHTML(situation)}</strong></div>
          <div><small>Ruta construida</small><strong>${analysis.answeredCount} de ${simulatorSteps.length} decisiones</strong></div>
        </div>
        <div class="simulator-live-metrics">
          <div><span>Coherencia</span><strong>${escapeHTML(meterText)}</strong><div class="simulator-meter" role="progressbar" aria-label="Coherencia estimada de la ruta" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${meterValue}" aria-valuetext="${escapeHTML(meterText)}"><span style="width: ${meterValue}%"></span></div></div>
          <div><span>Recursos</span><strong>${capacity ? `${demand.budget} / ${capacity.budget} puntos` : `${demand.budget} puntos por cubrir`}</strong><div class="simulator-meter" role="progressbar" aria-label="Uso de recursos" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${capacity ? Math.min(100, Math.round((demand.budget / capacity.budget) * 100)) : 0}"><span style="width: ${capacity ? Math.min(100, Math.round((demand.budget / capacity.budget) * 100)) : 0}%"></span></div></div>
          <div><span>Tiempo</span><strong>${capacity ? `${demand.weeks} / ${capacity.weeks} semanas` : `${demand.weeks} semanas por cubrir`}</strong><div class="simulator-meter" role="progressbar" aria-label="Uso del tiempo" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${capacity ? Math.min(100, Math.round((demand.weeks / capacity.weeks) * 100)) : 0}"><span style="width: ${capacity ? Math.min(100, Math.round((demand.weeks / capacity.weeks) * 100)) : 0}%"></span></div></div>
        </div>
        <p><strong>${feasibility === null ? "Viabilidad por calcular" : `${feasibility}% · ${feasibilityLabel}.`}</strong> ${escapeHTML(analysis.outcome)}</p>
      </section>`;
  }

  function renderSimulator() {
    const content = byId("simulatorContent");
    if (!content) return;
    if (!simulatorSteps.length) {
      byId("simulatorTrack").innerHTML = "";
      content.innerHTML = `<div class="empty-state"><h2>Simulador en preparación</h2><p>Agrega los pasos para comenzar.</p></div>`;
      return;
    }
    const record = getSimulatorRecord();
    const avatar = getSelectedAvatar();
    const avatarElement = byId("simulatorGuideAvatar");
    avatarElement.className = `simulator-guide-avatar${avatar ? ` avatar-${avatar.id}` : ""}`;
    byId("simulatorGuideTitle").textContent = avatar ? `${avatar.name} te acompaña` : "Te explico cada paso";

    const track = byId("simulatorTrack");
    track.innerHTML = simulatorSteps.map((step, index) => {
      const answered = Boolean(record.answers?.[step.id]);
      const active = state.simulatorStep === index && state.simulatorStep < simulatorSteps.length;
      return `<button class="simulator-track-step ${answered ? "is-done" : ""} ${active ? "is-active" : ""}" type="button" data-simulator-track-step="${index}" ${answered || active ? "" : "disabled"} aria-label="Decisión ${index + 1}: ${escapeHTML(step.title)}" aria-current="${active ? "step" : "false"}"><span>${answered ? "✓" : index + 1}</span><small>U${step.unitId} · ${index % 2 + 1}</small></button>`;
    }).join("");
    track.querySelectorAll("[data-simulator-track-step]").forEach((button) => {
      button.addEventListener("click", () => {
        state.simulatorStep = Number(button.dataset.simulatorTrackStep);
        saveSimulatorRecord({ ...getSimulatorRecord(), currentStep: state.simulatorStep, completed: false });
        stopSupportVoice();
        renderSimulator();
      });
    });

    if (state.simulatorStep >= simulatorSteps.length || record.completed) {
      renderSimulatorSummary(record);
      return;
    }

    const step = simulatorSteps[state.simulatorStep];
    const selected = getSimulatorSelection(step, record);
    const decisionFeedback = getSimulatorDecisionFeedback(step, selected, record);
    byId("simulatorGuideText").textContent = decisionFeedback;
    content.innerHTML = `
      ${renderSimulatorLiveState(record)}
      <div class="simulator-step-copy">
        <p class="eyebrow">${escapeHTML(step.eyebrow)}</p>
        <h2 id="simulatorStepTitle">${escapeHTML(step.title)}</h2>
        <p>${escapeHTML(step.prompt)}</p>
      </div>
      <div class="simulator-options" role="group" aria-label="${escapeHTML(step.prompt)}">
        ${step.options.map((option) => `
          <button class="simulator-option ${selected?.id === option.id ? "is-selected" : ""}" type="button" data-simulator-option="${escapeHTML(option.id)}" aria-pressed="${selected?.id === option.id}">
            <span class="simulator-option-check" aria-hidden="true">${selected?.id === option.id ? "✓" : "○"}</span>
            <span><strong>${escapeHTML(option.label)}</strong><small>${escapeHTML(option.detail)}</small></span>
          </button>`).join("")}
      </div>
      ${selected ? `
        <section class="simulator-impact" aria-live="polite">
          <p class="eyebrow">Consecuencia simulada</p>
          <h3>Esto cambia con tu elección</h3>
          <p>${escapeHTML(decisionFeedback)}</p>
          <dl>
            <div><dt>Aporta</dt><dd>${escapeHTML(selected.strength || selected.detail)}</dd></div>
            <div><dt>Debes vigilar</dt><dd>${escapeHTML(selected.risk || "Revisa que la decisión responda a la pregunta de investigación.")}</dd></div>
          </dl>
        </section>` : ""}
      <div class="simulator-actions">
        <button id="previousSimulatorStep" class="button button-secondary" type="button" ${state.simulatorStep === 0 ? "disabled" : ""}>← Anterior</button>
        <span>Paso ${state.simulatorStep + 1} de ${simulatorSteps.length}</span>
        <button id="nextSimulatorStep" class="button button-primary" type="button" ${selected ? "" : "disabled"}>${state.simulatorStep === simulatorSteps.length - 1 ? "Simular resultado →" : "Aplicar y continuar →"}</button>
      </div>`;

    content.querySelectorAll("[data-simulator-option]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextAnswers = { ...(getSimulatorRecord().answers || {}), [step.id]: button.dataset.simulatorOption };
        saveSimulatorRecord({ answers: nextAnswers, currentStep: state.simulatorStep, completed: false });
        renderSimulator();
      });
    });
    byId("previousSimulatorStep").addEventListener("click", () => {
      state.simulatorStep = Math.max(0, state.simulatorStep - 1);
      saveSimulatorRecord({ ...getSimulatorRecord(), currentStep: state.simulatorStep, completed: false });
      renderSimulator();
    });
    byId("nextSimulatorStep").addEventListener("click", () => {
      const currentRecord = getSimulatorRecord();
      if (!getSimulatorSelection(step, currentRecord)) return;
      if (state.simulatorStep === simulatorSteps.length - 1) {
        state.simulatorStep = simulatorSteps.length;
        saveSimulatorRecord({ ...currentRecord, currentStep: simulatorSteps.length, completed: true });
      } else {
        state.simulatorStep += 1;
        saveSimulatorRecord({ ...currentRecord, currentStep: state.simulatorStep, completed: false });
      }
      stopSupportVoice();
      renderSimulator();
    });
  }

  function renderSimulatorSummary(record) {
    const selections = simulatorSteps.map((step) => ({ step, option: getSimulatorSelection(step, record) }));
    const analysis = getSimulatorAnalysis(record);
    const { demand, capacity, feasibility, feasibilityLabel, evidence } = analysis.metrics;
    const summarySpeech = selections.map(({ step, option }) => `Unidad ${step.unitId}: ${option?.label || "sin respuesta"}.`).join(" ");
    byId("simulatorGuideText").textContent = `Resultado de la simulación: ${analysis.endingTitle}. Coherencia ${analysis.coherence || 0} por ciento y viabilidad ${feasibility || 0} por ciento. ${analysis.outcome} ${summarySpeech}`;
    byId("simulatorContent").innerHTML = `
      <div class="simulator-summary-heading">
        <span aria-hidden="true">◎</span>
        <div><p class="eyebrow">Resultado de la simulación</p><h2 id="simulatorStepTitle">${escapeHTML(analysis.endingTitle)}</h2><p>No es una calificación: compara coherencia con el estudio, capacidad disponible y perfil de calidad de la ruta.</p></div>
      </div>
      <section class="simulator-result" aria-live="polite">
        <div class="simulator-result-score"><strong>${analysis.coherence || 0}%</strong><span>${escapeHTML(analysis.label)}</span></div>
        <div>
          <p class="eyebrow">Qué ocurriría si aplicas esta ruta</p>
          <h3>${escapeHTML(analysis.outcome)}</h3>
          <div class="simulator-meter" role="progressbar" aria-label="Resultado de coherencia" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${analysis.coherence || 0}"><span style="width: ${analysis.coherence || 0}%"></span></div>
          ${analysis.notes.length ? `<ul>${analysis.notes.map((note) => `<li>${escapeHTML(note)}</li>`).join("")}</ul>` : `<p class="simulator-result-note">Las decisiones forman una secuencia consistente entre medición, cuestionario, muestra y campo.</p>`}
        </div>
      </section>
      <section class="simulator-capacity-grid" aria-label="Balance de recursos de la simulación">
        <article><small>Viabilidad estimada</small><strong>${feasibility || 0}%</strong><span>${escapeHTML(feasibilityLabel)}</span></article>
        <article><small>Recursos simulados</small><strong>${demand.budget} / ${capacity?.budget || 0}</strong><span>Puntos usados / disponibles</span></article>
        <article><small>Tiempo simulado</small><strong>${demand.weeks} / ${capacity?.weeks || 0}</strong><span>Semanas usadas / disponibles</span></article>
      </section>
      <section class="simulator-evidence-profile" aria-label="Perfil de calidad que produciría la ruta">
        <div><span>Precisión de la medición</span><strong>${evidence.depth}%</strong><div class="simulator-meter" role="progressbar" aria-label="Precisión de la medición" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${evidence.depth}"><span style="width:${evidence.depth}%"></span></div></div>
        <div><span>Representatividad</span><strong>${evidence.coverage}%</strong><div class="simulator-meter" role="progressbar" aria-label="Representatividad de la muestra" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${evidence.coverage}"><span style="width:${evidence.coverage}%"></span></div></div>
        <div><span>Control de calidad</span><strong>${evidence.control}%</strong><div class="simulator-meter" role="progressbar" aria-label="Control de calidad del campo" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${evidence.control}"><span style="width:${evidence.control}%"></span></div></div>
      </section>
      <div class="simulator-summary-grid">
        ${selections.map(({ step, option }, index) => `
          <button type="button" data-edit-simulator-step="${index}"><small>Unidad ${step.unitId} · Cambiar</small><strong>${escapeHTML(step.title)}</strong><p>${escapeHTML(option?.label || "Pendiente")}</p></button>`).join("")}
      </div>
      <div class="simulator-tip"><strong>Lectura pedagógica</strong><p>${escapeHTML(analysis.ideal?.explanation || "Revisa que la escala, el cuestionario, la muestra y el control del campo respondan a la misma necesidad del estudio.")}</p></div>
      <div class="simulator-actions simulator-summary-actions">
        <button id="editSimulatorPlan" class="button button-secondary" type="button">← Cambiar una decisión</button>
        <button id="restartSimulator" class="button button-primary" type="button">Reiniciar simulación</button>
      </div>`;
    byId("simulatorContent").querySelectorAll("[data-edit-simulator-step]").forEach((button) => {
      button.addEventListener("click", () => {
        state.simulatorStep = Number(button.dataset.editSimulatorStep);
        saveSimulatorRecord({ ...record, currentStep: state.simulatorStep, completed: false });
        renderSimulator();
      });
    });
    byId("editSimulatorPlan").addEventListener("click", () => {
      const targetId = analysis.notes.some((note) => note.includes("escala")) ? "scale" : analysis.notes.length ? "sampling" : "capacity";
      state.simulatorStep = Math.max(0, simulatorSteps.findIndex((step) => step.id === targetId));
      saveSimulatorRecord({ ...record, currentStep: state.simulatorStep, completed: false });
      renderSimulator();
    });
    byId("restartSimulator").addEventListener("click", () => {
      state.simulatorStep = 0;
      saveSimulatorRecord({ answers: {}, currentStep: 0, completed: false });
      stopSupportVoice();
      renderSimulator();
    });
  }

  function renderAvatarChooser() {
    const selected = getSelectedAvatar();
    byId("avatarGrid").innerHTML = AVATARS.map((avatar) => `
      <button class="avatar-choice ${selected?.id === avatar.id ? "is-selected" : ""}" type="button" data-avatar-id="${avatar.id}" aria-pressed="${selected?.id === avatar.id}">
        <span class="avatar-portrait avatar-${avatar.id}" aria-hidden="true"></span>
        <span><strong>${avatar.name}</strong><small>${avatar.description}</small></span>
        <em>${selected?.id === avatar.id ? "✓ Elegido" : "Elegir"}</em>
      </button>`).join("");
    byId("avatarGrid").querySelectorAll("[data-avatar-id]").forEach((button) => {
      button.addEventListener("click", () => {
        stopSupportVoice();
        state.progress.avatar = button.dataset.avatarId;
        scheduleCloudSync();
        renderAvatarChooser();
        renderProfile();
        showToast(`${getSelectedAvatar().name} te acompañará en el recorrido.`);
      });
    });
    byId("avatarStatus").textContent = selected
      ? `✓ ${selected.name} está listo para acompañarte.`
      : "Selecciona el avatar con el que más te identifiques.";
  }

  function openUnit(unitId) {
    const unit = getUnit(unitId);
    if (!getSelectedAvatar()) {
      switchView("homeView");
      byId("avatarSection").scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("Elige primero un avatar para iniciar el recorrido.");
      return;
    }
    if (!unit) {
      showToast("No fue posible encontrar esta unidad.");
      return;
    }
    state.currentUnitId = unit.id;
    state.supportAnswer = "";
    renderUnit();
    switchView("unitView");
  }

  function renderUnit() {
    const unit = getUnit(state.currentUnitId);
    if (!unit) return;
    const progress = getUnitProgress(unit);
    byId("unitPhase").textContent = `${unit.phase} · Unidad ${unit.id}`;
    byId("unitTitle").textContent = unit.title;
    byId("unitDescription").textContent = unit.short;
    byId("unitSourceName").textContent = "Material base";
    byId("unitSourcePages").textContent = unit.pages;
    const unitPdfHref = pdfHrefForUnit(unit);
    byId("unitSourceCard").setAttribute("href", unitPdfHref);
    byId("unitSourceCard").setAttribute("download", unitPdfHref.split("/").pop());
    byId("unitProgressText").textContent = `${progress}%`;
    byId("unitProgressBar").style.width = `${progress}%`;
    byId("unitProgressBar").parentElement.setAttribute("aria-valuenow", String(progress));
    renderStageTrack(unit);
    renderProject(unit);
    renderTheory(unit);
    renderResources(unit);
    renderPractice(unit);
    renderQuiz(unit);
    applySectionLocks(unit);
    renderSupportWidget(unit);
  }

  function renderStageTrack(unit) {
    const stages = getUnitStages(unit);
    const activeIndex = Math.max(0, stages.findIndex((stage) => !stage.done));
    byId("stageTrack").innerHTML = stages.map((stage, index) => `
      <div class="stage-chip ${stage.done ? "is-done" : index === activeIndex ? "is-active" : ""}">
        <span aria-hidden="true">${stage.done ? "✓" : stage.icon}</span>${stage.label}
      </div>`).join("");
  }

  function renderProject(unit) {
    const record = getProject(unit.id);
    const responses = unit.project.prompts.map((_, index) => String(record.responses?.[index] || ""));
    byId("projectBrief").innerHTML = `
      <div class="project-summary">
        <p class="eyebrow">Misión de la unidad</p>
        <h3>${escapeHTML(unit.project.title)}</h3>
        <p>${escapeHTML(unit.project.context)}</p>
        <p><strong>Qué debes hacer:</strong> ${escapeHTML(unit.project.task)}</p>
        <div class="project-deliverable"><strong>Evidencia del proyecto</strong>${escapeHTML(unit.project.deliverable)}</div>
      </div>
      <form id="projectForm" class="project-form">
        ${unit.project.prompts.map((prompt, index) => `
          <div class="project-prompt">
            <label for="projectResponse${index}">${escapeHTML(prompt)}</label>
            <textarea id="projectResponse${index}" class="project-response" maxlength="1500" placeholder="Escribe tu respuesta con base en el proyecto que elegiste…">${escapeHTML(responses[index])}</textarea>
          </div>`).join("")}
        <div>
          <button class="button button-secondary" type="button" id="saveProjectDraft">Guardar borrador</button>
          <button class="button button-primary" type="submit">${record.complete ? "Actualizar misión" : "Completar misión"}</button>
        </div>
        <p class="save-status">${record.complete ? "✓ Misión completada. Puedes consultar la teoría." : "Completa las tres respuestas para abrir la teoría."}</p>
      </form>`;

    const collectResponses = () => unit.project.prompts.map((_, index) => byId(`projectResponse${index}`).value.trim());
    byId("saveProjectDraft").addEventListener("click", () => {
      const nextResponses = collectResponses();
      state.progress.projects[String(unit.id)] = {
        responses: nextResponses,
        complete: Boolean(record.complete && nextResponses.every(Boolean)),
        savedAt: new Date().toISOString()
      };
      scheduleCloudSync();
      showToast("Borrador guardado.");
      renderUnit();
    });
    byId("projectForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const nextResponses = collectResponses();
      if (!nextResponses.every(Boolean)) {
        showToast("Responde las tres preguntas para completar la misión.");
        return;
      }
      state.progress.projects[String(unit.id)] = {
        responses: nextResponses,
        complete: true,
        savedAt: new Date().toISOString()
      };
      scheduleCloudSync();
      renderUnit();
      renderHome();
      showToast("Misión completada. La teoría está disponible.");
      byId("theorySection").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderTheory(unit) {
    const viewed = getTheoryViewed(unit.id);
    byId("theoryGrid").innerHTML = unit.theory.map((item) => {
      const done = viewed.includes(item.id);
      return `
        <button class="theory-card ${done ? "is-viewed" : ""}" type="button" data-theory-id="${escapeHTML(item.id)}">
          <div class="theory-card-top"><span class="theory-id">${escapeHTML(item.id)}</span><span class="theory-status">${done ? "✓ Revisado" : "Abrir lectura"}</span></div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${done ? "Puedes volver a consultar este concepto." : "Abre una explicación breve y visual."}</p>
        </button>`;
    }).join("");
    byId("theoryGrid").querySelectorAll("[data-theory-id]").forEach((button) => {
      button.addEventListener("click", () => openTheory(unit, button.dataset.theoryId));
    });

    const figure = byId("bookFigure");
    if (unit.figure?.src) {
      byId("bookFigureImage").src = unit.figure.src;
      byId("bookFigureImage").alt = unit.figure.alt || "Figura de apoyo conceptual";
      byId("bookFigureCaption").textContent = unit.figure.caption || "";
      figure.hidden = false;
    } else {
      figure.hidden = true;
    }
  }

  function openTheory(unit, theoryId) {
    if (!isProjectComplete(unit)) return;
    const item = unit.theory.find((theory) => theory.id === theoryId);
    if (!item) return;
    const key = String(unit.id);
    const viewed = new Set(getTheoryViewed(unit.id));
    viewed.add(item.id);
    state.progress.theory[key] = [...viewed];
    scheduleCloudSync();
    renderStageTrack(unit);
    renderTheory(unit);
    renderResources(unit);
    renderPractice(unit);
    renderQuiz(unit);
    applySectionLocks(unit);
    byId("theoryModalTitle").textContent = item.title;
    byId("theoryModalBody").innerHTML = item.content;
    byId("theoryModalSourceText").textContent = `Unidad ${unit.id} · ${unit.pages.replace(/^PDF,?\s*/i, "")}`;
    const theoryPdfHref = pdfHrefForUnit(unit);
    byId("theoryModalSourceLink").setAttribute("href", theoryPdfHref);
    byId("theoryModalSourceLink").setAttribute("download", theoryPdfHref.split("/").pop());
    const modal = byId("theoryModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeTheoryModal() {
    const modal = byId("theoryModal");
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    restoreBodyScroll();
  }

  function renderResources(unit) {
    const section = byId("resourcesSection");
    const resources = Array.isArray(unit.resources) ? unit.resources : [];
    section.hidden = resources.length === 0;
    if (!resources.length) {
      byId("resourcesGrid").innerHTML = "";
      return;
    }
    const viewed = getResourcesViewed(unit.id);
    byId("resourcesGrid").innerHTML = resources.map((resource) => {
      const done = viewed.includes(resource.id);
      const icon = resource.type === "video" ? "▶" : resource.type === "image" ? "⌕" : "▦";
      const type = resource.type === "video" ? "Video educativo" : resource.type === "image" ? "Infografía interactiva" : "Presentación interactiva";
      const preview = resource.preview || resource.poster || resource.src || resource.slides?.[0] || "";
      return `
        <button class="resource-card ${done ? "is-completed" : ""}" type="button" data-resource-id="${escapeHTML(resource.id)}">
          <span class="resource-card-preview"><img src="${escapeHTML(preview)}" alt=""><span class="resource-card-icon" aria-hidden="true">${icon}</span></span>
          <span class="resource-card-copy"><span class="resource-card-type">${type}</span><strong>${escapeHTML(resource.title)}</strong><small>${escapeHTML(resource.description)}</small><em>${done ? "✓ Revisado · volver a abrir" : "Abrir recurso"}</em></span>
        </button>`;
    }).join("");
    byId("resourcesGrid").querySelectorAll("[data-resource-id]").forEach((button) => {
      button.addEventListener("click", () => openEducationalResource(unit, button.dataset.resourceId));
    });
  }

  function markResourceComplete(unit, resource) {
    const key = String(unit.id);
    const viewed = new Set(getResourcesViewed(unit.id));
    if (viewed.has(resource.id)) return;
    viewed.add(resource.id);
    state.progress.resources[key] = [...viewed];
    scheduleCloudSync();
    renderStageTrack(unit);
    renderResources(unit);
    renderPractice(unit);
    renderQuiz(unit);
    applySectionLocks(unit);
    renderHome();
    showToast("Recurso revisado. Tu progreso quedó guardado.");
  }

  function openEducationalResource(unit, resourceId) {
    if (!isTheoryComplete(unit)) return;
    const resource = unit.resources?.find((item) => item.id === resourceId);
    if (!resource) return;
    byId("resourceModalTitle").textContent = resource.title;
    byId("resourceModalSource").textContent = resource.source;
    const body = byId("resourceModalBody");

    if (resource.type === "video") {
      const completed = getResourcesViewed(unit.id).includes(resource.id);
      body.innerHTML = `
        <div class="video-resource-wrap">
          <video id="unitResourceVideo" class="educational-video" controls preload="metadata" poster="${escapeHTML(resource.poster || "")}">
            <source src="${escapeHTML(resource.src)}" type="video/mp4">
            Tu navegador no puede reproducir este video.
          </video>
          <div class="resource-study-note">
            <strong>Cómo estudiar este recurso</strong>
            <p>Relaciona las ideas del video con las tres tarjetas de teoría de esta unidad. El recurso se marca como revisado al completar al menos el 70%.</p>
            <p id="videoResourceProgress" class="resource-progress-copy">${completed ? "✓ Recurso revisado" : "Progreso de visualización: 0%"}</p>
          </div>
        </div>`;
      const video = byId("unitResourceVideo");
      video.addEventListener("timeupdate", () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;
        const percent = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
        const label = byId("videoResourceProgress");
        if (label) label.textContent = percent >= 70 ? "✓ Recurso revisado" : `Progreso de visualización: ${percent}%`;
        if (percent >= 70) markResourceComplete(unit, resource);
      });
      video.addEventListener("ended", () => markResourceComplete(unit, resource));
    } else if (resource.type === "gallery") {
      let slideIndex = 0;
      const slides = resource.slides || [];
      body.innerHTML = `
        <div class="slide-resource-wrap">
          <div class="slide-stage"><img id="resourceSlideImage" src="" alt=""></div>
          <div class="slide-controls">
            <button id="previousResourceSlide" class="button button-secondary" type="button">← Anterior</button>
            <strong id="resourceSlideCounter">Diapositiva 1 de ${slides.length}</strong>
            <button id="nextResourceSlide" class="button button-primary" type="button">Siguiente →</button>
          </div>
          <div id="resourceSlideDots" class="slide-dots" aria-label="Diapositivas de la presentación"></div>
          ${resource.note ? `<p class="resource-gallery-note">${escapeHTML(resource.note)}</p>` : ""}
        </div>`;
      const showSlide = (nextIndex) => {
        slideIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
        byId("resourceSlideImage").src = slides[slideIndex];
        byId("resourceSlideImage").alt = `${resource.title}, diapositiva ${slideIndex + 1} de ${slides.length}`;
        byId("resourceSlideCounter").textContent = `Diapositiva ${slideIndex + 1} de ${slides.length}`;
        byId("previousResourceSlide").disabled = slideIndex === 0;
        byId("nextResourceSlide").textContent = slideIndex === slides.length - 1 ? "✓ Finalizar revisión" : "Siguiente →";
        byId("resourceSlideDots").innerHTML = slides.map((_, index) => `<button type="button" class="slide-dot ${index === slideIndex ? "is-active" : ""}" data-slide-index="${index}" aria-label="Ir a la diapositiva ${index + 1}"></button>`).join("");
        byId("resourceSlideDots").querySelectorAll("[data-slide-index]").forEach((dot) => dot.addEventListener("click", () => showSlide(Number(dot.dataset.slideIndex))));
      };
      byId("previousResourceSlide").addEventListener("click", () => showSlide(slideIndex - 1));
      byId("nextResourceSlide").addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
          markResourceComplete(unit, resource);
          return;
        }
        showSlide(slideIndex + 1);
      });
      showSlide(0);
    } else if (resource.type === "image") {
      const completed = getResourcesViewed(unit.id).includes(resource.id);
      body.innerHTML = `
        <div class="image-resource-wrap">
          <div id="infographicStage" class="infographic-stage">
            <img src="${escapeHTML(resource.src)}" alt="${escapeHTML(resource.title)}">
          </div>
          <div class="infographic-controls">
            <button id="toggleInfographicZoom" class="button button-secondary" type="button">⌕ Ampliar infografía</button>
            <a class="button button-secondary" href="${escapeHTML(resource.src)}" target="_blank" rel="noopener noreferrer">Abrir a tamaño completo ↗</a>
            <button id="completeInfographic" class="button button-primary" type="button" ${completed ? "disabled" : ""}>${completed ? "✓ Recurso revisado" : "✓ Finalizar revisión"}</button>
          </div>
          <p class="resource-gallery-note">Usa la ampliación y desplázate horizontalmente para leer cada bloque con comodidad.</p>
        </div>`;
      byId("toggleInfographicZoom").addEventListener("click", () => {
        const stage = byId("infographicStage");
        const zoomed = stage.classList.toggle("is-zoomed");
        byId("toggleInfographicZoom").textContent = zoomed ? "Reducir infografía" : "⌕ Ampliar infografía";
      });
      byId("completeInfographic").addEventListener("click", () => {
        markResourceComplete(unit, resource);
        byId("completeInfographic").textContent = "✓ Recurso revisado";
        byId("completeInfographic").disabled = true;
      });
    }

    const modal = byId("resourceModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeResourceModal() {
    const modal = byId("resourceModal");
    byId("unitResourceVideo")?.pause();
    byId("resourceModalBody")?.querySelectorAll("iframe").forEach((frame) => {
      frame.src = "about:blank";
    });
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    if (byId("resourceModalBody")) byId("resourceModalBody").innerHTML = "";
    restoreBodyScroll();
  }

  function getUnitActivities(unit) {
    return Array.isArray(unit.activities) ? unit.activities : [];
  }

  function ensurePracticeRecord(unit) {
    const key = String(unit.id);
    const current = getPractice(unit.id);
    if (current.activities && typeof current.activities === "object") return current;
    const activities = {};
    if (current.complete) {
      getUnitActivities(unit).forEach((activity) => {
        activities[activity.id] = { complete: true, score: 100, attempts: Number(current.attempts || 0), updatedAt: new Date().toISOString() };
      });
    }
    const migrated = { ...current, activities, updatedAt: new Date().toISOString() };
    state.progress.practice[key] = migrated;
    saveLocalProgress();
    return migrated;
  }

  function getPracticeActivityRecord(unit, activityId) {
    return ensurePracticeRecord(unit).activities?.[activityId] || {};
  }

  function savePracticeActivity(unit, activityId, nextActivity, message = "") {
    const key = String(unit.id);
    const record = ensurePracticeRecord(unit);
    const previousAttempts = Number(record.activities?.[activityId]?.attempts || 0);
    const activities = {
      ...(record.activities || {}),
      [activityId]: { ...nextActivity, updatedAt: new Date().toISOString() }
    };
    const definitions = getUnitActivities(unit);
    const completedCount = definitions.filter((activity) => activities[activity.id]?.complete).length;
    const complete = Boolean(definitions.length && completedCount === definitions.length);
    const score = Math.round(definitions.reduce((sum, activity) => sum + Number(activities[activity.id]?.score || 0), 0) / Math.max(1, definitions.length));
    const attempts = definitions.reduce((sum, activity) => sum + Number(activities[activity.id]?.attempts || 0), 0);
    state.progress.practice[key] = { activities, completedCount, complete, score, attempts, updatedAt: new Date().toISOString() };

    if (nextActivity.complete && !record.activities?.[activityId]?.complete) {
      const nextPending = definitions.find((activity) => !activities[activity.id]?.complete);
      state.practiceActivityId = nextPending?.id || activityId;
    }
    scheduleCloudSync();
    renderStageTrack(unit);
    renderPractice(unit);
    renderQuiz(unit);
    applySectionLocks(unit);
    renderSupportWidget(unit);
    renderHome();
    if (message) showToast(message);

    const attemptsNow = Number(nextActivity.attempts || 0);
    if (!nextActivity.complete && attemptsNow > previousAttempts && attemptsNow >= 2) {
      offerActivityHint(unit, activityId);
    }
  }

  function offerActivityHint(unit, activityId) {
    const activity = getUnitActivities(unit).find((item) => item.id === activityId);
    const activityRecord = getPracticeActivityRecord(unit, activityId);
    if (!activity?.tip || activityRecord.complete) return;
    state.supportAnswer = composeActivityHint(activity, activityRecord);
    renderSupportWidget(unit);
    toggleSupport(true);
    showToast(`Abrí una pista para «${activity.title}» en la ayuda.`);
  }

  function composeActivityHint(activity, activityRecord) {
    const attempts = Number(activityRecord?.attempts || 0);
    const note = attempts > 0 ? ` (llevas ${attempts} intento${attempts === 1 ? "" : "s"} en esta actividad)` : "";
    return `${activity.tip}${note}`;
  }

  function getActivePracticeActivity(unit) {
    const definitions = getUnitActivities(unit);
    if (!definitions.length) return null;
    const acts = getPractice(unit.id).activities;
    const done = (id) => Boolean(acts && typeof acts === "object" && acts[id]?.complete);
    return definitions.find((activity) => activity.id === state.practiceActivityId && !done(activity.id))
      || definitions.find((activity) => !done(activity.id))
      || null;
  }

  function resetPracticeActivity(unit, activityId) {
    savePracticeActivity(unit, activityId, { complete: false, score: 0, attempts: 0 }, "Actividad reiniciada.");
  }

  function practiceFooter(record, pendingMessage) {
    return `<div class="practice-activity-footer"><p class="practice-feedback" aria-live="polite">${record.complete ? "✓ Actividad completada." : escapeHTML(record.message || pendingMessage)}</p><button class="button button-secondary" type="button" data-reset-practice>Reiniciar actividad</button></div>`;
  }

  function renderPractice(unit) {
    const definitions = getUnitActivities(unit);
    const record = ensurePracticeRecord(unit);
    if (!definitions.length) {
      byId("practiceContainer").innerHTML = `<div class="empty-state"><h3>Actividades en preparación</h3></div>`;
      return;
    }
    const completedCount = definitions.filter((activity) => record.activities?.[activity.id]?.complete).length;
    const active = definitions.find((activity) => activity.id === state.practiceActivityId)
      || definitions.find((activity) => !record.activities?.[activity.id]?.complete)
      || definitions[0];
    state.practiceActivityId = active.id;
    byId("practiceContainer").innerHTML = `
      <div class="practice-hub-heading">
        <div><h3>Retos diferentes para esta unidad</h3><p>Completa las ${definitions.length} actividades para abrir la evaluación.</p></div>
        <span><strong>${completedCount}/${definitions.length}</strong> completadas</span>
      </div>
      <div class="practice-activity-tabs" role="tablist" aria-label="Actividades de la unidad">
        ${definitions.map((activity, index) => {
          const complete = Boolean(record.activities?.[activity.id]?.complete);
          return `<button type="button" role="tab" data-practice-activity="${escapeHTML(activity.id)}" aria-selected="${activity.id === active.id}" class="${activity.id === active.id ? "is-active" : ""} ${complete ? "is-complete" : ""}"><span aria-hidden="true">${complete ? "✓" : escapeHTML(activity.icon || String(index + 1))}</span><small>Actividad ${index + 1}</small><strong>${escapeHTML(activity.title)}</strong></button>`;
        }).join("")}
      </div>
      <div id="practiceActivityStage" class="practice-activity-stage" role="tabpanel"></div>`;
    byId("practiceContainer").querySelectorAll("[data-practice-activity]").forEach((button) => {
      button.addEventListener("click", () => {
        state.practiceActivityId = button.dataset.practiceActivity;
        if (state.supportAnswer && definitions.some((a) => a.tip && state.supportAnswer.startsWith(a.tip))) {
          state.supportAnswer = "";
        }
        renderPractice(unit);
        renderSupportWidget(unit);
      });
    });
    renderPracticeActivity(unit, active);
  }

  function renderPracticeActivity(unit, activity) {
    const stage = byId("practiceActivityStage");
    const record = getPracticeActivityRecord(unit, activity.id);
    const renderers = {
      sequence: renderSequenceActivity,
      sort: renderSortActivity,
      hotspot: renderHotspotActivity,
      fill: renderFillActivity,
      branch: renderBranchActivity,
      timeline: renderTimelineActivity,
      audit: renderAuditActivity,
      method: renderMethodActivity
    };
    const renderer = renderers[activity.type];
    if (!renderer) {
      stage.innerHTML = `<div class="empty-state"><h3>Actividad no disponible</h3></div>`;
      return;
    }
    renderer(unit, activity, record, stage);
    stage.querySelector("[data-reset-practice]")?.addEventListener("click", () => resetPracticeActivity(unit, activity.id));
  }

  function copyOf(activity, key, fallback) {
    const value = activity?.copy?.[key];
    return typeof value === "string" && value ? value : fallback;
  }

  function activityHeading(activity) {
    const labels = { sequence: "Secuencia", sort: "Clasificación", hotspot: "Exploración", fill: "Completar", branch: "Casos ramificados", timeline: "Línea temporal", audit: "Auditoría", method: "Selección de métodos" };
    return `<header class="practice-activity-heading"><span aria-hidden="true">${escapeHTML(activity.icon || "✦")}</span><div><p class="eyebrow">${escapeHTML(labels[activity.type] || "Actividad")}</p><h3>${escapeHTML(activity.title)}</h3><p>${escapeHTML(activity.instruction)}</p></div></header>`;
  }

  function renderSequenceActivity(unit, activity, record, stage) {
    const ids = activity.items.map((item) => item.id);
    let order = Array.isArray(record.order) && record.order.length === ids.length ? record.order : [...ids].sort(() => Math.random() - .5);
    const selected = Array.isArray(record.selected) ? record.selected.filter((id) => ids.includes(id)) : [];
    if (!record.order) {
      const parent = ensurePracticeRecord(unit);
      parent.activities[activity.id] = { ...record, order, selected };
      saveLocalProgress();
    }
    const selectedItems = selected.map((id) => activity.items.find((item) => item.id === id)).filter(Boolean);
    stage.innerHTML = `${activityHeading(activity)}
      <ol class="sequence-slots">${activity.items.map((_, index) => `<li class="${selectedItems[index] ? "is-filled" : ""}"><span>${index + 1}</span>${selectedItems[index] ? `<strong>${escapeHTML(selectedItems[index].text)}</strong>` : `<em>Selecciona el paso ${index + 1}</em>`}</li>`).join("")}</ol>
      <div class="sequence-pool">${order.filter((id) => !selected.includes(id)).map((id) => { const item = activity.items.find((entry) => entry.id === id); return `<button type="button" data-sequence-id="${id}" ${record.complete ? "disabled" : ""}>${escapeHTML(item.text)}</button>`; }).join("")}</div>
      <div class="practice-inline-actions"><button class="button button-secondary" type="button" data-sequence-undo ${!selected.length || record.complete ? "disabled" : ""}>Deshacer último</button></div>
      ${practiceFooter(record, "Construye la secuencia completa. Si el orden no es correcto, podrás intentarlo de nuevo.")}`;
    stage.querySelectorAll("[data-sequence-id]").forEach((button) => button.addEventListener("click", () => {
      const nextSelected = [...selected, button.dataset.sequenceId];
      if (nextSelected.length < ids.length) {
        savePracticeActivity(unit, activity.id, { ...record, order, selected: nextSelected, complete: false, score: 0 });
        return;
      }
      const correct = nextSelected.every((id, index) => id === ids[index]);
      savePracticeActivity(unit, activity.id, {
        ...record,
        order,
        selected: correct ? nextSelected : [],
        attempts: Number(record.attempts || 0) + 1,
        complete: correct,
        score: correct ? 100 : 0,
        message: correct ? "Secuencia correcta." : "El orden todavía no corresponde al proceso. Intenta nuevamente."
      }, correct ? copyOf(activity, "doneToast", "¡Orden correcto! Actividad superada.") : "Revisa la secuencia y vuelve a intentarlo.");
    }));
    stage.querySelector("[data-sequence-undo]")?.addEventListener("click", () => savePracticeActivity(unit, activity.id, { ...record, order, selected: selected.slice(0, -1), complete: false, score: 0 }));
  }

  function renderSortActivity(unit, activity, record, stage) {
    const placements = record.placements && typeof record.placements === "object" ? record.placements : {};
    const selectedItem = record.selectedItem || null;
    stage.innerHTML = `${activityHeading(activity)}
      <div class="sort-workbench">
        <div class="sort-source"><h4>${escapeHTML(copyOf(activity, "itemsLabel", "Elementos"))}</h4>${activity.items.map((item) => `<button type="button" data-sort-item="${item.id}" class="${selectedItem === item.id ? "is-selected" : ""} ${record.incorrect?.includes(item.id) ? "is-wrong" : ""}" ${record.complete ? "disabled" : ""}><span>${placements[item.id] ? escapeHTML(activity.categories.find((category) => category.id === placements[item.id])?.label || "Mover") : "Elegir"}</span>${escapeHTML(item.text)}</button>`).join("")}</div>
        <div class="sort-buckets">${activity.categories.map((category) => `<button type="button" data-sort-category="${category.id}" ${selectedItem && !record.complete ? "" : "disabled"}><strong>${escapeHTML(category.label)}</strong><small>${activity.items.filter((item) => placements[item.id] === category.id).length} elementos</small></button>`).join("")}</div>
      </div>
      <div class="practice-inline-actions"><button class="button button-primary" type="button" data-check-sort ${Object.keys(placements).length === activity.items.length && !record.complete ? "" : "disabled"}>Comprobar clasificación</button></div>
      ${practiceFooter(record, selectedItem ? "Ahora elige la categoría de destino." : copyOf(activity, "pending", "Selecciona un elemento y después su categoría."))}`;
    stage.querySelectorAll("[data-sort-item]").forEach((button) => button.addEventListener("click", () => savePracticeActivity(unit, activity.id, { ...record, placements, selectedItem: button.dataset.sortItem, complete: false, score: 0 })));
    stage.querySelectorAll("[data-sort-category]").forEach((button) => button.addEventListener("click", () => {
      if (!selectedItem) return;
      savePracticeActivity(unit, activity.id, { ...record, placements: { ...placements, [selectedItem]: button.dataset.sortCategory }, selectedItem: null, incorrect: [], complete: false, score: 0 });
    }));
    stage.querySelector("[data-check-sort]")?.addEventListener("click", () => {
      const incorrect = activity.items.filter((item) => placements[item.id] !== item.category).map((item) => item.id);
      const complete = !incorrect.length;
      savePracticeActivity(unit, activity.id, { ...record, placements, selectedItem: null, incorrect, attempts: Number(record.attempts || 0) + 1, complete, score: complete ? 100 : 0, message: complete ? "Clasificación correcta." : `Revisa ${incorrect.length} elemento(s) señalado(s).` }, complete ? "¡Clasificación correcta!" : "Hay elementos por reubicar.");
    });
  }

  function renderHotspotActivity(unit, activity, record, stage) {
    const found = Array.isArray(record.found) ? record.found : [];
    const tried = Array.isArray(record.tried) ? record.tried : [];
    const targets = activity.spots.filter((spot) => spot.correct);
    stage.innerHTML = `${activityHeading(activity)}
      <div class="hotspot-board" aria-label="${escapeHTML(copyOf(activity, "boardLabel", "Tablero de la actividad"))}">${activity.spots.map((spot, index) => `<button type="button" data-hotspot="${spot.id}" class="spot-${index + 1} ${found.includes(spot.id) ? "is-found" : ""} ${tried.includes(spot.id) && !spot.correct ? "is-miss" : ""}" ${found.includes(spot.id) || record.complete ? "disabled" : ""}><span>${found.includes(spot.id) ? "✓" : "+"}</span><strong>${escapeHTML(spot.label)}</strong></button>`).join("")}<div class="hotspot-core"><strong>${found.length}/${targets.length}</strong><span>${escapeHTML(copyOf(activity, "foundLabel", "elementos encontrados"))}</span></div></div>
      <p class="hotspot-detail" aria-live="polite">${escapeHTML(record.lastDetail || copyOf(activity, "hint", "Pulsa los puntos del tablero para explorarlos."))}</p>
      ${practiceFooter(record, copyOf(activity, "pending", "Encuentra todos los elementos correctos."))}`;
    stage.querySelectorAll("[data-hotspot]").forEach((button) => button.addEventListener("click", () => {
      const spot = activity.spots.find((item) => item.id === button.dataset.hotspot);
      const nextFound = spot.correct ? [...new Set([...found, spot.id])] : found;
      const nextTried = !spot.correct ? [...new Set([...tried, spot.id])] : tried;
      const complete = nextFound.length === targets.length;
      savePracticeActivity(unit, activity.id, { ...record, found: nextFound, tried: nextTried, misses: Number(record.misses || 0) + (spot.correct ? 0 : 1), attempts: Number(record.attempts || 0) + 1, lastDetail: spot.detail, complete, score: complete ? 100 : Math.round((nextFound.length / targets.length) * 100) }, complete ? copyOf(activity, "doneToast", "¡Encontraste todos los elementos!") : spot.correct ? copyOf(activity, "hitToast", "Elemento encontrado.") : copyOf(activity, "missToast", "Ese elemento no corresponde."));
    }));
  }

  function normalizeActivityAnswer(value) {
    return String(value || "").trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function renderFillActivity(unit, activity, record, stage) {
    const values = record.values && typeof record.values === "object" ? record.values : {};
    const incorrect = Array.isArray(record.incorrect) ? record.incorrect : [];
    stage.innerHTML = `${activityHeading(activity)}
      <div class="fill-sentence">${activity.parts.map((part) => typeof part === "string" ? escapeHTML(part) : `<label><span class="sr-only">Completa ${escapeHTML(part.placeholder)}</span><input type="text" data-fill-id="${part.id}" value="${escapeHTML(values[part.id] || "")}" placeholder="${escapeHTML(part.placeholder)}" class="${incorrect.includes(part.id) ? "is-wrong" : ""}" ${record.complete ? "disabled" : ""}></label>`).join("")}</div>
      <div class="practice-inline-actions"><button class="button button-primary" type="button" data-check-fill ${record.complete ? "disabled" : ""}>Comprobar texto</button></div>
      ${practiceFooter(record, copyOf(activity, "pending", "Completa los espacios y comprueba el texto."))}`;
    stage.querySelector("[data-check-fill]")?.addEventListener("click", () => {
      const nextValues = {};
      stage.querySelectorAll("[data-fill-id]").forEach((input) => { nextValues[input.dataset.fillId] = input.value; });
      const blanks = activity.parts.filter((part) => typeof part === "object");
      const wrong = blanks.filter((blank) => !blank.answers.some((answer) => normalizeActivityAnswer(answer) === normalizeActivityAnswer(nextValues[blank.id]))).map((blank) => blank.id);
      const complete = !wrong.length;
      savePracticeActivity(unit, activity.id, { ...record, values: nextValues, incorrect: wrong, attempts: Number(record.attempts || 0) + 1, complete, score: complete ? 100 : 0, message: complete ? copyOf(activity, "doneMessage", "El texto quedó completo.") : "Revisa los espacios señalados." }, complete ? copyOf(activity, "doneToast", "¡Texto completado!") : "Todavía hay palabras por corregir.");
    });
  }

  function renderBranchActivity(unit, activity, record, stage) {
    const responses = record.responses && typeof record.responses === "object" ? record.responses : {};
    stage.innerHTML = `${activityHeading(activity)}
      <div class="branch-scenarios">${activity.scenarios.map((scenario, scenarioIndex) => {
        const selected = responses[scenario.id];
        return `<article><span>Caso ${scenarioIndex + 1}</span><h4>${escapeHTML(scenario.prompt)}</h4><div>${scenario.options.map((option, index) => `<button type="button" data-branch-scenario="${scenario.id}" data-branch-option="${index}" class="${selected === index ? (index === scenario.correct ? "is-correct" : "is-wrong") : ""}" ${record.complete ? "disabled" : ""}>${escapeHTML(option)}</button>`).join("")}</div>${selected !== undefined ? `<p>${escapeHTML(scenario.feedback)}</p>` : ""}</article>`;
      }).join("")}</div>
      ${practiceFooter(record, copyOf(activity, "pending", "Elige una opción para cada caso y observa la consecuencia."))}`;
    stage.querySelectorAll("[data-branch-scenario]").forEach((button) => button.addEventListener("click", () => {
      const nextResponses = { ...responses, [button.dataset.branchScenario]: Number(button.dataset.branchOption) };
      const complete = activity.scenarios.every((scenario) => nextResponses[scenario.id] === scenario.correct);
      savePracticeActivity(unit, activity.id, { ...record, responses: nextResponses, attempts: Number(record.attempts || 0) + 1, complete, score: Math.round((activity.scenarios.filter((scenario) => nextResponses[scenario.id] === scenario.correct).length / activity.scenarios.length) * 100), message: complete ? copyOf(activity, "doneMessage", "Todos los casos tienen una decisión coherente.") : copyOf(activity, "retryMessage", "Puedes cambiar cualquier decisión hasta resolver todos los casos.") }, complete ? copyOf(activity, "doneToast", "¡Casos resueltos!") : "Observa la consecuencia y ajusta la decisión si es necesario.");
    }));
  }

  function renderTimelineActivity(unit, activity, record, stage) {
    const responses = record.responses && typeof record.responses === "object" ? record.responses : {};
    stage.innerHTML = `${activityHeading(activity)}
      <div class="timeline-lab"><div class="timeline-axis" aria-hidden="true"><span>${escapeHTML(copyOf(activity, "axisStart", "Un extremo"))}</span><i></i><span>${escapeHTML(copyOf(activity, "axisEnd", "Otro extremo"))}</span></div>${activity.items.map((item) => `<article><p>${escapeHTML(item.text)}</p><div>${activity.categories.map((category) => `<button type="button" data-timeline-item="${item.id}" data-timeline-category="${category.id}" class="${responses[item.id] === category.id ? (category.id === item.category ? "is-correct" : "is-wrong") : ""}" ${record.complete ? "disabled" : ""}><strong>${escapeHTML(category.label)}</strong><small>${escapeHTML(category.hint)}</small></button>`).join("")}</div></article>`).join("")}</div>
      ${practiceFooter(record, copyOf(activity, "pending", "Clasifica cada elemento en su categoría."))}`;
    stage.querySelectorAll("[data-timeline-item]").forEach((button) => button.addEventListener("click", () => {
      const nextResponses = { ...responses, [button.dataset.timelineItem]: button.dataset.timelineCategory };
      const complete = activity.items.every((item) => nextResponses[item.id] === item.category);
      savePracticeActivity(unit, activity.id, { ...record, responses: nextResponses, attempts: Number(record.attempts || 0) + 1, complete, score: Math.round((activity.items.filter((item) => nextResponses[item.id] === item.category).length / activity.items.length) * 100), message: complete ? copyOf(activity, "doneMessage", "Clasificación correcta.") : copyOf(activity, "retryMessage", "Revisa las categorías y vuelve a intentarlo.") }, complete ? copyOf(activity, "doneToast", "¡Clasificación completada!") : "Respuesta registrada.");
    }));
  }

  function renderAuditActivity(unit, activity, record, stage) {
    const decisions = record.decisions && typeof record.decisions === "object" ? record.decisions : {};
    stage.innerHTML = `${activityHeading(activity)}
      <div class="source-audit">${activity.sources.map((source) => {
        const selected = decisions[source.id];
        const correct = selected === source.correct;
        return `<article class="${selected ? (correct ? "is-correct" : "is-wrong") : ""}"><span aria-hidden="true">▤</span><div><h4>${escapeHTML(source.title)}</h4><p>${escapeHTML(source.detail)}</p><div><button type="button" data-audit-source="${source.id}" data-audit-decision="use" ${record.complete ? "disabled" : ""}>${escapeHTML(copyOf(activity, "useLabel", "Aceptar"))}</button><button type="button" data-audit-source="${source.id}" data-audit-decision="reject" ${record.complete ? "disabled" : ""}>${escapeHTML(copyOf(activity, "rejectLabel", "Descartar"))}</button></div>${selected ? `<small>${escapeHTML(source.feedback)}</small>` : ""}</div></article>`;
      }).join("")}</div>
      ${practiceFooter(record, copyOf(activity, "pending", "Evalúa cada elemento y decide."))}`;
    stage.querySelectorAll("[data-audit-source]").forEach((button) => button.addEventListener("click", () => {
      const nextDecisions = { ...decisions, [button.dataset.auditSource]: button.dataset.auditDecision };
      const complete = activity.sources.every((source) => nextDecisions[source.id] === source.correct);
      savePracticeActivity(unit, activity.id, { ...record, decisions: nextDecisions, attempts: Number(record.attempts || 0) + 1, complete, score: Math.round((activity.sources.filter((source) => nextDecisions[source.id] === source.correct).length / activity.sources.length) * 100), message: complete ? copyOf(activity, "doneMessage", "Todas las decisiones fueron correctas.") : copyOf(activity, "retryMessage", "Revisa cada elemento y cambia las decisiones necesarias.") }, complete ? copyOf(activity, "doneToast", "¡Actividad completada!") : "Decisión registrada.");
    }));
  }

  function renderMethodActivity(unit, activity, record, stage) {
    const responses = record.responses && typeof record.responses === "object" ? record.responses : {};
    const incorrect = Array.isArray(record.incorrect) ? record.incorrect : [];
    stage.innerHTML = `${activityHeading(activity)}
      <div class="method-table">${activity.cases.map((item, index) => `<label class="${incorrect.includes(item.id) ? "is-wrong" : ""}"><span><small>${escapeHTML(copyOf(activity, "itemLabel", "Caso"))} ${index + 1}</small><strong>${escapeHTML(item.need)}</strong></span><select data-method-case="${item.id}" ${record.complete ? "disabled" : ""}><option value="">${escapeHTML(copyOf(activity, "selectPlaceholder", "Selecciona una opción"))}</option>${activity.methods.map((method, methodIndex) => `<option value="${methodIndex}" ${responses[item.id] !== null && responses[item.id] !== undefined && Number(responses[item.id]) === methodIndex ? "selected" : ""}>${escapeHTML(method)}</option>`).join("")}</select></label>`).join("")}</div>
      <div class="practice-inline-actions"><button class="button button-primary" type="button" data-check-method ${record.complete ? "disabled" : ""}>${escapeHTML(copyOf(activity, "checkLabel", "Comprobar respuestas"))}</button></div>
      ${practiceFooter(record, copyOf(activity, "pending", "Selecciona una opción para cada caso."))}`;
    stage.querySelector("[data-check-method]")?.addEventListener("click", () => {
      const nextResponses = {};
      stage.querySelectorAll("[data-method-case]").forEach((select) => { nextResponses[select.dataset.methodCase] = select.value === "" ? null : Number(select.value); });
      const wrong = activity.cases.filter((item) => nextResponses[item.id] !== item.correct).map((item) => item.id);
      const complete = !wrong.length;
      savePracticeActivity(unit, activity.id, { ...record, responses: nextResponses, incorrect: wrong, attempts: Number(record.attempts || 0) + 1, complete, score: complete ? 100 : Math.round(((activity.cases.length - wrong.length) / activity.cases.length) * 100), message: complete ? copyOf(activity, "doneMessage", "Todas las respuestas son coherentes.") : `Revisa ${wrong.length} selección(es).` }, complete ? copyOf(activity, "doneToast", "¡Actividad completada!") : copyOf(activity, "missToast", "Algunas respuestas no corresponden."));
    });
  }

  function buildQuizReview(questions, answers, heading) {
    const wrong = questions
      .map((question, index) => ({ question, given: answers?.[index] }))
      .filter(({ question, given }) => given === null || given === undefined || Number(given) !== question.correct);
    if (!wrong.length) return "";
    return `
      <div class="quiz-review">
        <p class="eyebrow">${escapeHTML(heading)}</p>
        <ol>
          ${wrong.map(({ question, given }) => `
            <li>
              <p class="quiz-review-question">${escapeHTML(question.q)}</p>
              <p class="quiz-review-line quiz-review-mine">${given === null || given === undefined
                ? "No respondiste esta pregunta."
                : `Marcaste: ${escapeHTML(question.options[given])}`}</p>
              <p class="quiz-review-line quiz-review-ok">Respuesta correcta: ${escapeHTML(question.options[question.correct])}</p>
              ${question.feedback ? `<p class="quiz-review-line quiz-review-why">${escapeHTML(question.feedback)}</p>` : ""}
            </li>`).join("")}
        </ol>
      </div>`;
  }

  function renderQuiz(unit) {
    const record = getQuiz(unit.id);
    const hasAttempt = Boolean(record.date || record.attempts);
    const latestScore = Number(record.score || 0);
    const bestScore = Math.max(latestScore, Number(record.bestScore || 0));
    const retryMessage = latestScore < 60
      ? "Aún no alcanzas el 60%. Revisa la teoría y vuelve a intentarlo hasta obtener al menos 80%."
      : "Alcanzaste al menos 60%, pero necesitas 80% para aprobar. Puedes intentarlo nuevamente.";
    byId("evaluationContainer").innerHTML = `
      <article class="quiz-launch-card">
        <div class="quiz-launch-symbol" aria-hidden="true">✓</div>
        <div><p class="eyebrow">Diez retos breves</p><h3>Comprueba lo aprendido sin salir de la unidad</h3><p>Cada pregunta aparecerá por separado. Podrás avanzar o regresar antes de enviar tus respuestas.</p></div>
        <button id="openUnitQuiz" class="button button-primary" type="button">${record.passed ? "Volver a presentar" : hasAttempt ? "Intentar de nuevo" : "Abrir evaluación"}</button>
      </article>
      ${hasAttempt || record.passed ? `
        <div class="evaluation-result ${record.passed ? "is-pass" : "is-fail"}">
          <p class="eyebrow">Último intento</p><h3>${latestScore}%</h3>
          ${bestScore > latestScore ? `<small>Mejor resultado alcanzado: ${bestScore}%</small>` : ""}
          <p>${record.passed ? `Unidad aprobada. Obtuviste la insignia «${escapeHTML(unit.badge?.title || "Unidad completada")}».` : retryMessage}</p>
          ${record.passed && getNextUnit(unit) ? `<button class="button button-secondary" type="button" data-next-unit="${getNextUnit(unit).id}">Continuar a la Unidad ${getNextUnit(unit).id}</button>` : ""}
        </div>
        ${!record.passed && Array.isArray(record.answers) && record.answers.length
          ? buildQuizReview(unit.quiz, record.answers, "Revisa esto antes de volver a intentarlo")
          : ""}` : ""}`;

    byId("openUnitQuiz").addEventListener("click", () => openUnitQuiz(unit));
    byId("evaluationContainer").querySelector("[data-next-unit]")?.addEventListener("click", (event) => {
      openUnit(Number(event.currentTarget.dataset.nextUnit));
    });
  }

  function openUnitQuiz(unit) {
    if (!isPracticeComplete(unit)) {
      showToast("Completa correctamente las dos actividades para abrir la evaluación.");
      return;
    }
    state.quizSession = {
      unitId: unit.id,
      index: 0,
      answers: unit.quiz.map(() => null)
    };
    byId("quizModalTitle").textContent = `Unidad ${unit.id} · ${unit.title}`;
    byId("quizModal").classList.add("is-open");
    byId("quizModal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const session = state.quizSession;
    const unit = getUnit(session?.unitId);
    if (!session || !unit) return;
    const question = unit.quiz[session.index];
    const selected = session.answers[session.index];
    const isLast = session.index === unit.quiz.length - 1;
    byId("quizModalBody").innerHTML = `
      <div class="quiz-progress-row"><span>Pregunta ${session.index + 1} de ${unit.quiz.length}</span><strong>${Math.round(((session.index + 1) / unit.quiz.length) * 100)}%</strong></div>
      <div class="quiz-progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="${unit.quiz.length}" aria-valuenow="${session.index + 1}"><span style="width:${((session.index + 1) / unit.quiz.length) * 100}%"></span></div>
      <div class="quiz-progress-dots" aria-hidden="true">${unit.quiz.map((_, index) => `<span class="${index < session.index ? "is-done" : index === session.index ? "is-active" : ""}">${index < session.index ? "✓" : index + 1}</span>`).join("")}</div>
      <article class="quiz-modal-question">
        <h3>${escapeHTML(question.q)}</h3>
        <div class="quiz-modal-options">
          ${question.options.map((option, optionIndex) => `
            <label class="quiz-option ${selected === optionIndex ? "is-selected" : ""}">
              <input type="radio" name="modal-question" value="${optionIndex}" ${selected === optionIndex ? "checked" : ""}>
              <span><em>${String.fromCharCode(65 + optionIndex)}</em>${escapeHTML(option)}</span>
            </label>`).join("")}
        </div>
      </article>
      <div class="quiz-modal-actions">
        <button id="previousQuizQuestion" class="button button-secondary" type="button" ${session.index === 0 ? "disabled" : ""}>← Anterior</button>
        <button id="nextQuizQuestion" class="button button-primary" type="button">${isLast ? "Finalizar evaluación" : "Siguiente →"}</button>
      </div>`;

    byId("quizModalBody").querySelectorAll('input[name="modal-question"]').forEach((input) => {
      input.addEventListener("change", () => {
        state.quizSession.answers[state.quizSession.index] = Number(input.value);
        byId("quizModalBody").querySelectorAll(".quiz-option").forEach((option) => option.classList.remove("is-selected"));
        input.closest(".quiz-option").classList.add("is-selected");
      });
    });
    byId("previousQuizQuestion").addEventListener("click", () => {
      state.quizSession.index -= 1;
      renderQuizQuestion();
    });
    byId("nextQuizQuestion").addEventListener("click", () => {
      if (state.quizSession.answers[state.quizSession.index] === null) {
        showToast("Elige una respuesta para continuar.");
        return;
      }
      if (!isLast) {
        state.quizSession.index += 1;
        renderQuizQuestion();
        return;
      }
      gradeUnitQuiz(unit, state.quizSession.answers);
    });
  }

  function gradeUnitQuiz(unit, answers) {
    if (answers.some((answer) => answer === null)) {
      showToast("Responde todas las preguntas antes de calificar.");
      return;
    }
    const correct = unit.quiz.filter((question, index) => answers[index] === question.correct).length;
    const score = Math.round((correct / unit.quiz.length) * 100);
    unit.quiz.forEach((question, index) => {
      recordQuestionResult({ unitId: unit.id, qIndex: index }, answers[index] === question.correct);
    });
    const previous = getQuiz(unit.id);
    const wasPassed = Boolean(previous.passed);
    state.progress.quizzes[String(unit.id)] = {
      answers,
      score,
      bestScore: Math.max(Number(previous.bestScore ?? previous.score ?? 0), score),
      passed: Boolean(previous.passed || score >= PASSING_SCORE),
      attempts: Number(previous.attempts || 0) + 1,
      date: new Date().toISOString()
    };
    scheduleCloudSync();
    closeQuizModal();
    renderUnit();
    renderHome();
    renderProfile();
    byId("evaluationSection").scrollIntoView({ behavior: "smooth", block: "start" });
    if (!wasPassed && score >= PASSING_SCORE) {
      window.setTimeout(() => showBadge(unit), 260);
    } else {
      const message = score >= PASSING_SCORE
        ? "¡Unidad aprobada! La siguiente estación está disponible."
        : score < 60
          ? `Obtuviste ${score}%. Puedes repetir la evaluación hasta alcanzar el 80%.`
          : `Obtuviste ${score}%. Vas avanzando; necesitas 80% para aprobar.`;
      showToast(message);
    }
  }

  function closeQuizModal() {
    state.quizSession = null;
    const modal = byId("quizModal");
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    restoreBodyScroll();
  }

  function showBadge(unit) {
    byId("badgeCelebrationIcon").textContent = unit.badge?.icon || "✦";
    byId("badgeModalTitle").textContent = unit.badge?.title || `Unidad ${unit.id} completada`;
    byId("badgeModalDescription").textContent = unit.badge?.description || "Completaste todos los retos de la unidad.";
    byId("badgeModal").classList.add("is-open");
    byId("badgeModal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeBadgeModal() {
    const modal = byId("badgeModal");
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    restoreBodyScroll();
  }

  function applySectionLocks(unit) {
    const theoryLocked = !isProjectComplete(unit);
    const resourcesLocked = theoryLocked || !isTheoryComplete(unit);
    const practiceLocked = resourcesLocked || !isResourcesComplete(unit);
    const evaluationLocked = practiceLocked || !isPracticeComplete(unit);
    setSectionLock("theorySection", theoryLocked, "Completa primero la misión del proyecto para consultar la teoría.");
    if (hasEducationalResources(unit)) {
      setSectionLock("resourcesSection", resourcesLocked, "Revisa las tres tarjetas de teoría para abrir los recursos educativos.");
    }
    setSectionLock("practiceSection", practiceLocked, hasEducationalResources(unit) ? "Completa los recursos educativos antes de pasar a las actividades." : "Revisa las tres tarjetas de teoría para abrir la práctica.");
    setSectionLock("evaluationSection", evaluationLocked, "Completa correctamente las dos actividades para presentar la evaluación.");
  }

  function setSectionLock(id, locked, message) {
    const section = byId(id);
    section.classList.toggle("is-locked", locked);
    section.dataset.lockMessage = locked ? message : "";
  }

  function renderSupportWidget(unit) {
    const avatar = getSelectedAvatar();
    const supportAvatar = byId("supportAvatar");
    supportAvatar.className = `support-avatar${avatar ? ` avatar-${avatar.id}` : ""}`;
    byId("supportTitle").textContent = `${avatar?.name || "Tu guía"} · Unidad ${unit.id}`;

    const stages = getUnitStages(unit);
    const nextStage = stages.find((stage) => !stage.done);
    const nextAnswer = nextStage
      ? `Tu siguiente paso es «${nextStage.label}». ${supportInstruction(nextStage.label)}`
      : "Completaste todos los pasos de esta unidad. Puedes continuar o repasar cualquier unidad cuando quieras.";

    const questions = [];
    const pendingActivity = isPracticeComplete(unit) ? null : getActivePracticeActivity(unit);
    if (pendingActivity?.tip) {
      const activityRecord = getPracticeActivityRecord(unit, pendingActivity.id);
      questions.push({
        q: `Pista para «${pendingActivity.title}»`,
        a: composeActivityHint(pendingActivity, activityRecord),
        highlight: true
      });
    }
    questions.push(
      { q: "¿Qué debo hacer ahora?", a: nextAnswer },
      { q: "¿Cómo avanzo en esta unidad?", a: "Sigue este orden: misión del proyecto, teoría, recursos educativos, dos actividades diferentes y evaluación. Cada etapa completada abre la siguiente." },
      { q: "¿Cómo completo las actividades?", a: `Abre las dos pestañas del laboratorio: ${getUnitActivities(unit).map((activity) => activity.title).join(" y ")}. Cuando ambas aparezcan completadas, se abrirá la evaluación.` },
      ...(Array.isArray(unit.support) ? unit.support : [])
    );

    byId("supportQuestions").innerHTML = questions.map((item, index) =>
      `<button type="button" data-support-question="${index}" class="${item.highlight ? "is-highlight" : ""}">${escapeHTML(item.q)}</button>`
    ).join("");
    const showAnswer = (item) => {
      state.supportAnswer = item.a;
      byId("supportConversation").innerHTML = `<p class="support-user-question">${escapeHTML(item.q)}</p><p class="support-answer">${escapeHTML(item.a)}</p>`;
      byId("speakSupportAnswer").hidden = false;
    };
    byId("supportQuestions").querySelectorAll("[data-support-question]").forEach((button) => {
      button.addEventListener("click", () => showAnswer(questions[Number(button.dataset.supportQuestion)]));
    });

    const preselected = state.supportAnswer
      ? questions.find((item) => item.a === state.supportAnswer)
      : null;
    if (preselected) {
      showAnswer(preselected);
    } else if (state.supportAnswer) {
      byId("supportConversation").innerHTML = `<p class="support-answer">${escapeHTML(state.supportAnswer)}</p>`;
      byId("speakSupportAnswer").hidden = false;
    } else {
      byId("supportConversation").innerHTML = `<p>Elige una pregunta y ${escapeHTML(avatar?.name || "tu guía")} te orientará sin salir de la unidad.</p>`;
      byId("speakSupportAnswer").hidden = true;
    }
    byId("speakSupportAnswer").textContent = `🔊 Escuchar con ${avatar?.name || "tu guía"}`;
    updateMotivationBubble();
  }

  function supportInstruction(stageLabel) {
    const instructions = {
      "Proyecto aplicado": "Responde las tres preguntas de la misión y guarda la evidencia.",
      "Teoría": "Abre y revisa las tres tarjetas conceptuales.",
      "Recursos educativos": "Reproduce el video hasta el 70% y finaliza la revisión de los demás recursos visuales.",
      "Práctica": "Completa las dos actividades diferentes del laboratorio de la unidad.",
      "Evaluación": "Abre la ventana y responde las diez preguntas, una por una."
    };
    return instructions[stageLabel] || "Revisa la indicación de la etapa activa.";
  }

  function updateMotivationBubble() {
    const bubble = byId("motivationBubble");
    if (!bubble) return;
    bubble.textContent = MOTIVATIONS[state.motivationIndex % MOTIVATIONS.length];
    bubble.hidden = !byId("supportPanel")?.hidden;
  }

  function startMotivationCycle() {
    window.clearInterval(state.motivationTimer);
    updateMotivationBubble();
    state.motivationTimer = window.setInterval(() => {
      state.motivationIndex = (state.motivationIndex + 1) % MOTIVATIONS.length;
      updateMotivationBubble();
    }, 60000);
  }

  function toggleSupport(open) {
    const panel = byId("supportPanel");
    const shouldOpen = typeof open === "boolean" ? open : panel.hidden;
    panel.hidden = !shouldOpen;
    if (!shouldOpen) stopSupportVoice();
    byId("supportToggle").setAttribute("aria-expanded", String(shouldOpen));
    updateMotivationBubble();
  }

  function stopSupportVoice() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function speakGuidanceText(text) {
    if (!text || !("speechSynthesis" in window)) {
      showToast("La lectura en voz alta no está disponible en este navegador.");
      return;
    }
    const avatar = getSelectedAvatar();
    stopSupportVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-CO";
    const allVoices = window.speechSynthesis.getVoices();
    const colombianVoices = allVoices.filter((voice) => /^es[-_]CO$/i.test(voice.lang));
    const spanishVoices = allVoices.filter((voice) => /^es([-_]|$)/i.test(voice.lang));
    const voicePool = colombianVoices.length > 1 ? colombianVoices : spanishVoices;
    if (voicePool.length) utterance.voice = voicePool[(avatar?.voiceSlot || 0) % voicePool.length];
    utterance.pitch = avatar?.pitch || 1;
    utterance.rate = avatar?.rate || 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function speakSupportAnswer() {
    if (!state.supportAnswer) {
      showToast("La lectura en voz alta no está disponible en este navegador.");
      return;
    }
    speakGuidanceText(state.supportAnswer);
  }

  function renderProfile() {
    if (!state.user) return;
    const name = getDisplayName();
    const avatar = getSelectedAvatar();
    const unitsPassed = course.filter(isQuizPassed).length;
    const projectsDone = course.filter(isProjectComplete).length;
    const readingsDone = course.reduce((count, unit) => count + getTheoryViewed(unit.id).length, 0);
    const totalReadings = course.reduce((count, unit) => count + unit.theory.length, 0);
    const resourcesDone = course.reduce((count, unit) => count + getResourcesViewed(unit.id).length, 0);
    const totalResources = course.reduce((count, unit) => count + (unit.resources?.length || 0), 0);
    byId("profileName").textContent = name;
    byId("profileEmail").textContent = state.user.email || "";
    const photoUrl = getAvatarUrl();
    const profileAvatar = byId("profileInitials");
    profileAvatar.className = `profile-avatar${photoUrl ? " has-photo" : avatar ? ` has-character avatar-${avatar.id}` : ""}`;
    profileAvatar.style.backgroundImage = photoUrl ? `url("${photoUrl}")` : "";
    profileAvatar.textContent = (photoUrl || avatar) ? "" : getInitials(name);
    byId("profilePhotoButton").textContent = photoUrl ? "Cambiar foto" : "Subir foto";
    if (byId("profileEditForm").classList.contains("is-hidden")) {
      byId("editProfileButton").textContent = "Corregir mi nombre";
    }
    byId("profileStats").innerHTML = `
      <div class="profile-stat"><strong>${unitsPassed}/${course.length}</strong><span>Unidades aprobadas</span></div>
      <div class="profile-stat"><strong>${projectsDone}/${course.length}</strong><span>Evidencias de proyecto</span></div>
      <div class="profile-stat"><strong>${readingsDone + resourcesDone}/${totalReadings + totalResources}</strong><span>Lecturas y recursos</span></div>`;

    byId("badgeGrid").innerHTML = course.map((unit) => {
      const unlocked = isQuizPassed(unit);
      return `
        <article class="achievement-badge ${unlocked ? "is-unlocked" : "is-locked"}">
          <span class="achievement-badge-icon" aria-hidden="true">${unlocked ? escapeHTML(unit.badge?.icon || "✦") : "◇"}</span>
          <div><small>Unidad ${unit.id}</small><strong>${escapeHTML(unit.badge?.title || "Insignia por descubrir")}</strong><p>${unlocked ? escapeHTML(unit.badge?.description || "Logro completado.") : "Completa la unidad para desbloquearla."}</p></div>
        </article>`;
    }).join("");

    const finalResult = state.progress.finalResult;
    if (finalResult?.passed && unitsPassed === course.length) {
      byId("certificateArea").innerHTML = `
        <article class="certificate-card">
          <div><h3>Certificado disponible</h3><p>Aprobaste la evaluación final con ${finalResult.score}%.</p></div>
          <button id="downloadCertificate" class="button button-primary" type="button">Descargar certificado</button>
        </article>`;
      byId("downloadCertificate").addEventListener("click", () => {
        downloadCertificate().catch((error) => {
          console.error("No se pudo generar el certificado:", error);
          showToast("No se pudo generar el certificado. Inténtalo de nuevo.");
        });
      });
    } else if (!finalResult?.passed) {
      byId("certificateArea").innerHTML = `
        <article class="certificate-card"><div><h3>Evaluación final disponible</h3><p>Puedes presentarla desde ahora. Para obtener el certificado también debes aprobar las cuatro unidades.</p></div><button id="profileFinalButton" class="button button-primary" type="button">Presentar evaluación</button></article>`;
      byId("profileFinalButton").addEventListener("click", startFinalEvaluation);
    } else {
      byId("certificateArea").innerHTML = `
        <article class="certificate-card"><div><h3>Evaluación final aprobada</h3><p>Aprueba las ${course.length} unidades para habilitar el certificado.</p></div></article>`;
    }
  }

  function getAvatarUrl() {
    return state.user?.user_metadata?.avatar_url || "";
  }

  function setProfileBusy(busy) {
    byId("saveProfileName").disabled = busy;
    byId("cancelProfileEdit").disabled = busy;
    byId("profilePhotoButton").disabled = busy;
    if (busy) byId("profilePhotoButton").textContent = "Subiendo…";
  }

  function setProfileEditMessage(message = "", type = "") {
    const el = byId("profileEditMessage");
    el.textContent = message;
    el.className = "form-message";
    if (message) el.classList.add("is-visible", type === "error" ? "is-error" : "is-success");
  }

  function toggleProfileEdit(open) {
    const form = byId("profileEditForm");
    const shouldOpen = typeof open === "boolean" ? open : form.classList.contains("is-hidden");
    form.classList.toggle("is-hidden", !shouldOpen);
    byId("editProfileButton").textContent = shouldOpen ? "Cancelar edición" : "Corregir mi nombre";
    if (shouldOpen) {
      byId("profileNameInput").value = getDisplayName();
      byId("profileNameInput").focus();
    } else {
      setProfileEditMessage();
    }
  }

  async function submitProfileName(event) {
    event.preventDefault();
    if (!supabaseClient || !state.user) return;
    const value = byId("profileNameInput").value.trim().replace(/\s+/g, " ");
    if (value.length < 3) {
      setProfileEditMessage("Escribe tu nombre completo (al menos 3 caracteres).", "error");
      return;
    }
    setProfileBusy(true);
    setProfileEditMessage("Guardando…");
    try {
      const { data, error } = await supabaseClient.auth.updateUser({ data: { full_name: value, name: value } });
      if (error) throw error;
      if (data?.user) state.user = data.user;
      toggleProfileEdit(false);
      renderProfile();
      renderHome();
      showToast("Tu nombre quedó actualizado.");
    } catch (error) {
      console.error("No se pudo actualizar el nombre:", error);
      setProfileEditMessage("No se pudo actualizar el nombre. Revisa tu conexión e inténtalo de nuevo.", "error");
    } finally {
      setProfileBusy(false);
      byId("profilePhotoButton").textContent = getAvatarUrl() ? "Cambiar foto" : "Subir foto";
    }
  }

  function processProfileImage(file, size, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("La imagen no es válida."));
        image.onload = () => {
          const side = Math.min(image.width, image.height);
          const sx = Math.round((image.width - side) / 2);
          const sy = Math.round((image.height - side) / 2);
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          canvas.getContext("2d").drawImage(image, sx, sy, side, side, 0, 0, size, size);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          canvas.toBlob(
            (blob) => resolve({ blob: blob || null, dataUrl }),
            "image/jpeg",
            quality
          );
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function saveAvatarUrl(url) {
    const { data, error } = await supabaseClient.auth.updateUser({ data: { avatar_url: url } });
    if (error) throw error;
    if (data?.user) state.user = data.user;
    renderProfile();
    renderHome();
  }

  async function handleProfilePhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !state.user || !supabaseClient) return;
    if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
      showToast("Elige una imagen en formato PNG, JPG o WEBP.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showToast("La imagen no debe superar 8 MB.");
      return;
    }
    setProfileBusy(true);
    try {
      // 1) Intento preferido: subir a Supabase Storage (bucket "avatars").
      try {
        const { blob } = await processProfileImage(file, 512, 0.85);
        if (!blob) throw new Error("blob");
        const path = `${state.user.id}/avatar.jpg`;
        const { error: uploadError } = await supabaseClient.storage
          .from("avatars")
          .upload(path, blob, { upsert: true, contentType: "image/jpeg", cacheControl: "3600" });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabaseClient.storage.from("avatars").getPublicUrl(path);
        await saveAvatarUrl(`${urlData.publicUrl}?v=${Date.now()}`);
        showToast("Tu foto de perfil quedó actualizada.");
        return;
      } catch (storageError) {
        console.warn("Storage no disponible, se guarda la foto en la cuenta:", storageError);
      }
      // 2) Alternativa sin configuración: guardar una miniatura en la cuenta.
      const { dataUrl } = await processProfileImage(file, 224, 0.72);
      if (dataUrl.length > 90000) {
        showToast("Esa imagen es muy pesada para guardarla. Prueba con una foto más sencilla.");
        return;
      }
      await saveAvatarUrl(dataUrl);
      showToast("Tu foto de perfil quedó actualizada.");
    } catch (error) {
      console.error("No se pudo actualizar la foto:", error);
      showToast("No se pudo guardar la foto. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setProfileBusy(false);
      byId("profilePhotoButton").textContent = getAvatarUrl() ? "Cambiar foto" : "Subir foto";
    }
  }

  function allQuestionsPool() {
    return course.flatMap((unit) => unit.quiz.map((question, qIndex) => ({
      ...question,
      unitId: unit.id,
      qIndex,
      key: `${unit.id}-${qIndex}`
    })));
  }

  function pickFinalQuestions() {
    const pool = allQuestionsPool();
    const size = Math.min(FINAL_QUIZ_SIZE, pool.length);
    return pool.sort(() => Math.random() - .5).slice(0, size);
  }

  function recordQuestionResult(question, wasCorrect) {
    const key = question.key || `${question.unitId}-${question.qIndex}`;
    const previous = state.progress.reviewStats[key] || { misses: 0, correct: 0, needsReview: false };
    state.progress.reviewStats[key] = {
      misses: Number(previous.misses || 0) + (wasCorrect ? 0 : 1),
      correct: Number(previous.correct || 0) + (wasCorrect ? 1 : 0),
      needsReview: !wasCorrect,
      lastSeen: new Date().toISOString()
    };
  }

  function getReviewQuestions() {
    return allQuestionsPool().filter((question) => state.progress.reviewStats[question.key]?.needsReview);
  }

  function pickReviewQuestions() {
    const pending = getReviewQuestions();
    const size = Math.min(REVIEW_QUIZ_MAX, pending.length);
    return pending.sort(() => Math.random() - .5).slice(0, size);
  }

  function startFinalEvaluation() {
    state.finalQuizQuestions = pickFinalQuestions();
    openFinalEvaluation();
  }

  function openFinalEvaluation() {
    const previous = state.progress.finalResult || {};
    if (!Array.isArray(state.finalQuizQuestions) || !state.finalQuizQuestions.length) {
      state.finalQuizQuestions = pickFinalQuestions();
    }
    const questions = state.finalQuizQuestions;
    const savedAnswers = Array.isArray(state.finalQuizAnswers) ? state.finalQuizAnswers : [];
    byId("finalModalBody").innerHTML = `
      <p>Esta evaluación toma ${questions.length} preguntas al azar, entre las 40 de las unidades 5 a 8. Cada intento trae una selección distinta. Necesitas al menos 80% para aprobar.</p>
      <form id="finalQuizForm" class="final-quiz-grid">
        ${questions.map((question, qIndex) => `
          <article class="quiz-question">
            <p class="eyebrow">Unidad ${question.unitId}</p>
            <h3>${escapeHTML(question.q)}</h3>
            <div class="quiz-options">
              ${question.options.map((option, optionIndex) => `
                <label class="quiz-option"><input type="radio" name="final-${qIndex}" value="${optionIndex}" ${Number(savedAnswers[qIndex]) === optionIndex ? "checked" : ""}><span>${escapeHTML(option)}</span></label>`).join("")}
            </div>
          </article>`).join("")}
        <button class="button button-primary" type="submit">Calificar evaluación final</button>
      </form>
      ${previous.date ? `<div class="evaluation-result ${previous.passed ? "is-pass" : "is-fail"}"><h3>${previous.score}%</h3><p>${previous.passed ? "Evaluación final aprobada." : "Revisa las unidades y vuelve a intentarlo. La próxima vez te tocarán otras preguntas."}</p></div>` : ""}
      ${!previous.passed && savedAnswers.length
        ? buildQuizReview(questions, savedAnswers, "Preguntas por reforzar en este intento")
        : ""}`;
    byId("finalQuizForm").addEventListener("submit", (event) => gradeFinalQuiz(event, questions));
    const modal = byId("finalModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function gradeFinalQuiz(event, questions) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const answers = questions.map((_, index) => {
      const value = form.get(`final-${index}`);
      return value === null ? null : Number(value);
    });
    if (answers.some((answer) => answer === null)) {
      showToast(`Responde las ${questions.length} preguntas antes de calificar.`);
      return;
    }
    const correct = questions.filter((question, index) => answers[index] === question.correct).length;
    const score = Math.round((correct / questions.length) * 100);
    questions.forEach((question, index) => {
      recordQuestionResult(question, answers[index] === question.correct);
    });
    const previous = state.progress.finalResult || {};
    const bestScore = Math.max(Number(previous.score || 0), score);
    state.finalQuizAnswers = answers;
    state.progress.finalResult = {
      score: bestScore,
      passed: Boolean(previous.passed || score >= PASSING_SCORE),
      date: new Date().toISOString()
    };
    scheduleCloudSync();
    renderProfile();
    renderReviewChallenge();
    openFinalEvaluation();
    showToast(score >= PASSING_SCORE ? "¡Evaluación final aprobada! Tu certificado está disponible." : "Aún no alcanzas el 80%. Puedes revisar el recorrido y volver a intentarlo con otras preguntas.");
  }

  function closeFinalModal() {
    const modal = byId("finalModal");
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    restoreBodyScroll();
  }

  function renderReviewChallenge() {
    const section = byId("reviewChallenge");
    const button = byId("reviewButton");
    const text = byId("reviewSummaryText");
    if (!section || !button || !text) return;
    const pending = getReviewQuestions();
    if (!pending.length) {
      text.textContent = "Por ahora no tienes preguntas pendientes. Cada vez que falles una pregunta de una unidad o de la evaluación final, aparecerá aquí para que la repases hasta dominarla.";
      button.hidden = true;
    } else {
      text.textContent = `Tienes ${pending.length} pregunta${pending.length === 1 ? "" : "s"} por reforzar, de las unidades que ya intentaste. Repásalas hasta acertarlas.`;
      button.hidden = false;
    }
  }

  function openReviewQuiz() {
    const pending = pickReviewQuestions();
    if (!pending.length) {
      showToast("No tienes preguntas pendientes de repaso por ahora.");
      return;
    }
    state.reviewQuizQuestions = pending;
    state.reviewQuizAnswers = null;
    renderReviewQuiz();
    const modal = byId("reviewModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function renderReviewQuiz() {
    const questions = state.reviewQuizQuestions || [];
    const savedAnswers = Array.isArray(state.reviewQuizAnswers) ? state.reviewQuizAnswers : [];
    byId("reviewModalBody").innerHTML = `
      <p>Estas son las ${questions.length} pregunta${questions.length === 1 ? "" : "s"} que más te ha${questions.length === 1 ? "" : "n"} costado hasta ahora. Acierta cada una para que salga de tu lista de repaso.</p>
      <form id="reviewQuizForm" class="final-quiz-grid">
        ${questions.map((question, qIndex) => `
          <article class="quiz-question">
            <p class="eyebrow">Unidad ${question.unitId}</p>
            <h3>${escapeHTML(question.q)}</h3>
            <div class="quiz-options">
              ${question.options.map((option, optionIndex) => `
                <label class="quiz-option"><input type="radio" name="review-${qIndex}" value="${optionIndex}" ${Number(savedAnswers[qIndex]) === optionIndex ? "checked" : ""}><span>${escapeHTML(option)}</span></label>`).join("")}
            </div>
          </article>`).join("")}
        <button class="button button-primary" type="submit">Calificar repaso</button>
      </form>`;
    byId("reviewQuizForm").addEventListener("submit", (event) => gradeReviewQuiz(event, questions));
  }

  function gradeReviewQuiz(event, questions) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const answers = questions.map((_, index) => {
      const value = form.get(`review-${index}`);
      return value === null ? null : Number(value);
    });
    if (answers.some((answer) => answer === null)) {
      showToast(`Responde las ${questions.length} preguntas antes de calificar.`);
      return;
    }
    questions.forEach((question, index) => {
      recordQuestionResult(question, answers[index] === question.correct);
    });
    state.reviewQuizAnswers = answers;
    scheduleCloudSync();
    const correct = questions.filter((question, index) => answers[index] === question.correct).length;
    const stillPending = getReviewQuestions().length;
    byId("reviewModalBody").insertAdjacentHTML("beforeend", `
      <div class="evaluation-result ${stillPending ? "is-fail" : "is-pass"}">
        <h3>${correct}/${questions.length}</h3>
        <p>${stillPending
          ? `Aún te quedan ${stillPending} pregunta${stillPending === 1 ? "" : "s"} por dominar. Puedes repasar de nuevo cuando quieras.`
          : "¡Dominaste todas las preguntas que tenías pendientes!"}</p>
      </div>`);
    byId("reviewQuizForm").querySelector("button[type=submit]").disabled = true;
    renderReviewChallenge();
    renderHome();
    showToast(stillPending ? "Repaso calificado. Sigue practicando lo que falta." : "¡Repaso completo! No te quedan preguntas pendientes.");
  }

  function closeReviewModal() {
    const modal = byId("reviewModal");
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    restoreBodyScroll();
  }

  function restoreBodyScroll() {
    window.setTimeout(() => {
      if (!document.querySelector(".modal.is-open")) document.body.style.overflow = "";
    }, 0);
  }

  function toTitleCase(value) {
    try {
      return String(value || "").toLowerCase().replace(/(^|[\s'\-’])(\p{L})/gu, (m, sep, ch) => sep + ch.toUpperCase());
    } catch (_) {
      return String(value || "").replace(/\w/g, (c) => c.toUpperCase());
    }
  }

  function certificateCode() {
    const seed = `${state.user?.id || state.user?.email || "anon"}|${state.progress.finalResult?.date || ""}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return `IME2-${hash.toString(16).toUpperCase().padStart(8, "0").slice(0, 8)}`;
  }

  function pdfHrefForUnit(unit) {
    return /Parte 1/i.test(unit?.source || "") ? "assets/libro-parte1.pdf" : "assets/libro-parte2.pdf";
  }

  function hideLinkIfFileMissing(id) {
    const link = byId(id);
    if (!link || !link.getAttribute("href")) return;
    fetch(link.getAttribute("href"), { method: "HEAD" })
      .then((response) => { if (!response.ok) link.style.display = "none"; })
      .catch(() => { link.style.display = "none"; });
  }

  function hideFooterLogosIfMissing() {
    const container = byId("siteFooter")?.querySelector(".site-footer-logos");
    if (!container) return;
    const imgs = [...container.querySelectorAll("img")];
    if (!imgs.length) { container.style.display = "none"; return; }
    let settled = 0;
    const review = () => {
      settled += 1;
      if (settled < imgs.length) return;
      const anyLoaded = imgs.some((img) => img.complete && img.naturalWidth > 0);
      if (!anyLoaded) container.style.display = "none";
    };
    imgs.forEach((img) => {
      if (img.complete) review();
      else {
        img.addEventListener("load", review, { once: true });
        img.addEventListener("error", review, { once: true });
      }
    });
  }

  function loadImageElement(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // Reduce un logo a una miniatura ligera (PNG con transparencia) para incrustar en el PDF.
  function shrinkLogoForPdf(img, maxPx = 240) {
    try {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      return { dataUrl: canvas.toDataURL("image/png"), width: w, height: h };
    } catch (_) {
      return null;
    }
  }

  async function downloadCertificate() {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF) {
      showToast("No se pudo cargar el generador del certificado. Recarga la página.");
      return;
    }
    showToast("Generando certificado…");

    const FOREST = [18, 23, 68];
    const TEAL = [32, 39, 101];
    const TERRACOTTA = [176, 47, 103];
    const GOLD = [76, 198, 186];
    const GREY = [96, 96, 96];

    const doc = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const centerX = width / 2;
    const setColor = (c) => doc.setTextColor(c[0], c[1], c[2]);
    const centered = (text, yy, opts) => doc.text(text, centerX, yy, Object.assign({ align: "center" }, opts || {}));

    // Fondo
    doc.setFillColor(255, 253, 248);
    doc.rect(0, 0, width, height, "F");

    // Banda vertical de la identidad de color (derecha)
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.rect(width - 22, 0, 22, height, "F");
    doc.setFillColor(FOREST[0], FOREST[1], FOREST[2]);
    doc.rect(width - 27, 0, 4, height, "F");
    // Acentos de esquina a la izquierda
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.triangle(0, 0, 16, 0, 0, 16, "F");
    doc.triangle(0, height, 16, height, 0, height - 16, "F");

    // Marco
    doc.setDrawColor(FOREST[0], FOREST[1], FOREST[2]);
    doc.setLineWidth(2);
    doc.rect(10, 10, width - 20, height - 20);
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.5);
    doc.rect(13.5, 13.5, width - 27, height - 27);

    // Logos institucionales (si estan en assets/logos/)
    const loadedLogos = (await Promise.all(CERT_CONFIG.logos.map(loadImageElement))).filter(Boolean);
    const logos = loadedLogos.map((image) => shrinkLogoForPdf(image)).filter(Boolean);
    if (logos.length) {
      const logoH = 15;
      const gap = 12;
      const sized = logos.map((logo) => ({ logo, w: logoH * (logo.width / logo.height || 1) }));
      const totalW = sized.reduce((sum, l) => sum + l.w, 0) + gap * (sized.length - 1);
      let x = (centerX - 6) - totalW / 2;
      sized.forEach(({ logo, w }) => {
        try { doc.addImage(logo.dataUrl, "PNG", x, 22, w, logoH); } catch (_) { /* omitir */ }
        x += w + gap;
      });
    }

    let y = logos.length ? 52 : 46;

    // Institucion (serif)
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    setColor(FOREST);
    const institutionLines = doc.splitTextToSize(CERT_CONFIG.institution, width - 110);
    centered(institutionLines, y);
    y += institutionLines.length > 1 ? 6 + institutionLines.length * 7.5 : 8;

    doc.setFont("times", "italic");
    doc.setFontSize(11);
    setColor(TEAL);
    centered(CERT_CONFIG.unit, y);
    y += 17;

    doc.setFont("times", "normal");
    doc.setFontSize(12.5);
    setColor(GREY);
    doc.setCharSpace(2.6);
    centered("CERTIFICAN QUE", y);
    doc.setCharSpace(0);
    y += 15;

    // Nombre
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    setColor(TERRACOTTA);
    centered(toTitleCase(getDisplayName()), y);
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.5);
    doc.line(centerX - 72, y + 5.5, centerX + 72, y + 5.5);
    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor(GREY);
    centered(`Identificado(a) con el correo ${state.user?.email || ""}`, y);
    y += 15;

    doc.setFont("times", "normal");
    doc.setFontSize(11);
    setColor(GREY);
    doc.setCharSpace(2.2);
    centered("APROBÓ EL MÓDULO", y);
    doc.setCharSpace(0);
    y += 11;

    doc.setFont("times", "bold");
    doc.setFontSize(19);
    setColor(TEAL);
    centered(doc.splitTextToSize(CERT_CONFIG.moduleName.toUpperCase(), width - 110), y);
    y += 7.5;
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    setColor(GREY);
    centered(CERT_CONFIG.moduleSubtitle, y);
    y += 14;

    const date = state.progress.finalResult?.date ? new Date(state.progress.finalResult.date) : new Date();
    doc.setFont("times", "normal");
    doc.setFontSize(10.5);
    setColor(FOREST);
    centered(`Unidades ${course[0]?.id} a ${course[course.length - 1]?.id}  ·  Resultado de la evaluación final: ${state.progress.finalResult?.score || 0}%`, y);
    y += 6.5;
    centered(`Fecha de emisión: ${date.toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}`, y);

    // Sello circular
    const sealY = Math.min(height - 34, y + 16);
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.7);
    doc.circle(centerX, sealY, 9);
    doc.setLineWidth(0.35);
    doc.circle(centerX, sealY, 7);
    doc.setFont("times", "bold");
    doc.setFontSize(9.5);
    setColor(FOREST);
    doc.text("IME", centerX, sealY + 1.2, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(4.2);
    setColor(GREY);
    doc.text("MODULO APROBADO", centerX, sealY - 4.2, { align: "center" });
    doc.text("PLATAFORMA DEL CURSO", centerX, sealY + 5.4, { align: "center" });

    // Pie
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.6);
    setColor(GREY);
    centered("Documento generado automáticamente al completar el módulo en la plataforma educativa del curso.", height - 22);
    centered(`Código de verificación: ${certificateCode()}`, height - 17.5);

    const safeName = getDisplayName().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
    doc.save(`certificado-investigacion-mercados-parte-2-${safeName || "estudiante"}.pdf`);
  }

  function showToast(message) {
    const toast = byId("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3800);
  }

  function bindEvents() {
    byId("authForm").addEventListener("submit", handleAuthSubmit);
    byId("authModeToggle").addEventListener("click", () => {
      state.authMode = state.authMode === "login" ? "signup" : "login";
      updateAuthMode();
    });
    byId("togglePassword").addEventListener("click", () => {
      const input = byId("passwordInput");
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      byId("togglePassword").textContent = showing ? "Mostrar" : "Ocultar";
      byId("togglePassword").setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
    });
    document.querySelectorAll("[data-view-target]").forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.viewTarget));
    });
    byId("homeLink").addEventListener("click", (event) => {
      event.preventDefault();
      switchView("homeView");
    });
    byId("logoutButton").addEventListener("click", logout);
    byId("editProfileButton").addEventListener("click", () => toggleProfileEdit());
    byId("cancelProfileEdit").addEventListener("click", () => toggleProfileEdit(false));
    byId("profileEditForm").addEventListener("submit", submitProfileName);
    byId("profilePhotoButton").addEventListener("click", () => byId("profilePhotoInput").click());
    byId("profilePhotoInput").addEventListener("change", handleProfilePhoto);
    byId("backToRoute").addEventListener("click", () => switchView("homeView"));
    byId("continueButton").addEventListener("click", () => openUnit(getHighestUnlocked()));
    byId("finalEvaluationButton").addEventListener("click", startFinalEvaluation);
    document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeTheoryModal));
    document.querySelectorAll("[data-close-resource]").forEach((button) => button.addEventListener("click", closeResourceModal));
    document.querySelectorAll("[data-close-quiz]").forEach((button) => button.addEventListener("click", closeQuizModal));
    document.querySelectorAll("[data-close-badge]").forEach((button) => button.addEventListener("click", closeBadgeModal));
    document.querySelectorAll("[data-close-final]").forEach((button) => button.addEventListener("click", closeFinalModal));
    byId("reviewButton")?.addEventListener("click", openReviewQuiz);
    document.querySelectorAll("[data-close-review]").forEach((button) => button.addEventListener("click", closeReviewModal));
    byId("supportToggle").addEventListener("click", () => toggleSupport());
    byId("closeSupport").addEventListener("click", () => toggleSupport(false));
    byId("speakSupportAnswer").addEventListener("click", speakSupportAnswer);
    byId("speakSimulatorGuide").addEventListener("click", () => speakGuidanceText(byId("simulatorGuideText").textContent));
    byId("stopSimulatorGuide").addEventListener("click", stopSupportVoice);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTheoryModal();
        closeResourceModal();
        closeQuizModal();
        closeBadgeModal();
        closeFinalModal();
        toggleSupport(false);
      }
    });
    window.addEventListener("beforeunload", saveLocalProgress);
  }

  async function initialize() {
    bindEvents();
    updateAuthMode();
    startMotivationCycle();
    const footerYear = byId("footerYear");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());
    hideFooterLogosIfMissing();
    hideLinkIfFileMissing("downloadSourcePdf");
    hideLinkIfFileMissing("downloadSourcePdf2");
    if (!course.length) {
      setAuthMessage("No se pudo cargar el contenido del curso.", "error");
      return;
    }
    if (!supabaseClient) {
      setAuthMessage("No se pudo conectar con el servicio de acceso. Verifica la conexión y recarga.", "error");
      return;
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
      window.setTimeout(() => {
        if (event === "SIGNED_OUT") showLogin();
        if (session?.user && state.user?.id !== session.user.id) enterApplication(session.user);
      }, 0);
    });

    try {
      const { data, error } = await supabaseClient.auth.getUser();
      if (!error && data?.user) await enterApplication(data.user);
      else showLogin();
    } catch {
      showLogin();
    }
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
