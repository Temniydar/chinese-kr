// Полные данные для подготовки к контрольной работе по китайскому языку
// Билеты 1-12, правила фонетики, грамматики и база слогов

const TICKETS_DATA = [
  {
    id: 1,
    title: "Билет 1",
    task1: [
      { pinyin: "bén", tone: 2, initial: "b", final: "en", hanzi: "甭", desc: "Инициаль b (губно-губной смычный непридыхательный, глухой как полузвонкое 'б'), финаль en ('эн'), 2-й тон (восходящий 35 / /)" },
      { pinyin: "chuǎi", tone: 3, initial: "ch", final: "uai", hanzi: "揣", desc: "Инициаль ch (придыхательный твердый 'чх'), сложная финаль uai ('уай'), 3-й тон (нисходяще-восходящий 214)" },
      { pinyin: "fòu", tone: 4, initial: "f", final: "ou", hanzi: "否", desc: "Инициаль f, финаль ou ('оу'), 4-й тон (резко падающий 51 \\)" },
      { pinyin: "géng", tone: 2, initial: "g", final: "eng", hanzi: "耿", desc: "Инициаль g (заднеязычный глухой непридыхательный, как полузвонкое 'г'), финаль eng (заднеязычный носовой -ng), 2-й тон" },
      { pinyin: "kěng", tone: 3, initial: "k", final: "eng", hanzi: "啃", desc: "Инициаль k (придыхательный 'кх'), носовая финаль eng, 3-й тон" },
      { pinyin: "lǎ", tone: 3, initial: "l", final: "a", hanzi: "喇", desc: "Инициаль l, простая финаль a ('а'), 3-й тон" },
      { pinyin: "niào", tone: 4, initial: "n", final: "iao", hanzi: "尿", desc: "Инициаль n, финаль iao ('яо'), 4-й тон" },
      { pinyin: "sì", tone: 4, initial: "s", final: "i", hanzi: "四", desc: "Инициаль s (переднеязычный свистящий), спец. гласный i после z/c/s звучит близко к русскому 'ы' с прижатым кончиком языка, 4-й тон ('сы')" },
      { pinyin: "zhǔ", tone: 3, initial: "zh", final: "u", hanzi: "主", desc: "Инициаль zh (твердый глухой непридыхательный 'дж'/'чж'), финаль u ('у'), 3-й тон" },
      { pinyin: "zhǔn", tone: 3, initial: "zh", final: "un", hanzi: "准", desc: "Инициаль zh, финаль un ('унь/уэн'), 3-й тон" },
      { pinyin: "zǒu", tone: 3, initial: "z", final: "ou", hanzi: "走", desc: "Инициаль z (глухой непридыхательный аффрикат 'дз'/'цз'), финаль ou, 3-й тон" },
      { pinyin: "zùn", tone: 4, initial: "z", final: "un", hanzi: "浚", desc: "Инициаль z ('дз'), финаль un ('унь'), 4-й тон" }
    ],
    task2: [
      {
        text: "nǐ hǎo",
        actualPinyin: "ní hǎo",
        ruleType: "3+3",
        ruleName: "Правило 3+3 = 2+3",
        explanation: "Два третьих тона подряд: первый слог (nǐ) меняется на 2-й тон -> [ní], второй (hǎo) остается 3-м тоном. Звучит: [ní hǎo].",
        hanzi: "你好"
      },
      {
        text: "nǐ yě hǎo",
        actualPinyin: "ní yé hǎo",
        ruleType: "3+3+3",
        ruleName: "Три 3-х тона подряд (3+3+3)",
        explanation: "В цепочке из трёх 3-х тонов: при делении на группы [nǐ yě] [hǎo] первые два слога переходят во 2-й тон -> [ní yé hǎo]. Либо nǐ произносится неполным 3-м тоном, а yě переходит во 2-й тон перед hǎo.",
        hanzi: "你也好"
      },
      {
        text: "wǒ hǎo",
        actualPinyin: "wó hǎo",
        ruleType: "3+3",
        ruleName: "Правило 3+3 = 2+3",
        explanation: "Оба слога в 3-м тоне. Первый слог (wǒ) переходит во 2-й тон -> [wó hǎo].",
        hanzi: "我好"
      },
      {
        text: "nǐ lái",
        actualPinyin: "nǐ lái (полу-3 + 2)",
        ruleType: "half-3",
        ruleName: "Полутретий тон (3 + 2)",
        explanation: "Слог 3-го тона (nǐ) перед слогом 2-го тона (lái): голос только опускается вниз и НЕ поднимается (половина 3-го тона). Второй слог lái звучит своим полным 2-м тоном.",
        hanzi: "你来"
      },
      {
        text: "mèimei",
        actualPinyin: "mèimei",
        ruleType: "neutral",
        ruleName: "Нулевой (нейтральный) тон",
        explanation: "Первый слог mèi — полный 4-й тон (падающий). Второй слог mei не имеет знака тона, произносится легко, тихо и коротко.",
        hanzi: "妹妹"
      },
      {
        text: "hǎo ba",
        actualPinyin: "hǎo ba (полу-3 + 0)",
        ruleType: "neutral",
        ruleName: "Полутретий тон + нулевой тон",
        explanation: "Перед нейтральным тоном слог hǎo опускается вниз (неполный третий тон), частица ba произносится коротко и без тона.",
        hanzi: "好吧"
      }
    ],
    task3: [
      {
        ru: "Привет, как дела? – У меня очень хорошо. (Буквально: я очень хорошо)",
        hanzi: "你好，你好吗？— 我很好。",
        pinyin: "Nǐ hǎo, nǐ hǎo ma? — Wǒ hěn hǎo.",
        literal: "Ты хорош, ты хорош [вопрос]? — Я очень хорош.",
        grammar: "В китайском качественные прилагательные сами являются сказуемыми, связка 是 (shì) перед 很 (hěn) НЕ ставится! Фраза 'wǒ hěn hǎo' состоит из трёх 3 тонов: произносится [wǒ hén hǎo].",
        words: [
          { zh: "你好", py: "nǐ hǎo", ru: "привет" },
          { zh: "吗", py: "ma", ru: "вопросительная частица" },
          { zh: "我", py: "wǒ", ru: "я" },
          { zh: "很", py: "hěn", ru: "очень" },
          { zh: "好", py: "hǎo", ru: "хороший / хорошо" }
        ]
      },
      {
        ru: "Они мои папа и мама. Моего папу зовут Андрей, мою маму - Анна.",
        hanzi: "他们是我的爸爸和妈妈。我爸爸叫安德烈，我妈妈叫安娜。",
        pinyin: "Tāmen shì wǒ de bàba hé māma. Wǒ bàba jiào Āndéliè, wǒ māma jiào Ānnà.",
        literal: "Они есть мои папа и мама. Мой папа зовется Андрей, моя мама зовется Анна.",
        grammar: "Связка 是 (shì) = 'быть/являться'. Притяжательная частица 的 (de) указывает на принадлежность. Союз 和 (hé) = 'и'. Глагол 叫 (jiào) = 'звать/называть по имени'.",
        words: [
          { zh: "他们", py: "tāmen", ru: "они" },
          { zh: "是", py: "shì", ru: "быть, являться" },
          { zh: "我的", py: "wǒ de", ru: "мои" },
          { zh: "爸爸", py: "bàba", ru: "папа" },
          { zh: "和", py: "hé", ru: "и" },
          { zh: "妈妈", py: "māma", ru: "мама" },
          { zh: "叫", py: "jiào", ru: "зовут" },
          { zh: "安德烈", py: "Āndéliè", ru: "Андрей" },
          { zh: "安娜", py: "Ānnà", ru: "Анна" }
        ]
      },
      {
        ru: "Я считаю, китайский сложный.",
        hanzi: "我觉得汉语很难。（или: 我觉得汉语难）",
        pinyin: "Wǒ juéde hànyǔ hěn nán. (wǒ juéde hànyǔ nán)",
        literal: "Я чувствую/считаю китайский язык (очень) трудный.",
        grammar: "我觉得 (wǒ juéde) = 'я считаю / мне кажется'. 汉语 (hànyǔ) = 'китайский язык'. 难 (nán) = 'сложный/трудный'. В утверждении часто добавляется 很 (hěn nán).",
        words: [
          { zh: "我", py: "wǒ", ru: "я" },
          { zh: "觉得", py: "juéde", ru: "считать, думать" },
          { zh: "汉语", py: "hànyǔ", ru: "китайский язык" },
          { zh: "很", py: "hěn", ru: "очень" },
          { zh: "难", py: "nán", ru: "трудный, сложный" }
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Билет 2",
    task1: [
      { pinyin: "bǎo", tone: 3, initial: "b", final: "ao", hanzi: "宝", desc: "b + ao, 3-й тон" },
      { pinyin: "dù", tone: 4, initial: "d", final: "u", hanzi: "度", desc: "d (глухой непридыхательный 'т/д'), u, 4-й тон" },
      { pinyin: "nì", tone: 4, initial: "n", final: "i", hanzi: "逆", desc: "n + i, 4-й тон" },
      { pinyin: "rù", tone: 4, initial: "r", final: "u", hanzi: "入", desc: "r (сонорный звук между 'ж' и англ. 'r'), u, 4-й тон" },
      { pinyin: "wāi", tone: 1, initial: "w", final: "ai", hanzi: "歪", desc: "w + ai, 1-й высокий ровный тон (55)" },
      { pinyin: "xiōng", tone: 1, initial: "x", final: "iong", hanzi: "胸", desc: "x (мягкий шепелявый 'сь'), iong ('юн'), 1-й тон" },
      { pinyin: "fán", tone: 2, initial: "f", final: "an", hanzi: "烦", desc: "f + an, 2-й восходящий тон" },
      { pinyin: "mǎng", tone: 3, initial: "m", final: "ang", hanzi: "莽", desc: "m + ang (носовой заднеязычный), 3-й тон" },
      { pinyin: "pá", tone: 2, initial: "p", final: "a", hanzi: "爬", desc: "p (придыхательный 'пх'), a, 2-й тон" },
      { pinyin: "sāo", tone: 1, initial: "s", final: "ao", hanzi: "骚", desc: "s + ao, 1-й тон" },
      { pinyin: "xià", tone: 4, initial: "x", final: "ia", hanzi: "下", desc: "x + ia, 4-й тон" },
      { pinyin: "zhuān", tone: 1, initial: "zh", final: "uan", hanzi: "专", desc: "zh + uan ('уань'), 1-й тон" }
    ],
    task2: [
      { text: "guǎn lǐ", actualPinyin: "guán lǐ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: guǎn меняется на 2-й тон -> [guán lǐ] (управлять / менеджмент).", hanzi: "管理" },
      { text: "měi hǎo", actualPinyin: "méi hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: měi переходит во 2-й тон -> [méi hǎo] (прекрасный).", hanzi: "美好" },
      { text: "bǎo shǒu", actualPinyin: "báo shǒu", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: bǎo переходит во 2-й тон -> [báo shǒu] (консервативный / хранить тайну).", hanzi: "保守" },
      { text: "hěn bàng", actualPinyin: "hěn bàng (полу-3 + 4)", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "Перед 4-м тоном третий тон (hěn) произносится как полутретий (голос только опускается). bàng звучит полным 4-м тоном.", hanzi: "很棒" },
      { text: "tóufa", actualPinyin: "tóufa", ruleType: "neutral", ruleName: "2-й тон + Нулевой тон", explanation: "tóu звучит вторым тоном, второй слог fa произносится нулевым (легким) тоном (волосы).", hanzi: "头发" },
      { text: "běnlái", actualPinyin: "běnlái (полу-3 + 2)", ruleType: "half-3", ruleName: "Полутретий тон (3 + 2)", explanation: "Перед 2-м тоном (lái) третий тон (běn) произносится неполным третьим тоном (первоначально / изначально).", hanzi: "本来" }
    ],
    task3: [
      {
        ru: "Китайский сложный? – Да, китайский очень сложный.",
        hanzi: "汉语难吗？— 是，汉语很难。（или: 对，汉语很难）",
        pinyin: "Hànyǔ nán ma? — Shì, hànyǔ hěn nán.",
        literal: "Китайский трудный [вопрос]? — Да/Есть, китайский очень трудный.",
        grammar: "В вопросе с 吗 порядок слов прямой. Ответ 'Да' = 是 (shì) или 对 (duì). Перед качественным сказуемым 难 ставится 很 (hěn nán).",
        words: [
          { zh: "汉语", py: "hànyǔ", ru: "китайский язык" },
          { zh: "难", py: "nán", ru: "трудный" },
          { zh: "吗", py: "ma", ru: "вопросительная частица" },
          { zh: "是", py: "shì", ru: "да (быть)" },
          { zh: "很", py: "hěn", ru: "очень" }
        ]
      },
      {
        ru: "Она его старшая сестра, она не слишком занята.",
        hanzi: "她是他的姐姐，她不太忙。",
        pinyin: "Tā shì tā de jiějie, tā bú tài máng.",
        literal: "Она есть его старшая сестра, она не слишком занята.",
        grammar: "姐姐 (jiějie) = старшая сестра (второй слог нейтральный). 太... (tài...) = слишком. Отрицание: 不太 (bú tài). Обратите внимание: слог 不 (bù - 4-й тон) перед другим 4-м тоном меняется на 2-й тон -> [bú tài]!",
        words: [
          { zh: "她", py: "tā", ru: "она" },
          { zh: "是", py: "shì", ru: "быть" },
          { zh: "他的", py: "tā de", ru: "его" },
          { zh: "姐姐", py: "jiějie", ru: "старшая сестра" },
          { zh: "不太", py: "bú tài", ru: "не слишком" },
          { zh: "忙", py: "máng", ru: "занятой" }
        ]
      },
      {
        ru: "Это мой младший брат, ему 5 лет.",
        hanzi: "这是我的弟弟，他五岁。",
        pinyin: "Zhè shì wǒ de dìdi, tā wǔ suì.",
        literal: "Это есть мой младший брат, он пять лет.",
        grammar: "弟弟 (dìdi) = младший брат. Для указания возраста связка 是 НЕ ставится: сразу числительное + 岁 (suì - лет): 他五岁. В сочетании wǔ suì (3+4) слог wǔ произносится полутретьим тоном.",
        words: [
          { zh: "这", py: "zhè", ru: "это / этот" },
          { zh: "是", py: "shì", ru: "есть" },
          { zh: "我的", py: "wǒ de", ru: "мой" },
          { zh: "弟弟", py: "dìdi", ru: "младший брат" },
          { zh: "他", py: "tā", ru: "он" },
          { zh: "五", py: "wǔ", ru: "пять" },
          { zh: "岁", py: "suì", ru: "лет (возраст)" }
        ]
      }
    ]
  },

  {
    id: 3,
    title: "Билет 3",
    task1: [
      { pinyin: "bìn", tone: 4, initial: "b", final: "in", hanzi: "鬓", desc: "b + in, 4-й тон" },
      { pinyin: "bìng", tone: 4, initial: "b", final: "ing", hanzi: "病", desc: "b + ing, 4-й тон" },
      { pinyin: "jiǎn", tone: 3, initial: "j", final: "ian", hanzi: "简", desc: "j + ian (звучит 'иен'!), 3-й тон" },
      { pinyin: "liǎo", tone: 3, initial: "l", final: "iao", hanzi: "了", desc: "l + iao, 3-й тон" },
      { pinyin: "mái", tone: 2, initial: "m", final: "ai", hanzi: "埋", desc: "m + ai, 2-й тон" },
      { pinyin: "nāi", tone: 1, initial: "n", final: "ai", hanzi: "奶", desc: "n + ai, 1-й тон" },
      { pinyin: "rǎo", tone: 3, initial: "r", final: "ao", hanzi: "扰", desc: "r + ao, 3-й тон" },
      { pinyin: "shà", tone: 4, initial: "sh", final: "a", hanzi: "厦", desc: "sh (твердый 'ш') + a, 4-й тон" },
      { pinyin: "wò", tone: 4, initial: "w", final: "o", hanzi: "握", desc: "w + o, 4-й тон" },
      { pinyin: "xiáo", tone: 2, initial: "x", final: "ao", hanzi: "淆", desc: "x + ao, 2-й тон" },
      { pinyin: "yīn", tone: 1, initial: "y", final: "in", hanzi: "音", desc: "y + in, 1-й тон" },
      { pinyin: "zháo", tone: 2, initial: "zh", final: "ao", hanzi: "着", desc: "zh + ao, 2-й тон" }
    ],
    task2: [
      { text: "hǎi kǒu", actualPinyin: "hái kǒu", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "hǎi kǒu: 3+3 -> hǎi становится 2-м тоном: [hái kǒu].", hanzi: "海口" },
      { text: "kǎo dǎ", actualPinyin: "káo dǎ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "kǎo dǎ: 3+3 -> kǎo становится 2-м тоном: [káo dǎ].", hanzi: "拷打" },
      { text: "yǔ fǎ", actualPinyin: "yú fǎ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "yǔ fǎ (грамматика): 3+3 -> yǔ звучит 2-м тоном: [yú fǎ].", hanzi: "语法" },
      { text: "hěn bàng", actualPinyin: "hěn bàng", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "hěn (3 тон) перед bàng (4 тон) звучит как неполный третий тон (опускание без подъема).", hanzi: "很棒" },
      { text: "dìdi", actualPinyin: "dìdi", ruleType: "neutral", ruleName: "4-й тон + Нулевой тон", explanation: "Первый слог dì полный 4-й тон, второй di произносится легко без тона.", hanzi: "弟弟" },
      { text: "bǎi tuō", actualPinyin: "bǎi tuō", ruleType: "half-3", ruleName: "Полутретий тон (3 + 1)", explanation: "Перед 1-м тоном (tuō) третий тон (bǎi) звучит как полутретий (голос только падает вниз).", hanzi: "摆脱" }
    ],
    task3: [
      {
        ru: "Здравствуйте, я ваш учитель.",
        hanzi: "您好，我是你们的老师。（или: 我是你的老师）",
        pinyin: "Nín hǎo, wǒ shì nǐmen de lǎoshī.",
        literal: "Здравствуйте (вежл.), я есть ваш учитель.",
        grammar: "您好 (nín hǎo) — вежливое приветствие. 老师 (lǎoshī) — учитель. 你们的 (nǐmen de) — ваш (для группы) или 你的 (nǐ de) — твой/ваш.",
        words: [
          { zh: "您好", py: "nín hǎo", ru: "здравствуйте (вежливо)" },
          { zh: "我", py: "wǒ", ru: "я" },
          { zh: "是", py: "shì", ru: "есть" },
          { zh: "你们的", py: "nǐmen de", ru: "ваш (множ.)" },
          { zh: "老师", py: "lǎoshī", ru: "учитель" }
        ]
      },
      {
        ru: "Он мой студент, его зовут Миша.",
        hanzi: "他是我的学生，他叫米沙。",
        pinyin: "Tā shì wǒ de xuésheng, tā jiào Mǐshā.",
        literal: "Он есть мой студент, он зовется Миша.",
        grammar: "学生 (xuésheng) — студент. 米沙 (Mǐshā) — китайская транскрипция имени Миша (3+1 тон).",
        words: [
          { zh: "他", py: "tā", ru: "он" },
          { zh: "是", py: "shì", ru: "есть" },
          { zh: "我的", py: "wǒ de", ru: "мой" },
          { zh: "学生", py: "xuésheng", ru: "студент" },
          { zh: "叫", py: "jiào", ru: "зовут" },
          { zh: "米沙", py: "Mǐshā", ru: "Миша" }
        ]
      },
      {
        ru: "Та книга не моя, эта книга моя.",
        hanzi: "那本书不是我的，这本书是我的。（или: 那不是我的书，这是我的书）",
        pinyin: "Nà běn shū bú shì wǒ de, zhè běn shū shì wǒ de.",
        literal: "Та [счетное слово] книга не есть моя, эта [счетное слово] книга есть моя.",
        grammar: "那 (nà) = та, 这 (zhè) = эта. 本 (běn) — счетное слово для книг. 书 (shū) = книга. Отрицание 不是: bù перед 4 тоном меняется на 2 тон -> [bú shì]!",
        words: [
          { zh: "那", py: "nà", ru: "та" },
          { zh: "本", py: "běn", ru: "сч. слово для книг" },
          { zh: "书", py: "shū", ru: "книга" },
          { zh: "不是", py: "bú shì", ru: "не есть" },
          { zh: "我的", py: "wǒ de", ru: "моя" },
          { zh: "这", py: "zhè", ru: "эта" }
        ]
      }
    ]
  },

  {
    id: 4,
    title: "Билет 4",
    task1: [
      { pinyin: "chǎo", tone: 3, initial: "ch", final: "ao", hanzi: "炒", desc: "ch + ao, 3-й тон" },
      { pinyin: "chuǒ", tone: 3, initial: "ch", final: "uo", hanzi: "戳", desc: "ch + uo, 3-й тон" },
      { pinyin: "fèn", tone: 4, initial: "f", final: "en", hanzi: "份", desc: "f + en, 4-й тон" },
      { pinyin: "huǎn", tone: 3, initial: "h", final: "uan", hanzi: "缓", desc: "h + uan, 3-й тон" },
      { pinyin: "kěn", tone: 3, initial: "k", final: "en", hanzi: "肯", desc: "k + en, 3-й тон" },
      { pinyin: "kuǐ", tone: 3, initial: "k", final: "ui", hanzi: "傀", desc: "k + ui, 3-й тон" },
      { pinyin: "lǚ", tone: 3, initial: "l", final: "ü", hanzi: "旅", desc: "l + ü (губы трубочкой на 'у', звук 'и'), 3-й тон" },
      { pinyin: "mìng", tone: 4, initial: "m", final: "ing", hanzi: "命", desc: "m + ing, 4-й тон" },
      { pinyin: "pián", tone: 2, initial: "p", final: "ian", hanzi: "便", desc: "p + ian ('иен'), 2-й тон" },
      { pinyin: "piē", tone: 1, initial: "p", final: "ie", hanzi: "瞥", desc: "p + ie, 1-й тон" },
      { pinyin: "tí", tone: 2, initial: "t", final: "i", hanzi: "提", desc: "t (придыхательный 'тх') + i, 2-й тон" },
      { pinyin: "zǔ", tone: 3, initial: "z", final: "u", hanzi: "组", desc: "z + u, 3-й тон" }
    ],
    task2: [
      { text: "mǐn gǎn", actualPinyin: "mín gǎn", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: mǐn переходит во 2-й тон -> [mín gǎn] (чувствительный).", hanzi: "敏感" },
      { text: "fǎ yǔ", actualPinyin: "fá yǔ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: fǎ переходит во 2-й тон -> [fá yǔ] (французский язык).", hanzi: "法语" },
      { text: "hěn hǎo", actualPinyin: "hén hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: hěn переходит во 2-й тон -> [hén hǎo] (очень хорошо).", hanzi: "很好" },
      { text: "xiě xìn", actualPinyin: "xiě xìn", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "xiě (3 тон) перед xìn (4 тон) опускается без подъема (писать письмо).", hanzi: "写信" },
      { text: "nǐmen", actualPinyin: "nǐmen", ruleType: "neutral", ruleName: "Полутретий + Нулевой тон", explanation: "nǐ опускается вниз, men произносится нейтрально без тона (вы).", hanzi: "你们" },
      { text: "lǎoshī", actualPinyin: "lǎoshī", ruleType: "half-3", ruleName: "Полутретий тон (3 + 1)", explanation: "lǎo (3 тон) перед shī (1 тон) звучит полутретьим тоном (учитель).", hanzi: "老师" }
    ],
    task3: [
      {
        ru: "Здравствуйте, я ваш студент.",
        hanzi: "您好，我是您的学生。（или: 我是你们的学生）",
        pinyin: "Nín hǎo, wǒ shì nín de xuésheng.",
        literal: "Здравствуйте (вежл.), я есть Ваш студент.",
        grammar: "您 (nín) — Вы (вежливое обращение к учителю). 您的学生 (nín de xuésheng) — Ваш студент.",
        words: [
          { zh: "您好", py: "nín hǎo", ru: "здравствуйте" },
          { zh: "我是", py: "wǒ shì", ru: "я есть" },
          { zh: "您的", py: "nín de", ru: "Ваш" },
          { zh: "学生", py: "xuésheng", ru: "студент" }
        ]
      },
      {
        ru: "Я студент, я очень занят.",
        hanzi: "我是学生，我很忙。",
        pinyin: "Wǒ shì xuésheng, wǒ hěn máng.",
        literal: "Я есть студент, я очень занят.",
        grammar: "Первая часть со связкой 是 (я студент). Вторая часть с качественным сказуемым: wǒ hěn máng (без 是!).",
        words: [
          { zh: "我是", py: "wǒ shì", ru: "я являюсь" },
          { zh: "学生", py: "xuésheng", ru: "студент" },
          { zh: "我很忙", py: "wǒ hěn máng", ru: "я очень занят" }
        ]
      },
      {
        ru: "Как у тебя дела? Очень хорошо, а у тебя?",
        hanzi: "你好吗？我很好，你呢？",
        pinyin: "Nǐ hǎo ma? Wǒ hěn hǎo, nǐ ne?",
        literal: "Ты хорош [вопрос]? Я очень хорош, ты [обратный вопрос]?",
        grammar: "Частица 呢 (ne) оформляет неполный встречный вопрос: 'А ты? / А у тебя?'. Произносится легким нулевым тоном.",
        words: [
          { zh: "你好吗", py: "nǐ hǎo ma", ru: "как дела?" },
          { zh: "我很好", py: "wǒ hěn hǎo", ru: "я очень хорошо" },
          { zh: "你呢", py: "nǐ ne", ru: "а ты? / а у тебя?" }
        ]
      }
    ]
  },

  {
    id: 5,
    title: "Билет 5",
    task1: [
      { pinyin: "bǎ", tone: 3, initial: "b", final: "a", hanzi: "把", desc: "b + a, 3-й тон" },
      { pinyin: "duì", tone: 4, initial: "d", final: "ui", hanzi: "对", desc: "d + ui ('уэй'), 4-й тон" },
      { pinyin: "gùn", tone: 4, initial: "g", final: "un", hanzi: "棍", desc: "g + un, 4-й тон" },
      { pinyin: "miǎo", tone: 3, initial: "m", final: "iao", hanzi: "秒", desc: "m + iao, 3-й тон" },
      { pinyin: "pāo", tone: 1, initial: "p", final: "ao", hanzi: "抛", desc: "p + ao, 1-й тон" },
      { pinyin: "péi", tone: 2, initial: "p", final: "ei", hanzi: "陪", desc: "p + ei, 2-й тон" },
      { pinyin: "rǎn", tone: 3, initial: "r", final: "an", hanzi: "染", desc: "r + an, 3-й тон" },
      { pinyin: "rēn", tone: 1, initial: "r", final: "en", hanzi: "rēn", desc: "r + en, 1-й тон" },
      { pinyin: "rěng", tone: 3, initial: "r", final: "eng", hanzi: "扔", desc: "r + eng, 3-й тон" },
      { pinyin: "zhuō", tone: 1, initial: "zh", final: "uo", hanzi: "桌", desc: "zh + uo, 1-й тон" },
      { pinyin: "tùn", tone: 4, initial: "t", final: "un", hanzi: "褪", desc: "t + un, 4-й тон" },
      { pinyin: "tuó", tone: 2, initial: "t", final: "uo", hanzi: "驼", desc: "t + uo, 2-й тон" }
    ],
    task2: [
      { text: "kè běn", actualPinyin: "kè běn", ruleType: "other", ruleName: "4-й тон + 3-й тон", explanation: "Внимание! kè (4-й тон, падающий) + běn (3-й тон). Здесь нет модуляции 3 тона: kè звучит 4-м, běn звучит 3-м (учебник).", hanzi: "课本" },
      { text: "měi hǎo", actualPinyin: "méi hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: měi переходит во 2-й тон -> [méi hǎo].", hanzi: "美好" },
      { text: "jǐ diǎn", actualPinyin: "jí diǎn", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: jǐ переходит во 2-й тон -> [jí diǎn] (сколько времени? который час?).", hanzi: "几点" },
      { text: "zhǔn bèi", actualPinyin: "zhǔn bèi", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "zhǔn (3 тон) перед bèi (4 тон) звучит полутретьим тоном (готовить, готовиться).", hanzi: "准备" },
      { text: "nǎinai", actualPinyin: "nǎinai", ruleType: "neutral", ruleName: "Полутретий + Нулевой тон", explanation: "Первый слог nǎi звучит полутретьим тоном, второй nai — легкий нейтральный тон (бабушка).", hanzi: "奶奶" },
      { text: "běnlái", actualPinyin: "běnlái", ruleType: "half-3", ruleName: "Полутретий тон (3 + 2)", explanation: "běn (3 тон) перед lái (2 тон) опускается без подъема.", hanzi: "本来" }
    ],
    task3: [
      {
        ru: "Они все мои студенты.",
        hanzi: "他们都是我的学生。",
        pinyin: "Tāmen dōu shì wǒ de xuésheng.",
        literal: "Они все есть мои студенты.",
        grammar: "Правило грамматики都 (dōu = все): 都 ВСЕГДА стоит ПЕРЕД сказуемым! Поэтому: 他们 + 都 + 是 + 我的学生.",
        words: [
          { zh: "他们", py: "tāmen", ru: "они" },
          { zh: "都", py: "dōu", ru: "все" },
          { zh: "是", py: "shì", ru: "быть" },
          { zh: "我的", py: "wǒ de", ru: "мои" },
          { zh: "学生", py: "xuésheng", ru: "студенты" }
        ]
      },
      {
        ru: "Младший брат очень занят, младшая сестра не занята.",
        hanzi: "弟弟很忙，妹妹不忙。",
        pinyin: "Dìdi hěn máng, mèimei bù máng.",
        literal: "Младший брат очень занят, младшая сестра не занята.",
        grammar: "Сравнение двух подлежащих: 弟弟很忙 (брат очень занят), 妹妹不忙 (сестра не занята). В отрицании: bù (4 тон) перед máng (2 тон) сохраняет свой 4-й тон.",
        words: [
          { zh: "弟弟", py: "dìdi", ru: "младший брат" },
          { zh: "很忙", py: "hěn máng", ru: "очень занят" },
          { zh: "妹妹", py: "mèimei", ru: "младшая сестра" },
          { zh: "不忙", py: "bù máng", ru: "не занята" }
        ]
      },
      {
        ru: "китайский язык сложный? Китайский не слишком сложный.",
        hanzi: "汉语难吗？汉语不太难。",
        pinyin: "Hànyǔ nán ma? Hànyǔ bú tài nán.",
        literal: "Китайский сложный [вопрос]? Китайский не слишком сложный.",
        grammar: "Отрицание 'не слишком' = 不太 (bú tài). Обратите внимание: bù перед 4 тоном меняется на 2 тон -> [bú tài]!",
        words: [
          { zh: "汉语", py: "hànyǔ", ru: "китайский язык" },
          { zh: "难吗", py: "nán ma", ru: "сложный ли?" },
          { zh: "不太难", py: "bú tài nán", ru: "не слишком сложный" }
        ]
      }
    ]
  },

  {
    id: 6,
    title: "Билет 6",
    task1: [
      { pinyin: "guáng", tone: 2, initial: "g", final: "uang", hanzi: "光", desc: "g + uang, 2-й тон" },
      { pinyin: "guí", tone: 2, initial: "g", final: "ui", hanzi: "龟", desc: "g + ui, 2-й тон" },
      { pinyin: "mì", tone: 4, initial: "m", final: "i", hanzi: "密", desc: "m + i, 4-й тон" },
      { pinyin: "nāng", tone: 1, initial: "n", final: "ang", hanzi: "囔", desc: "n + ang, 1-й тон" },
      { pinyin: "nēi", tone: 1, initial: "n", final: "ei", hanzi: "内", desc: "n + ei, 1-й тон" },
      { pinyin: "nuǒ", tone: 3, initial: "n", final: "uo", hanzi: "糯", desc: "n + uo, 3-й тон" },
      { pinyin: "ruó", tone: 2, initial: "r", final: "uo", hanzi: "ruó", desc: "r + uo, 2-й тон" },
      { pinyin: "shuà", tone: 4, initial: "sh", final: "ua", hanzi: "刷", desc: "sh + ua, 4-й тон" },
      { pinyin: "xiē", tone: 1, initial: "x", final: "ie", hanzi: "些", desc: "x + ie, 1-й тон" },
      { pinyin: "dà", tone: 4, initial: "d", final: "a", hanzi: "大", desc: "d + a, 4-й тон" },
      { pinyin: "zhǎn", tone: 3, initial: "zh", final: "an", hanzi: "展", desc: "zh + an, 3-й тон" },
      { pinyin: "huá", tone: 2, initial: "h", final: "ua", hanzi: "华", desc: "h + ua, 2-й тон" }
    ],
    task2: [
      { text: "guǎn lǐ", actualPinyin: "guán lǐ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: guǎn меняется на 2-й тон -> [guán lǐ].", hanzi: "管理" },
      { text: "měi hǎo", actualPinyin: "méi hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: měi переходит во 2-й тон -> [méi hǎo].", hanzi: "美好" },
      { text: "bǎo shǒu", actualPinyin: "báo shǒu", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: bǎo переходит во 2-й тон -> [báo shǒu].", hanzi: "保守" },
      { text: "hěn bàng", actualPinyin: "hěn bàng", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "hěn опускается вниз перед 4-м тоном bàng.", hanzi: "很棒" },
      { text: "shǒu xiān", actualPinyin: "shǒu xiān", ruleType: "half-3", ruleName: "Полутретий тон (3 + 1)", explanation: "shǒu (3 тон) перед xiān (1 тон) звучит полутретьим тоном (сначала / прежде всего).", hanzi: "首先" },
      { text: "hǎole", actualPinyin: "hǎole", ruleType: "neutral", ruleName: "Полутретий + Нулевой тон", explanation: "hǎo звучит полутретьим тоном, le — нулевым тоном (готово / ладно).", hanzi: "好了" }
    ],
    task3: [
      {
        ru: "Это твой учитель? – Это учитель моего старшего брата.",
        hanzi: "这是你的老师吗？— 这是我哥哥的老师。",
        pinyin: "Zhè shì nǐ de lǎoshī ma? — Zhè shì wǒ gēge de lǎoshī.",
        literal: "Это есть твой учитель [вопрос]? — Это есть моего старшего брата учитель.",
        grammar: "Порядок принадлежности с 的 (de): ВЛАДЕЛЕЦ + 的 + ОБЪЕКТ. 'Учитель старшего брата' = 我哥哥的老师 (брат + de + учитель).",
        words: [
          { zh: "这是", py: "zhè shì", ru: "это есть" },
          { zh: "你的", py: "nǐ de", ru: "твой" },
          { zh: "老师", py: "lǎoshī", ru: "учитель" },
          { zh: "我哥哥的", py: "wǒ gēge de", ru: "моего старшего брата" }
        ]
      },
      {
        ru: "Ты считаешь русский язык сложный? – Я считаю русский язык сложный.",
        hanzi: "你觉得俄语难吗？— 我觉得俄语难。（или: 我觉得俄语很难）",
        pinyin: "Nǐ juéde éyǔ nán ma? — Wǒ juéde éyǔ nán.",
        literal: "Ты считаешь русский язык трудным [вопрос]? — Я считаю русский язык трудным.",
        grammar: "俄语 (éyǔ) = русский язык (обратите внимание на фонетику: 俄 é 2-й тон, 语 yǔ 3-й тон). 觉得 (juéde) = считать/полагать.",
        words: [
          { zh: "你觉得", py: "nǐ juéde", ru: "ты считаешь" },
          { zh: "俄语", py: "éyǔ", ru: "русский язык" },
          { zh: "难吗", py: "nán ma", ru: "трудный ли?" },
          { zh: "我觉得", py: "wǒ juéde", ru: "я считаю" }
        ]
      },
      {
        ru: "Я тоже очень занят.",
        hanzi: "我也很忙。",
        pinyin: "Wǒ yě hěn máng.",
        literal: "Я тоже очень занят.",
        grammar: "Правило наречия 也 (yě = тоже): всегда стоит ПЕРЕД сказуемым! Поэтому: 我 + 也 + 很忙.",
        words: [
          { zh: "我", py: "wǒ", ru: "я" },
          { zh: "也", py: "yě", ru: "тоже" },
          { zh: "很忙", py: "hěn máng", ru: "очень занят" }
        ]
      }
    ]
  },

  {
    id: 7,
    title: "Билет 7",
    task1: [
      { pinyin: "bián", tone: 2, initial: "b", final: "ian", hanzi: "贬", desc: "b + ian ('иен'), 2-й тон" },
      { pinyin: "fō", tone: 1, initial: "f", final: "o", hanzi: "佛", desc: "f + o, 1-й тон" },
      { pinyin: "mé", tone: 2, initial: "m", final: "e", hanzi: "mé", desc: "m + e, 2-й тон" },
      { pinyin: "nǐn", tone: 3, initial: "n", final: "in", hanzi: "您", desc: "n + in (в билете указан 3-й тон nǐn), произносим нисходяще-восходящим" },
      { pinyin: "shéi", tone: 2, initial: "sh", final: "ei", hanzi: "谁", desc: "sh + ei ('кто'), 2-й тон" },
      { pinyin: "sóu", tone: 2, initial: "s", final: "ou", hanzi: "搜", desc: "s + ou, 2-й тон" },
      { pinyin: "tèng", tone: 4, initial: "t", final: "eng", hanzi: "疼", desc: "t + eng, 4-й тон" },
      { pinyin: "xiāng", tone: 1, initial: "x", final: "iang", hanzi: "香", desc: "x + iang ('ян' с заднеязычным ng), 1-й тон" },
      { pinyin: "yū", tone: 1, initial: "y", final: "u", hanzi: "迂", desc: "yu (произносится ü 'у-и'), 1-й тон" },
      { pinyin: "zhǐ", tone: 3, initial: "zh", final: "i", hanzi: "纸", desc: "zh + i (язык назад, звук близкий к 'джы'), 3-й тон" },
      { pinyin: "zhuǒ", tone: 3, initial: "zh", final: "uo", hanzi: "拙", desc: "zh + uo, 3-й тон" },
      { pinyin: "zī", tone: 1, initial: "z", final: "i", hanzi: "资", desc: "z + i (переднеязычный 'дзы'), 1-й тон" }
    ],
    task2: [
      { text: "mǐn gǎn", actualPinyin: "mín gǎn", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: mǐn переходит во 2-й тон -> [mín gǎn].", hanzi: "敏感" },
      { text: "fǎ yǔ", actualPinyin: "fá yǔ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: fǎ переходит во 2-й тон -> [fá yǔ].", hanzi: "法语" },
      { text: "hěn hǎo", actualPinyin: "hén hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: hěn переходит во 2-й тон -> [hén hǎo].", hanzi: "很好" },
      { text: "hěn bàng", actualPinyin: "hěn bàng", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "hěn опускается вниз перед 4-м тоном bàng.", hanzi: "很棒" },
      { text: "dìdi", actualPinyin: "dìdi", ruleType: "neutral", ruleName: "4-й тон + Нулевой тон", explanation: "dì (4-й падающий) + di (легкий нулевой).", hanzi: "弟弟" },
      { text: "bǎi tuō", actualPinyin: "bǎi tuō", ruleType: "half-3", ruleName: "Полутретий тон (3 + 1)", explanation: "bǎi опускается вниз перед 1-м тоном tuō.", hanzi: "摆脱" }
    ],
    task3: [
      {
        ru: "Это не моя книга, это книга учителя.",
        hanzi: "这不是我的书，这是老师的书。",
        pinyin: "Zhè bú shì wǒ de shū, zhè shì lǎoshī de shū.",
        literal: "Это не есть моя книга, это есть учителя книга.",
        grammar: "不是 (bú shì) — отрицание со сменой тона слога bù на 2-й тон. Притяжательная частица 的: 老师的书 (учителя книга).",
        words: [
          { zh: "这不是", py: "zhè bú shì", ru: "это не есть" },
          { zh: "我的书", py: "wǒ de shū", ru: "моя книга" },
          { zh: "这是", py: "zhè shì", ru: "это есть" },
          { zh: "老师的书", py: "lǎoshī de shū", ru: "книга учителя" }
        ]
      },
      {
        ru: "Твой папа учитель? Нет, мой папа тренер.",
        hanzi: "你爸爸是老师吗？不，我爸爸是教练。",
        pinyin: "Nǐ bàba shì lǎoshī ma? Bù, wǒ bàba shì jiàoliàn.",
        literal: "Твой папа есть учитель [вопрос]? Нет, мой папа есть тренер.",
        grammar: "Тренер по-китайски = 教练 (jiàoliàn, 4+4 тон). Отрицание в ответе: 不 (bù).",
        words: [
          { zh: "你爸爸", py: "nǐ bàba", ru: "твой папа" },
          { zh: "是老师吗", py: "shì lǎoshī ma", ru: "учитель ли?" },
          { zh: "不", py: "bù", ru: "нет" },
          { zh: "我爸爸", py: "wǒ bàba", ru: "мой папа" },
          { zh: "教练", py: "jiàoliàn", ru: "тренер" }
        ]
      },
      {
        ru: "Русский язык сложный? Не слишком сложный.",
        hanzi: "俄语难吗？不太难。",
        pinyin: "Éyǔ nán ma? Bú tài nán.",
        literal: "Русский язык трудный [вопрос]? Не слишком трудный.",
        grammar: "俄语 (éyǔ) = русский язык. Не слишком = 不太 (bú tài).",
        words: [
          { zh: "俄语", py: "éyǔ", ru: "русский язык" },
          { zh: "难吗", py: "nán ma", ru: "трудный ли?" },
          { zh: "不太难", py: "bú tài nán", ru: "не слишком трудный" }
        ]
      }
    ]
  },

  {
    id: 8,
    title: "Билет 8",
    task1: [
      { pinyin: "chái", tone: 2, initial: "ch", final: "ai", hanzi: "柴", desc: "ch + ai, 2-й тон" },
      { pinyin: "fǔ", tone: 3, initial: "f", final: "u", hanzi: "府", desc: "f + u, 3-й тон" },
      { pinyin: "gòng", tone: 4, initial: "g", final: "ong", hanzi: "共", desc: "g + ong, 4-й тон" },
      { pinyin: "jiá", tone: 2, initial: "j", final: "ia", hanzi: "夹", desc: "j + ia, 2-й тон" },
      { pinyin: "jín", tone: 2, initial: "j", final: "in", hanzi: "斤", desc: "j + in, 2-й тон" },
      { pinyin: "jù", tone: 4, initial: "j", final: "u", hanzi: "句", desc: "j + u (после j звук u читается как ü!), 4-й тон" },
      { pinyin: "kūn", tone: 1, initial: "k", final: "un", hanzi: "昆", desc: "k + un, 1-й тон" },
      { pinyin: "lià", tone: 4, initial: "l", final: "ia", hanzi: "俩", desc: "l + ia, 4-й тон" },
      { pinyin: "shóu", tone: 2, initial: "sh", final: "ou", hanzi: "熟", desc: "sh + ou, 2-й тон" },
      { pinyin: "mān", tone: 1, initial: "m", final: "an", hanzi: "慢", desc: "m + an, 1-й тон" },
      { pinyin: "pù", tone: 4, initial: "p", final: "u", hanzi: "铺", desc: "p + u, 4-й тон" },
      { pinyin: "wàn", tone: 4, initial: "w", final: "an", hanzi: "万", desc: "w + an, 4-й тон" }
    ],
    task2: [
      { text: "nǐ hǎo", actualPinyin: "ní hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: nǐ переходит во 2-й тон -> [ní hǎo].", hanzi: "你好" },
      { text: "nǐ yě hǎo", actualPinyin: "ní yé hǎo", ruleType: "3+3+3", ruleName: "Три 3-х тона подряд (3+3+3)", explanation: "В группе [nǐ yě] [hǎo] первые два слога меняются на 2-й тон -> [ní yé hǎo].", hanzi: "你也好" },
      { text: "wǒ hǎo", actualPinyin: "wó hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3: wǒ переходит во 2-й тон -> [wó hǎo].", hanzi: "我好" },
      { text: "nǐ lái", actualPinyin: "nǐ lái", ruleType: "half-3", ruleName: "Полутретий тон (3 + 2)", explanation: "nǐ перед lái (2 тон) произносится полутретьим тоном.", hanzi: "你来" },
      { text: "mèimei", actualPinyin: "mèimei", ruleType: "neutral", ruleName: "4-й тон + Нулевой тон", explanation: "mèi (4-й) + mei (нулевой легкий).", hanzi: "妹妹" },
      { text: "hǎo ba", actualPinyin: "hǎo ba", ruleType: "neutral", ruleName: "Полутретий + Нулевой тон", explanation: "hǎo опускается вниз, ba звучит легко без тона.", hanzi: "好吧" }
    ],
    task3: [
      {
        ru: "Привет, как дела? – У меня все очень хорошо. (Буквально: я очень хорошо)",
        hanzi: "你好，你好吗？— 我很好。（или: 我也都很好）",
        pinyin: "Nǐ hǎo, nǐ hǎo ma? — Wǒ hěn hǎo.",
        literal: "Привет, ты хорош? — Я очень хорош.",
        grammar: "В буквальном переводе: 我很好 (Wǒ hěn hǎo). Если подчеркнуть 'все': 我也都很好 (wǒ yě dōu hěn hǎo).",
        words: [
          { zh: "你好", py: "nǐ hǎo", ru: "привет" },
          { zh: "你好吗", py: "nǐ hǎo ma", ru: "как дела?" },
          { zh: "我很好", py: "wǒ hěn hǎo", ru: "у меня все очень хорошо" }
        ]
      },
      {
        ru: "Они мои папа и мама. Они все очень заняты.",
        hanzi: "他们是我的爸爸和妈妈。他们都很忙。",
        pinyin: "Tāmen shì wǒ de bàba hé māma. Tāmen dōu hěn máng.",
        literal: "Они есть мои папа и мама. Они все очень заняты.",
        grammar: "Позиция 都 (dōu): перед сказуемым很忙! Они все заняты = 他们都很忙.",
        words: [
          { zh: "他们是", py: "tāmen shì", ru: "они есть" },
          { zh: "我的爸爸和妈妈", py: "wǒ de bàba hé māma", ru: "мои папа и мама" },
          { zh: "他们", py: "tāmen", ru: "они" },
          { zh: "都", py: "dōu", ru: "все" },
          { zh: "很忙", py: "hěn máng", ru: "очень заняты" }
        ]
      },
      {
        ru: "Я считаю, китайский сложный.",
        hanzi: "我觉得汉语难。（или: 我觉得汉语很难）",
        pinyin: "Wǒ juéde hànyǔ nán. (Wǒ juéde hànyǔ hěn nán.)",
        literal: "Я считаю китайский трудный.",
        grammar: "我觉得 + [высказывание]. 汉语 (китайский язык), 难 (трудный).",
        words: [
          { zh: "我觉得", py: "wǒ juéde", ru: "я считаю" },
          { zh: "汉语", py: "hànyǔ", ru: "китайский" },
          { zh: "难", py: "nán", ru: "сложный" }
        ]
      }
    ]
  },

  {
    id: 9,
    title: "Билет 9",
    task1: [
      { pinyin: "chún", tone: 2, initial: "ch", final: "un", hanzi: "纯", desc: "ch + un, 2-й тон" },
      { pinyin: "zhuàng", tone: 4, initial: "zh", final: "uang", hanzi: "壮", desc: "zh + uang, 4-й тон" },
      { pinyin: "yuǎn", tone: 3, initial: "y", final: "uan", hanzi: "远", desc: "yu + an (произносится 'юань'), 3-й тон" },
      { pinyin: "diàn", tone: 4, initial: "d", final: "ian", hanzi: "电", desc: "d + ian ('диен'), 4-й тон" },
      { pinyin: "léng", tone: 2, initial: "l", final: "eng", hanzi: "棱", desc: "l + eng, 2-й тон" },
      { pinyin: "pō", tone: 1, initial: "p", final: "o", hanzi: "坡", desc: "p + o, 1-й тон" },
      { pinyin: "qì", tone: 4, initial: "q", final: "i", hanzi: "气", desc: "q (мягкий 'цьх') + i, 4-й тон" },
      { pinyin: "liǎo", tone: 3, initial: "l", final: "iao", hanzi: "了", desc: "l + iao, 3-й тон" },
      { pinyin: "shuān", tone: 1, initial: "sh", final: "uan", hanzi: "栓", desc: "sh + uan, 1-й тон" },
      { pinyin: "xǐn", tone: 3, initial: "x", final: "in", hanzi: "紧", desc: "x + in, 3-й тон" },
      { pinyin: "kūn", tone: 1, initial: "k", final: "un", hanzi: "坤", desc: "k + un, 1-й тон" },
      { pinyin: "yìng", tone: 4, initial: "y", final: "ing", hanzi: "硬", desc: "y + ing, 4-й тон" }
    ],
    task2: [
      { text: "hǎi kǒu", actualPinyin: "hái kǒu", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "hǎi kǒu -> [hái kǒu].", hanzi: "海口" },
      { text: "kǎo dǎ", actualPinyin: "káo dǎ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "kǎo dǎ -> [káo dǎ].", hanzi: "拷打" },
      { text: "yǔ fǎ", actualPinyin: "yú fǎ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "yǔ fǎ -> [yú fǎ].", hanzi: "语法" },
      { text: "hěn bàng", actualPinyin: "hěn bàng", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "hěn опускается перед 4 тоном bàng.", hanzi: "很棒" },
      { text: "dìdi", actualPinyin: "dìdi", ruleType: "neutral", ruleName: "4-й тон + Нулевой тон", explanation: "dì + di (нулевой тон).", hanzi: "弟弟" },
      { text: "bǎi tuō", actualPinyin: "bǎi tuō", ruleType: "half-3", ruleName: "Полутретий тон (3 + 1)", explanation: "bǎi опускается перед 1 тоном tuō.", hanzi: "摆脱" }
    ],
    task3: [
      {
        ru: "Как дела? Очень хорошо, а у тебя?",
        hanzi: "你好吗？很好，你呢？",
        pinyin: "Nǐ hǎo ma? Hěn hǎo, nǐ ne?",
        literal: "Ты хорош? Очень хорошо, ты [обратный вопрос]?",
        grammar: "你呢？ (nǐ ne?) — обратный неполный вопрос.",
        words: [
          { zh: "你好吗", py: "nǐ hǎo ma", ru: "как дела?" },
          { zh: "很好", py: "hěn hǎo", ru: "очень хорошо" },
          { zh: "你呢", py: "nǐ ne", ru: "а ты?" }
        ]
      },
      {
        ru: "Они тоже очень заняты.",
        hanzi: "他们也都很忙。（или: 他们也很忙）",
        pinyin: "Tāmen yě dōu hěn máng. (Tāmen yě hěn máng.)",
        literal: "Они тоже все очень заняты.",
        grammar: "Порядок наречий: 也 (yě) стоит ПЕРЕД 都 (dōu): 也 + 都 + 很忙!",
        words: [
          { zh: "他们", py: "tāmen", ru: "они" },
          { zh: "也", py: "yě", ru: "тоже" },
          { zh: "都", py: "dōu", ru: "все" },
          { zh: "很忙", py: "hěn máng", ru: "очень заняты" }
        ]
      },
      {
        ru: "Это моя старшая сестра, она считает, китайский тоже очень сложный.",
        hanzi: "这是我的姐姐，她觉得汉语也很难。",
        pinyin: "Zhè shì wǒ de jiějie, tā juéde hànyǔ yě hěn nán.",
        literal: "Это есть моя старшая сестра, она считает китайский тоже очень трудный.",
        grammar: "姐姐 (jiějie). Наречие 也 (yě) стоит перед сказуемым很难: 汉语 + 也 + 很难.",
        words: [
          { zh: "这是我的姐姐", py: "zhè shì wǒ de jiějie", ru: "это моя старшая сестра" },
          { zh: "她觉得", py: "tā juéde", ru: "она считает" },
          { zh: "汉语也很难", py: "hànyǔ yě hěn nán", ru: "китайский тоже очень сложный" }
        ]
      }
    ]
  },

  {
    id: 10,
    title: "Билет 10",
    task1: [
      { pinyin: "bǒ", tone: 3, initial: "b", final: "o", hanzi: "跛", desc: "b + o, 3-й тон" },
      { pinyin: "chē", tone: 1, initial: "ch", final: "e", hanzi: "车", desc: "ch + e, 1-й тон" },
      { pinyin: "cóu", tone: 2, initial: "c", final: "ou", hanzi: "愁", desc: "c (придыхательный 'цх') + ou, 2-й тон" },
      { pinyin: "fǎ", tone: 3, initial: "f", final: "a", hanzi: "法", desc: "f + a, 3-й тон" },
      { pinyin: "hǎo", tone: 3, initial: "h", final: "ao", hanzi: "好", desc: "h + ao, 3-й тон" },
      { pinyin: "liān", tone: 1, initial: "l", final: "ian", hanzi: "连", desc: "l + ian ('лиен'), 1-й тон" },
      { pinyin: "juǎn", tone: 3, initial: "j", final: "uan", hanzi: "卷", desc: "j + uan (после j это üan 'юань'), 3-й тон" },
      { pinyin: "suī", tone: 1, initial: "s", final: "ui", hanzi: "虽", desc: "s + ui, 1-й тон" },
      { pinyin: "tǎn", tone: 3, initial: "t", final: "an", hanzi: "坦", desc: "t + an, 3-й тон" },
      { pinyin: "xiǔ", tone: 3, initial: "x", final: "iu", hanzi: "宿", desc: "x + iu ('сиоу'), 3-й тон" },
      { pinyin: "yāng", tone: 1, initial: "y", final: "ang", hanzi: "央", desc: "y + ang, 1-й тон" },
      { pinyin: "dì", tone: 4, initial: "d", final: "i", hanzi: "地", desc: "d + i, 4-й тон" }
    ],
    task2: [
      { text: "kèběn", actualPinyin: "kèběn", ruleType: "other", ruleName: "4-й тон + 3-й тон", explanation: "kè (4-й тон) + běn (3-й тон). Модуляции нет.", hanzi: "课本" },
      { text: "měi hǎo", actualPinyin: "méi hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "měi hǎo -> [méi hǎo].", hanzi: "美好" },
      { text: "jǐ diǎn", actualPinyin: "jí diǎn", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "jǐ diǎn -> [jí diǎn].", hanzi: "几点" },
      { text: "zhǔn bèi", actualPinyin: "zhǔn bèi", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "zhǔn опускается вниз перед 4 тоном bèi.", hanzi: "准备" },
      { text: "nǎinai", actualPinyin: "nǎinai", ruleType: "neutral", ruleName: "Полутретий + Нулевой тон", explanation: "nǎi полутретий, nai нулевой.", hanzi: "奶奶" },
      { text: "běn lái", actualPinyin: "běn lái", ruleType: "half-3", ruleName: "Полутретий тон (3 + 2)", explanation: "běn опускается вниз перед 2 тоном lái.", hanzi: "本来" }
    ],
    task3: [
      {
        ru: "Они все мои студенты.",
        hanzi: "他们都是我的学生。",
        pinyin: "Tāmen dōu shì wǒ de xuésheng.",
        literal: "Они все есть мои студенты.",
        grammar: "都 (dōu) стоит перед глаголом 是 (shì).",
        words: [
          { zh: "他们", py: "tāmen", ru: "они" },
          { zh: "都", py: "dōu", ru: "все" },
          { zh: "是", py: "shì", ru: "есть" },
          { zh: "我的学生", py: "wǒ de xuésheng", ru: "мои студенты" }
        ]
      },
      {
        ru: "Младший брат очень занят, младшая сестра не занята.",
        hanzi: "弟弟很忙，妹妹不忙。",
        pinyin: "Dìdi hěn máng, mèimei bù máng.",
        literal: "Младший брат очень занят, младшая сестра не занята.",
        grammar: "弟弟很忙，妹妹不忙。Качественные сказуемые без связки 是.",
        words: [
          { zh: "弟弟", py: "dìdi", ru: "младший брат" },
          { zh: "很忙", py: "hěn máng", ru: "очень занят" },
          { zh: "妹妹", py: "mèimei", ru: "младшая сестра" },
          { zh: "不忙", py: "bù máng", ru: "не занята" }
        ]
      },
      {
        ru: "китайский язык сложный? Китайский не слишком сложный.",
        hanzi: "汉语难吗？汉语不太难。",
        pinyin: "Hànyǔ nán ma? Hànyǔ bú tài nán.",
        literal: "Китайский язык трудный? Китайский не слишком трудный.",
        grammar: "Не слишком сложный = 不太难 (bú tài nán).",
        words: [
          { zh: "汉语", py: "hànyǔ", ru: "китайский язык" },
          { zh: "难吗", py: "nán ma", ru: "трудный ли?" },
          { zh: "不太难", py: "bú tài nán", ru: "не слишком трудный" }
        ]
      }
    ]
  },

  {
    id: 11,
    title: "Билет 11",
    task1: [
      { pinyin: "chān", tone: 1, initial: "ch", final: "an", hanzi: "掺", desc: "ch + an, 1-й тон" },
      { pinyin: "dòu", tone: 4, initial: "d", final: "ou", hanzi: "豆", desc: "d + ou, 4-й тон" },
      { pinyin: "hài", tone: 4, initial: "h", final: "ai", hanzi: "害", desc: "h + ai, 4-й тон" },
      { pinyin: "láng", tone: 2, initial: "l", final: "ang", hanzi: "狼", desc: "l + ang, 2-й тон" },
      { pinyin: "má", tone: 2, initial: "m", final: "a", hanzi: "麻", desc: "m + a, 2-й тон" },
      { pinyin: "pòu", tone: 4, initial: "p", final: "ou", hanzi: "剖", desc: "p + ou, 4-й тон" },
      { pinyin: "yǎng", tone: 3, initial: "y", final: "ang", hanzi: "养", desc: "y + ang, 3-й тон" },
      { pinyin: "sé", tone: 2, initial: "s", final: "e", hanzi: "色", desc: "s + e, 2-й тон" },
      { pinyin: "tā", tone: 1, initial: "t", final: "a", hanzi: "他", desc: "t + a, 1-й тон" },
      { pinyin: "xuě", tone: 3, initial: "x", final: "ue", hanzi: "雪", desc: "x + ue (звучит 'сюэ'), 3-й тон" },
      { pinyin: "zhuāng", tone: 1, initial: "zh", final: "uang", hanzi: "装", desc: "zh + uang, 1-й тон" },
      { pinyin: "guǐ", tone: 3, initial: "g", final: "ui", hanzi: "鬼", desc: "g + ui, 3-й тон" }
    ],
    task2: [
      { text: "kèběn", actualPinyin: "kèběn", ruleType: "other", ruleName: "4-й тон + 3-й тон", explanation: "kè (4) + běn (3). Без изменений.", hanzi: "课本" },
      { text: "měi hǎo", actualPinyin: "méi hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3 -> [méi hǎo].", hanzi: "美好" },
      { text: "jǐ diǎn", actualPinyin: "jí diǎn", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3 -> [jí diǎn].", hanzi: "几点" },
      { text: "zhǔnbèi", actualPinyin: "zhǔnbèi", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "zhǔn опускается вниз перед 4 тоном bèi.", hanzi: "准备" },
      { text: "nǎinai", actualPinyin: "nǎinai", ruleType: "neutral", ruleName: "Полутретий + Нулевой тон", explanation: "nǎi полутретий, nai нулевой.", hanzi: "奶奶" },
      { text: "běnlái", actualPinyin: "běnlái", ruleType: "half-3", ruleName: "Полутретий тон (3 + 2)", explanation: "běn опускается вниз перед 2 тоном lái.", hanzi: "本来" }
    ],
    task3: [
      {
        ru: "Они все очень заняты.",
        hanzi: "他们都很忙。",
        pinyin: "Tāmen dōu hěn máng.",
        literal: "Они все очень заняты.",
        grammar: "都 (dōu) стоит перед сказуемым 很忙.",
        words: [
          { zh: "他们", py: "tāmen", ru: "они" },
          { zh: "都", py: "dōu", ru: "все" },
          { zh: "很忙", py: "hěn máng", ru: "очень заняты" }
        ]
      },
      {
        ru: "Мама занята? – Занята, папа не занят.",
        hanzi: "妈妈忙吗？— 忙，爸爸不忙。",
        pinyin: "Māma máng ma? — Máng, bàba bù máng.",
        literal: "Мама занята [вопрос]? — Занята, папа не занят.",
        grammar: "В кратком ответе на вопрос сказуемое повторяется: 忙 (máng = занята), отрицание: 爸爸不忙 (bàba bù máng).",
        words: [
          { zh: "妈妈忙吗", py: "māma máng ma", ru: "мама занята?" },
          { zh: "忙", py: "máng", ru: "занята" },
          { zh: "爸爸不忙", py: "bàba bù máng", ru: "папа не занят" }
        ]
      },
      {
        ru: "Китайский язык сложный? Китайский не слишком сложный.",
        hanzi: "汉语难吗？汉语不太难。",
        pinyin: "Hànyǔ nán ma? Hànyǔ bú tài nán.",
        literal: "Китайский сложный? Китайский не слишком сложный.",
        grammar: "不太难 (bú tài nán).",
        words: [
          { zh: "汉语", py: "hànyǔ", ru: "китайский язык" },
          { zh: "难吗", py: "nán ma", ru: "трудный ли?" },
          { zh: "不太难", py: "bú tài nán", ru: "не слишком трудный" }
        ]
      }
    ]
  },

  {
    id: 12,
    title: "Билет 12",
    task1: [
      { pinyin: "chàn", tone: 4, initial: "ch", final: "an", hanzi: "颤", desc: "ch + an, 4-й тон" },
      { pinyin: "dòng", tone: 4, initial: "d", final: "ong", hanzi: "动", desc: "d + ong, 4-й тон" },
      { pinyin: "suī", tone: 1, initial: "s", final: "ui", hanzi: "虽", desc: "s + ui, 1-й тон" },
      { pinyin: "jǐng", tone: 3, initial: "j", final: "ing", hanzi: "景", desc: "j + ing, 3-й тон" },
      { pinyin: "nū", tone: 1, initial: "n", final: "u", hanzi: "奴", desc: "n + u, 1-й тон" },
      { pinyin: "rōu", tone: 1, initial: "r", final: "ou", hanzi: "揉", desc: "r + ou, 1-й тон" },
      { pinyin: "luán", tone: 2, initial: "l", final: "uan", hanzi: "峦", desc: "l + uan, 2-й тон" },
      { pinyin: "huāng", tone: 1, initial: "h", final: "uang", hanzi: "荒", desc: "h + uang, 1-й тон" },
      { pinyin: "tào", tone: 4, initial: "t", final: "ao", hanzi: "套", desc: "t + ao, 4-й тон" },
      { pinyin: "xiān", tone: 1, initial: "x", final: "ian", hanzi: "先", desc: "x + ian ('сиен'), 1-й тон" },
      { pinyin: "bǎn", tone: 3, initial: "b", final: "an", hanzi: "板", desc: "b + an, 3-й тон" },
      { pinyin: "mā", tone: 1, initial: "m", final: "a", hanzi: "妈", desc: "m + a, 1-й тон" }
    ],
    task2: [
      { text: "guǎn lǐ", actualPinyin: "guán lǐ", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3 -> [guán lǐ].", hanzi: "管理" },
      { text: "měi hǎo", actualPinyin: "méi hǎo", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3 -> [méi hǎo].", hanzi: "美好" },
      { text: "bǎo shǒu", actualPinyin: "báo shǒu", ruleType: "3+3", ruleName: "Правило 3+3 = 2+3", explanation: "3+3 -> [báo shǒu].", hanzi: "保守" },
      { text: "hěn bàng", actualPinyin: "hěn bàng", ruleType: "half-3", ruleName: "Полутретий тон (3 + 4)", explanation: "hěn опускается вниз перед bàng (4 тон).", hanzi: "很棒" },
      { text: "tóufa", actualPinyin: "tóufa", ruleType: "neutral", ruleName: "2-й тон + Нулевой тон", explanation: "tóu (2-й) + fa (нулевой легкий).", hanzi: "头发" },
      { text: "běnlái", actualPinyin: "běnlái", ruleType: "half-3", ruleName: "Полутретий тон (3 + 2)", explanation: "běn опускается вниз перед lái (2-й тон).", hanzi: "本来" }
    ],
    task3: [
      {
        ru: "Китайский сложный? – Да, китайский очень сложный.",
        hanzi: "汉语难吗？— 是，汉语很难。",
        pinyin: "Hànyǔ nán ma? — Shì, hànyǔ hěn nán.",
        literal: "Китайский сложный? — Да, китайский очень сложный.",
        grammar: "Ответ 'Да' = 是 (shì) или 对 (duì).",
        words: [
          { zh: "汉语", py: "hànyǔ", ru: "китайский язык" },
          { zh: "难吗", py: "nán ma", ru: "сложный ли?" },
          { zh: "是", py: "shì", ru: "да" },
          { zh: "汉语很难", py: "hànyǔ hěn nán", ru: "китайский очень сложный" }
        ]
      },
      {
        ru: "Он тоже занят? Он тоже очень занят.",
        hanzi: "他也忙吗？他也都很忙。（или: 他也很忙）",
        pinyin: "Tā yě máng ma? Tā yě hěn máng.",
        literal: "Он тоже занят? Он тоже очень занят.",
        grammar: "Наречие 也 (yě) стоит перед сказуемым: 他 + 也 + 忙吗？ 他 + 也 + 很忙。",
        words: [
          { zh: "他", py: "tā", ru: "он" },
          { zh: "也", py: "yě", ru: "тоже" },
          { zh: "忙吗", py: "máng ma", ru: "занят ли?" },
          { zh: "也很忙", py: "yě hěn máng", ru: "тоже очень занят" }
        ]
      },
      {
        ru: "Моя мама учитель, она очень занята.",
        hanzi: "我妈妈是老师，她很忙。",
        pinyin: "Wǒ māma shì lǎoshī, tā hěn máng.",
        literal: "Моя мама есть учитель, она очень занята.",
        grammar: "我妈妈是老师 (связка 是 с существительным 老师). 她很忙 (сказуемое-прилагательное 忙 без 是).",
        words: [
          { zh: "我妈妈", py: "wǒ māma", ru: "моя мама" },
          { zh: "是老师", py: "shì lǎoshī", ru: "является учителем" },
          { zh: "她很忙", py: "tā hěn máng", ru: "она очень занята" }
        ]
      }
    ]
  }
];

const THEORY_DATA = {
  phonetics: [
    {
      title: "1. Правило модуляции 3 тона",
      badge: "Суперважно для Задания 2",
      items: [
        {
          rule: "3 + 3 = 2 + 3",
          desc: "Если подряд идут два третьих тона, первый слог произносится ВТОРЫМ тоном (восходящим 35), а второй слог сохраняет ТРЕТИЙ тон.",
          examples: [
            { text: "nǐ hǎo", actual: "ní hǎo", ru: "привет" },
            { text: "měi hǎo", actual: "méi hǎo", ru: "прекрасный" },
            { text: "guǎn lǐ", actual: "guán lǐ", ru: "управление" },
            { text: "fǎ yǔ", actual: "fá yǔ", ru: "французский язык" },
            { text: "jǐ diǎn", actual: "jí diǎn", ru: "который час" }
          ]
        },
        {
          rule: "Полутретий тон: 3 + (1, 2, 4 тона)",
          desc: "Если слог 3-го тона стоит перед 1-м, 2-м или 4-м тоном, он становится неполным (полутретьим): голос ТОЛЬКО опускается вниз (21) и НЕ поднимается вверх!",
          examples: [
            { text: "lǎoshī", actual: "lǎo (полу-3) + shī (1)", ru: "учитель (3+1)" },
            { text: "běnlái", actual: "běn (полу-3) + lái (2)", ru: "изначально (3+2)" },
            { text: "hěn bàng", actual: "hěn (полу-3) + bàng (4)", ru: "очень круто (3+4)" },
            { text: "zhǔn bèi", actual: "zhǔn (полу-3) + bèi (4)", ru: "готовиться (3+4)" }
          ]
        }
      ]
    },
    {
      title: "2. Нулевой (нейтральный) тон",
      badge: "Легкий и краткий",
      items: [
        {
          rule: "Отсутствие знака тона на письме",
          desc: "Если над слогом нет знака тона, он не тонирует. Произносится легко, тихо, коротко и ясно. Обычно это второй слог в родственных терминах (mèimei, dìdi, bàba, māma, nǎinai) или грамматические частицы (ma, ba, ne, de, le).",
          examples: [
            { text: "mèimei", actual: "mèi (4) + mei (0)", ru: "младшая сестра" },
            { text: "tóufa", actual: "tóu (2) + fa (0)", ru: "волосы" },
            { text: "hǎo ba", actual: "hǎo (полу-3) + ba (0)", ru: "ладно / хорошо" },
            { text: "nǐmen", actual: "nǐ (полу-3) + men (0)", ru: "вы" }
          ]
        }
      ]
    },
    {
      title: "3. Специфика звуков ü, a, ian, iang",
      badge: "Тонкости произношения",
      items: [
        {
          rule: "Звук ü (умлаут)",
          desc: "Чтобы произнести звук ü, нужно сложить губы трубочкой (будто хотим сказать 'у'), но произнести русский звук 'и'. После j, q, x, y две точки не пишутся (ju, qu, xu, yu), но звук всё равно читается как ü!",
          examples: [
            { text: "lǚ", actual: "lǚ", ru: "путешествие" },
            { text: "yǔ fǎ", actual: "yú fǎ", ru: "грамматика" },
            { text: "jù", actual: "jù (произносится j + ü!)", ru: "предложение" }
          ]
        },
        {
          rule: "Финаль 'a'",
          desc: "Всегда произносится как привычная русская 'а' (открытый гласный).",
          examples: [{ text: "lǎ", actual: "lǎ", ru: "острый / громкий" }]
        },
        {
          rule: "Финали -ian и -iang",
          desc: "-ian читается близко к русскому 'иен'/'ен' (переднеязычный n). А -iang читается как 'ян' с заднеязычным сонорным носовым 'ng' (кончик языка внизу, спинка языка прижата к нёбу)!",
          examples: [
            { text: "jiǎn", actual: "jiǎn ('дзиен')", ru: "простой" },
            { text: "xiāng", actual: "xiāng ('сян')", ru: "ароматный" }
          ]
        }
      ]
    }
  ],

  grammar: [
    {
      title: "1. Глагол-связка 是 (shì) — 'быть, являться'",
      desc: "Аналогичен глаголу 'to be' в английском языке. Соединяет подлежащее с существительным или местоимением.",
      examples: [
        { zh: "她是他妈妈。", py: "Tā shì tā māma.", ru: "Она его мама." },
        { zh: "他是老师。", py: "Tā shì lǎoshī.", ru: "Он учитель." },
        { zh: "我不是学生。", py: "Wǒ bú shì xuésheng.", ru: "Я не студент (bú shì)." }
      ],
      warning: "ВНИМАНИЕ! Перед качественными прилагательными (很忙, 很难, 很好) связка 是 НЕ СТАВИТСЯ! Нельзя сказать: *Wǒ shì hěn máng — только: Wǒ hěn máng!"
    },
    {
      title: "2. Наречие 也 (yě) — 'тоже, также'",
      desc: "Наречие 也 ВСЕГДА стоит перед сказуемым (перед глаголом или прилагательным).",
      examples: [
        { zh: "我也忙。", py: "Wǒ yě máng.", ru: "Я тоже занят." },
        { zh: "他也是学生。", py: "Tā yě shì xuésheng.", ru: "Он тоже студент." }
      ]
    },
    {
      title: "3. Обобщающее слово 都 (dōu) — 'все, всё'",
      desc: "Обобщает стоящее перед ним подлежащее во множественном числе. Стоит ВСЕГДА ПЕРЕД СКАЗУЕМЫМ. Если в предложении есть и 也 (тоже), и 都 (все), то порядок строго: 也 + 都!",
      examples: [
        { zh: "他们都是学生。", py: "Tāmen dōu shì xuésheng.", ru: "Они все студенты." },
        { zh: "他们也都很忙。", py: "Tāmen yě dōu hěn máng.", ru: "Они тоже все очень заняты." }
      ]
    },
    {
      title: "4. Притяжательная частица 的 (de)",
      desc: "Указывает на принадлежность. Схема строгая: ЧЕЙ (Владелец) + 的 (de) + ОБЪЕКТ.",
      examples: [
        { zh: "妈妈的书", py: "māma de shū", ru: "книга мамы (мама + de + книга)" },
        { zh: "老师的书", py: "lǎoshī de shū", ru: "книга учителя" },
        { zh: "俄罗斯技术大学的学生", py: "Èluósī jìshù dàxué de xuésheng", ru: "студент Российского технологического университета (МИРЭА!)" }
      ]
    }
  ]
};

// База слогов для разминки скорости чтения (из HTML тренажера)
const ALL_SYLLABLES = [
  "a", "o", "e", "i", "u", "ü", "ai", "ei", "ao", "ou",
  "ba", "bo", "bi", "bu", "bai", "bei", "bao",
  "pa", "po", "pi", "pu", "pai", "pei", "pao", "pou",
  "ma", "mo", "me", "mi", "mu", "mai", "mei", "mao", "mou",
  "fa", "fo", "fu", "fei", "fou",
  "da", "de", "di", "du", "dai", "dei", "dao", "dou",
  "ta", "te", "ti", "tu", "tai", "tao", "tou",
  "na", "ne", "ni", "nu", "nü", "nai", "nei", "nao", "nou",
  "la", "le", "li", "lu", "lü", "lai", "lei", "lao", "lou",
  "ga", "ge", "gu", "gai", "gei", "gao", "gou",
  "ka", "ke", "ku", "kai", "kei", "kao", "kou",
  "ha", "he", "hu", "hai", "hei", "hao", "hou",
  "yi", "wu", "yu",
  "ban", "ben", "bang", "beng",
  "pan", "pen", "pang", "peng",
  "man", "men", "mang", "meng",
  "fan", "fen", "fang", "feng",
  "dan", "den", "dang", "deng", "dong",
  "tan", "tang", "teng", "tong",
  "nan", "nen", "nang", "neng", "nong",
  "lan", "lang", "leng", "long",
  "gan", "gen", "gang", "geng", "gong",
  "kan", "ken", "kang", "keng", "kong",
  "han", "hen", "hang", "heng", "hong",
  "ji", "jia", "jie", "jiao", "jiu", "jian", "jin", "jiang", "jing", "jiong",
  "qi", "qia", "qie", "qiao", "qiu", "qian", "qin", "qiang", "qing", "qiong",
  "xi", "xia", "xie", "xiao", "xiu", "xian", "xin", "xiang", "xing", "xiong",
  "bie", "biao", "bian", "bin", "bing",
  "pie", "piao", "pian", "pin", "ping",
  "mie", "miao", "mian", "min", "ming",
  "die", "diao", "diu", "dian", "ding",
  "tie", "tiao", "tian", "ting",
  "nie", "niao", "niu", "nian", "nin", "niang", "ning",
  "lia", "lie", "liao", "liu", "lian", "lin", "liang", "ling",
  "ya", "ye", "yao", "you", "yan", "yin", "yang", "ying", "yong",
  "nüe", "lüe",
  "ju", "jue", "juan", "jun",
  "qu", "que", "quan", "qun",
  "xu", "xue", "xuan", "xun",
  "yue", "yuan", "yun",
  "za", "ze", "zi", "zai", "zei", "zao", "zou", "zan", "zen", "zang", "zeng", "zong",
  "ca", "ce", "ci", "cai", "cao", "cou", "can", "cen", "cang", "ceng", "cong",
  "sa", "se", "si", "sai", "sao", "sou", "san", "sen", "sang", "seng", "song",
  "zu", "zuo", "zui", "zuan", "zun",
  "cu", "cuo", "cui", "cuan", "cun",
  "su", "suo", "sui", "suan", "sun",
  "duo", "dui", "duan", "dun",
  "tuo", "tui", "tuan", "tun",
  "nuo", "nuan",
  "luo", "luan", "lun",
  "gua", "guo", "guai", "gui", "guan", "gun", "guang",
  "kua", "kuo", "kuai", "kui", "kuan", "kun", "kuang",
  "hua", "huo", "huai", "hui", "huan", "hun", "huang",
  "wa", "wo", "wai", "wei", "wan", "wen", "wang",
  "zha", "zhe", "zhi", "zhai", "zhei", "zhao", "zhou",
  "cha", "che", "chi", "chai", "chao", "chou",
  "sha", "she", "shi", "shai", "shei", "shao", "shou",
  "re", "ri", "rao", "rou",
  "zhan", "zhen", "zhang", "zheng", "zhong",
  "chan", "chen", "chang", "cheng", "chong",
  "shan", "shen", "shang", "sheng",
  "ran", "ren", "rang", "reng", "rong",
  "zhu", "zhua", "zhuo", "zhuai", "zhui", "zhuan", "zhun", "zhuang",
  "chu", "chua", "chuo", "chuai", "chui", "chuan", "chun", "chuang",
  "shu", "shua", "shuo", "shuai", "shui", "shuan", "shun", "shuang",
  "ru", "rua", "ruo", "rui", "ruan", "run"
];
