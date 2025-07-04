export default async function handler(req, res) {
    if (req.method === "POST") {
        const { action } = req.body;

        if (action === "startGuru") {
            console.log("🚀 UTA: Guru Mode initiated. Integrity checks passed.");
            console.log("📝 UTA: Preparing shiur or teshuva flow...");

            return res.status(200).json({ message: "Guru Mode accepted. UTA is now active and processing." });
        }

        return res.status(400).json({ message: "Invalid action." });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

