import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = process.cwd()
const photosDir = path.join(rootDir, 'src', 'photos')
let localBuffers = []

if (fs.existsSync(photosDir)) {
    const files = fs.readdirSync(photosDir)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    for (const file of imageFiles) {
        try {
            localBuffers.push(path.join(photosDir, file))
        } catch (e) { console.error(`❌ خطأ في قراءة ${file}`) }
    }
}

const fallbackUrl = "https://raw.githubusercontent.com/mzml-gg/nezuko-photos/main/nezuko1.jpg"

let handler = async (m, { conn, usedPrefix }) => {
    const taguser = '@' + m.sender.split('@')[0]
    
    let imagePath = localBuffers.length > 0 
        ? localBuffers[Math.floor(Math.random() * localBuffers.length)] 
        : fallbackUrl

    const menuText = `
.𓏲⋆˙𝑵𝜩𝒁𝑼𝑲̤͝𝜣͓ۧٛ͢ ͝ 𝑩𝜣𝑻🎀​
🍒 𝗠𝗘𝗡𝗨 🍇
ＢＹ 𝒛𝒊𝒂𝒅 Ｘ 𝒎𝒐𝒏𝒕𝒆 3ℝΑᏴ 𝒅𝒆𝒗𝒔

𝗐𝖾𝒍𝒄𝒐𝒎𝒆 ${taguser}

╭───≪ 🍒 𝗠𝗘𝗡𝗨 🍇 ≫───╮
│ ⌬ ${usedPrefix}م1 ↫ (قسـم مشـرفـين) 👑 
│ ⌬ ${usedPrefix}م2 ↫ (قـسـم تحـمـيل) 🍒 
│ ⌬ ${usedPrefix}م3 ↫ (قـسـم صـور) 🍉 
│ ⌬ ${usedPrefix}م4 ↫ (قـسم الذكاء) 🍡
│ ⌬ ${usedPrefix}م5 ↫ (قـسـم الألعاب) 🌳
│ ⌬ ${usedPrefix}م6 ↫ (قـسـم الـبـحث) 🌴 
╯───≪ 🌿🍉🍡 ≫───╰`.trim()

    // إرسال المنتج مع الكابتشن والزر لإجبار الواتساب على عرض النص
    await conn.sendMessage(m.chat, {
        product: {
            productImage: { url: imagePath },
            productId: '24529689176623820',
            title: '.𓏲⋆˙𝑵𝜩𝒁𝑼𝑲̤͝𝜣͓ۧٛ͢ ͝ 𝑩𝜣𝑻🎀',
            description: 'ＢＹ 𝒛𝒊𝒂𝒅 Ｘ 𝒎𝒐𝒏𝒕𝒆 3ℝΑᏴ 𝒅𝒆𝒗𝒔👑',
            currencyCode: 'USD',
            priceAmount1000: '0',
            retailerId: '🍒 𝗠𝗘𝗡𝗨 🍇',
            productImageCount: 1
        },
        businessOwnerJid: '249922420554@s.whatsapp.net',
        caption: menuText,
        footer: 'FREE BOT WHATSAPP 3RAB Life',
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

handler.command = /^(menu|قائمة|اوامر|أوامر)$/i
export default handler