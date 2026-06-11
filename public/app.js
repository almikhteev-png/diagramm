const STORAGE_KEY = "bpm-agent-studio-v1";
const NODE_W = 168;
const NODE_H = 88;
const EVENT_SIZE = 86;
const GATEWAY_SIZE = 108;
const NODE_MIN_W = 72;
const NODE_MIN_H = 62;
const NODE_MAX_W = 360;
const NODE_MAX_H = 240;
const LANE_H = 176;
const LANE_TOP = 34;
const LANE_LABEL_W = 154;
const STEP_GAP = 230;
const DOUBLE_CLICK_WINDOW_MS = 1400;

const templates = {
  custom: {
    title: "Новая BPM-модель",
    owner: "Владелец процесса",
    goal: "Сформулируйте бизнес-цель, которую должен достигать процесс.",
    trigger: "Событие, которое запускает процесс",
    outcome: "Измеримый результат процесса",
    lanes: "Инициатор\nОперационная команда\nРуководитель\nКлиент",
    steps:
      "Инициатор: Зафиксировать запрос -> понятен контекст и ожидаемый результат [полнота брифа]\n" +
      "Операционная команда: Проверить входные данные -> выявлены пробелы и ограничения [качество данных]\n" +
      "Руководитель: Принять решение о приоритете -> согласован маршрут выполнения [время решения]\n" +
      "Операционная команда: Выполнить действие -> создан рабочий результат [SLA выполнения]\n" +
      "Клиент: Подтвердить результат -> закрыта обратная связь [удовлетворенность]"
  },
  sales: {
    title: "B2B продажи: от лида до сделки",
    owner: "Head of Sales",
    goal: "Стабильно переводить целевые входящие запросы в квалифицированные сделки с понятным прогнозом выручки.",
    trigger: "Новый лид из формы, рекомендации или партнерского канала",
    outcome: "Квалифицированная сделка с согласованным следующим шагом",
    lanes: "Маркетинг\nSales Development\nAccount Executive\nРуководитель продаж\nКлиент",
    steps:
      "Маркетинг: Зарегистрировать лид и источник -> сохранена атрибуция канала [доля лидов с источником]\n" +
      "Sales Development: Проверить ICP и срочность -> лид получает статус MQL или disqualified [MQL conversion]\n" +
      "Sales Development: Провести первичный контакт -> подтверждены потребность, бюджет и тайминг [скорость первого ответа]\n" +
      "Account Executive: Провести discovery-сессию -> сформирована карта боли и критериев успеха [доля completed discovery]\n" +
      "Руководитель продаж: Решить, нужен ли пресейл или пилот -> выбран маршрут сделки [точность прогноза]\n" +
      "Account Executive: Подготовить предложение -> клиент видит ценность и план внедрения [proposal win rate]\n" +
      "Клиент: Согласовать следующий шаг -> сделка движется к контракту или пилоту [next step booked]"
  },
  "client-onboarding": {
    title: "Онбординг клиента после подписания",
    owner: "Customer Success Lead",
    goal: "Довести нового клиента до первого измеримого результата без потери контекста между продажами, внедрением и поддержкой.",
    trigger: "Подписан договор или подтвержден пилот",
    outcome: "Клиент успешно запустил первый сценарий и понимает дальнейший план",
    lanes: "Sales\nCustomer Success\nImplementation\nSupport\nКлиент",
    steps:
      "Sales: Передать контекст сделки -> CS видит цели, обещания и ограничения [полнота handoff]\n" +
      "Customer Success: Провести kickoff -> подтверждены цели, роли и критерии успеха [kickoff completion]\n" +
      "Implementation: Настроить рабочее пространство -> подготовлена среда клиента [время настройки]\n" +
      "Клиент: Подтвердить данные и доступы -> нет блокеров запуска [готовность данных]\n" +
      "Implementation: Провести первый запуск -> клиент получил первый результат [time to first value]\n" +
      "Support: Обработать вопросы запуска -> сняты операционные затруднения [время ответа]\n" +
      "Customer Success: Зафиксировать план развития -> согласованы следующие сценарии [adoption plan coverage]"
  },
  support: {
    title: "Обработка клиентского обращения",
    owner: "Support Lead",
    goal: "Быстро классифицировать обращение, решить типовые вопросы и эскалировать сложные случаи без потери SLA.",
    trigger: "Новое обращение в поддержку",
    outcome: "Клиент получил решение или понятный план эскалации",
    lanes: "Клиент\nSupport L1\nSupport L2\nProduct\nCustomer Success",
    steps:
      "Клиент: Создать обращение -> описана проблема и приложены данные [полнота тикета]\n" +
      "Support L1: Классифицировать обращение -> определены категория, критичность и SLA [время triage]\n" +
      "Support L1: Решить типовой вопрос -> клиент получает инструкцию или исправление [first contact resolution]\n" +
      "Support L2: Проанализировать сложный случай -> найдена причина и способ решения [время диагностики]\n" +
      "Product: Решить, нужен ли дефект в roadmap -> создана продуктовая запись [доля корректных эскалаций]\n" +
      "Customer Success: Сообщить клиенту статус -> ожидания синхронизированы [CSAT после ответа]"
  },
  approval: {
    title: "Согласование управленческого решения",
    owner: "Operations Director",
    goal: "Сократить цикл согласования решений, сохраняя прозрачность критериев, рисков и ответственности.",
    trigger: "Появилась инициатива или запрос на изменение",
    outcome: "Решение принято, зафиксировано и передано в исполнение",
    lanes: "Инициатор\nФинансы\nЮристы\nРуководитель\nИсполнитель",
    steps:
      "Инициатор: Подготовить обоснование -> понятны цель, бюджет, эффект и риски [полнота заявки]\n" +
      "Финансы: Проверить бюджет и экономику -> подтверждена финансовая модель [точность расчета]\n" +
      "Юристы: Проверить ограничения -> выявлены юридические риски [время проверки]\n" +
      "Руководитель: Решить, согласовать ли инициативу -> выбран статус и условия [цикл согласования]\n" +
      "Исполнитель: Запланировать реализацию -> создан план работ и контрольные точки [готовность к запуску]"
  },
  "crm-referral-launch": {
    title: "Запуск CRM Referral Widget Enterprise MVP",
    owner: "Product Owner / Delivery Manager",
    goal: "Запустить production-grade CRM-native SaaS-виджет для реферальных и партнерских программ внутри AmoCRM/Kommo за 20-22 недели, сохранив фокус на CRM widget layer, финансовой прозрачности, audit log и controlled rollout.",
    trigger: "Утверждено ТЗ CRM Referral Widget Enterprise Product Spec v1.0",
    outcome: "Production MVP опубликован, AmoCRM/Kommo интеграция работает, core flows приняты, пилотные клиенты подключены, roadmap Bitrix24 подготовлен",
    lanes: "Product & Delivery\nArchitecture & Backend\nCRM Integration\nFrontend & UX\nQA Security DevOps\nPilot GTM Customer Success",
    steps:
      "Product & Delivery: Утвердить рамку продукта, роли и MVP scope -> зафиксированы продуктовая рамка, ограничения и роли Super Admin, Company Admin, CRM Manager, Finance Manager, Referral Partner, Partner Recruiter [scope baseline]\n" +
      "Product & Delivery: Подготовить Jira/Linear backlog по 19 MVP epics -> backlog готов к Sprint 0, оценки 20-22 недели сохранены [backlog readiness]\n" +
      "Architecture & Backend: Согласовать modular monolith architecture, ERD и API contracts -> подтверждены tenant model, core tables, API groups и boundaries модулей [architecture sign-off]\n" +
      "CRM Integration: Провести AmoCRM/Kommo OAuth, Webhooks и Widget SDK spike -> доказана техническая реализуемость connect, refreshToken, deal context и webhook handling [CRM spike passed]\n" +
      "QA Security DevOps: Развернуть dev/staging, CI/CD, monitoring, backups и базовый security framework -> команда имеет безопасный контур разработки и контроля [environment readiness]\n" +
      "Architecture & Backend: Реализовать SaaS Core, Auth, RBAC и tenant isolation -> multi-tenant foundation готов, права и изоляция данных проверены [tenant isolation tests]\n" +
      "CRM Integration: Реализовать CRM Integration Layer и Deal Sync Module -> AmoCRM/Kommo подключается, сделки и стадии синхронизируются, ошибки видны в CRM health center [sync reliability]\n" +
      "Architecture & Backend: Реализовать Partner Registry, Referral Link Engine и Partner Recruitment Module -> партнеры, referral links, recruitment links и recruiter_partner_id работают [partner core completion]\n" +
      "Architecture & Backend: Реализовать Attribution Engine, disputes и audit timeline -> лиды и сделки закрепляются за партнерами, конфликты видны и разрешаются [attribution accuracy]\n" +
      "Frontend & UX: Реализовать CRM Embedded Widget для карточки сделки -> виджет показывает партнера, источник, комиссию, payout status, conflict warning и audit timeline до 1.5 сек [widget load time]\n" +
      "Architecture & Backend: Реализовать Commission Rules, Commission Events и Payout Status -> fixed, percent rules, manual recruiter bonus, breakdown, rule version и snapshot работают [commission correctness]\n" +
      "Frontend & UX: Реализовать SaaS Admin Panel и Partner Mini Portal -> админ управляет программой, партнер видит ссылки, лиды, сделки, комиссии, выплаты и приглашенных партнеров [portal adoption readiness]\n" +
      "Architecture & Backend: Собрать Analytics, Notifications и CRM Health Center -> dashboards, top partners, activation funnel, email/CRM notifications и health signals доступны [analytics coverage]\n" +
      "QA Security DevOps: Провести security hardening, integration, E2E, regression, UAT и acceptance criteria review -> критичные сценарии CRM, attribution, commission, payouts, portal и monitoring приняты [release candidate readiness]\n" +
      "Pilot GTM Customer Success: Запустить controlled rollout: internal pilot, closed beta, paid pilot, public MVP -> проверены core flows, разные сценарии клиентов, готовность платить и масштабирование [pilot conversion]\n" +
      "Product & Delivery: Подготовить next release Bitrix24 и post-MVP backlog -> Bitrix24 roadmap, partner activation reward, расширенная аналитика и templates правил готовы к планированию [release 1.2 readiness]"
  }
};

const typeLabels = {
  start: "Старт",
  task: "Действие",
  gateway: "Решение",
  data: "Документ",
  metric: "Аналитика",
  end: "Финиш"
};

const defaultByType = {
  start: "Старт процесса",
  task: "Новое действие",
  gateway: "Решение",
  data: "Документ / артефакт",
  metric: "Замер результата",
  end: "Финиш процесса"
};

const SVG_EXPORT_STYLES = `
  .lane-bg{fill:#f7f9f6}.lane-border,.canvas-border{fill:none;stroke:#d8ded5;stroke-width:1}
  .lane-title{fill:#38443d;font:800 14px Inter,Arial}.lane-subtitle{fill:#69766d;font:600 11px Inter,Arial}
  .flow-path{fill:none;stroke:#59655d;stroke-width:2}.flow-label{fill:#58635d;font:700 11px Inter,Arial}
  .node-shape{stroke:#546059;stroke-width:1.5}.node-label{fill:#1f2823;font:800 13px Inter,Arial}
  .node-meta{fill:#657168;font:700 10px Inter,Arial}.node-kpi{fill:#0f745c;font:800 10px Inter,Arial}
  .node-start .node-shape{fill:#dff2e6}.node-end .node-shape{fill:#ffe5df}
  .node-task .node-shape{fill:#fff}.node-gateway .node-shape{fill:#fff3d7}
  .node-data .node-shape{fill:#e7eefc}.node-metric .node-shape{fill:#e0f1ef}
`;

const dom = {};
let state = loadState();
let selectedNodeId = state.selectedNodeId || getFirstEditableNodeId();
let activeSlide = 0;
let zoom = 1;
let saveTimer = null;
let drag = null;
let lastNodePointerDown = { nodeId: null, time: 0 };

document.addEventListener("DOMContentLoaded", () => {
  bindDom();
  bindEvents();
  hydrateBriefFields();
  renderAll();
  persist("Автосохранение включено");
});

function bindDom() {
  Object.assign(dom, {
    newProjectButton: document.getElementById("newProjectButton"),
    saveButton: document.getElementById("saveButton"),
    exportJsonButton: document.getElementById("exportJsonButton"),
    importButton: document.getElementById("importButton"),
    importInput: document.getElementById("importInput"),
    exportSvgButton: document.getElementById("exportSvgButton"),
    exportPngButton: document.getElementById("exportPngButton"),
    exportPdfButton: document.getElementById("exportPdfButton"),
    presentationButton: document.getElementById("presentationButton"),
    closePresentationButton: document.getElementById("closePresentationButton"),
    projectTitleInput: document.getElementById("projectTitleInput"),
    projectOwnerInput: document.getElementById("projectOwnerInput"),
    audienceSelect: document.getElementById("audienceSelect"),
    saveStatus: document.getElementById("saveStatus"),
    templateSelect: document.getElementById("templateSelect"),
    goalInput: document.getElementById("goalInput"),
    triggerInput: document.getElementById("triggerInput"),
    outcomeInput: document.getElementById("outcomeInput"),
    lanesInput: document.getElementById("lanesInput"),
    stepsInput: document.getElementById("stepsInput"),
    generateButton: document.getElementById("generateButton"),
    reviewButton: document.getElementById("reviewButton"),
    agentMessage: document.getElementById("agentMessage"),
    agentCommandInput: document.getElementById("agentCommandInput"),
    runCommandButton: document.getElementById("runCommandButton"),
    modelList: document.getElementById("modelList"),
    propertiesPane: document.getElementById("propertiesPane"),
    propertyTemplate: document.getElementById("propertyTemplate"),
    canvasTitle: document.getElementById("canvasTitle"),
    canvasFrame: document.getElementById("canvasFrame"),
    diagramSvg: document.getElementById("diagramSvg"),
    inlineEditor: document.getElementById("inlineEditor"),
    presentationSvg: document.getElementById("presentationSvg"),
    presentationTitle: document.getElementById("presentationTitle"),
    presentationCopy: document.getElementById("presentationCopy"),
    presentationStage: document.getElementById("presentationStage"),
    layoutButton: document.getElementById("layoutButton"),
    zoomOutButton: document.getElementById("zoomOutButton"),
    zoomInButton: document.getElementById("zoomInButton"),
    scoreRing: document.getElementById("scoreRing"),
    scoreValue: document.getElementById("scoreValue"),
    metricsGrid: document.getElementById("metricsGrid"),
    recommendationsList: document.getElementById("recommendationsList"),
    resultFeed: document.getElementById("resultFeed"),
    onboardingTitle: document.getElementById("onboardingTitle"),
    onboardingSummary: document.getElementById("onboardingSummary"),
    onboardingList: document.getElementById("onboardingList"),
    slideSelector: document.getElementById("slideSelector"),
    clientSlide: document.getElementById("clientSlide")
  });
}

function bindEvents() {
  document.querySelectorAll("[data-left-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab("left", button.dataset.leftTab));
  });

  document.querySelectorAll("[data-right-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab("right", button.dataset.rightTab));
  });

  document.querySelectorAll("[data-add-node]").forEach((button) => {
    button.addEventListener("click", () => addNode(button.dataset.addNode));
  });

  dom.projectTitleInput.addEventListener("input", () => {
    state.title = dom.projectTitleInput.value.trim() || "BPM-карта процесса";
    dom.canvasTitle.textContent = state.title;
    scheduleSave();
    renderPresentation();
  });

  dom.projectOwnerInput.addEventListener("input", () => {
    state.owner = dom.projectOwnerInput.value.trim();
    scheduleSave();
    renderAnalytics();
    renderPresentation();
  });

  dom.audienceSelect.addEventListener("change", () => {
    state.audience = dom.audienceSelect.value;
    scheduleSave();
    renderClient();
  });

  ["goalInput", "triggerInput", "outcomeInput", "lanesInput", "stepsInput"].forEach((key) => {
    dom[key].addEventListener("input", () => {
      state.brief = readBrief();
      scheduleSave();
    });
  });

  dom.templateSelect.addEventListener("change", () => {
    const template = templates[dom.templateSelect.value];
    applyTemplateToBrief(template);
    state.brief.template = dom.templateSelect.value;
    scheduleSave();
  });

  dom.generateButton.addEventListener("click", () => {
    buildModelFromBrief();
    setAgentMessage("BPM-модель построена. Я разложил роли по дорожкам, добавил старт/финиш, связи, KPI, риски, onboarding и клиентские слайды.");
  });

  dom.reviewButton.addEventListener("click", () => {
    const analytics = calculateAnalytics();
    setAgentMessage(buildReviewMessage(analytics));
    setTab("right", "analytics");
  });

  dom.runCommandButton.addEventListener("click", runAgentCommand);
  dom.agentCommandInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") runAgentCommand();
  });

  dom.saveButton.addEventListener("click", () => persist("Изменения сохранены"));
  dom.newProjectButton.addEventListener("click", createNewProject);
  dom.exportJsonButton.addEventListener("click", exportJson);
  dom.importButton.addEventListener("click", () => dom.importInput.click());
  dom.importInput.addEventListener("change", importJson);
  dom.exportSvgButton.addEventListener("click", exportSvg);
  dom.exportPngButton.addEventListener("click", exportPng);
  dom.exportPdfButton.addEventListener("click", exportPdf);
  dom.presentationButton.addEventListener("click", () => setPresentationMode(true));
  dom.closePresentationButton.addEventListener("click", () => setPresentationMode(false));
  dom.layoutButton.addEventListener("click", () => {
    layoutModel();
    renderAll();
    scheduleSave();
    showToast("Диаграмма разложена по BPM-дорожкам");
  });
  dom.zoomOutButton.addEventListener("click", () => setZoom(zoom - 0.1));
  dom.zoomInButton.addEventListener("click", () => setZoom(zoom + 0.1));
  dom.inlineEditor.addEventListener("click", (event) => event.stopPropagation());

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeInlineEditor();
  });
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return normalizeModel(parsed);
    }
  } catch (error) {
    console.warn("Cannot load saved BPM model", error);
  }
  return createModelFromTemplate("crm-referral-launch");
}

function normalizeModel(model) {
  const fallback = createModelFromTemplate("client-onboarding");
  return {
    id: model.id || uid("model"),
    title: model.title || fallback.title,
    owner: model.owner || fallback.owner,
    audience: model.audience || "internal",
    brief: { ...fallback.brief, ...(model.brief || {}) },
    lanes: Array.isArray(model.lanes) && model.lanes.length ? model.lanes : fallback.lanes,
    nodes: Array.isArray(model.nodes) && model.nodes.length ? model.nodes : fallback.nodes,
    links: Array.isArray(model.links) ? model.links : fallback.links,
    selectedNodeId: model.selectedNodeId || null,
    updatedAt: model.updatedAt || new Date().toISOString()
  };
}

function createModelFromTemplate(templateKey) {
  const template = templates[templateKey] || templates.custom;
  const brief = {
    template: templateKey,
    title: template.title,
    owner: template.owner,
    goal: template.goal,
    trigger: template.trigger,
    outcome: template.outcome,
    lanes: template.lanes,
    steps: template.steps
  };
  const model = {
    id: uid("model"),
    title: template.title,
    owner: template.owner,
    audience: "internal",
    brief,
    lanes: parseLanes(template.lanes),
    nodes: [],
    links: [],
    selectedNodeId: null,
    updatedAt: new Date().toISOString()
  };
  return buildModel(model, brief);
}

function buildModel(model, brief) {
  const lanes = parseLanes(brief.lanes);
  const parsedSteps = parseSteps(brief.steps, lanes);
  const nodes = [];
  const links = [];
  const startLane = lanes[0] || makeLane("Процесс", 0);
  const endLane = lanes[lanes.length - 1] || startLane;

  nodes.push({
    id: uid("start"),
    type: "start",
    label: "Старт",
    laneId: startLane.id,
    description: brief.trigger,
    owner: startLane.name,
    input: brief.trigger,
    output: "Запущен процесс",
    sla: "Сразу после триггера",
    kpi: "Время старта",
    result: `Процесс стартует, когда наступает событие: ${brief.trigger || "триггер процесса"}.`,
    risk: "Неочевидный триггер приводит к ручному запуску и потере SLA.",
    onboarding: "Покажите команде, какие события запускают процесс и кто подтверждает старт.",
    width: defaultSizeForType("start").w,
    height: defaultSizeForType("start").h,
    x: LANE_LABEL_W + 40,
    y: laneY(0) + 45
  });

  parsedSteps.forEach((step, index) => {
    const node = {
      id: uid(step.type),
      type: step.type,
      label: step.action,
      laneId: step.laneId,
      description: step.description,
      owner: step.owner,
      input: step.input,
      output: step.output,
      sla: step.sla,
      kpi: step.kpi,
      result: step.result,
      risk: step.risk,
      onboarding: step.onboarding,
      width: defaultSizeForType(step.type).w,
      height: defaultSizeForType(step.type).h,
      x: LANE_LABEL_W + 260 + index * STEP_GAP,
      y: laneY(lanes.findIndex((lane) => lane.id === step.laneId)) + 44
    };
    nodes.push(node);
  });

  nodes.push({
    id: uid("end"),
    type: "end",
    label: "Результат",
    laneId: endLane.id,
    description: brief.outcome,
    owner: model.owner || endLane.name,
    input: "Все обязательные действия выполнены",
    output: brief.outcome,
    sla: "По целевому сроку процесса",
    kpi: "Достижение результата",
    result: `Финальный результат: ${brief.outcome || "результат процесса"}.`,
    risk: "Результат не принят клиентом или владельцем процесса.",
    onboarding: "Закрепите критерии завершения и формат подтверждения результата.",
    width: defaultSizeForType("end").w,
    height: defaultSizeForType("end").h,
    x: LANE_LABEL_W + 260 + parsedSteps.length * STEP_GAP,
    y: laneY(lanes.length - 1) + 45
  });

  nodes.forEach((node, index) => {
    if (index === 0) return;
    links.push({
      id: uid("flow"),
      from: nodes[index - 1].id,
      to: node.id,
      label: index === 1 ? "запуск" : index === nodes.length - 1 ? "готово" : "следующий шаг"
    });
  });

  return {
    ...model,
    title: brief.title || model.title,
    owner: brief.owner || model.owner,
    brief,
    lanes,
    nodes,
    links,
    selectedNodeId: nodes[1]?.id || nodes[0]?.id || null,
    updatedAt: new Date().toISOString()
  };
}

function parseLanes(text) {
  const names = lines(text);
  const source = names.length ? names : ["Инициатор", "Команда", "Руководитель", "Клиент"];
  return source.map((name, index) => makeLane(cleanLaneName(name), index));
}

function makeLane(name, index) {
  return {
    id: slugify(name) || `lane-${index + 1}`,
    name: name || `Дорожка ${index + 1}`,
    role: index === 0 ? "Запускает процесс" : index === 1 ? "Выполняет ключевые действия" : "Принимает результат"
  };
}

function parseSteps(text, lanes) {
  const stepLines = lines(text);
  const fallback = lines(templates.custom.steps);
  const source = stepLines.length ? stepLines : fallback;
  return source.map((line, index) => parseStep(line, index, lanes));
}

function parseStep(line, index, lanes) {
  const kpiMatch = line.match(/\[([^\]]+)\]/);
  const kpi = kpiMatch ? kpiMatch[1].trim() : "";
  const withoutKpi = line.replace(/\[[^\]]+\]/g, "").trim();
  const roleSplit = withoutKpi.split(":");
  const possibleRole = roleSplit.length > 1 ? roleSplit.shift().trim() : "";
  const lane = findLane(possibleRole, lanes) || lanes[index % lanes.length] || makeLane("Команда", 0);
  const actionText = roleSplit.join(":").trim() || withoutKpi;
  const resultSplit = actionText.split("->");
  const action = sentence(resultSplit[0] || `Действие ${index + 1}`);
  const output = sentence(resultSplit[1] || inferOutput(action));
  const type = inferType(action);
  const owner = possibleRole || lane.name;

  return {
    type,
    laneId: lane.id,
    owner,
    action,
    description: `${owner} выполняет шаг: ${action}.`,
    input: index === 0 ? "Триггер процесса и исходные данные" : "Результат предыдущего действия",
    output,
    sla: inferSla(type, index),
    kpi: kpi || inferKpi(action, output, type),
    result: `После шага должен быть получен результат: ${output}. Аналитика фиксирует факт выполнения, качество результата и отклонения от SLA.`,
    risk: inferRisk(action, type),
    onboarding: `На онбординге показать ${owner.toLowerCase()}: когда выполнять шаг, какой вход нужен, какой результат считается принятым.`
  };
}

function findLane(role, lanes) {
  if (!role) return null;
  const normalized = role.toLowerCase();
  return lanes.find((lane) => lane.name.toLowerCase() === normalized) ||
    lanes.find((lane) => lane.name.toLowerCase().includes(normalized) || normalized.includes(lane.name.toLowerCase()));
}

function inferType(action) {
  const text = action.toLowerCase();
  if (/(решить|согласовать ли|если|выбрать|approve|decision|нужен ли)/i.test(text)) return "gateway";
  if (/(отчет|договор|документ|заявк|brief|бриф|акт)/i.test(text)) return "data";
  if (/(измерить|проверить метрик|оценить|аналитик|замер)/i.test(text)) return "metric";
  return "task";
}

function inferOutput(action) {
  const text = action.toLowerCase();
  if (text.includes("провер")) return "подтвержден статус и выявлены отклонения";
  if (text.includes("реш")) return "принято решение и выбран следующий маршрут";
  if (text.includes("передать")) return "контекст передан без потерь";
  if (text.includes("запустить") || text.includes("провести")) return "шаг выполнен и зафиксирован";
  return "создан проверяемый результат";
}

function inferKpi(action, output, type) {
  if (type === "gateway") return "Время принятия решения";
  if (type === "metric") return "Точность и полнота данных";
  if (/провер|подтверд/i.test(action)) return "Доля шагов без возврата";
  if (/клиент|обратн/i.test(action + output)) return "Удовлетворенность клиента";
  return "SLA выполнения";
}

function inferSla(type, index) {
  if (type === "gateway") return "До 1 рабочего дня";
  if (index < 2) return "В день запуска";
  return "По регламенту этапа";
}

function inferRisk(action, type) {
  if (type === "gateway") return "Критерии решения не зафиксированы, возможны задержки и субъективные согласования.";
  if (/данн|доступ|документ/i.test(action)) return "Неполные данные или доступы блокируют следующий шаг.";
  if (/клиент/i.test(action)) return "Клиент не понимает ожидаемое действие или критерий приемки.";
  return "Ответственный, вход или критерий готовности не определены достаточно явно.";
}

function buildModelFromBrief() {
  const brief = readBrief();
  state = buildModel(state, brief);
  selectedNodeId = state.selectedNodeId;
  hydrateTopFields();
  renderAll();
  persist("BPM-модель построена и сохранена");
}

function readBrief() {
  return {
    template: dom.templateSelect.value,
    title: dom.projectTitleInput.value.trim() || dom.templateSelect.selectedOptions[0]?.textContent || "BPM-модель",
    owner: dom.projectOwnerInput.value.trim() || "Владелец процесса",
    goal: dom.goalInput.value.trim(),
    trigger: dom.triggerInput.value.trim(),
    outcome: dom.outcomeInput.value.trim(),
    lanes: dom.lanesInput.value.trim(),
    steps: dom.stepsInput.value.trim()
  };
}

function hydrateBriefFields() {
  dom.templateSelect.value = state.brief.template || "custom";
  dom.goalInput.value = state.brief.goal || "";
  dom.triggerInput.value = state.brief.trigger || "";
  dom.outcomeInput.value = state.brief.outcome || "";
  dom.lanesInput.value = state.brief.lanes || "";
  dom.stepsInput.value = state.brief.steps || "";
  hydrateTopFields();
}

function hydrateTopFields() {
  dom.projectTitleInput.value = state.title || "";
  dom.projectOwnerInput.value = state.owner || "";
  dom.audienceSelect.value = state.audience || "internal";
  dom.canvasTitle.textContent = state.title || "BPM-карта процесса";
}

function applyTemplateToBrief(template) {
  if (!template) return;
  dom.projectTitleInput.value = template.title;
  dom.projectOwnerInput.value = template.owner;
  dom.goalInput.value = template.goal;
  dom.triggerInput.value = template.trigger;
  dom.outcomeInput.value = template.outcome;
  dom.lanesInput.value = template.lanes;
  dom.stepsInput.value = template.steps;
  state.title = template.title;
  state.owner = template.owner;
  state.brief = readBrief();
  hydrateTopFields();
  setAgentMessage("Шаблон загружен в бриф. Нажмите «Построить BPM», чтобы пересобрать диаграмму.");
}

function renderAll() {
  selectedNodeId = state.nodes.some((node) => node.id === selectedNodeId) ? selectedNodeId : getFirstEditableNodeId();
  state.selectedNodeId = selectedNodeId;
  hydrateTopFields();
  renderDiagram(dom.diagramSvg, { interactive: true, selectedId: selectedNodeId });
  renderModelList();
  renderProperties();
  renderAnalytics();
  renderOnboarding();
  renderClient();
  renderPresentation();
}

function renderDiagram(svg, options = {}) {
  const interactive = options.interactive !== false;
  const selectedId = options.selectedId || null;
  svg.innerHTML = "";

  const dimensions = getDiagramDimensions();
  svg.setAttribute("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);
  svg.setAttribute("width", String(dimensions.width));
  svg.setAttribute("height", String(dimensions.height));
  svg.style.width = `${dimensions.width * (interactive ? zoom : 0.76)}px`;
  svg.style.height = `${dimensions.height * (interactive ? zoom : 0.76)}px`;

  const defs = makeSvg("defs");
  const marker = makeSvg("marker", {
    id: interactive ? "arrow" : "arrow-presentation",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  });
  marker.appendChild(makeSvg("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#59655d" }));
  defs.appendChild(marker);
  svg.appendChild(defs);

  svg.appendChild(makeSvg("rect", {
    x: 0,
    y: 0,
    width: dimensions.width,
    height: dimensions.height,
    rx: 8,
    class: "canvas-border"
  }));

  state.lanes.forEach((lane, index) => {
    const y = laneY(index);
    svg.appendChild(makeSvg("rect", {
      x: 0,
      y,
      width: dimensions.width,
      height: LANE_H,
      class: "lane-bg"
    }));
    svg.appendChild(makeSvg("line", {
      x1: 0,
      y1: y,
      x2: dimensions.width,
      y2: y,
      class: "lane-border"
    }));
    svg.appendChild(textNode(lane.name, 20, y + 42, "lane-title"));
    svg.appendChild(textNode(lane.role || "Участник процесса", 20, y + 63, "lane-subtitle"));
    svg.appendChild(makeSvg("line", {
      x1: LANE_LABEL_W,
      y1: y,
      x2: LANE_LABEL_W,
      y2: y + LANE_H,
      class: "lane-border"
    }));
  });

  state.links.forEach((link) => {
    const from = getNode(link.from);
    const to = getNode(link.to);
    if (!from || !to) return;
    const path = makeSvg("path", {
      d: flowPath(from, to),
      class: `flow-path ${from.id === selectedId || to.id === selectedId ? "highlight" : ""}`,
      "marker-end": `url(#${interactive ? "arrow" : "arrow-presentation"})`
    });
    svg.appendChild(path);
    const labelPoint = flowLabelPoint(from, to);
    if (link.label) {
      const label = textNode(link.label, labelPoint.x, labelPoint.y, "flow-label");
      label.setAttribute("text-anchor", "middle");
      svg.appendChild(label);
    }
  });

  state.nodes.forEach((node) => {
    const group = makeSvg("g", {
      class: `node-group node-${node.type}${node.id === selectedId ? " selected" : ""}`,
      transform: `translate(${node.x}, ${node.y})`,
      "data-node-id": node.id,
      "aria-label": `${typeLabels[node.type] || "Элемент"}: ${node.label}`
    });

    group.appendChild(shapeForNode(node));
    appendNodeText(group, node);

    if (interactive) {
      group.addEventListener("pointerdown", (event) => onNodePointerDown(event, node.id));
      group.addEventListener("click", (event) => {
        event.stopPropagation();
        selectNode(node.id);
      });
      group.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openInlineEditor(node.id);
      });
      if (node.id === selectedId) {
        group.appendChild(makeResizeHandle(node));
      }
    }

    svg.appendChild(group);
  });

  if (interactive) {
    svg.addEventListener("click", () => {
      selectNode(null);
      closeInlineEditor();
    });
  }
}

function shapeForNode(node) {
  if (node.type === "start" || node.type === "end") {
    const size = getNodeSize(node);
    return makeSvg("ellipse", {
      cx: size.w / 2,
      cy: size.h / 2,
      rx: size.w / 2 - 4,
      ry: size.h / 2 - 4,
      class: "node-shape"
    });
  }

  if (node.type === "gateway") {
    const size = getNodeSize(node);
    const points = `${size.w / 2},3 ${size.w - 3},${size.h / 2} ${size.w / 2},${size.h - 3} 3,${size.h / 2}`;
    return makeSvg("polygon", { points, class: "node-shape" });
  }

  if (node.type === "data") {
    const size = getNodeSize(node);
    const d = `M4 4 H${size.w - 28} L${size.w - 4} 28 V${size.h - 4} H4 Z M${size.w - 28} 4 V28 H${size.w - 4}`;
    return makeSvg("path", { d, class: "node-shape" });
  }

  if (node.type === "metric") {
    const size = getNodeSize(node);
    const points = `18,4 ${size.w - 18},4 ${size.w - 4},${size.h / 2} ${size.w - 18},${size.h - 4} 18,${size.h - 4} 4,${size.h / 2}`;
    return makeSvg("polygon", { points, class: "node-shape" });
  }

  const size = getNodeSize(node);
  return makeSvg("rect", {
    x: 0,
    y: 0,
    width: size.w,
    height: size.h,
    rx: 8,
    class: "node-shape"
  });
}

function appendNodeText(group, node) {
  const size = getNodeSize(node);
  const centerX = size.w / 2;
  const labelCapacity = Math.max(8, Math.floor((size.w - 28) / 7));
  const maxLabelLines = Math.max(2, Math.min(5, Math.floor((size.h - 42) / 15)));
  const label = makeSvg("text", {
    x: centerX,
    y: node.type === "gateway" ? Math.max(34, size.h * 0.34) : node.type === "start" || node.type === "end" ? Math.max(32, size.h * 0.38) : 25,
    class: "node-label",
    "text-anchor": "middle"
  });

  const linesForLabel = wrapText(node.label, labelCapacity, maxLabelLines);
  linesForLabel.forEach((line, index) => {
    const tspan = makeSvg("tspan", {
      x: centerX,
      dy: index === 0 ? 0 : 15
    });
    tspan.textContent = index < linesForLabel.length - 1 ? `${line} ` : line;
    label.appendChild(tspan);
  });
  group.appendChild(label);

  const meta = makeSvg("text", {
    x: centerX,
    y: size.h - 27,
    class: "node-meta",
    "text-anchor": "middle"
  });
  meta.textContent = typeLabels[node.type] || "Элемент";
  group.appendChild(meta);

  const kpi = makeSvg("text", {
    x: centerX,
    y: size.h - 12,
    class: "node-kpi",
    "text-anchor": "middle"
  });
  kpi.textContent = truncate(node.kpi || "KPI не задан", node.type === "gateway" ? 18 : 24);
  group.appendChild(kpi);
}

function makeResizeHandle(node) {
  const size = getNodeSize(node);
  const handle = makeSvg("rect", {
    x: size.w - 14,
    y: size.h - 14,
    width: 12,
    height: 12,
    rx: 3,
    class: "resize-handle",
    "aria-label": "Изменить размер элемента"
  });
  handle.addEventListener("pointerdown", (event) => onResizePointerDown(event, node.id));
  return handle;
}

function renderModelList() {
  dom.modelList.innerHTML = "";
  state.nodes.forEach((node, index) => {
    const item = document.createElement("button");
    item.className = `model-item${node.id === selectedNodeId ? " active" : ""}`;
    item.type = "button";
    item.innerHTML = `
      <small>${index + 1}. ${escapeHtml(typeLabels[node.type] || "Элемент")} · ${escapeHtml(getLaneName(node.laneId))}</small>
      <strong>${escapeHtml(node.label)}</strong>
      <p>${escapeHtml(truncate(node.output || node.result || "Результат не задан", 82))}</p>
    `;
    item.addEventListener("click", () => {
      selectNode(node.id);
      setTab("left", "properties");
    });
    dom.modelList.appendChild(item);
  });
}

function renderProperties() {
  const node = getNode(selectedNodeId);
  if (!node) {
    dom.propertiesPane.className = "properties-empty";
    dom.propertiesPane.textContent = "Выберите элемент на диаграмме, чтобы редактировать действие, KPI, результат и onboarding-заметки.";
    return;
  }

  const fragment = dom.propertyTemplate.content.cloneNode(true);
  const form = fragment.querySelector(".property-form");
  fragment.querySelectorAll("[data-prop]").forEach((field) => {
    const prop = field.dataset.prop;
    if (field.hasAttribute("data-lane-select")) {
      state.lanes.forEach((lane) => {
        const option = document.createElement("option");
        option.value = lane.id;
        option.textContent = lane.name;
        field.appendChild(option);
      });
    }
    if (prop === "width" || prop === "height") {
      const size = getNodeSize(node);
      field.value = prop === "width" ? size.w : size.h;
    } else {
      field.value = node[prop] || "";
    }
    field.addEventListener("input", () => updateNodeProperty(node.id, prop, field.value));
    field.addEventListener("change", () => updateNodeProperty(node.id, prop, field.value));
  });

  const linkTargetSelect = fragment.getElementById("linkTargetSelect");
  state.nodes
    .filter((candidate) => candidate.id !== node.id)
    .forEach((candidate) => {
      const option = document.createElement("option");
      option.value = candidate.id;
      option.textContent = `${typeLabels[candidate.type]} · ${candidate.label}`;
      linkTargetSelect.appendChild(option);
    });

  fragment.getElementById("addLinkButton").addEventListener("click", () => {
    addLink(node.id, linkTargetSelect.value);
  });

  fragment.getElementById("deleteNodeButton").addEventListener("click", () => {
    deleteNode(node.id);
  });

  dom.propertiesPane.className = "";
  dom.propertiesPane.innerHTML = "";
  dom.propertiesPane.appendChild(form);
}

function renderAnalytics() {
  const analytics = calculateAnalytics();
  dom.scoreValue.textContent = String(analytics.score);
  dom.scoreRing.style.setProperty("--score-deg", `${analytics.score * 3.6}deg`);

  dom.metricsGrid.innerHTML = "";
  analytics.metrics.forEach((metric) => {
    const tile = document.createElement("div");
    tile.className = "metric-tile";
    tile.innerHTML = `<strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span>`;
    dom.metricsGrid.appendChild(tile);
  });

  dom.recommendationsList.innerHTML = "";
  analytics.recommendations.forEach((item) => {
    const recommendation = document.createElement("article");
    recommendation.className = "recommendation";
    recommendation.dataset.severity = item.severity;
    recommendation.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p>`;
    dom.recommendationsList.appendChild(recommendation);
  });

  dom.resultFeed.innerHTML = "";
  getActionNodes().forEach((node, index) => {
    const result = document.createElement("article");
    result.className = "result-card";
    result.innerHTML = `
      <small>${index + 1}. ${escapeHtml(getLaneName(node.laneId))} · KPI: ${escapeHtml(node.kpi || "не задан")}</small>
      <strong>${escapeHtml(node.label)}</strong>
      <p>${escapeHtml(node.result || node.output || "Аналитика результата не задана.")}</p>
    `;
    dom.resultFeed.appendChild(result);
  });
}

function calculateAnalytics() {
  const actions = getActionNodes();
  const count = Math.max(actions.length, 1);
  const kpiCoverage = ratio(actions.filter((node) => node.kpi).length, count);
  const resultCoverage = ratio(actions.filter((node) => node.result || node.output).length, count);
  const riskCoverage = ratio(actions.filter((node) => node.risk).length, count);
  const ownerCoverage = ratio(actions.filter((node) => node.owner || getLaneName(node.laneId)).length, count);
  const onboardingCoverage = ratio(actions.filter((node) => node.onboarding).length, count);
  const flowCoverage = ratio(state.links.length, Math.max(state.nodes.length - 1, 1));
  const handoffs = countHandoffs();
  const score = Math.min(100, Math.round(
    kpiCoverage * 20 +
    resultCoverage * 20 +
    riskCoverage * 15 +
    ownerCoverage * 15 +
    onboardingCoverage * 15 +
    flowCoverage * 15
  ));

  const recommendations = [];
  if (score >= 90) {
    recommendations.push({
      severity: "good",
      title: "Модель готова для демонстрации",
      text: "У процесса есть роли, связи, результаты, KPI, риски и onboarding-логика. Можно переводить в клиентский формат."
    });
  }
  if (kpiCoverage < 0.85) {
    recommendations.push({
      severity: "high",
      title: "Усилить измеримость",
      text: "Добавьте KPI к каждому ключевому действию: время, качество, конверсия, готовность данных или удовлетворенность."
    });
  }
  if (riskCoverage < 0.85) {
    recommendations.push({
      severity: "medium",
      title: "Зафиксировать контрольные точки",
      text: "Для действий без риска добавьте контроль: что может остановить процесс и кто снимает блокер."
    });
  }
  if (handoffs > actions.length * 0.6) {
    recommendations.push({
      severity: "medium",
      title: "Проверить handoff между ролями",
      text: "Много переходов между дорожками. Убедитесь, что каждый handoff имеет вход, выход и ответственного."
    });
  }
  if (state.lanes.length < 3) {
    recommendations.push({
      severity: "medium",
      title: "Разделить ответственность",
      text: "Для понятной BPM-карты обычно нужны минимум инициатор, исполнитель и принимающая сторона."
    });
  }
  if (!recommendations.length) {
    recommendations.push({
      severity: "good",
      title: "Критичных пробелов нет",
      text: "Следующий профессиональный шаг: провести воркшоп с владельцами дорожек и подтвердить KPI на реальных данных."
    });
  }

  return {
    score,
    metrics: [
      { label: "действий", value: String(actions.length) },
      { label: "ролей", value: String(state.lanes.length) },
      { label: "KPI покрытие", value: `${Math.round(kpiCoverage * 100)}%` },
      { label: "handoff", value: String(handoffs) }
    ],
    recommendations,
    kpiCoverage,
    resultCoverage,
    riskCoverage,
    ownerCoverage,
    onboardingCoverage,
    handoffs
  };
}

function renderOnboarding() {
  const actions = getActionNodes();
  dom.onboardingTitle.textContent = `Онбординг: ${state.title}`;
  dom.onboardingSummary.textContent = `${actions.length} учебных шагов, ${state.lanes.length} ролей, владелец: ${state.owner || "не указан"}.`;
  dom.onboardingList.innerHTML = "";
  actions.forEach((node, index) => {
    const step = document.createElement("article");
    step.className = "onboarding-step";
    step.dataset.step = String(index + 1);
    step.innerHTML = `
      <small>${escapeHtml(getLaneName(node.laneId))} · ${escapeHtml(node.sla || "SLA уточняется")}</small>
      <strong>${escapeHtml(node.label)}</strong>
      <p>${escapeHtml(node.onboarding || "Объяснить вход, ожидаемый выход и критерий приемки результата.")}</p>
    `;
    dom.onboardingList.appendChild(step);
  });
}

function renderClient() {
  const slides = buildSlides();
  activeSlide = Math.min(activeSlide, slides.length - 1);
  dom.slideSelector.innerHTML = "";
  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `slide-pill${index === activeSlide ? " active" : ""}`;
    button.textContent = `${index + 1}. ${slide.title}`;
    button.addEventListener("click", () => {
      activeSlide = index;
      renderClient();
      renderPresentation();
    });
    dom.slideSelector.appendChild(button);
  });

  const slide = slides[activeSlide];
  dom.clientSlide.innerHTML = `
    <h3>${escapeHtml(slide.title)}</h3>
    <p>${escapeHtml(slide.body)}</p>
    <ul>${slide.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
  `;
}

function buildSlides() {
  const actions = getActionNodes();
  const analytics = calculateAnalytics();
  const topKpis = actions.map((node) => node.kpi).filter(Boolean).slice(0, 4);
  const stageBullets = actions.slice(0, 6).map((node) => `${getLaneName(node.laneId)}: ${node.label} -> ${node.output || "результат шага"}`);
  const riskBullets = actions.filter((node) => node.risk).slice(0, 4).map((node) => `${node.label}: ${node.risk}`);

  return [
    {
      title: "Зачем нужен процесс",
      body: state.brief.goal || "Процесс связывает участников, действия и измеримые результаты в единую управляемую модель.",
      bullets: [
        `Триггер: ${state.brief.trigger || "задан в BPM-модели"}`,
        `Целевой результат: ${state.brief.outcome || "измеримый бизнес-результат"}`,
        `Владелец: ${state.owner || "владелец процесса"}`
      ]
    },
    {
      title: "Как устроен маршрут",
      body: "BPM-карта показывает последовательность действий, ответственных и точки передачи результата между ролями.",
      bullets: stageBullets.length ? stageBullets : ["Добавьте действия, чтобы сформировать маршрут процесса."]
    },
    {
      title: "Как измеряем успех",
      body: "Для каждого действия задан ожидаемый результат, а модель подсвечивает качество управления процессом.",
      bullets: [
        `Готовность модели: ${analytics.score}%`,
        `Покрытие KPI: ${Math.round(analytics.kpiCoverage * 100)}%`,
        ...(topKpis.length ? topKpis.map((kpi) => `KPI: ${kpi}`) : ["KPI требуют уточнения"])
      ]
    },
    {
      title: "Риски и контроль",
      body: "Клиентская версия фиксирует не только красивую схему, но и управленческие контрольные точки.",
      bullets: riskBullets.length ? riskBullets : ["Добавьте риски к действиям, чтобы усилить контроль процесса."]
    },
    {
      title: "План внедрения",
      body: "Онбординг превращает диаграмму в последовательность обучения и приемки изменений.",
      bullets: actions.slice(0, 5).map((node, index) => `${index + 1}. ${node.onboarding || node.label}`)
    }
  ];
}

function renderPresentation() {
  if (!dom.presentationSvg) return;
  dom.presentationTitle.textContent = state.title;
  const slides = buildSlides();
  const slide = slides[activeSlide] || slides[0];
  dom.presentationCopy.innerHTML = `
    <h3>${escapeHtml(slide.title)}</h3>
    <p>${escapeHtml(slide.body)}</p>
    <ul>${slide.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
  `;
  renderDiagram(dom.presentationSvg, { interactive: false, selectedId: null });
}

function updateNodeProperty(nodeId, prop, value) {
  const node = getNode(nodeId);
  if (!node) return;
  if (prop === "width") {
    node.width = clampSize(value, NODE_MIN_W, NODE_MAX_W);
  } else if (prop === "height") {
    node.height = clampSize(value, NODE_MIN_H, NODE_MAX_H);
  } else {
    node[prop] = value;
  }
  if (prop === "laneId") {
    const laneIndex = Math.max(0, state.lanes.findIndex((lane) => lane.id === value));
    node.y = laneY(laneIndex) + 44;
  }
  state.updatedAt = new Date().toISOString();
  renderDiagram(dom.diagramSvg, { interactive: true, selectedId: selectedNodeId });
  positionInlineEditor(node);
  renderModelList();
  renderAnalytics();
  renderOnboarding();
  renderClient();
  renderPresentation();
  scheduleSave();
}

function addNode(type) {
  const selected = getNode(selectedNodeId);
  const laneId = selected?.laneId || state.lanes[0]?.id || "lane-1";
  const laneIndex = Math.max(0, state.lanes.findIndex((lane) => lane.id === laneId));
  const maxX = Math.max(...state.nodes.map((node) => node.x), LANE_LABEL_W + 220);
  const node = {
    id: uid(type),
    type,
    label: defaultByType[type] || "Элемент",
    laneId,
    description: "",
    owner: getLaneName(laneId),
    input: "Вход шага",
    output: "Результат шага",
    sla: "Уточнить",
    kpi: inferKpi(defaultByType[type] || "", "", type),
    result: "Опишите измеримый результат действия.",
    risk: inferRisk(defaultByType[type] || "", type),
    onboarding: "Опишите, что должен понять участник на онбординге.",
    width: defaultSizeForType(type).w,
    height: defaultSizeForType(type).h,
    x: selected ? selected.x + STEP_GAP : maxX + STEP_GAP,
    y: laneY(laneIndex) + 44
  };
  state.nodes.push(node);
  if (selected && selected.id !== node.id) {
    addLink(selected.id, node.id, false);
  }
  selectedNodeId = node.id;
  state.selectedNodeId = node.id;
  renderAll();
  scheduleSave();
  setTab("left", "properties");
}

function addLink(from, to, shouldRender = true) {
  if (!from || !to || from === to) return;
  const exists = state.links.some((link) => link.from === from && link.to === to);
  if (!exists) {
    state.links.push({ id: uid("flow"), from, to, label: "связь" });
    scheduleSave();
  }
  if (shouldRender) {
    renderAll();
    showToast("Связь добавлена");
  }
}

function deleteNode(nodeId) {
  const node = getNode(nodeId);
  if (!node) return;
  if (node.type === "start" || node.type === "end") {
    showToast("Старт и финиш лучше оставить в BPM-модели");
    return;
  }
  state.nodes = state.nodes.filter((candidate) => candidate.id !== nodeId);
  state.links = state.links.filter((link) => link.from !== nodeId && link.to !== nodeId);
  selectedNodeId = getFirstEditableNodeId();
  renderAll();
  scheduleSave();
  showToast("Элемент удален");
}

function layoutModel() {
  const laneCounts = new Map();
  state.nodes.forEach((node, index) => {
    const laneIndex = Math.max(0, state.lanes.findIndex((lane) => lane.id === node.laneId));
    const count = laneCounts.get(node.laneId) || 0;
    laneCounts.set(node.laneId, count + 1);
    if (node.type === "start") {
      node.x = LANE_LABEL_W + 40;
    } else if (node.type === "end") {
      node.x = LANE_LABEL_W + 260 + Math.max(1, state.nodes.length - 2) * STEP_GAP;
    } else {
      node.x = LANE_LABEL_W + 260 + Math.max(index - 1, count) * STEP_GAP;
    }
    node.y = laneY(laneIndex) + 44;
  });
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  state.selectedNodeId = nodeId;
  renderDiagram(dom.diagramSvg, { interactive: true, selectedId: selectedNodeId });
  renderModelList();
  renderProperties();
}

function openInlineEditor(nodeId) {
  const node = getNode(nodeId);
  if (!node) return;
  selectedNodeId = nodeId;
  state.selectedNodeId = nodeId;
  setTab("left", "properties");
  renderDiagram(dom.diagramSvg, { interactive: true, selectedId: selectedNodeId });
  renderModelList();
  renderProperties();
  const size = getNodeSize(node);

  dom.inlineEditor.innerHTML = `
    <div class="inline-editor-header">
      <strong>Редактирование элемента</strong>
      <button class="icon-button inline-editor-close" type="button" aria-label="Закрыть редактор" title="Закрыть">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <label class="field">
      <span>Текст на диаграмме</span>
      <input data-inline-prop="label" type="text" value="${escapeHtml(node.label || "")}" />
    </label>
    <div class="two-fields">
      <label class="field">
        <span>Ширина</span>
        <input data-inline-prop="width" type="number" min="${NODE_MIN_W}" max="${NODE_MAX_W}" step="4" value="${size.w}" />
      </label>
      <label class="field">
        <span>Высота</span>
        <input data-inline-prop="height" type="number" min="${NODE_MIN_H}" max="${NODE_MAX_H}" step="4" value="${size.h}" />
      </label>
    </div>
    <div class="two-fields">
      <label class="field">
        <span>Входные данные</span>
        <input data-inline-prop="input" type="text" value="${escapeHtml(node.input || "")}" />
      </label>
      <label class="field">
        <span>Выход / результат</span>
        <input data-inline-prop="output" type="text" value="${escapeHtml(node.output || "")}" />
      </label>
    </div>
    <div class="two-fields">
      <label class="field">
        <span>KPI</span>
        <input data-inline-prop="kpi" type="text" value="${escapeHtml(node.kpi || "")}" />
      </label>
      <label class="field">
        <span>SLA</span>
        <input data-inline-prop="sla" type="text" value="${escapeHtml(node.sla || "")}" />
      </label>
    </div>
    <label class="field">
      <span>Описание / данные шага</span>
      <textarea data-inline-prop="description" rows="3">${escapeHtml(node.description || "")}</textarea>
    </label>
    <details>
      <summary>Результат, риски и онбординг</summary>
      <label class="field">
        <span>Аналитика результата</span>
        <textarea data-inline-prop="result" rows="3">${escapeHtml(node.result || "")}</textarea>
      </label>
      <label class="field">
        <span>Риски и контроль</span>
        <textarea data-inline-prop="risk" rows="3">${escapeHtml(node.risk || "")}</textarea>
      </label>
      <label class="field">
        <span>Онбординг</span>
        <textarea data-inline-prop="onboarding" rows="3">${escapeHtml(node.onboarding || "")}</textarea>
      </label>
    </details>
  `;

  dom.inlineEditor.hidden = false;
  dom.inlineEditor.querySelector(".inline-editor-close").addEventListener("click", closeInlineEditor);
  dom.inlineEditor.querySelectorAll("[data-inline-prop]").forEach((field) => {
    field.addEventListener("input", () => {
      updateNodeProperty(nodeId, field.dataset.inlineProp, field.value);
      syncInlineSizeFields(nodeId);
    });
  });
  positionInlineEditor(node);
  dom.inlineEditor.querySelector("[data-inline-prop='label']")?.focus();
}

function closeInlineEditor() {
  if (!dom.inlineEditor) return;
  dom.inlineEditor.hidden = true;
  dom.inlineEditor.innerHTML = "";
}

function positionInlineEditor(node) {
  if (!node || !dom.inlineEditor || dom.inlineEditor.hidden) return;
  const size = getNodeSize(node);
  const left = 20 + (node.x + size.w + 16) * zoom;
  const top = 20 + Math.max(LANE_TOP, node.y - 10) * zoom;
  dom.inlineEditor.style.left = `${left}px`;
  dom.inlineEditor.style.top = `${top}px`;
}

function syncInlineSizeFields(nodeId) {
  const node = getNode(nodeId);
  if (!node || dom.inlineEditor.hidden) return;
  const size = getNodeSize(node);
  const width = dom.inlineEditor.querySelector("[data-inline-prop='width']");
  const height = dom.inlineEditor.querySelector("[data-inline-prop='height']");
  if (width && document.activeElement !== width) width.value = size.w;
  if (height && document.activeElement !== height) height.value = size.h;
}

function onNodePointerDown(event, nodeId) {
  if (event.button !== 0) return;
  const node = getNode(nodeId);
  if (!node) return;
  const now = performance.now();
  if (lastNodePointerDown.nodeId === nodeId && now - lastNodePointerDown.time < DOUBLE_CLICK_WINDOW_MS) {
    lastNodePointerDown = { nodeId: null, time: 0 };
    drag = null;
    openInlineEditor(nodeId);
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  lastNodePointerDown = { nodeId, time: now };
  const point = getSvgPoint(event, dom.diagramSvg);
  drag = {
    nodeId,
    dx: point.x - node.x,
    dy: point.y - node.y,
    moved: false
  };
  selectNode(nodeId);
  closeInlineEditor();
  event.preventDefault();
  event.stopPropagation();
}

function onResizePointerDown(event, nodeId) {
  if (event.button !== 0) return;
  const node = getNode(nodeId);
  if (!node) return;
  const point = getSvgPoint(event, dom.diagramSvg);
  const size = getNodeSize(node);
  drag = {
    mode: "resize",
    nodeId,
    startX: point.x,
    startY: point.y,
    startWidth: size.w,
    startHeight: size.h,
    moved: false
  };
  selectedNodeId = nodeId;
  state.selectedNodeId = nodeId;
  closeInlineEditor();
  event.preventDefault();
  event.stopPropagation();
}

function onPointerMove(event) {
  if (!drag) return;
  const node = getNode(drag.nodeId);
  if (!node) return;
  const point = getSvgPoint(event, dom.diagramSvg);
  if (drag.mode === "resize") {
    node.width = clampSize(drag.startWidth + point.x - drag.startX, NODE_MIN_W, NODE_MAX_W);
    node.height = clampSize(drag.startHeight + point.y - drag.startY, NODE_MIN_H, NODE_MAX_H);
  } else {
    node.x = Math.max(LANE_LABEL_W + 12, point.x - drag.dx);
    node.y = Math.max(LANE_TOP + 8, point.y - drag.dy);
    const laneIndex = Math.max(0, Math.min(state.lanes.length - 1, Math.floor((node.y - LANE_TOP) / LANE_H)));
    node.laneId = state.lanes[laneIndex]?.id || node.laneId;
  }
  drag.moved = true;
  renderDiagram(dom.diagramSvg, { interactive: true, selectedId: selectedNodeId });
}

function onPointerUp() {
  if (!drag) return;
  drag = null;
  renderProperties();
  renderAnalytics();
  renderOnboarding();
  renderClient();
  renderPresentation();
  scheduleSave();
}

function getSvgPoint(event, svg) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function setTab(side, tab) {
  const tabAttr = side === "left" ? "data-left-tab" : "data-right-tab";
  const paneAttr = side === "left" ? "data-left-pane" : "data-right-pane";
  document.querySelectorAll(`[${tabAttr}]`).forEach((button) => {
    button.classList.toggle("active", button.getAttribute(tabAttr) === tab);
  });
  document.querySelectorAll(`[${paneAttr}]`).forEach((pane) => {
    pane.classList.toggle("active", pane.getAttribute(paneAttr) === tab);
  });
}

function setPresentationMode(enabled) {
  document.body.classList.toggle("presentation-mode", enabled);
  if (enabled) {
    renderPresentation();
    setAgentMessage("Открыта презентационная версия: она использует ту же рабочую BPM-модель, но показывает ее как историю для клиента или онбординга.");
  }
}

function setZoom(nextZoom) {
  zoom = Math.max(0.55, Math.min(1.5, Number(nextZoom.toFixed(2))));
  renderDiagram(dom.diagramSvg, { interactive: true, selectedId: selectedNodeId });
}

function runAgentCommand() {
  const command = dom.agentCommandInput.value.trim().toLowerCase();
  if (!command) return;
  let response = "";
  if (/риск|контрол|блок/i.test(command)) {
    getActionNodes().forEach((node) => {
      if (!node.risk || /не определены/i.test(node.risk)) node.risk = inferRisk(node.label, node.type);
    });
    response = "Я усилил риски и контрольные точки там, где они были слабо описаны.";
  } else if (/kpi|метрик|измер/i.test(command)) {
    getActionNodes().forEach((node) => {
      if (!node.kpi) node.kpi = inferKpi(node.label, node.output, node.type);
    });
    response = "Я добавил измеримые KPI к действиям без метрик.";
  } else if (/онбор|обуч|инструк/i.test(command)) {
    getActionNodes().forEach((node) => {
      node.onboarding = node.onboarding || `Объяснить участнику ${getLaneName(node.laneId)} вход, выход, SLA и критерий приемки для шага «${node.label}».`;
    });
    setTab("right", "onboarding");
    response = "Я подготовил onboarding-заметки по каждому действию и открыл раздел внедрения.";
  } else if (/клиент|презент|слайд|pdf/i.test(command)) {
    state.audience = "client";
    dom.audienceSelect.value = "client";
    setTab("right", "client");
    response = "Я переключил фокус на клиентскую версию: слайды собираются из цели, маршрута, KPI, рисков и плана внедрения.";
  } else if (/упрост|понят|корот/i.test(command)) {
    getActionNodes().forEach((node) => {
      node.label = truncate(node.label.replace(/^(Провести|Выполнить|Подготовить)\s+/i, ""), 56);
    });
    response = "Я укоротил формулировки действий, чтобы схема легче читалась в презентации.";
  } else {
    response = buildReviewMessage(calculateAnalytics());
  }
  dom.agentCommandInput.value = "";
  setAgentMessage(response);
  renderAll();
  scheduleSave();
}

function buildReviewMessage(analytics) {
  const main = analytics.recommendations[0];
  return `Консультантская проверка: готовность ${analytics.score}%. ${main.title}. ${main.text}`;
}

function setAgentMessage(message) {
  dom.agentMessage.textContent = message;
}

function createNewProject() {
  const ok = window.confirm("Создать новую модель? Текущая версия уже сохранена локально, но несохраненный импорт лучше экспортировать в JSON.");
  if (!ok) return;
  state = createModelFromTemplate("custom");
  selectedNodeId = state.selectedNodeId;
  activeSlide = 0;
  hydrateBriefFields();
  renderAll();
  persist("Создана новая BPM-модель");
}

function persist(message = "Сохранено") {
  try {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    dom.saveStatus.textContent = message;
    dom.saveStatus.style.background = "var(--accent-soft)";
  } catch (error) {
    dom.saveStatus.textContent = "Не удалось сохранить";
    dom.saveStatus.style.background = "#fff0f0";
    console.error(error);
  }
}

function scheduleSave() {
  dom.saveStatus.textContent = "Есть изменения";
  dom.saveStatus.style.background = "#fff8e6";
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => persist("Автосохранено"), 650);
}

function exportJson() {
  persist("Экспорт подготовлен");
  download(`${fileSafe(state.title)}.bpm-agent.json`, "application/json", JSON.stringify(state, null, 2));
  showToast("JSON-файл модели экспортирован");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = normalizeModel(JSON.parse(String(reader.result)));
      selectedNodeId = state.selectedNodeId || getFirstEditableNodeId();
      hydrateBriefFields();
      renderAll();
      persist("Импорт сохранен");
      showToast("BPM-модель импортирована");
    } catch (error) {
      showToast("Не удалось импортировать JSON");
      console.error(error);
    } finally {
      dom.importInput.value = "";
    }
  };
  reader.readAsText(file);
}

function exportSvg() {
  const serialized = getCleanDiagramSvgString();
  download(`${fileSafe(state.title)}.svg`, "image/svg+xml", serialized);
  showToast("SVG-диаграмма экспортирована");
}

async function exportPng() {
  try {
    showToast("Готовлю полную PNG-диаграмму...");
    const { blob } = await renderDiagramToImageBlob("image/png", 2);
    downloadBlob(`${fileSafe(state.title)}.png`, blob);
    showToast("PNG полной диаграммы сохранен");
  } catch (error) {
    console.error(error);
    showToast("Не удалось экспортировать PNG");
  }
}

async function exportPdf() {
  try {
    showToast("Готовлю PDF для заказчика...");
    const rendered = await renderDiagramToImageBlob("image/jpeg", 2, 0.92);
    const imageBytes = await blobToUint8Array(rendered.blob);
    const pdfBlob = createPdfFromJpeg(rendered, imageBytes);
    downloadBlob(`${fileSafe(state.title)}.pdf`, pdfBlob);
    showToast("PDF полной диаграммы сохранен");
  } catch (error) {
    console.error(error);
    showToast("Не удалось экспортировать PDF");
  }
}

function getCleanDiagramSvgString() {
  const clone = dom.diagramSvg.cloneNode(true);
  clone.querySelectorAll(".resize-handle").forEach((handle) => handle.remove());
  clone.removeAttribute("style");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const style = makeSvg("style");
  style.textContent = SVG_EXPORT_STYLES;
  clone.insertBefore(style, clone.firstChild);
  return new XMLSerializer().serializeToString(clone);
}

async function renderDiagramToImageBlob(mimeType, scale = 2, quality = 0.92) {
  const serialized = getCleanDiagramSvgString();
  const width = Number(dom.diagramSvg.getAttribute("width")) || 1200;
  const height = Number(dom.diagramSvg.getAttribute("height")) || 800;
  const safeScale = Math.max(1, Math.min(scale, 8192 / Math.max(width, height)));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * safeScale);
  canvas.height = Math.round(height * safeScale);
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const image = await loadSvgImage(serialized);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("Canvas export returned empty data."));
    }, mimeType, quality);
  });

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    originalWidth: width,
    originalHeight: height
  };
}

function loadSvgImage(serialized) {
  const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to render SVG image."));
    };
    image.src = url;
  });
}

function createPdfFromJpeg(rendered, imageBytes) {
  const pageWidth = rendered.originalWidth;
  const pageHeight = rendered.originalHeight;
  const drawCommand = `q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im1 Do\nQ\n`;
  const objects = [];

  objects.push({ text: "<< /Type /Catalog /Pages 2 0 R >>" });
  objects.push({ text: "<< /Type /Pages /Kids [3 0 R] /Count 1 >>" });
  objects.push({ text: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>` });
  objects.push({
    header: `<< /Type /XObject /Subtype /Image /Width ${rendered.width} /Height ${rendered.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`,
    bytes: imageBytes,
    footer: "\nendstream"
  });
  objects.push({
    text: `<< /Length ${drawCommand.length} >>\nstream\n${drawCommand}endstream`
  });

  return new Blob([buildPdf(objects)], { type: "application/pdf" });
}

function buildPdf(objects) {
  const encoder = new TextEncoder();
  const chunks = [];
  let length = 0;
  const offsets = [0];

  const appendText = (text) => {
    const bytes = encoder.encode(text);
    chunks.push(bytes);
    length += bytes.length;
  };

  const appendBytes = (bytes) => {
    chunks.push(bytes);
    length += bytes.length;
  };

  appendText("%PDF-1.4\n");

  objects.forEach((object, index) => {
    offsets.push(length);
    appendText(`${index + 1} 0 obj\n`);
    if (object.bytes) {
      appendText(object.header);
      appendBytes(object.bytes);
      appendText(object.footer);
    } else {
      appendText(object.text);
    }
    appendText("\nendobj\n");
  });

  const xrefOffset = length;
  appendText(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
  offsets.slice(1).forEach((offset) => {
    appendText(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  appendText(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const output = new Uint8Array(length);
  let offset = 0;
  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.length;
  });
  return output;
}

async function blobToUint8Array(blob) {
  return new Uint8Array(await blob.arrayBuffer());
}

function download(filename, mime, content) {
  const blob = new Blob([content], { type: mime });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getDiagramDimensions() {
  const maxNodeX = Math.max(...state.nodes.map((node) => node.x + getNodeSize(node).w), 900);
  return {
    width: Math.max(1120, maxNodeX + 80),
    height: Math.max(720, LANE_TOP + state.lanes.length * LANE_H + 34)
  };
}

function getNodeSize(node) {
  const fallback = defaultSizeForType(node.type);
  return {
    w: clampSize(node.width || fallback.w, NODE_MIN_W, NODE_MAX_W),
    h: clampSize(node.height || fallback.h, NODE_MIN_H, NODE_MAX_H)
  };
}

function defaultSizeForType(type) {
  if (type === "start" || type === "end") return { w: EVENT_SIZE, h: EVENT_SIZE };
  if (type === "gateway") return { w: GATEWAY_SIZE, h: GATEWAY_SIZE };
  return { w: NODE_W, h: NODE_H };
}

function clampSize(value, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function getNode(id) {
  return state.nodes.find((node) => node.id === id);
}

function getActionNodes() {
  return state.nodes.filter((node) => node.type !== "start" && node.type !== "end");
}

function getFirstEditableNodeId() {
  return state.nodes.find((node) => node.type !== "start" && node.type !== "end")?.id || state.nodes[0]?.id || null;
}

function getLaneName(laneId) {
  return state.lanes.find((lane) => lane.id === laneId)?.name || "Без дорожки";
}

function countHandoffs() {
  return state.links.reduce((count, link) => {
    const from = getNode(link.from);
    const to = getNode(link.to);
    return from && to && from.laneId !== to.laneId ? count + 1 : count;
  }, 0);
}

function ratio(value, total) {
  return total ? value / total : 0;
}

function laneY(index) {
  return LANE_TOP + Math.max(0, index) * LANE_H;
}

function flowPath(from, to) {
  const start = attachPoint(from, "right");
  const end = attachPoint(to, "left");
  const distance = Math.max(80, Math.abs(end.x - start.x) * 0.45);
  const c1x = start.x + distance;
  const c2x = end.x - distance;
  return `M ${start.x} ${start.y} C ${c1x} ${start.y}, ${c2x} ${end.y}, ${end.x} ${end.y}`;
}

function flowLabelPoint(from, to) {
  const start = attachPoint(from, "right");
  const end = attachPoint(to, "left");
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2 - 12
  };
}

function attachPoint(node, side) {
  const size = getNodeSize(node);
  if (side === "right") return { x: node.x + size.w, y: node.y + size.h / 2 };
  if (side === "left") return { x: node.x, y: node.y + size.h / 2 };
  return { x: node.x + size.w / 2, y: node.y + size.h / 2 };
}

function makeSvg(tag, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) element.setAttribute(key, String(value));
  });
  return element;
}

function textNode(text, x, y, className) {
  const element = makeSvg("text", { x, y, class: className });
  element.textContent = text;
  return element;
}

function wrapText(text, maxChars, maxLines) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const linesOut = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      linesOut.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) linesOut.push(current);
  if (!linesOut.length) linesOut.push("Без названия");
  if (linesOut.length > maxLines) {
    const clipped = linesOut.slice(0, maxLines);
    clipped[maxLines - 1] = `${truncate(clipped[maxLines - 1], Math.max(5, maxChars - 1))}`;
    return clipped;
  }
  return linesOut;
}

function lines(text) {
  return String(text || "")
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function cleanLaneName(name) {
  return String(name || "")
    .replace(/^[-*•\d.]+\s*/, "")
    .trim();
}

function sentence(text) {
  const value = String(text || "").trim();
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function truncate(text, maxLength) {
  const value = String(text || "");
  return value.length > maxLength ? `${value.slice(0, Math.max(1, maxLength - 1))}…` : value;
}

function slugify(text) {
  const source = String(text || "")
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
  return source ? `lane-${source}` : "";
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function fileSafe(text) {
  return String(text || "bpm-model")
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "bpm-model";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2800);
}
