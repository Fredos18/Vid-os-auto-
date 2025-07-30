import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [offer, setOffer] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const generateOffer = async () => {
    setLoading(true);
    setOffer("");
    setImg("");
    try {
      const res = await axios.post("/api/generate", { prompt });
      setOffer(res.data.offer);
      setImg(res.data.img);
    } catch (e) {
      setOffer("Erreur de génération.");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <link
          href="https://vjs.zencdn.net/8.10.0/video-js.css"
          rel="stylesheet"
        />
      </Head>
      <main style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
        <h2>🎬 Offre d’emploi + vidéo Canada</h2>
        <textarea
          rows={3}
          style={{ width: "100%" }}
          placeholder="Décris l'offre d'emploi à générer (ex : serveur, Montréal, permis ouvert)…"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button onClick={generateOffer} disabled={loading || !prompt} style={{ marginTop: 10 }}>
          {loading ? "Génération..." : "Générer"}
        </button>
        {offer && (
          <div style={{ marginTop: 24 }}>
            <h4>Texte pour ta vidéo :</h4>
            <div style={{ background: "#fafafa", padding: 12, borderRadius: 8, marginBottom: 10 }}>
              {offer}
            </div>
            {img && <img src={img} alt="Illustration Canada" style={{ maxWidth: "100%", borderRadius: 8 }} />}
            <div style={{ marginTop: 24 }}>
              <h4>🎥 Modèle vidéo intégré</h4>
              <video
                id="video-template"
                className="video-js"
                controls
                preload="auto"
                width="100%"
                height="360"
                poster={img}
                data-setup='{}'
                style={{ borderRadius: 12, boxShadow: "0 2px 8px #0001", marginBottom: 10 }}
              >
                {/* Exemple de vidéo libre de droit. Remplacez l’URL par la vôtre ! */}
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                {/* Pour YouTube/Cloudinary/Google Drive, utilisez l’embed ou le lien direct mp4 */}
                Votre navigateur ne supporte pas la vidéo.
              </video>
              <div style={{ fontSize: 15, color: "#555", marginTop: 4 }}>
                <b>Personnalisation :</b> télécharge le modèle vidéo, ajoute le texte généré ci-dessus, ta voix (avec <a href="https://ttsmp3.com/" target="_blank">ttsMP3</a>), l’image et publie sur TikTok, Instagram Reels, YouTube Shorts…  
                <br />
                <b>Astuce :</b> Hashtags populaires : <b>#immigrantCanada #emploicanada #jobCanada</b>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
