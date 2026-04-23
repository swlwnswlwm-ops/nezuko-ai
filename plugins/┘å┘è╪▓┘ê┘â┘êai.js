import axios from 'axios';

// ذاكرة التخزين المؤقتة
let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف الذاكرة
  if (command === 'نسيان' || command === 'حذف_ذاكرة_نيزوكو') {
    delete memory[userId];
    return m.reply('🌸 نيهيهي.. نسيت كل شيء! لنبدأ من جديد ✨');
  }

  if (!text) {
    return m.reply('⌜🌸⌝\n*هـلا! أنا نيزوكو الكيوت.. اكتب شيئاً! 🎀*');
  }

  // تنظيف النص وحماية الرابط من الطول
  const cleanText = text.length > 300 ? text.substring(0, 300) : text;

  await conn.sendMessage(m.chat, { react: { text: "🌸", key: m.key } });

  try {
    // تعليمات الشخصية: ردود قصيرة + عدم ذكر المطورين إلا عند السؤال
    const systemMessage = `أنتِ نيزوكو 🎀. بنوتة كيوته، لطيفة، ومرحة. ردودك قصيرة جداً ومختصرة (جملة واحدة غالباً). لا تذكري مطوريك (زياد ومونتي) أبداً إلا إذا سألك المستخدم عنهم مباشرة. استخدمي إيموجيات (🌸, 🎀, 🍡).`;

    const lastContext = memory[userId] || "لا يوجد";
    
    // بناء الاستعلام المباشر
    const fullPrompt = `System:${systemMessage}\nPrevious:${lastContext}\nUser:${cleanText}`;

    const res = await axios.get(
      `https://tanjirodev.online/api/ai-gemini?prompt=${encodeURIComponent(fullPrompt)}`,
      { timeout: 10000 }
    );

    // الرد النصي الخام بدون أي إضافات أو بادئات
    let rawAnswer = res.data?.response || 'نيزوكو ناعسة.. 😴';
    
    // إرسال الرد مباشرة كما هو
    await conn.sendMessage(m.chat, {
      text: rawAnswer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝒩𝐸𝒵𝒰𝒦𝒪 - 𝒵𝐼𝒜𝒟 𝒳 𝑀𝒪𝒩𝒯𝐸',
          body: '🌸┆ ♡ 𝑵𝑬𝒁𝑼𝑲𝑶-𝑩𝑶𝑻 ♡┆🌸',
          thumbnailUrl: 'https://files.catbox.moe/2sz7hc.jpg', 
          mediaUrl: 'https://whatsapp.com/channel/0029Vb7AkG84inotOc8BXE1K',
          mediaType: 2, // طريقة عرض هالك المفضلة لديك
          showAdAttribution: true
        },
      },
    }, { quoted: m });

    // تحديث الذاكرة بشكل مختصر
    memory[userId] = rawAnswer.substring(0, 150);

  } catch (e) {
    console.error("Nezuko AI Error:", e.message);
    delete memory[userId];
    m.reply('❌ تعبت قليلاً.. حاول مرة أخرى.');
  }
};

handler.help = ['نيزوكو', 'نسيان'];
handler.tags = ['AI'];
handler.command = /^(نيزوكو|nezuko|ai|نسيان|حذف_ذاكرة_نيزوكو)$/i;

export default handler;