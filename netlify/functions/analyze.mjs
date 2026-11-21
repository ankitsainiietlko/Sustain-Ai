import { GoogleGenerativeAI } from "@google/generative-ai";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const categories = ["Recycle", "Compost", "Trash", "Hazardous"];
const confidenceLevels = ["High", "Medium", "Low"];

const jsonResponse = (body, status = 200) =>
    Response.json(body, { status });

const isAnalysis = (value) =>
    value &&
    typeof value === "object" &&
    categories.includes(value.type) &&
    typeof value.item === "string" &&
    confidenceLevels.includes(value.confidence) &&
    typeof value.advice === "string" &&
    typeof value.insight === "string";

export default async (request) => {
    if (request.method !== "POST") {
        return jsonResponse({ error: "Method not allowed." }, 405);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not configured.");
        return jsonResponse({ error: "AI analysis is not configured." }, 500);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return jsonResponse({ error: "Request body must be valid JSON." }, 400);
    }

    const match =
        typeof body?.image === "string" &&
        body.image.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
    if (!match || match[2].length % 4 !== 0) {
        return jsonResponse({ error: "A valid base64 image is required." }, 400);
    }

    const [, imageFormat, base64Data] = match;
    const imageBytes = Buffer.from(base64Data, "base64");
    if (imageBytes.length === 0 || imageBytes.length > MAX_IMAGE_BYTES) {
        return jsonResponse({ error: "Image must be smaller than 4 MB." }, 413);
    }

    const prompt = `
      You are an expert environmentalist and waste management AI.
      Analyze this image of a waste item.
      Return ONLY a JSON object with this exact structure (no markdown, no code blocks):
      {
        "type": "Recycle" | "Compost" | "Trash" | "Hazardous",
        "item": "Short Name of Item",
        "confidence": "High" | "Medium" | "Low",
        "advice": "Detailed, step-by-step disposal instructions. If recyclable, mention rinsing/removing caps. If hazardous, mention specific safe handling.",
        "insight": "A short, interesting educational fact about why this item belongs in this category or its environmental impact."
      }
    `;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: `image/${imageFormat}`,
                },
            },
        ]);
        const text = result.response.text();
        const analysis = JSON.parse(
            text.replace(/```json/g, "").replace(/```/g, "").trim(),
        );

        if (!isAnalysis(analysis)) {
            console.error("Gemini returned an invalid analysis response.");
            return jsonResponse({ error: "AI returned an invalid analysis. Please try again." }, 502);
        }

        return jsonResponse(analysis);
    } catch (error) {
        const message = error instanceof Error ? error.message : "";
        console.error("Gemini analysis failed:", error?.name ?? "Unknown error");

        if (message.includes("404") || message.toLowerCase().includes("not found")) {
            return jsonResponse(
                { error: "API Error: Model not found. Please enable 'Generative Language API' in Google Console." },
                502,
            );
        }

        return jsonResponse({ error: "Failed to analyze. Please try again." }, 502);
    }
};
