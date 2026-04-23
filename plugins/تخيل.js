import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

// الحقوق والستايل الخاص بك
const myCredit = `*_ .𓏲⋆˙𝑵𝜩𝒁𝑼𝑲̤͝𝜣͓ۧٛ͢ ͝ 𝑩𝜣𝑻🎀 _*`;
const emojis = `ⲂＹ 𝒛𝒊𝒂𝒅 Ｘ 𝒎𝒐𝒏𝒕𝒆 3ℝΑＢ 𝒅𝒆𝒗𝒔 🥝👑`;

// قائمة بروكسيات (ضع بروكسي هنا لو المنصة حظرت الـ IP تبعك)
const proxyList = []; 

const getHeaders = () => ({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
    "Origin": "https://aifreeforever.com",
    "Referer": "https://aifreeforever.com/image-generators",
    "X-Requested-With": "XMLHttpRequest",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Connection": "keep-alive"
});

async function getNonce(proxy) {
    try {
        const response = await axios.get('https://aifreeforever.com/api/chat-nonce', {
            headers: getHeaders(),
            httpsAgent: proxy,
            timeout: 10000,
        });
        return response.data?.nonce;
    } catch (err) {
        throw new Error(`*_ فـشـل جـلـب الـتـصـريح الأصـلـي _*`);
    }
}

async function generateImage(prompt, proxy) {
    const nonce = await getNonce(proxy);
    const currentTime = Date.now();
    
    // محاكاة دقيقة للتفاعل البشري لتجنب الحظر
    const interactionProof = {
        nonce,
        keystrokeCount: prompt.length,
        pasteEvents: 0,
        totalTypingTime: Math.floor(Math.random() * 3000) + 3000,
        startTime: currentTime - 12000,
        submitTime: currentTime,
        captchaVerifiedAt: currentTime - 2000,
    };

    const payload = {
        prompt,
        resolution: '1:1',
        style: 'default',
        interactionProof,
    };

    try {
        const response = await axios.post('https://aifreeforever.com/api/generate-image', payload, {
            headers: getHeaders(),
            httpsAgent: proxy,
            timeout: 60000,
        });
        return response.data?.imageUrl || response.data?.url;
    } catch (err) {
        if (err.response?.status === 403) throw new Error(`*_ الـوصـول مـحـظـور (403) - جـرب بـروكـسـي _*`);
        throw new Error(`*_ الـخـادم لـم يـسـتـجـب لـلـطـلـب الأصـلـي _*`);
    }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`*_ هـلا 🫠 _*\n\n*_ 🎨 تـخـيـل مـع نـيـزووكـو (الـنـسـخـة الأصـلـيـة) _*\n\n*_ الاسـتـخـدام: _*\n*_ ${usedPrefix + command} وصـف الـصـورة _*\n\n${emojis}\n\n${myCredit}`);
    }

    await m.reply(`*_ هـلا ⏳ _*\n\n*_ جـاري الـتـحـدي وتـخـطـي حـمـايـة الـمـنـصـة... _*`);

    try {
        const proxy = proxyList.length > 0 ? new HttpsProxyAgent(proxyList[Math.floor(Math.random() * proxyList.length)]) : null;
        
        let finalPrompt = text;
        if (finalPrompt.toLowerCase().includes('anime')) finalPrompt += ' #minimax';

        const imageUrl = await generateImage(finalPrompt, proxy);

        if (!imageUrl) throw new Error();

        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `*_ هـلا 🫠 _*\n\n*_ ✅ تـم إنـشـاء الـصـورة بـنـجـاح _*\n*_ 📝 الـوصـف: ${text} _*\n\n${emojis}\n\n*_ تـم بـواسـطـة _*\n${myCredit}`,
        }, { quoted: m });

    } catch (err) {
        m.reply(`${err.message}\n\n*_ جـرب اسـتـخـدام بـروكـسـي أو تـغـيـير الـوصـف. _*`);
    }
};

handler.help = ['تخيل'];
handler.tags = ['ai'];
handler.command = /^(تخيل|imagine)$/i;

export default handler;