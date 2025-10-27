import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// 静的ファイル配信（frontendフォルダ）
app.use(express.static(path.join(__dirname, "frontend")));

// ルートアクセスで index.html を返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Render用のヘルスチェック
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`🎰 I'm Juggler 8497 running on port ${PORT}`);
});
