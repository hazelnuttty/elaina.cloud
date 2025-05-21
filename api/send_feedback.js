// api/send-feedback.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama = "Anonim", kontak = "Tidak diisi", pesan } = req.body;

  if (!pesan || pesan.trim() === "") {
    return res.status(400).json({ message: 'Pesan harus diisi' });
  }

  // Optional: validasi email/nomor HP sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{7,15}$/;

  if (kontak !== "Tidak diisi" && kontak !== "") {
    const isEmail = emailRegex.test(kontak);
    const isPhone = phoneRegex.test(kontak.replace(/[\s\-]/g, ''));

    if (!isEmail && !isPhone) {
      return res.status(400).json({ message: 'Kontak harus berupa email atau nomor HP yang valid' });
    }
  }

  const tanggal = new Date().toLocaleString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  try {
    const webhookUrl = process.env.https://discord.com/api/webhooks/1374801368136548454/GG1eMFKqOhUhnNGZtxyBHTSJ-n37ZowJkARwIXbTKkrA9lAZDaijNR91Ou-gDwMA_nKx;
    if (!webhookUrl) throw new Error("Webhook URL tidak ditemukan");

    const sendRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "Pendapat Baru",
          color: 0x6C5CE7,
          fields: [
            { name: "Nama", value: nama, inline: true },
            { name: "Kontak", value: kontak, inline: true },
            { name: "Pesan", value: pesan },
            { name: "Tanggal", value: tanggal }
          ],
          footer: { text: "elaina.cloud" },
          timestamp: new Date().toISOString()
        }]
      }),
    });

    if (!sendRes.ok) {
      return res.status(500).json({ message: "Gagal kirim ke Discord" });
    }

    return res.status(200).json({ message: "Pendapat terkirim" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
