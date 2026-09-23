/**
 * CYBERCRIME — Digital Investigation
 * Grade 9 Digital Skills · Educational simulation (client-side only)
 */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, prefersReduced ? Math.min(ms, 80) : ms));

  /* ---------- DATA ---------- */
  const CASE_FILES = [
    {
      id: "CASE-01",
      en: "Hacking",
      ar: "الاختراق",
      explain: "الوصول غير المصرح به إلى نظام أو شبكة أو بيانات.",
      example: "شخص يحاول دخول حساب طالب بدون إذن.",
      safe: "استخدم كلمة مرور قوية وتفعيل التحقق بخطوتين.",
      visual: "UNAUTHORIZED ACCESS",
    },
    {
      id: "CASE-02",
      en: "Malware",
      ar: "البرمجيات الخبيثة",
      explain: "برامج ضارة تُثبَّت على الجهاز لإلحاق الضرر أو سرقة البيانات.",
      example: "تحميل ملف يبدو مفيداً ثم يعطّل الجهاز.",
      safe: "حمّل من مصادر موثوقة وفعّل برامج الحماية.",
      visual: "MALICIOUS CODE",
    },
    {
      id: "CASE-03",
      en: "Data Manipulation",
      ar: "التلاعب بالبيانات",
      explain: "تغيير أو حذف أو تزوير بيانات بصورة غير قانونية.",
      example: "تعديل درجات أو معلومات في نظام دون صلاحية.",
      safe: "احمِ الحسابات وراجع الصلاحيات بدقة.",
      visual: "ALTERED RECORDS",
    },
    {
      id: "CASE-04",
      en: "Phishing & Fraud",
      ar: "التصيد والاحتيال",
      explain: "خداع الضحية عبر رسائل أو مواقع مزيفة لسرقة معلومات.",
      example: "رسالة عاجلة تطلب الضغط على رابط لتأكيد الحساب.",
      safe: "لا تضغط روابط مشبوهة وتحقق من المرسل.",
      visual: "FAKE MESSAGE",
    },
    {
      id: "CASE-05",
      en: "Identity Theft",
      ar: "سرقة الهوية",
      explain: "استخدام بيانات شخص آخر لانتحال شخصيته رقمياً.",
      example: "إنشاء حساب باسم طالب آخر باستخدام بياناته.",
      safe: "لا تشارك بياناتك الشخصية الحساسة.",
      visual: "STOLEN IDENTITY",
    },
    {
      id: "CASE-06",
      en: "Ransomware",
      ar: "هجمات الفدية الرقمية",
      explain: "قفل الملفات أو النظام وطلب مقابل مقابل استعادتها.",
      example: "ظهور رسالة: ملفاتك مقفلة — ادفع لاستعادتها.",
      safe: "احتفظ بنسخ احتياطية وحدّث النظام.",
      visual: "FILES LOCKED",
    },
    {
      id: "CASE-07",
      en: "Cyber Extortion",
      ar: "الابتزاز الإلكتروني",
      explain: "تهديد شخص عبر الإنترنت لإجباره على فعل أو دفع شيء ما.",
      example: "تهديد بنشر صور أو معلومات خاصة مقابل مال.",
      safe: "لا تستجب للتهديد وأبلغ جهة موثوقة فوراً.",
      visual: "THREAT DEMAND",
    },
  ];

  const CHAIN_TEXT = {
    actor: "الجاني: الشخص الذي يرتكب الفعل غير القانوني.",
    tool: "الأداة الرقمية: جهاز أو برنامج أو شبكة تُستخدم في الجريمة.",
    action: "الفعل غير القانوني: ما يخالف أحكام القانون.",
    victim: "الضحية أو الهدف: شخص أو نظام أو بيانات تتعرض للضرر.",
  };

  const SHIELD = [
    { key: "password", label: "Strong Password", ar: "كلمة مرور قوية تصعّب اختراق الحساب." },
    { key: "2fa", label: "2FA", ar: "طبقة أمان إضافية تتحقق من هوية المستخدم." },
    { key: "updates", label: "Updates", ar: "التحديثات تسد ثغرات أمنية معروفة." },
    { key: "awareness", label: "Awareness", ar: "الوعي يساعدك على اكتشاف الرسائل والمواقع المشبوهة." },
    { key: "encryption", label: "Encryption", ar: "التشفير يحمي البيانات من الاطلاع غير المصرح." },
    { key: "backups", label: "Backups", ar: "نسخ احتياطية تساعد على استعادة البيانات عند فقدانها." },
    { key: "software", label: "Security Software", ar: "برامج الحماية تقلل خطر البرمجيات الخبيثة." },
  ];

  const PHISH_STEPS = [
    {
      bubble: "حسابك يتطلب تحققاً عاجلاً خلال ساعة لتفادي الإيقاف.",
      flow: "1. Attacker impersonates a trusted service",
    },
    {
      bubble: null,
      link: "verify-school-support.example-check.link/login",
      flow: "2. Sends a fake message",
    },
    {
      bubble: "الطلب يبدو عاجلاً جداً — وهذا مقصود.",
      flow: "3. Victim sees urgent request",
    },
    {
      bubble: "الضغط على الرابط يفتح صفحة دخول مزيفة (محاكاة).",
      flow: "4. Victim clicks the fake link",
    },
    {
      bubble: "تظهر واجهة تشبه صفحة الدخول… لكنها ليست رسمية.",
      flow: "5. Fake login page appears",
    },
    {
      bubble: "إدخال البيانات هنا يعني تسليمها للمحتال (محاكاة فقط).",
      flow: "6. Victim enters information",
    },
    {
      bubble: "النتيجة: سرقة المعلومات — لهذا نتعلم علامات الخطر.",
      flow: "7. Information is stolen",
    },
  ];

  const SCENES = [
    { tag: "SCENE 01", text: "وصلتك رسالة من «Secure Delivery» بخصوص طرد مدرسي." },
    { tag: "SCENE 02", text: "الرسالة تبدو عادية في البداية… اسم الخدمة مألوف." },
    { tag: "SCENE 03", text: "ثم يظهر طلب عاجل: أكّد بياناتك خلال 30 دقيقة أو يُلغى الطرد." },
    { tag: "SCENE 04", text: "تلاحظ رابطاً غريباً لا يشبه المواقع الرسمية." },
    { tag: "SCENE 05", text: "الآن قرارك: هل تضغط الرابط أم تتحقق؟" },
  ];

  const QUIZ = [
    {
      type: "SPOT THE RED FLAG",
      q: "You receive this message. What is the biggest red flag?",
      ar: "وصلك طلب عاجل جداً مع رابط غريب يطلب كلمة المرور. ما أكبر علامة خطر؟",
      options: [
        { en: "The message uses Arabic", ar: "الرسالة بالعربية", correct: false },
        { en: "Urgent demand + strange link + password request", ar: "استعجال + رابط غريب + طلب كلمة مرور", correct: true },
        { en: "It mentions school", ar: "تذكر المدرسة", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — ممتاز! لاحظت علامات التصيد.",
      bad: "Not this time — انظر إلى الاستعجال والرابط وطلب المعلومات الحساسة.",
    },
    {
      type: "IDENTIFY THE CRIME",
      q: "Which situation is Identity Theft?",
      ar: "أي موقف يمثل سرقة الهوية؟",
      options: [
        { en: "Someone creates an account using your personal details", ar: "شخص ينشئ حساباً ببياناتك الشخصية", correct: true },
        { en: "You forget your password", ar: "تنسى كلمة المرور", correct: false },
        { en: "You update your phone", ar: "تحدّث هاتفك", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — سرقة الهوية = استخدام بياناتك لانتحال شخصيتك.",
      bad: "Not this time — ابحث عن انتحال الشخصية باستخدام بياناتك.",
    },
    {
      type: "SAFE ACTION",
      q: "What should you do with a suspicious link?",
      ar: "ماذا تفعل مع رابط مشبوه؟",
      options: [
        { en: "Open it quickly to check", ar: "افتحه بسرعة للتحقق", correct: false },
        { en: "Stop → Check → Don't Click → Report", ar: "توقف ← تحقق ← لا تضغط ← أبلغ", correct: true },
        { en: "Forward it to everyone", ar: "أعد إرساله للجميع", correct: false },
      ],
      good: "✓ SAFE DECISION — هذا هو البروتوكول الآمن.",
      bad: "Not this time — لا تضغط. تحقق ثم أبلغ.",
    },
    {
      type: "IDENTIFY THE CRIME",
      q: "Which example represents Ransomware?",
      ar: "أي مثال يمثل هجمات الفدية الرقمية؟",
      options: [
        { en: "Files locked with a demand to restore access", ar: "ملفات مقفلة مع طلب مقابل لاستعادتها", correct: true },
        { en: "A friend sends a homework photo", ar: "صديق يرسل صورة واجب", correct: false },
        { en: "Changing your wallpaper", ar: "تغيير خلفية الشاشة", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — الفدية = قفل + طلب.",
      bad: "Not this time — تذكّر قفل الملفات والطلب.",
    },
    {
      type: "CHOOSE THE SAFER PASSWORD",
      q: "Which password is safer?",
      ar: "أي كلمة مرور أكثر أماناً؟",
      options: [
        { en: "12345678", ar: "سهلة التخمين", correct: false },
        { en: "MyName2024", ar: "قريبة من اسمك", correct: false },
        { en: "Long unique phrase + symbols (not shared)", ar: "عبارة طويلة فريدة مع رموز وغير مشتركة", correct: true },
      ],
      good: "✓ SAFE DECISION — القوة في الطول والفرادة وعدم المشاركة.",
      bad: "Not this time — تجنّب الأنماط الشائعة والأسماء.",
    },
    {
      type: "IDENTIFY THE CRIME",
      q: "Unauthorized access to a system is…",
      ar: "الوصول غير المصرح به إلى نظام هو…",
      options: [
        { en: "Hacking", ar: "الاختراق", correct: true },
        { en: "Backup", ar: "نسخ احتياطي", correct: false },
        { en: "2FA", ar: "التحقق بخطوتين", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — صحيح: الاختراق.",
      bad: "Not this time — راجع تعريف الاختراق.",
    },
    {
      type: "PREVENTION",
      q: "Which action best protects your account?",
      ar: "أي إجراء يحمي حسابك بشكل أفضل؟",
      options: [
        { en: "Share password with a friend «just in case»", ar: "مشاركة كلمة المرور مع صديق للاحتياط", correct: false },
        { en: "Enable 2FA + strong unique password", ar: "تفعيل 2FA + كلمة مرور قوية وفريدة", correct: true },
        { en: "Use the same password everywhere", ar: "نفس كلمة المرور في كل مكان", correct: false },
      ],
      good: "✓ SAFE DECISION — طبقات الحماية تعمل معاً.",
      bad: "Not this time — لا تشارك كلمات المرور، وفعّل 2FA.",
    },
    {
      type: "IDENTIFY THE CRIME",
      q: "A fake login page stealing credentials is…",
      ar: "صفحة دخول مزيفة تسرق البيانات تمثل…",
      options: [
        { en: "Phishing & Fraud", ar: "التصيد والاحتيال", correct: true },
        { en: "System update", ar: "تحديث نظام", correct: false },
        { en: "Encryption", ar: "تشفير", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — هذا قلب هجوم التصيد.",
      bad: "Not this time — التصيد يعتمد على الخداع المزيف.",
    },
    {
      type: "CYBER EXTORTION",
      q: "Someone threatens to publish private info unless you pay. This is…",
      ar: "شخص يهدد بنشر معلومات خاصة مقابل مال. هذا…",
      options: [
        { en: "Cyber Extortion", ar: "الابتزاز الإلكتروني", correct: true },
        { en: "A normal notification", ar: "إشعار عادي", correct: false },
        { en: "Software update", ar: "تحديث برنامج", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — لا تستجب وأبلغ جهة موثوقة.",
      bad: "Not this time — التهديد مقابل مال/فعل = ابتزاز.",
    },
    {
      type: "DATA MANIPULATION",
      q: "Illegally changing grades in a school system is…",
      ar: "تغيير الدرجات في نظام مدرسي بصورة غير قانونية هو…",
      options: [
        { en: "Data Manipulation", ar: "التلاعب بالبيانات", correct: true },
        { en: "Awareness", ar: "وعي", correct: false },
        { en: "Backup", ar: "نسخ احتياطي", correct: false },
      ],
      good: "✓ THREAT IDENTIFIED — تعديل غير قانوني للبيانات.",
      bad: "Not this time — التلاعب بالبيانات = تغيير/حذف/تزوير غير قانوني.",
    },
  ];

  /* ---------- STATE ---------- */
  const state = {
    section: 0,
    maxSection: 7,
    defRevealed: false,
    phishStep: 0,
    sceneStep: 0,
    scenarioDone: false,
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    safeDecisions: 0,
    totalDecisions: 0,
    introSkipped: false,
    introRunning: true,
  };

  /* ---------- INTRO SEQUENCE ---------- */
  async function playIntro() {
    const boot = $("#boot-line");
    const status = $("#status-lines");
    const alerts = $("#intro-alerts");
    const access = $("#access-denied");
    const compromised = $("#system-compromised");
    const hook = $("#intro-hook");

    const checkpoint = async (ms) => {
      await wait(ms);
      return state.introSkipped;
    };

    if (await checkpoint(900)) return;
    boot.textContent = "SYSTEM INITIALIZING...";
    if (await checkpoint(1100)) return;

    status.hidden = false;
    const lines = [
      { t: "[✓] Network", c: "ok" },
      { t: "[✓] Firewall", c: "ok" },
      { t: "[✓] Authentication", c: "ok" },
      { t: "[✓] Database", c: "ok" },
      { t: "[!] Suspicious Activity", c: "warn" },
      { t: "[!] Unauthorized Login", c: "warn" },
      { t: "[!!!] SECURITY BREACH", c: "crit" },
    ];

    for (let i = 0; i < lines.length; i++) {
      if (state.introSkipped) return;
      const li = document.createElement("li");
      li.textContent = lines[i].t;
      li.className = lines[i].c;
      li.style.animationDelay = "0s";
      status.appendChild(li);
      if (await checkpoint(420)) return;
    }

    if (await checkpoint(500)) return;
    boot.hidden = true;
    status.hidden = true;
    alerts.hidden = false;
    access.hidden = false;
    if (await checkpoint(1100)) return;
    access.hidden = true;
    compromised.hidden = false;
    if (await checkpoint(1400)) return;

    alerts.hidden = true;
    if (await checkpoint(600)) return;
    hook.hidden = false;
    state.introRunning = false;
  }

  function skipToHook() {
    state.introSkipped = true;
    state.introRunning = false;
    $("#boot-line").hidden = true;
    $("#status-lines").hidden = true;
    $("#intro-alerts").hidden = true;
    $("#intro-hook").hidden = false;
  }

  function startApp() {
    state.introSkipped = true;
    state.introRunning = false;
    const intro = $("#intro");
    intro.classList.add("is-leaving");
    setTimeout(() => {
      intro.hidden = true;
      $("#app").hidden = false;
      goToSection(0);
    }, prefersReduced ? 50 : 750);
  }

  /* ---------- NAVIGATION ---------- */
  function goToSection(index) {
    state.section = index;
    $$(".panel").forEach((p) => {
      const n = Number(p.dataset.panel);
      const active = n === index;
      p.classList.toggle("is-active", active);
      p.hidden = !active;
    });

    $$(".progress-nav__item").forEach((btn) => {
      const n = Number(btn.dataset.section);
      btn.classList.toggle("is-active", n === index && index <= 7);
      btn.classList.toggle("is-done", n < index && index <= 7);
    });

    const label = $("#progress-label");
    const nav = $(".progress-nav");
    if (index <= 7) {
      label.textContent = String(index + 1).padStart(2, "0") + " / 08";
      nav.style.display = "";
    } else {
      label.textContent = "COMPLETE";
      nav.style.display = index >= 8 ? "none" : "";
    }

    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }

  /* ---------- DEFINITION ---------- */
  async function revealDefinition() {
    if (state.defRevealed) return;
    state.defRevealed = true;
    const btn = $("#reveal-def-btn");
    btn.disabled = true;
    btn.textContent = "ANALYZING...";

    const chunks = $$("#def-chunks .def-chunk");
    for (const chunk of chunks) {
      chunk.hidden = false;
      await wait(50);
      chunk.classList.add("is-visible");
      await wait(700);
    }

    const full = $("#def-full");
    full.hidden = false;
    $("#crime-chain").hidden = false;
    $("#compare-block").hidden = false;
    btn.textContent = "DEFINITION LOCKED";
  }

  /* ---------- THREAT MAP ---------- */
  function buildThreatMap() {
    const map = $("#threat-map");
    map.innerHTML = "";
    CASE_FILES.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "case-file";
      btn.setAttribute("role", "listitem");
      btn.innerHTML = `
        <p class="case-id" dir="ltr">${c.id}</p>
        <h3 dir="ltr">${c.en}</h3>
        <p class="ar-name" dir="rtl">${c.ar}</p>
      `;
      btn.addEventListener("click", () => openCase(i, btn));
      map.appendChild(btn);
    });
  }

  function openCase(i, btn) {
    const c = CASE_FILES[i];
    $$(".case-file").forEach((el) => el.classList.remove("is-open"));
    btn.classList.add("is-open");
    const detail = $("#case-detail");
    detail.hidden = false;
    $("#case-id").textContent = c.id;
    $("#case-en").textContent = c.en;
    $("#case-ar").textContent = c.ar;
    $("#case-explain").textContent = c.explain;
    $("#case-example").textContent = c.example;
    $("#case-safe").textContent = c.safe;
    $("#case-visual").textContent = c.visual;
  }

  /* ---------- DEEP DIVE ---------- */
  function initLabs() {
    $$(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const lab = tab.dataset.lab;
        $$(".tab").forEach((t) => {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        $$(".lab").forEach((panel) => {
          const on = panel.id === "lab-" + lab;
          panel.classList.toggle("is-active", on);
          panel.hidden = !on;
        });
      });
    });

    $("#simulate-hack").addEventListener("click", () => {
      $("#hack-flow").classList.add("is-breach");
      $("#hack-result").hidden = false;
    });

    // Phishing
    renderPhishStep(0);
    $("#phish-next").addEventListener("click", () => {
      if (state.phishStep < PHISH_STEPS.length - 1) {
        state.phishStep += 1;
        renderPhishStep(state.phishStep);
      } else {
        $("#red-flags").hidden = false;
        $("#phish-next").disabled = true;
        $("#phish-next").textContent = "FLOW COMPLETE";
      }
    });

    // Ransomware
    $("#simulate-ransom").addEventListener("click", () => {
      $("#ransom-desktop").classList.add("is-locked");
      $("#ransom-warn").hidden = false;
      $("#reset-ransom").hidden = false;
    });
    $("#reset-ransom").addEventListener("click", () => {
      $("#ransom-desktop").classList.remove("is-locked");
      $("#ransom-warn").hidden = true;
      $("#reset-ransom").hidden = true;
    });
  }

  function renderPhishStep(step) {
    const chat = $("#phish-chat");
    chat.innerHTML = "";
    const flow = $("#attack-flow");
    flow.innerHTML = "";

    for (let i = 0; i <= step; i++) {
      const s = PHISH_STEPS[i];
      if (s.bubble) {
        const b = document.createElement("div");
        b.className = "bubble bubble--in ar";
        b.dir = "rtl";
        b.textContent = s.bubble;
        chat.appendChild(b);
      }
      if (s.link) {
        const link = document.createElement("div");
        link.className = "bubble bubble--in bubble--link";
        link.textContent = s.link;
        link.title = "Simulated fake link — not real";
        chat.appendChild(link);
      }
    }

    PHISH_STEPS.forEach((s, i) => {
      const li = document.createElement("li");
      li.textContent = s.flow;
      if (i <= step) li.classList.add("is-on");
      flow.appendChild(li);
    });

    if (step === PHISH_STEPS.length - 1) {
      $("#red-flags").hidden = false;
    }
  }

  /* ---------- SHIELD ---------- */
  function buildShield() {
    const box = $("#shield-points");
    box.innerHTML = "";
    // Percentage positions around the center
    const positions = [
      { top: "6%", left: "50%", transform: "translateX(-50%)" },
      { top: "22%", left: "8%" },
      { top: "22%", right: "8%" },
      { top: "48%", left: "2%" },
      { top: "48%", right: "2%" },
      { bottom: "12%", left: "18%" },
      { bottom: "12%", right: "18%" },
    ];

    SHIELD.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "shield-point";
      btn.dir = "ltr";
      btn.textContent = item.label;
      Object.assign(btn.style, positions[i]);
      btn.addEventListener("click", () => {
        $$(".shield-point").forEach((p) => p.classList.remove("is-active"));
        btn.classList.add("is-active");
        $("#shield-explain").textContent = item.ar;
      });
      box.appendChild(btn);
    });
  }

  /* ---------- SCENARIO ---------- */
  function initScenario() {
    renderScene(0);
    $("#scene-next").addEventListener("click", () => {
      if (state.sceneStep < SCENES.length - 1) {
        state.sceneStep += 1;
        renderScene(state.sceneStep);
        if (state.sceneStep === SCENES.length - 1) {
          $("#scene-next").hidden = true;
          $("#scene-decision").hidden = false;
        }
      }
    });

    $$("#scene-decision [data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const choice = btn.dataset.choice;
        const feedback = $("#decision-feedback");
        feedback.hidden = false;
        state.totalDecisions += 1;

        const messages = {
          open: {
            bad: true,
            text: "فتح الرابط خطر. في التصيد، الضغط قد يوصل إلى صفحة مزيفة. الأفضل: تحقق ثم أبلغ.",
          },
          check: {
            bad: false,
            text: "قرار ممتاز! التحقق من المرسل والرابط قبل أي إجراء يحميك.",
          },
          report: {
            bad: false,
            text: "ممتاز! الإبلاغ يساعد على حماية الآخرين أيضاً.",
          },
          ignore: {
            bad: false,
            text: "تجاهل الروابط المشبوهة مفيد — والأفضل أيضاً التحقق/الإبلاغ إن أمكن.",
          },
        };

        const m = messages[choice];
        feedback.textContent = m.text;
        feedback.classList.toggle("is-bad", m.bad);
        if (!m.bad) state.safeDecisions += 1;

        state.scenarioDone = true;
        $("#to-mission").disabled = false;
        $$("#scene-decision [data-choice]").forEach((b) => (b.disabled = true));
      });
    });
  }

  function renderScene(i) {
    const s = SCENES[i];
    $("#scene-tag").textContent = s.tag;
    $("#scene-text").textContent = s.text;
  }

  /* ---------- QUIZ ---------- */
  function initQuiz() {
    $("#start-quiz").addEventListener("click", () => {
      state.quizIndex = 0;
      state.quizScore = 0;
      $("#quiz-intro").hidden = true;
      $("#quiz-play").hidden = false;
      $("#quiz-results").hidden = true;
      renderQuiz();
    });

    $("#quiz-next").addEventListener("click", () => {
      state.quizIndex += 1;
      if (state.quizIndex >= QUIZ.length) {
        showResults();
      } else {
        renderQuiz();
      }
    });

    $("#show-ending").addEventListener("click", playEnding);
    $("#show-sources").addEventListener("click", () => goToSection(9));
    $("#back-ending").addEventListener("click", () => goToSection(8));
    $("#restart-btn").addEventListener("click", () => window.location.reload());
  }

  function renderQuiz() {
    const item = QUIZ[state.quizIndex];
    state.quizAnswered = false;
    $("#quiz-progress").textContent = `Q ${state.quizIndex + 1} / ${QUIZ.length}`;
    $("#quiz-score-live").textContent = `SCORE ${state.quizScore}`;
    $("#quiz-type").textContent = item.type;
    $("#quiz-question").textContent = item.q;
    $("#quiz-ar").textContent = item.ar;
    $("#quiz-feedback").hidden = true;
    $("#quiz-next").hidden = true;

    const box = $("#quiz-options");
    box.innerHTML = "";
    item.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opt";
      btn.innerHTML = `<span dir="ltr">${opt.en}</span><span class="opt-ar" dir="rtl">${opt.ar}</span>`;
      btn.addEventListener("click", () => answerQuiz(btn, opt, item));
      box.appendChild(btn);
    });
  }

  function answerQuiz(btn, opt, item) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    const options = $$("#quiz-options .quiz-opt");
    options.forEach((el, idx) => {
      el.disabled = true;
      if (item.options[idx].correct) el.classList.add("is-correct");
    });

    const feedback = $("#quiz-feedback");
    feedback.hidden = false;

    if (opt.correct) {
      state.quizScore += 1;
      btn.classList.add("is-correct");
      feedback.className = "quiz-feedback ar good";
      feedback.textContent = item.good;
    } else {
      btn.classList.add("is-wrong");
      feedback.className = "quiz-feedback ar bad";
      feedback.textContent = item.bad;
    }

    $("#quiz-score-live").textContent = `SCORE ${state.quizScore}`;
    $("#quiz-next").hidden = false;
    $("#quiz-next").textContent =
      state.quizIndex >= QUIZ.length - 1 ? "VIEW RESULTS" : "NEXT CHALLENGE";
  }

  function showResults() {
    $("#quiz-play").hidden = true;
    $("#quiz-results").hidden = false;
    const total = QUIZ.length;
    const pct = Math.round((state.quizScore / total) * 100);
    $("#final-percent").textContent = pct + "%";
    $("#stat-threats").textContent = `${state.quizScore}/${total}`;

    const safeLabel =
      state.totalDecisions > 0
        ? `${state.safeDecisions}/${state.totalDecisions}`
        : `${state.quizScore}/${total}`;
    $("#stat-safe").textContent = safeLabel;

    let level = "Learning";
    if (pct >= 90) level = "Cyber Aware";
    else if (pct >= 70) level = "Alert Analyst";
    else if (pct >= 50) level = "Rising Defender";
    $("#stat-level").textContent = level;
  }

  async function playEnding() {
    goToSection(8);
    const ids = ["ending-1", "ending-2", "ending-3", "ending-4", "show-sources", "restart-btn"];
    for (const id of ids) {
      const el = $("#" + id);
      el.hidden = true;
    }
    await wait(400);
    for (let i = 0; i < ids.length; i++) {
      const el = $("#" + ids[i]);
      el.hidden = false;
      await wait(700);
    }
  }

  /* ---------- WIRING ---------- */
  function bindNav() {
    $$("[data-next]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (state.section < state.maxSection) goToSection(state.section + 1);
      })
    );
    $$("[data-prev]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (state.section > 0) goToSection(state.section - 1);
      })
    );
    $$(".progress-nav__item").forEach((btn) =>
      btn.addEventListener("click", () => goToSection(Number(btn.dataset.section)))
    );

    $("#start-btn").addEventListener("click", startApp);
    $("#skip-intro").addEventListener("click", skipToHook);
    $("#reveal-def-btn").addEventListener("click", revealDefinition);
    $("#close-case").addEventListener("click", () => {
      $("#case-detail").hidden = true;
      $$(".case-file").forEach((el) => el.classList.remove("is-open"));
    });

    $$(".chain-node").forEach((node) => {
      node.addEventListener("click", () => {
        $$(".chain-node").forEach((n) => n.classList.remove("is-active"));
        node.classList.add("is-active");
        $("#chain-explain").textContent = CHAIN_TEXT[node.dataset.chain];
      });
    });

    document.addEventListener("keydown", (e) => {
      if (!$("#intro").hidden) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (state.section > 7) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        if (state.section < state.maxSection) goToSection(state.section + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        if (state.section > 0) goToSection(state.section - 1);
      }
    });
  }

  function init() {
    buildThreatMap();
    buildShield();
    initLabs();
    initScenario();
    initQuiz();
    bindNav();
    playIntro().catch(() => {
      $("#intro-hook").hidden = false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
