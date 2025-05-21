export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  const webhookURL = "https://discord.com/api/webhooks/1374801368136548454/GG1eMFKqOhUhnNGZtxyBHTSJ-n37ZowJkARwIXbTKkrA9lAZDaijNR91Ou-gDwMA_nKx";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Gagal kirim ke Discord" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kesalahan server" });
  }
}
