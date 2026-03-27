const API_BASE_URL = "https://brawl-api-production.up.railway.app";

const searchBtn = document.getElementById("searchBtn");
const playerTagInput = document.getElementById("playerTag");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("playerResult");
const quickTagButtons = document.querySelectorAll(".quick-tag");

function normalizeTag(tag) {
  return String(tag || "")
    .replace(/\s/g, "")
    .replace(/^#/, "")
    .toUpperCase();
}

function renderPlayer(data) {
  const brawlers = Array.isArray(data.brawlers) ? data.brawlers : [];

  resultEl.innerHTML = `
    <div class="player-summary">
      <h2>${data.name || "Unknown Player"}</h2>

      <div class="player-stats">
        <div class="stat-box">
          <div class="label">プレイヤータグ</div>
          <div class="value">#${data.tag || "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">現在トロフィー</div>
          <div class="value">${data.trophies ?? "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">最高トロフィー</div>
          <div class="value">${data.highestTrophies ?? "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">クラブ</div>
          <div class="value">${data.clubName || "なし"}</div>
        </div>
        <div class="stat-box">
          <div class="label">経験レベル</div>
          <div class="value">${data.expLevel ?? "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">最強ブロウラー</div>
          <div class="value">${data.bestBrawler || "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">ソロ勝利</div>
          <div class="value">${data.soloVictories ?? "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">デュオ勝利</div>
          <div class="value">${data.duoVictories ?? "-"}</div>
        </div>
        <div class="stat-box">
          <div class="label">3v3勝利</div>
          <div class="value">${data.trioVictories ?? "-"}</div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="section-title">所持ブロウラー</h2>
      <div class="card-grid">
        ${brawlers.map(b => `
          <div class="card">
            <div class="brawler-icon">${String(b.name || "?").charAt(0)}</div>
            <h3>${b.name || "-"}</h3>
            <p>パワー: ${b.power ?? "-"}</p>
            <p>トロフィー: ${b.trophies ?? "-"}</p>
            <p>最高トロフィー: ${b.highestTrophies ?? "-"}</p>
            <p>ガジェット数: ${b.gadgetCount ?? "-"}</p>
            <p>スタパ数: ${b.starPowerCount ?? "-"}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

async function searchPlayer(tagOverride = null) {
  const rawTag = tagOverride ?? playerTagInput.value.trim();
  const tag = normalizeTag(rawTag);

  resultEl.innerHTML = "";

  if (!tag) {
    statusEl.textContent = "プレイヤータグを入力してください。";
    return;
  }

  playerTagInput.value = `#${tag}`;
  statusEl.textContent = "読み込み中...";

  try {
    const res = await fetch(`${API_BASE_URL}/api/player/${encodeURIComponent(tag)}`);
    const data = await res.json();

    if (!res.ok) {
      statusEl.textContent = data.error || "取得に失敗しました。";
      return;
    }

    statusEl.textContent = data.cached
      ? "表示しました（キャッシュ済みデータ）"
      : "表示しました";
    renderPlayer(data);
  } catch (error) {
    statusEl.textContent = "通信エラーが発生しました。";
  }
}

searchBtn?.addEventListener("click", () => searchPlayer());

playerTagInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPlayer();
  }
});

quickTagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag") || "";
    searchPlayer(tag);
  });
});
