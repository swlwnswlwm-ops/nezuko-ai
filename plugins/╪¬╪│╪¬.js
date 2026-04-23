// م࣬ــࢪحہּٰـبٚأ بٚـڪٰٖ فَــي أوٰأم࣬ـࢪ ۿأݪــڪٰٖي ؍ 🌸♡゙ ُ𓂁
// أوٰأم࣬ــوٰ ر م࣬ٺم࣬يــژۿ . ⊹
// حہּٰقَــــوٰقَ 𝒎𝒐𝒏𝒕𝒆 𝒅𝒆𝒗 🐦☕
// أسٰـم࣬ أݪأم࣬ــࢪ تست-سريع.js
// ࢪأبٚــطَ قَنٰــأۿ أݪم࣬ــطَــوٰـقَ ..)✘🖤🧸.

import fs from 'fs'
import path from 'path'

// صورة واحدة ثابتة لسرعة الرد
const nezukoPhoto = "https://raw.githubusercontent.com/mzml-gg/nezuko-Photos/main/nezuko9.jpg";

let handler = async (m, { conn }) => {
    // 1. جلب البيانات
    let uptime = clockString(process.uptime() * 1000)
    const totalFiles = fs.readdirSync(path.join(process.cwd(), './plugins')).filter(file => file.endsWith('.js')).length
    const botNumber = conn.user.jid.split('@')[0]
    const taguser = '@' + m.sender.split('@')[0]

    // 2. النص المنسق
    const testText = `
.𓏲⋆˙𝑵𝜩𝒁𝑼𝑲̤͝𝜣͓ۧٛ͢ ͝ 𝑩𝜣𝑻🎀​
🍒 𝗦𝗧𝗔𝗧𝗨𝗦 🍇
ＢＹ 𝒛𝒊𝒂𝒅 Ｘ 𝒎𝒐𝒏𝒕𝒆 3ℝΑᏴ 𝒅𝒆𝒗𝒔

𝗐𝖾𝒍𝒄𝒐𝒎𝒆 ${taguser}

╭───≪ 🍒 𝗦𝗧𝗔𝗧𝗨𝗦 🍇≫───╮
│ ⌬ مـده التـشـغيل : ${uptime}
│ ⌬ عـدد الاوامـر : ${totalFiles} مـلف
│ ⌬ الايـرور : 0 (مستقر)
│ ⌬ الـنظام : WhatsApp
│ ⌬ رقـم الـبـوت : ${botNumber}
│ ⌬ رابـط الـمستودع : (قريباً)
╯───≪ 🌿🍉🍡 ≫───╰`.trim()

    // 3. إرسال الكتالوج بصورة واحدة وزر واحد
    await conn.sendMessage(m.chat, {
        product: {
            productImage: { url: nezukoPhoto },
            productId: '24529689176623820',
            title: '.𓏲⋆˙𝑵𝜩𝒁𝑼𝑲̤͝𝜣͓ۧٛ͢ ͝ 𝑺𝑻𝑨𝑻𝑼𝑺 🌸',
            description: 'نظام نيزوكو السريع 👑',
            currencyCode: 'USD',
            priceAmount1000: '0',
            retailerId: '🍒 𝗦𝗧𝗔𝗧𝗨𝗦 🍇',
            productImageCount: 1
        },
        businessOwnerJid: '249922420554@s.whatsapp.net',
        caption: testText,
        footer: 'FREE BOT WHATSAPP 3RAB Life',
        mentions: [m.sender],
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: ".𓏲⋆˙𝑵𝜩𝒁𝑼𝑲̤͝𝜣͓ۧٛ͢ ͝ 𝑩𝜣𝑻👑",
                    url: "https://whatsapp.com/channel/0029VbCfnh30AgW5Ygh1ZZ37"
                })
            }
        ]
    }, { quoted: m })
}

handler.customPrefix = /^(تست|test)$/i
handler.command = new RegExp

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}