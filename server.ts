import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize @google/genai client lazy-loaded to prevent crashing if key is missing on start
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY", // fallback to prevent crashing, will guide if missing
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Interactive Copilot Chat API
app.post("/api/copilot/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    
    // System instruction defining G4Arab OS context
    const systemInstruction = 
      "You are Copilot Assistant, the elite AI intelligence co-orchestrator of G4Arab OS. " +
      "G4Arab OS is an advanced terminal for dual-language (English and Arabic) gaming media, " +
      "news orchestration, analytics, and translation tasks. " +
      "You assist authors, web scapers, and content managers in Riyadh or worldwide. " +
      "Respond briefly, authoritatively, and with high-tech precision. " +
      "By default, respond in the language the user speaks. If they speak Arabic, reply with elegant, professional Arabic.";

    // Convert simple history format if received, or generate standard content
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }],
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Error in /api/copilot/chat:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// 2. High-Fidelity Professional Translation & Alignment API
app.post("/api/copilot/translate", async (req, res) => {
  try {
    const { text, focusTopic } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required for translation" });
    }

    const ai = getGeminiClient();
    const systemInstruction =
      "You are an expert Arabic game journalist and editor at G4Arab OS. " +
      "Translate the given English professional article draft into a polished, high-fidelity Arabic editorial. " +
      "Ensure proper gaming terminology (e.g., 'low-latency', 'ray tracing', 'Unreal Engine', 'handheld Console' are translated beautifully while retaining context). " +
      "Make the sentence flow highly engaging, premium, and authoritative for gamers in Saudi Arabia and the Middle East.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Translate the following English gaming/tech draft into elite, engaging Arabic: \n\n${text}`,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    res.json({ translatedText: response.text || "" });
  } catch (error: any) {
    console.error("Error in /api/copilot/translate:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// 3. SEO Optimizer and Keywords Analyzer
app.post("/api/copilot/suggest", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const ai = getGeminiClient();
    const prompt = 
      `Analyze the following content draft and provide smart publisher suggestions in JSON format. ` +
      `Include SEO score out of 100, suggested keywords for the Middle East gaming market, alternative powerful titles, and a list of spelling/fact corrections if any. \n\nDraft:\n${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object" as any,
          properties: {
            seoScore: { type: "number" as any, description: "SEO rating from 0 to 100" },
            alternativeTitles: {
              type: "array" as any,
              items: { type: "string" as any },
              description: "High impact alternative titles"
            },
            suggestedKeywords: {
              type: "array" as any,
              items: { type: "string" as any },
              description: "Middle East targeted keywords"
            },
            editorialImprovement: { type: "string" as any, description: "A paragraph suggestion to enhance engagement" }
          },
          required: ["seoScore", "alternativeTitles", "suggestedKeywords", "editorialImprovement"]
        }
      }
    });

    // Parse safety check
    let parsed = {};
    try {
      parsed = JSON.parse(response.text || "{}");
    } catch {
      parsed = { fallback: response.text };
    }

    res.json(parsed);
  } catch (error: any) {
    console.error("Error in /api/copilot/suggest:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// 4. Ultimate Instant Draft & News Package Generator
app.post("/api/copilot/generate-draft", async (req, res) => {
  try {
    const { brief, tone } = req.body;
    if (!brief) {
      return res.status(400).json({ error: "Brief or title is required" });
    }

    const ai = getGeminiClient();
    const toneString = tone || "Excited / حماسي ومثير";
    
    // Detailed system prompt for elite tech/gaming news crafting
    const systemInstruction = 
      "You are a dual-language (English and Arabic) expert gaming journalist and director of G4Arab News. " +
      "Take a brief news item/leak concept, and turn it into a premium, complete news dispatch package. " +
      "You must output a single JSON block conforming exactly to the responseSchema.\n" +
      "The generated Arabic article should use appropriate terminology ('ray tracing', 'Unreal Engine', 'direct storage', 'refresh rate', etc.) and match the requested tone perfectly.\n" +
      "Tones Guide:\n" +
      "- Excited / حماسي ومثير: high-energy, suspenseful, exclamation marks, ultimate hype.\n" +
      "- Analytical / تحليلي وعميق: technical specs detail, focus on hardware architecture, chip performance, deep look to industry impact.\n" +
      "- Clickbait / جذاب ومثير للفضول: open-ended intriguing titles, suspenseful hooks, massive viral factor.\n" +
      "- Sarcastic / ساخر كوميدي: witty gaming humor, gentle inside jokes about publishers (e.g. Ubisoft, Rockstar delay cycles), highly punchy.";

    const prompt = `Develop a comprehensive gaming news package on the following leak or trend concept: "${brief}" in tone: "${toneString}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object" as any,
          properties: {
            englishDraft: { type: "string" as any, description: "A high-quality 2-3 paragraph news piece written in professional English with structural flow." },
            arabicDraft: { type: "string" as any, description: "An elite, captivating Arabic translation & adaptation matching the requested tone perfectly, styled for Arab gaming audiences." },
            seoKeywords: { 
              type: "array" as any, 
              items: { type: "string" as any },
              description: "Array of 4 highly-searched localized tags (e.g., 'تسريبات بلايستيشن 6', 'مواصفات PS6', 'موعد روتشستر')"
            },
            alternativeTitles: { 
              type: "array" as any, 
              items: { type: "string" as any },
              description: "Array of 3 powerful localized catch-titles in Arabic suited for push notifications and gaming headlines."
            },
            socialThread: { 
              type: "array" as any, 
              items: { type: "string" as any },
              description: "Array of 2-3 short, optimized, emoji-rich updates ready for X/Twitter or Discord, summarizing the key hooks in Arabic."
            }
          },
          required: ["englishDraft", "arabicDraft", "seoKeywords", "alternativeTitles", "socialThread"]
        }
      }
    });

    let result = {};
    try {
      result = JSON.parse(response.text || "{}");
    } catch {
      result = { fallback: response.text };
    }

    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/copilot/generate-draft:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// 5. Intelligent Dual-Language Headline Suggestions API
app.post("/api/copilot/generate-headlines", async (req, res) => {
  try {
    const { text, langPreference } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Context or text is required for headline generation" });
    }

    const ai = getGeminiClient();
    const systemInstruction = 
      "You are an elite gaming news director. Your task is to output high-clickthrough headlines " +
      "based on the provided draft or concept. Focus on curiosity, technical stats, " +
      "or urgent leaks. You must return a strict JSON block conforming to the responseSchema, containing 5 headline combinations " +
      "in both English and Arabic. Do not include any HTML tags or markdown codes outside the JSON.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Draft for headlines: "${text}"`,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object" as any,
          properties: {
            suggestions: {
              type: "array" as any,
              items: {
                type: "object" as any,
                properties: {
                  en: { type: "string" as any, description: "Catcy English headline" },
                  ar: { type: "string" as any, description: "Elite localized Arabic headline" },
                  type: { type: "string" as any, description: "Type of hook: LEAK, SENSATIONAL, SPECS, COMMENTARY" }
                },
                required: ["en", "ar", "type"]
              }
            }
          },
          required: ["suggestions"]
        }
      }
    });

    let result = {};
    try {
      result = JSON.parse(response.text || "{}");
    } catch {
      result = { suggestions: [] };
    }
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/copilot/generate-headlines:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// 6. Theme-Aware AI Image Generator & Catalog Mapper (Enhanced Cinematic Edition)
app.post("/api/copilot/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Image prompt description is required" });
    }

    const ai = getGeminiClient();
    
    // التعليمات المحدثة لإجبار النموذج على صياغة برومبت صور يحاكي بوسترات الألعاب الاحترافية والواقعية
    const systemInstruction = 
      "You are an expert visual design coordinator and prompt engineer for G4Arab gaming magazine. " +
      "Your task is to take a raw user description (translate it to English if it is in Arabic) and expand it into a high-fidelity, professional cinematic gaming poster prompt.\n\n" +
      "CRITICAL STYLE RULES FOR 'expandedPromptEN':\n" +
      "- Style: Dramatic Video Game Character Poster, cinematic gaming concept art, realistic style, Unreal Engine 5 render feel.\n" +
      "- Lighting: Volumetric lighting, dramatic chiaroscuro, sharp contrast, intense environmental/neon accent lights matching the theme.\n" +
      "- Composition: Epic character-focused or asset-focused dynamic framing, highly detailed immersive background, sharp focus, 8k resolution, gaming key art.\n\n" +
      "Finally, classify the theme into one of these exact keywords for matching the library: [setup, console, silicon, controller, cyberpunk, switch, retro, sunset].";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Raw prompt: "${prompt}"`,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object" as any,
          properties: {
            expandedPromptEN: { type: "string" as any, description: "Detailed 16:9 cinematic prompt for diffusion following the poster style guidelines" },
            arabicTitle: { type: "string" as any, description: "Beautiful compact Arabic title for the generated image" },
            keyword: { type: "string" as any, description: "Single matched keyword from the allowed list" }
          },
          required: ["expandedPromptEN", "arabicTitle", "keyword"]
        }
      }
    });

    let data = { expandedPromptEN: "", arabicTitle: "", keyword: "cyberpunk" };
    try {
      data = JSON.parse(response.text || "{}");
    } catch {
      // fallback
    }

    // هنا الكود يكمل ويرسل الاستجابة للفرونت اند بناءً على محرك الصور لديك
    res.json({ success: true, ...data });

  } catch (error: any) {
    console.error("Error in /api/copilot/generate-image:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

    // High quality Unsplash imagery mapping for perfect realism in the feed!
    const imageMap: Record<string, string> = {
      setup: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80", // Neon anime gaming station
      console: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop&q=80", // PlayStation / Neon controller detail
      silicon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80", // Tech microchip glowing logic gates
      controller: "https://images.unsplash.com/photo-1592840496694-26d035b52b4d?w=800&auto=format&fit=crop&q=80", // Glowing game controller
      cyberpunk: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80", // Cyberpunk neon city skyscraper backdrop / esports stage
      switch: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80", // Handheld gaming gear
      retro: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=80", // Retro cassette console style
      sunset: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80" // Sunset event silhouette
    };

    const targetKeyword = data.keyword ? data.keyword.toLowerCase() : "cyberpunk";
    const mappedUrl = imageMap[targetKeyword] || imageMap["cyberpunk"];

    // Add a unique random seed to prevent caching issues in state
    const cleanUrl = `${mappedUrl}&sig=${Math.floor(Math.random() * 9999) + 1000}`;

    res.json({
      success: true,
      originalPrompt: prompt,
      expandedPrompt: data.expandedPromptEN || prompt,
      titleAR: data.arabicTitle || "صورة مولدة بالذكاء الاصطناعي",
      imageUrl: cleanUrl,
      seed: Math.floor(Math.random() * 8000)
    });
  } catch (error: any) {
    console.error("Error in /api/copilot/generate-image:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});


// Mount Vite middleware for asset/route resolution in active Dev server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve fallback index.html for SPA router on any route
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[G4Arab Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
