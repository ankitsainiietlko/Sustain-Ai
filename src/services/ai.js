export const analyzeImage = async (imageBase64) => {
    let response;
    try {
        response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageBase64 }),
        });
    } catch {
        throw new Error("Unable to reach the AI service. Please check your internet connection.");
    }

    let payload;
    try {
        payload = await response.json();
    } catch {
        throw new Error("The AI service returned an invalid response. Please try again.");
    }

    if (!response.ok) {
        throw new Error(payload.error || "Failed to analyze. Please try again.");
    }

    return payload;
};
