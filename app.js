// Chinese Exam Preparation App Logic
// Handles audio playback (Mobile-friendly TTS + Web Audio synthesis), ticket rendering, quizzes, exam simulator, errors bank

// State Management
const AppState = {
  currentTab: 'tickets',
  currentTicketId: 1,
  audioSpeed: 1.0,
  isPlayingSequential: false,
  sequentialTimeout: null,
  
  // Interactive Quiz State
  quizSubmode: 'tones', // 'tones', 'sandhi', 'builder'
  quizQuestion: null,
  quizAnswered: false,
  
  // Sentence Builder State
  builderCurrentTarget: null,
  builderSelectedWords: [],
  
  // Exam Simulator State
  simTicketId: 1,
  simTimerInterval: null,
  simSecondsRemaining: 300, // 5 min
  simRunning: false,
  simScores: { t1: 12, t2: 6, t3: 6 },
  
  // Warm-up Syllables State
  warmupPool: [],
  warmupShownCount: 0,
  
  // Errors Bank
  errors: []
};

// ==========================================
// 1. Mobile-Ready Audio Engine & Synthesizer
// ==========================================
const AudioEngine = {
  audioObj: null,
  audioCtx: null,
  unlocked: false,
  zhVoice: null,

  init() {
    if (window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          this.zhVoice =
            voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN') ||
            voices.find(v => v.lang.toLowerCase().startsWith('zh')) ||
            voices.find(v => /chinese|mandarin|普通话|中文/i.test(v.name));
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const unlockHandler = () => {
      if (this.unlocked) return;
      this.initAudioContext();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      if (window.speechSynthesis) {
        try {
          const silentUtterance = new SpeechSynthesisUtterance('');
          silentUtterance.volume = 0;
          window.speechSynthesis.speak(silentUtterance);
        } catch (e) {}
      }
      this.unlocked = true;
      document.removeEventListener('touchstart', unlockHandler);
      document.removeEventListener('click', unlockHandler);
    };

    document.addEventListener('touchstart', unlockHandler, { passive: true });
    document.addEventListener('click', unlockHandler, { passive: true });
  },

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  },

  speak(text, pinyinFallback, toneNumber) {
    this.initAudioContext();

    if (this.audioObj) {
      try {
        this.audioObj.pause();
        this.audioObj.src = '';
      } catch (e) {}
      this.audioObj = null;
    }

    const targetText = (text && text !== '—') ? text : pinyinFallback;
    if (!targetText) return;

    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(targetText);
        utterance.lang = 'zh-CN';
        utterance.rate = AppState.audioSpeed;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        if (!this.zhVoice) {
          const voices = window.speechSynthesis.getVoices();
          this.zhVoice =
            voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN') ||
            voices.find(v => v.lang.toLowerCase().startsWith('zh'));
        }
        if (this.zhVoice) {
          utterance.voice = this.zhVoice;
        }

        let speechStarted = false;
        utterance.onstart = () => {
          speechStarted = true;
        };

        utterance.onerror = () => {
          this.fallbackAudioStream(targetText, toneNumber);
        };

        window.speechSynthesis.speak(utterance);

        setTimeout(() => {
          if (!speechStarted && !window.speechSynthesis.speaking) {
            this.fallbackAudioStream(targetText, toneNumber);
          }
        }, 450);

        return;
      } catch (e) {}
    }

    this.fallbackAudioStream(targetText, toneNumber);
  },

  fallbackAudioStream(targetText, toneNumber) {
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(targetText)}&type=2`;
    const audio = new Audio();
    audio.setAttribute('playsinline', 'true');
    audio.preload = 'auto';
    audio.src = url;
    audio.playbackRate = AppState.audioSpeed;
    this.audioObj = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (typeof toneNumber === 'number') {
          this.playToneCurve(toneNumber);
        } else {
          this.playToneCurve(1);
        }
      });
    }
  },

  playToneCurve(tone) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      gain.gain.setValueAtTime(0.25, now);

      if (tone === 1) {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(440, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (tone === 2) {
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (tone === 3) {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.42);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.48);
      } else if (tone === 4) {
        osc.frequency.setValueAtTime(460, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.33);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  }
};

// ==========================================
// 2. LocalStorage Errors Bank
// ==========================================
const ErrorsBank = {
  load() {
    try {
      const data = localStorage.getItem('chinese_kr_errors');
      AppState.errors = data ? JSON.parse(data) : [];
    } catch (e) {
      AppState.errors = [];
    }
    this.updateBadge();
  },

  save() {
    try {
      localStorage.setItem('chinese_kr_errors', JSON.stringify(AppState.errors));
    } catch (e) {}
    this.updateBadge();
  },

  add(item) {
    const exists = AppState.errors.some(e => e.id === item.id);
    if (!exists) {
      AppState.errors.push({ ...item, addedAt: Date.now() });
      this.save();
      this.showToast(`Добавлено в работу над ошибками: "${item.title || item.pinyin || item.text}"`);
    } else {
      this.showToast(`Элемент уже в списке ошибок.`);
    }
  },

  remove(id) {
    AppState.errors = AppState.errors.filter(e => e.id !== id);
    this.save();
    renderErrorsBank();
  },

  clearAll() {
    if (confirm("Очистить весь банк ошибок?")) {
      AppState.errors = [];
      this.save();
      renderErrorsBank();
    }
  },

  updateBadge() {
    const el = document.getElementById('errorCountBadge');
    if (el) {
      el.textContent = `❌ Ошибок: ${AppState.errors.length}`;
    }
  },

  showToast(msg) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.background = '#1e293b';
      toast.style.border = '1px solid #e53e3e';
      toast.style.color = '#fff';
      toast.style.padding = '10px 18px';
      toast.style.borderRadius = '10px';
      toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
      toast.style.zIndex = '9999';
      toast.style.fontSize = '0.9rem';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2800);
  }
};

// ==========================================
// 3. UI Navigation & Rendering
// ==========================================
function initNavigation() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      switchTab(target);
    });
  });

  const pillsContainer = document.getElementById('ticketPills');
  if (pillsContainer && typeof TICKETS_DATA !== 'undefined') {
    pillsContainer.innerHTML = '';
    TICKETS_DATA.forEach(ticket => {
      const pill = document.createElement('button');
      pill.className = `ticket-pill ${ticket.id === AppState.currentTicketId ? 'active' : ''}`;
      pill.textContent = `Билет ${ticket.id}`;
      pill.addEventListener('click', () => {
        AppState.currentTicketId = ticket.id;
        document.querySelectorAll('.ticket-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderTicket(ticket.id);
      });
      pillsContainer.appendChild(pill);
    });
  }

  document.getElementById('randomTicketBtn')?.addEventListener('click', () => {
    if (typeof TICKETS_DATA === 'undefined') return;
    const randomId = Math.floor(Math.random() * TICKETS_DATA.length) + 1;
    AppState.currentTicketId = randomId;
    document.querySelectorAll('.ticket-pill').forEach(p => {
      p.classList.toggle('active', p.textContent === `Билет ${randomId}`);
    });
    renderTicket(randomId);
    ErrorsBank.showToast(`Выбран случайный Билет ${randomId}!`);
  });

  const speedBtn = document.getElementById('speedToggleBtn');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      AppState.audioSpeed = AppState.audioSpeed === 1.0 ? 0.75 : 1.0;
      speedBtn.textContent = `⚡ Скорость: ${AppState.audioSpeed}x`;
      ErrorsBank.showToast(`Скорость озвучки: ${AppState.audioSpeed}x`);
    });
  }

  document.getElementById('soundTestBtn')?.addEventListener('click', () => {
    AudioEngine.speak('你好，祝你考试顺利！', 'nǐ hǎo', 3);
    ErrorsBank.showToast('Проверка звука: 你好！');
  });

  document.getElementById('errorCountBadge')?.addEventListener('click', () => {
    switchTab('errors');
  });
}

function switchTab(tabId) {
  AppState.currentTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.target === tabId);
  });
  document.querySelectorAll('.view-pane').forEach(p => {
    p.classList.toggle('active', p.id === `pane-${tabId}`);
  });

  if (tabId === 'tickets') {
    renderTicket(AppState.currentTicketId);
  } else if (tabId === 'quiz') {
    initQuiz();
  } else if (tabId === 'simulator') {
    initSimulator();
  } else if (tabId === 'errors') {
    renderErrorsBank();
  } else if (tabId === 'theory') {
    renderTheory();
  } else if (tabId === 'warmup') {
    initWarmup();
  }
}

// ==========================================
// 4. Ticket View Rendering
// ==========================================
function renderTicket(ticketId) {
  if (typeof TICKETS_DATA === 'undefined') return;
  const ticket = TICKETS_DATA.find(t => t.id === ticketId);
  if (!ticket) return;

  const titleEl = document.getElementById('ticketTitle');
  if (titleEl) titleEl.textContent = `Билет № ${ticket.id}`;

  // 1. Task 1: Syllables Grid
  const task1Grid = document.getElementById('task1Grid');
  if (task1Grid) {
    task1Grid.innerHTML = '';
    ticket.task1.forEach((syl) => {
      const card = document.createElement('div');
      card.className = 'syllable-card';
      card.innerHTML = `
        <div class="syllable-top">
          <span class="syllable-pinyin">${syl.pinyin}</span>
          <span class="tone-badge tone-${syl.tone}">${syl.tone} тон</span>
        </div>
        <div class="syllable-meta">
          <span class="syllable-hanzi">${syl.hanzi || '—'}</span>
          <span class="syllable-audio-hint">🔊 кликни</span>
        </div>
      `;

      card.addEventListener('click', () => {
        card.classList.add('playing');
        AudioEngine.speak(syl.hanzi || syl.pinyin, syl.pinyin, syl.tone);
        setTimeout(() => card.classList.remove('playing'), 800);
      });

      task1Grid.appendChild(card);
    });
  }

  const playAllBtn = document.getElementById('playAllTask1Btn');
  if (playAllBtn) {
    playAllBtn.onclick = () => playSequentialSyllables(ticket.task1);
  }

  // 2. Task 2: Tone Sandhi Cards
  const task2List = document.getElementById('task2List');
  if (task2List) {
    task2List.innerHTML = '';
    ticket.task2.forEach(rule => {
      const badgeClass = rule.ruleType === '3+3' ? 'badge-33' :
                         rule.ruleType === 'half-3' ? 'badge-half' :
                         rule.ruleType === 'neutral' ? 'badge-neutral' : 'badge-other';

      const card = document.createElement('div');
      card.className = 'tone-rule-card';
      card.innerHTML = `
        <div class="tone-rule-top">
          <div class="tone-rule-words">
            <span class="rule-orig-pinyin">${rule.text}</span>
            <span class="rule-arrow">➔</span>
            <span class="rule-actual-pinyin">${rule.actualPinyin}</span>
          </div>
          <span class="tone-rule-badge ${badgeClass}">${rule.ruleName}</span>
        </div>
        <p class="tone-rule-exp">${rule.explanation}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
          <span style="font-family:var(--font-hanzi); font-size:1.15rem; color:#fbbf24;">${rule.hanzi}</span>
          <button class="btn-sm" style="padding:4px 10px;">🔊 Послушать</button>
        </div>
      `;

      card.addEventListener('click', () => {
        AudioEngine.speak(rule.hanzi || rule.text, rule.text);
      });

      task2List.appendChild(card);
    });
  }

  // 3. Task 3: Translation Sentences
  const task3List = document.getElementById('task3List');
  if (task3List) {
    task3List.innerHTML = '';
    ticket.task3.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'translation-card';
      card.id = `tr-card-${ticket.id}-${idx}`;

      card.innerHTML = `
        <div class="tr-ru-box">
          <div class="tr-ru-text">${idx + 1}. ${item.ru}</div>
          <div class="tr-actions">
            <button class="btn-sm tr-reveal-btn" id="reveal-btn-${ticket.id}-${idx}">👁️ Ответ</button>
            <button class="btn-sm tr-audio-btn">🔊</button>
            <button class="btn-sm tr-err-btn" title="Добавить в работу над ошибками">❌ В ошибки</button>
          </div>
        </div>

        <div class="tr-answer-box" id="ans-box-${ticket.id}-${idx}">
          <div class="tr-hanzi">${item.hanzi}</div>
          <div class="tr-pinyin">${item.pinyin}</div>
          <div style="font-size:0.85rem; color:#94a3b8; margin-bottom:6px;"><strong>Дословно:</strong> ${item.literal}</div>
          <div class="tr-grammar"><strong>Грамматика:</strong> ${item.grammar}</div>
          <div class="tr-words-tags">
            ${item.words.map(w => `<span class="tr-word-tag"><strong>${w.zh}</strong> (${w.py}) — ${w.ru}</span>`).join('')}
          </div>
        </div>
      `;

      const revealBtn = card.querySelector('.tr-reveal-btn');
      const ansBox = card.querySelector('.tr-answer-box');
      revealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = !ansBox.classList.contains('revealed');
        ansBox.classList.toggle('revealed');
        revealBtn.textContent = isHidden ? '🙈 Скрыть' : '👁️ Ответ';
        if (isHidden) {
          AudioEngine.speak(item.hanzi, item.pinyin);
        }
      });

      card.querySelector('.tr-audio-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        AudioEngine.speak(item.hanzi, item.pinyin);
      });

      card.querySelector('.tr-err-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        ErrorsBank.add({
          id: `tr-${ticket.id}-${idx}`,
          type: 'translation',
          ticketId: ticket.id,
          title: item.ru,
          hanzi: item.hanzi,
          pinyin: item.pinyin,
          grammar: item.grammar
        });
      });

      task3List.appendChild(card);
    });
  }
}

function playSequentialSyllables(syllables) {
  if (AppState.isPlayingSequential) {
    clearTimeout(AppState.sequentialTimeout);
    AppState.isPlayingSequential = false;
    document.getElementById('playAllTask1Btn').textContent = '▶️ Озвучить все слоги по очереди';
    return;
  }

  AppState.isPlayingSequential = true;
  document.getElementById('playAllTask1Btn').textContent = '⏹️ Остановить озвучку';

  let i = 0;
  function next() {
    if (!AppState.isPlayingSequential || i >= syllables.length) {
      AppState.isPlayingSequential = false;
      document.getElementById('playAllTask1Btn').textContent = '▶️ Озвучить все слоги по очереди';
      return;
    }

    const syl = syllables[i];
    const cards = document.querySelectorAll('#task1Grid .syllable-card');
    cards.forEach(c => c.classList.remove('playing'));
    if (cards[i]) cards[i].classList.add('playing');

    AudioEngine.speak(syl.hanzi || syl.pinyin, syl.pinyin, syl.tone);
    i++;
    AppState.sequentialTimeout = setTimeout(next, 1400 / AppState.audioSpeed);
  }

  next();
}

// ==========================================
// 5. Interactive Testing Module
// ==========================================
function initQuiz() {
  document.querySelectorAll('.quiz-subtab-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.quiz-subtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.quizSubmode = btn.dataset.submode;
      loadNextQuizQuestion();
    };
  });

  loadNextQuizQuestion();
}

function loadNextQuizQuestion() {
  AppState.quizAnswered = false;
  const container = document.getElementById('quizDynamicArea');
  if (!container) return;

  const mode = AppState.quizSubmode;

  if (mode === 'tones') {
    renderToneQuiz(container);
  } else if (mode === 'sandhi') {
    renderSandhiQuiz(container);
  } else if (mode === 'builder') {
    renderSentenceBuilderQuiz(container);
  }
}

function renderToneQuiz(container) {
  const allSyllables = [];
  TICKETS_DATA.forEach(t => t.task1.forEach(s => allSyllables.push(s)));
  const target = allSyllables[Math.floor(Math.random() * allSyllables.length)];

  const choices = [target];
  while (choices.length < 4) {
    const candidate = allSyllables[Math.floor(Math.random() * allSyllables.length)];
    if (!choices.some(c => c.pinyin === candidate.pinyin)) {
      choices.push(candidate);
    }
  }
  choices.sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question-header">Задание 1: Слушай и определи слог с правильным тоном</div>
      <button class="quiz-audio-trigger" id="quizPlayBtn">🔊 Послушать слог</button>
      
      <div class="quiz-options-grid">
        ${choices.map((c) => `
          <button class="quiz-opt-btn" data-pinyin="${c.pinyin}">${c.pinyin}</button>
        `).join('')}
      </div>

      <div class="quiz-feedback" id="quizFeedback"></div>
      <button class="btn-primary" id="quizNextBtn" style="display:none; margin:0 auto; padding:10px 24px; border-radius:10px;">Следующий вопрос ➔</button>
    </div>
  `;

  const playBtn = container.querySelector('#quizPlayBtn');
  playBtn.onclick = () => AudioEngine.speak(target.hanzi || target.pinyin, target.pinyin, target.tone);

  const feedback = container.querySelector('#quizFeedback');
  const nextBtn = container.querySelector('#quizNextBtn');

  container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.onclick = () => {
      if (AppState.quizAnswered) return;
      AppState.quizAnswered = true;

      const chosen = btn.dataset.pinyin;
      if (chosen === target.pinyin) {
        btn.classList.add('correct');
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = `✅ Верно! <strong>${target.pinyin}</strong> (${target.tone} тон). ${target.desc}`;
      } else {
        btn.classList.add('wrong');
        container.querySelectorAll('.quiz-opt-btn').forEach(b => {
          if (b.dataset.pinyin === target.pinyin) b.classList.add('correct');
        });
        feedback.className = 'quiz-feedback show wrong';
        feedback.innerHTML = `❌ Ошибка! Правильный ответ: <strong>${target.pinyin}</strong> (${target.tone} тон).<br>${target.desc}`;
        
        ErrorsBank.add({
          id: `syl-${target.pinyin}`,
          type: 'syllable',
          pinyin: target.pinyin,
          tone: target.tone,
          hanzi: target.hanzi,
          desc: target.desc
        });
      }

      nextBtn.style.display = 'block';
      nextBtn.onclick = () => {
        loadNextQuizQuestion();
        setTimeout(() => {
          document.getElementById('quizPlayBtn')?.click();
        }, 50);
      };
    };
  });
}

function renderSandhiQuiz(container) {
  const allSandhi = [];
  TICKETS_DATA.forEach(t => t.task2.forEach(s => allSandhi.push(s)));
  const target = allSandhi[Math.floor(Math.random() * allSandhi.length)];

  const questionTypes = [
    {
      q: `Как читается слово «${target.text}» согласно правилам тонов?`,
      correct: target.actualPinyin,
      wrongs: [
        target.ruleType === '3+3' ? `${target.text} (без изменений)` : 'ní hǎo',
        'полутретий + 3-й тон',
        '1-й тон + 4-й тон'
      ]
    },
    {
      q: `Какое фонетическое правило действует в слове «${target.text}»?`,
      correct: target.ruleName,
      wrongs: [
        target.ruleType === '3+3' ? 'Полутретий тон (3 + 1/2/4)' : 'Правило 3+3 = 2+3',
        'Слог не меняется',
        'Отрицание bù перед 4 тоном'
      ]
    }
  ];

  const qObj = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const options = [qObj.correct, ...qObj.wrongs].filter((v, i, a) => a.indexOf(v) === i);
  options.sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question-header">Задание 2: Правила сочетания тонов</div>
      <div class="quiz-prompt-big">${target.text} <span style="font-family:var(--font-hanzi); color:#fbbf24; font-size:1.8rem;">(${target.hanzi})</span></div>
      <p style="font-size:1.05rem; margin-bottom:20px; color:#cbd5e1;">${qObj.q}</p>
      
      <div class="quiz-options-grid" style="grid-template-columns:1fr;">
        ${options.map(opt => `
          <button class="quiz-opt-btn" style="font-size:1.05rem; padding:12px 16px; text-align:left;" data-answer="${opt}">${opt}</button>
        `).join('')}
      </div>

      <div class="quiz-feedback" id="quizFeedback"></div>
      <button class="btn-primary" id="quizNextBtn" style="display:none; margin:0 auto; padding:10px 24px; border-radius:10px;">Следующий вопрос ➔</button>
    </div>
  `;

  const feedback = container.querySelector('#quizFeedback');
  const nextBtn = container.querySelector('#quizNextBtn');

  container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.onclick = () => {
      if (AppState.quizAnswered) return;
      AppState.quizAnswered = true;

      const chosen = btn.dataset.answer;
      if (chosen === qObj.correct) {
        btn.classList.add('correct');
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = `✅ Отлично! ${target.explanation}`;
      } else {
        btn.classList.add('wrong');
        container.querySelectorAll('.quiz-opt-btn').forEach(b => {
          if (b.dataset.answer === qObj.correct) b.classList.add('correct');
        });
        feedback.className = 'quiz-feedback show wrong';
        feedback.innerHTML = `❌ Неверно! Правильно: <strong>${qObj.correct}</strong>.<br>${target.explanation}`;
        
        ErrorsBank.add({
          id: `sandhi-${target.text}`,
          type: 'sandhi',
          text: target.text,
          actualPinyin: target.actualPinyin,
          explanation: target.explanation,
          ruleName: target.ruleName
        });
      }

      AudioEngine.speak(target.hanzi || target.text, target.text);
      nextBtn.style.display = 'block';
      nextBtn.onclick = () => loadNextQuizQuestion();
    };
  });
}

function renderSentenceBuilderQuiz(container) {
  const allSentences = [];
  TICKETS_DATA.forEach(t => t.task3.forEach(s => allSentences.push(s)));
  const target = allSentences[Math.floor(Math.random() * allSentences.length)];

  const words = [...target.words];
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);

  AppState.builderCurrentTarget = target;
  AppState.builderSelectedWords = [];

  container.innerHTML = `
    <div class="quiz-card" style="max-width:760px;">
      <div class="quiz-question-header">Задание 3: Собери китайское предложение</div>
      <p style="font-size:1.2rem; font-weight:600; margin-bottom:16px; color:#f8fafc;">${target.ru}</p>

      <div class="sentence-builder-zone" id="builderZone">
        <span style="color:var(--text-dim); font-size:0.9rem;" id="builderPlaceholder">Нажимай на слова внизу, чтобы составить фразу...</span>
      </div>

      <div class="word-tile-pool" id="wordsPool">
        ${shuffledWords.map((w, idx) => `
          <button class="word-tile" data-idx="${idx}" data-zh="${w.zh}" data-py="${w.py}">${w.zh} <span style="font-size:0.75rem; color:#94a3b8;">(${w.py})</span></button>
        `).join('')}
      </div>

      <div style="display:flex; justify-content:center; gap:12px; margin-bottom:16px;">
        <button class="btn-sm" id="builderResetBtn">🔄 Сбросить</button>
        <button class="btn-primary" id="builderCheckBtn" style="padding:8px 24px; border-radius:10px;">Проверить ✅</button>
      </div>

      <div class="quiz-feedback" id="builderFeedback"></div>
      <button class="btn-primary" id="quizNextBtn" style="display:none; margin:0 auto; padding:10px 24px; border-radius:10px;">Следующее предложение ➔</button>
    </div>
  `;

  const zone = container.querySelector('#builderZone');
  const pool = container.querySelector('#wordsPool');
  const feedback = container.querySelector('#builderFeedback');
  const nextBtn = container.querySelector('#quizNextBtn');

  function updateZone() {
    zone.innerHTML = '';
    if (AppState.builderSelectedWords.length === 0) {
      zone.innerHTML = '<span style="color:var(--text-dim); font-size:0.9rem;">Нажимай на слова внизу, чтобы составить фразу...</span>';
      return;
    }

    AppState.builderSelectedWords.forEach((wordObj, i) => {
      const tile = document.createElement('div');
      tile.className = 'word-tile';
      tile.style.background = '#2563eb';
      tile.style.borderColor = '#3b82f6';
      tile.textContent = wordObj.zh;
      tile.addEventListener('click', () => {
        AppState.builderSelectedWords.splice(i, 1);
        const origBtn = pool.querySelector(`[data-idx="${wordObj.origIdx}"]`);
        if (origBtn) origBtn.classList.remove('used');
        updateZone();
      });
      zone.appendChild(tile);
    });
  }

  pool.querySelectorAll('.word-tile').forEach(btn => {
    btn.onclick = () => {
      if (btn.classList.contains('used')) return;
      btn.classList.add('used');
      AppState.builderSelectedWords.push({
        zh: btn.dataset.zh,
        py: btn.dataset.py,
        origIdx: btn.dataset.idx
      });
      updateZone();
    };
  });

  container.querySelector('#builderResetBtn').onclick = () => {
    AppState.builderSelectedWords = [];
    pool.querySelectorAll('.word-tile').forEach(b => b.classList.remove('used'));
    updateZone();
    feedback.className = 'quiz-feedback';
  };

  container.querySelector('#builderCheckBtn').onclick = () => {
    const constructed = AppState.builderSelectedWords.map(w => w.zh).join('');
    const cleanTarget = target.hanzi.replace(/[，。？—（）\s]/g, '');
    const cleanConstructed = constructed.replace(/[，。？—（）\s]/g, '');

    const isMatch = cleanTarget.includes(cleanConstructed) && cleanConstructed.length >= cleanTarget.length * 0.7;

    if (isMatch) {
      feedback.className = 'quiz-feedback show correct';
      feedback.innerHTML = `🎉 Верно!<br><strong>${target.hanzi}</strong> [${target.pinyin}]<br><small>${target.grammar}</small>`;
      AudioEngine.speak(target.hanzi, target.pinyin);
    } else {
      feedback.className = 'quiz-feedback show wrong';
      feedback.innerHTML = `❌ Не совсем точно!<br><strong>Правильно:</strong> ${target.hanzi}<br><strong>Пиньинь:</strong> ${target.pinyin}<br><strong>Грамматика:</strong> ${target.grammar}`;
      AudioEngine.speak(target.hanzi, target.pinyin);

      ErrorsBank.add({
        id: `build-${target.ru}`,
        type: 'translation',
        title: target.ru,
        hanzi: target.hanzi,
        pinyin: target.pinyin,
        grammar: target.grammar
      });
    }

    nextBtn.style.display = 'block';
    nextBtn.onclick = () => loadNextQuizQuestion();
  };
}

// ==========================================
// 6. Exam Simulator Module
// ==========================================
function initSimulator() {
  const container = document.getElementById('simulatorContainer');
  if (!container) return;
  renderSimulatorView();
}

function renderSimulatorView() {
  const container = document.getElementById('simulatorContainer');
  const ticket = TICKETS_DATA.find(t => t.id === AppState.simTicketId) || TICKETS_DATA[0];

  container.innerHTML = `
    <div class="simulator-box">
      <div class="sim-header">
        <div>
          <h2 style="font-size:1.4rem; font-weight:700;">Симулятор Контрольной Работы (КР)</h2>
          <p style="color:var(--text-muted); font-size:0.9rem;">Пройди полный билет как на реальном экзамене. 24 балла максимум.</p>
        </div>

        <div style="display:flex; align-items:center; gap:12px;">
          <select id="simTicketSelect" style="background:var(--bg-subtle); border:1px solid var(--border); color:#fff; padding:8px 12px; border-radius:8px;">
            ${TICKETS_DATA.map(t => `<option value="${t.id}" ${t.id === ticket.id ? 'selected' : ''}>Билет № ${t.id}</option>`).join('')}
          </select>
          <button class="btn-sm" id="simRandomBtn">🎲 Случайный билет</button>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:20px;">
        <div class="timer-box" id="simTimerDisplay">
          ⏱️ 05:00
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-primary" id="simStartTimerBtn">Старт таймера (5 мин)</button>
          <button class="btn-sm" id="simResetTimerBtn">Сброс</button>
        </div>
      </div>

      <!-- Task 1 Exam -->
      <div class="sim-task-row">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 style="font-size:1.1rem; font-weight:700;">Задание 1: Чтение 12 слогов с тонами</h3>
          <span class="points-badge">12 баллов</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Прочитай все слоги вслух. Нажимай на них, чтобы проверить правильность произношения.</p>
        <div class="syllables-grid" style="grid-template-columns:repeat(auto-fill, minmax(130px, 1fr));">
          ${ticket.task1.map(s => `
            <div class="syllable-card" onclick="AudioEngine.speak('${s.hanzi || s.pinyin}', '${s.pinyin}', ${s.tone})">
              <div class="syllable-top">
                <span class="syllable-pinyin">${s.pinyin}</span>
                <span class="tone-badge tone-${s.tone}">${s.tone} тон</span>
              </div>
              <div class="syllable-meta">
                <span>${s.hanzi || '—'}</span>
                <span>🔊</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex; align-items:center; gap:10px; margin-top:14px;">
          <span style="font-size:0.9rem;">Оцени свой ответ (баллов из 12):</span>
          <input type="range" id="scoreT1" min="0" max="12" value="12" style="flex:1;" oninput="document.getElementById('valT1').textContent = this.value">
          <strong id="valT1">12</strong>
        </div>
      </div>

      <!-- Task 2 Exam -->
      <div class="sim-task-row">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 style="font-size:1.1rem; font-weight:700;">Задание 2: Правила сочетания тонов</h3>
          <span class="points-badge">6 баллов</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Объясни правила (3+3, полутретий, нулевой тон) и прочитай вслух.</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:10px;">
          ${ticket.task2.map(r => `
            <div style="background:var(--bg-card); padding:10px; border-radius:8px; border:1px solid var(--border); cursor:pointer;" onclick="AudioEngine.speak('${r.hanzi || r.text}', '${r.text}')">
              <div style="font-weight:700; font-size:1.1rem;">${r.text} ➔ <span style="color:#34d399;">${r.actualPinyin}</span> 🔊</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">${r.ruleName}</div>
            </div>
          `).join('')}
        </div>
        <div style="display:flex; align-items:center; gap:10px; margin-top:14px;">
          <span style="font-size:0.9rem;">Оцени свой ответ (баллов из 6):</span>
          <input type="range" id="scoreT2" min="0" max="6" value="6" style="flex:1;" oninput="document.getElementById('valT2').textContent = this.value">
          <strong id="valT2">6</strong>
        </div>
      </div>

      <!-- Task 3 Exam -->
      <div class="sim-task-row">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 style="font-size:1.1rem; font-weight:700;">Задание 3: Устный перевод предложений</h3>
          <span class="points-badge">6 баллов</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Переведи устно с русского на китайский без подглядывания. Затем нажми "Проверить".</p>
        ${ticket.task3.map((item, idx) => `
          <div style="background:var(--bg-card); padding:12px; border-radius:8px; border:1px solid var(--border); margin-bottom:10px;">
            <div style="font-weight:600; font-size:1rem; margin-bottom:6px;">${idx + 1}. ${item.ru}</div>
            <button class="btn-sm" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'; AudioEngine.speak('${item.hanzi}', '${item.pinyin}')">👁️ Проверить и озвучить</button>
            <div style="display:none; margin-top:8px; padding-top:8px; border-top:1px dashed var(--border);">
              <div style="color:#fbbf24; font-size:1.2rem; font-family:var(--font-hanzi);">${item.hanzi}</div>
              <div style="color:#60a5fa; font-weight:600;">${item.pinyin}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">${item.grammar}</div>
            </div>
          </div>
        `).join('')}
        <div style="display:flex; align-items:center; gap:10px; margin-top:14px;">
          <span style="font-size:0.9rem;">Оцени свой ответ (баллов из 6):</span>
          <input type="range" id="scoreT3" min="0" max="6" value="6" style="flex:1;" oninput="document.getElementById('valT3').textContent = this.value">
          <strong id="valT3">6</strong>
        </div>
      </div>

      <!-- Calculate Result -->
      <div style="text-align:center; margin-top:20px;">
        <button class="btn-primary" id="simCalculateBtn" style="padding:14px 32px; font-size:1.1rem; border-radius:12px;">🏆 Завершить симуляцию и подвести итог</button>
      </div>

      <div class="sim-grade-result" id="simGradeResult"></div>
    </div>
  `;

  const select = document.getElementById('simTicketSelect');
  if (select) {
    select.onchange = () => {
      AppState.simTicketId = parseInt(select.value, 10);
      renderSimulatorView();
    };
  }

  const randomBtn = document.getElementById('simRandomBtn');
  if (randomBtn) {
    randomBtn.onclick = () => {
      AppState.simTicketId = Math.floor(Math.random() * TICKETS_DATA.length) + 1;
      renderSimulatorView();
      ErrorsBank.showToast(`Выпал Билет № ${AppState.simTicketId}!`);
    };
  }

  const timerDisplay = document.getElementById('simTimerDisplay');
  const startTimerBtn = document.getElementById('simStartTimerBtn');
  const resetTimerBtn = document.getElementById('simResetTimerBtn');

  function updateTimerText() {
    const mins = Math.floor(AppState.simSecondsRemaining / 60);
    const secs = AppState.simSecondsRemaining % 60;
    timerDisplay.textContent = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  if (startTimerBtn) {
    startTimerBtn.onclick = () => {
      if (AppState.simRunning) {
        clearInterval(AppState.simTimerInterval);
        AppState.simRunning = false;
        startTimerBtn.textContent = 'Продолжить';
      } else {
        AppState.simRunning = true;
        startTimerBtn.textContent = 'Пауза';
        AppState.simTimerInterval = setInterval(() => {
          if (AppState.simSecondsRemaining > 0) {
            AppState.simSecondsRemaining--;
            updateTimerText();
          } else {
            clearInterval(AppState.simTimerInterval);
            AppState.simRunning = false;
            alert("⏰ Время подготовки вышло! Пора отвечать билет.");
          }
        }, 1000);
      }
    };
  }

  if (resetTimerBtn) {
    resetTimerBtn.onclick = () => {
      clearInterval(AppState.simTimerInterval);
      AppState.simRunning = false;
      AppState.simSecondsRemaining = 300;
      updateTimerText();
      if (startTimerBtn) startTimerBtn.textContent = 'Старт таймера (5 мин)';
    };
  }

  const calcBtn = document.getElementById('simCalculateBtn');
  const gradeResult = document.getElementById('simGradeResult');
  if (calcBtn) {
    calcBtn.onclick = () => {
      const s1 = parseInt(document.getElementById('scoreT1').value, 10);
      const s2 = parseInt(document.getElementById('scoreT2').value, 10);
      const s3 = parseInt(document.getElementById('scoreT3').value, 10);
      const total = s1 + s2 + s3;

      let grade = '5 (Отлично)';
      let gradeColor = '#10b981';
      let message = 'Великолепный результат! Вы полностью готовы к сдаче КР на высший балл!';

      if (total >= 22) {
        grade = '5 (Отлично)';
        gradeColor = '#10b981';
      } else if (total >= 18) {
        grade = '4 (Хорошо)';
        gradeColor = '#3b82f6';
        message = 'Хороший уровень! Повторите правила тонов и потренируйте сомнительные слоги.';
      } else if (total >= 13) {
        grade = '3 (Удовлетворительно)';
        gradeColor = '#f59e0b';
        message = 'Зачет получен, но есть пробелы. Рекомендуем повторить шпаргалку и пройти режим ошибок!';
      } else {
        grade = '2 (Нужно подтянуть)';
        gradeColor = '#ef4444';
        message = 'Нужно срочно потренировать слоги 1-го задания и правила модуляции 3 тона!';
      }

      gradeResult.className = 'sim-grade-result show';
      gradeResult.innerHTML = `
        <h3 style="font-size:1.8rem; font-weight:800; color:${gradeColor}; margin-bottom:8px;">Оценка: ${grade}</h3>
        <p style="font-size:1.2rem; font-weight:600; margin-bottom:6px;">Набрано баллов: <strong>${total} / 24</strong> (Задание 1: ${s1}/12, Задание 2: ${s2}/6, Задание 3: ${s3}/6)</p>
        <p style="color:var(--text-muted); font-size:0.95rem;">${message}</p>
      `;

      gradeResult.scrollIntoView({ behavior: 'smooth' });
    };
  }
}

// ==========================================
// 7. Error Review Bank Module
// ==========================================
function renderErrorsBank() {
  const container = document.getElementById('errorsContainer');
  if (!container) return;

  if (AppState.errors.length === 0) {
    container.innerHTML = `
      <div class="errors-empty-state">
        <div class="icon">🎉</div>
        <h3 style="font-size:1.3rem; font-weight:700; margin-bottom:6px; color:#fff;">Банк ошибок пуст!</h3>
        <p>Вы пока не добавили ни одной ошибки. Проходите тесты и билеты — все сложные места будут сохраняться здесь.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:1.3rem; font-weight:700;">Работа над ошибками (${AppState.errors.length})</h2>
        <p style="font-size:0.85rem; color:var(--text-muted);">Здесь собраны слоги и вопросы, в которых вы сомневались. Повторяйте их перед контрольной!</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn-primary" id="practiceErrorsBtn">🔥 Тренировать только ошибки</button>
        <button class="btn-sm" id="clearAllErrorsBtn">🗑️ Очистить все</button>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:14px;">
      ${AppState.errors.map(err => `
        <div class="section-box" style="margin-bottom:0; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <span style="font-size:1.3rem; font-weight:700; color:#fbbf24;">${err.pinyin || err.text || err.title}</span>
            <button class="btn-sm" onclick="ErrorsBank.remove('${err.id}')" title="Удалить из ошибок">Усвоено ✅</button>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:10px;">${err.desc || err.explanation || err.grammar || ''}</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-family:var(--font-hanzi); font-size:1.1rem; color:#60a5fa;">${err.hanzi || ''}</span>
            <button class="btn-sm" onclick="AudioEngine.speak('${err.hanzi || err.pinyin || err.text}', '${err.pinyin || err.text}')">🔊 Слушать</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('clearAllErrorsBtn')?.addEventListener('click', () => ErrorsBank.clearAll());
  document.getElementById('practiceErrorsBtn')?.addEventListener('click', () => {
    switchTab('quiz');
    ErrorsBank.showToast("Режим тренировки запущен!");
  });
}

// ==========================================
// 8. Theory Reference Module
// ==========================================
function renderTheory() {
  const container = document.getElementById('theoryContainer');
  if (!container || typeof THEORY_DATA === 'undefined') return;

  container.innerHTML = `
    <div style="margin-bottom:24px;">
      <h2 style="font-size:1.4rem; font-weight:700; margin-bottom:6px;">Вспомогательный справочный материал (Страница 7 КР)</h2>
      <p style="color:var(--text-muted); font-size:0.9rem;">Вся необходимая фонетика и грамматика для выполнения заданий 1, 2 и 3 с озвучкой каждого примера.</p>
    </div>

    <h3 style="font-size:1.2rem; font-weight:700; color:#ef4444; margin-bottom:14px;">Фонетика</h3>
    <div class="theory-grid" style="margin-bottom:32px;">
      ${THEORY_DATA.phonetics.map(sec => `
        <div class="theory-card">
          <h3>${sec.title} <span class="points-badge">${sec.badge}</span></h3>
          ${sec.items.map(it => `
            <div style="margin-bottom:14px;">
              <h4 style="font-size:1rem; font-weight:600; color:#38bdf8; margin-bottom:4px;">${it.rule}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">${it.desc}</p>
              ${it.examples.map(ex => `
                <div class="theory-example-item" onclick="AudioEngine.speak('${ex.text}', '${ex.text}')">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                      <strong style="font-size:1.05rem; color:#f8fafc;">${ex.text}</strong>
                      <span style="color:#34d399; font-size:0.9rem; margin-left:8px;">➔ [${ex.actual}]</span>
                    </div>
                    <span style="font-size:0.8rem; color:var(--text-muted);">${ex.ru} 🔊</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>

    <h3 style="font-size:1.2rem; font-weight:700; color:#3b82f6; margin-bottom:14px;">Грамматика</h3>
    <div class="theory-grid">
      ${THEORY_DATA.grammar.map(sec => `
        <div class="theory-card">
          <h3>${sec.title}</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:12px;">${sec.desc}</p>
          ${sec.warning ? `<div style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); padding:10px; border-radius:8px; font-size:0.85rem; color:#f87171; margin-bottom:12px;">${sec.warning}</div>` : ''}
          ${sec.examples.map(ex => `
            <div class="theory-example-item" onclick="AudioEngine.speak('${ex.zh}', '${ex.py}')">
              <div style="font-family:var(--font-hanzi); font-size:1.2rem; color:#fbbf24;">${ex.zh} 🔊</div>
              <div style="font-size:0.95rem; color:#60a5fa; font-weight:600;">${ex.py}</div>
              <div style="font-size:0.85rem; color:var(--text-muted);">${ex.ru}</div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================
// 9. Syllable Warm-Up Generator
// ==========================================
function initWarmup() {
  const container = document.getElementById('warmupContainer');
  if (!container || typeof ALL_SYLLABLES === 'undefined') return;

  function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  container.innerHTML = `
    <div class="warmup-box">
      <h2 style="font-size:1.4rem; font-weight:700; margin-bottom:6px;">Разминка скорости чтения слогов</h2>
      <p style="color:var(--text-muted); font-size:0.9rem; max-width:540px; margin:0 auto 20px;">
        Генератор выдает порции по 10 слогов из базы. Клик по любому слогу воспроизводит его звучание!
      </p>

      <div class="stats" style="display:flex; justify-content:center; gap:16px; margin-bottom:20px; flex-wrap:wrap;">
        <div class="stat" style="background:var(--bg-subtle); padding:10px 18px; border-radius:10px; border:1px solid var(--border);">
          <div id="warmRemaining" style="font-size:1.4rem; font-weight:700; color:#3b82f6;">0</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Осталось</div>
        </div>
        <div class="stat" style="background:var(--bg-subtle); padding:10px 18px; border-radius:10px; border:1px solid var(--border);">
          <div id="warmShown" style="font-size:1.4rem; font-weight:700; color:#10b981;">0</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Показано</div>
        </div>
        <div class="stat" style="background:var(--bg-subtle); padding:10px 18px; border-radius:10px; border:1px solid var(--border);">
          <div id="warmTotal" style="font-size:1.4rem; font-weight:700; color:#fbbf24;">${ALL_SYLLABLES.length}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Всего</div>
        </div>
      </div>

      <div class="warmup-grid" id="warmupGrid"></div>

      <div style="display:flex; justify-content:center; gap:12px;">
        <button class="btn-primary" id="warmNextBtn" style="padding:12px 28px; border-radius:12px; font-size:1rem;">Следующие 10 слогов</button>
        <button class="btn-sm" id="warmResetBtn" style="padding:12px 20px; border-radius:12px;">Сброс</button>
      </div>
    </div>
  `;

  const grid = container.querySelector('#warmupGrid');
  const remEl = container.querySelector('#warmRemaining');
  const shownEl = container.querySelector('#warmShown');
  const nextBtn = container.querySelector('#warmNextBtn');
  const resetBtn = container.querySelector('#warmResetBtn');

  function updateStats() {
    remEl.textContent = AppState.warmupPool.length;
    shownEl.textContent = AppState.warmupShownCount;
  }

  function showNext() {
    if (AppState.warmupPool.length === 0) return;
    const batch = AppState.warmupPool.splice(0, 10);
    AppState.warmupShownCount += batch.length;

    grid.innerHTML = '';
    batch.forEach(syl => {
      const card = document.createElement('div');
      card.className = 'warmup-card';
      card.textContent = syl;
      card.onclick = () => AudioEngine.speak(syl, syl);
      grid.appendChild(card);
    });

    for (let i = batch.length; i < 10; i++) {
      const empty = document.createElement('div');
      empty.className = 'warmup-card';
      empty.style.borderStyle = 'dashed';
      empty.style.opacity = '0.3';
      empty.textContent = '—';
      grid.appendChild(empty);
    }

    updateStats();
  }

  function reset() {
    AppState.warmupPool = shuffle(ALL_SYLLABLES);
    AppState.warmupShownCount = 0;
    showNext();
  }

  nextBtn.onclick = showNext;
  resetBtn.onclick = reset;

  reset();
}

// ==========================================
// 10. Bootstrap Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  AudioEngine.init();
  ErrorsBank.load();
  initNavigation();
  renderTicket(1);
});
