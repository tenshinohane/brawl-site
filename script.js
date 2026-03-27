function getRoleLabel(role) {
  const map = {
    damage: "アタッカー",
    tank: "タンク",
    support: "サポート",
    control: "コントロール"
  };
  return map[role] || role;
}

function renderFeatured() {
  const el = document.getElementById("featuredBrawlers");
  if (!el) return;

  const featured = BRAWLERS.slice(0, 4);
  el.innerHTML = featured.map(b => `
    <div class="card">
      <div class="brawler-icon">${b.name.charAt(0)}</div>
      <h3>${b.name}</h3>
      <p>ロール: ${getRoleLabel(b.role)}</p>
      <p>Tier: ${b.tier}</p>
      <p>${b.description}</p>
    </div>
  `).join("");
}

function renderBrawlers() {
  const grid = document.getElementById("brawlerGrid");
  if (!grid) return;

  const searchInput = document.getElementById("searchInput");
  const roleFilter = document.getElementById("roleFilter");
  const tierFilter = document.getElementById("tierFilter");

  function update() {
    const keyword = (searchInput?.value || "").trim().toLowerCase();
    const role = roleFilter?.value || "all";
    const tier = tierFilter?.value || "all";

    const filtered = BRAWLERS.filter(b => {
      const okKeyword = !keyword || b.name.toLowerCase().includes(keyword);
      const okRole = role === "all" || b.role === role;
      const okTier = tier === "all" || b.tier === tier;
      return okKeyword && okRole && okTier;
    });

    grid.innerHTML = filtered.map(b => `
      <div class="card">
        <div class="brawler-icon">${b.name.charAt(0)}</div>
        <h3>${b.name}</h3>
        <p>ロール: ${getRoleLabel(b.role)}</p>
        <p>Tier: ${b.tier}</p>
        <p>${b.description}</p>
      </div>
    `).join("");
  }

  searchInput?.addEventListener("input", update);
  roleFilter?.addEventListener("change", update);
  tierFilter?.addEventListener("change", update);

  update();
}

function renderTierTable() {
  const wrap = document.getElementById("tierTableWrap");
  if (!wrap) return;

  const tiers = ["S", "A", "B", "C"];

  wrap.innerHTML = tiers.map(tier => {
    const items = BRAWLERS.filter(b => b.tier === tier);
    return `
      <div class="tier-row">
        <h2>${tier} Tier</h2>
        <div class="tier-items">
          ${items.map(item => `<div class="tier-chip">${item.name}</div>`).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function renderMaps() {
  const grid = document.getElementById("mapsGrid");
  if (!grid) return;

  grid.innerHTML = MAPS.map(map => `
    <div class="news-card">
      <h3>${map.name}</h3>
      <p>モード: ${map.mode}</p>
      <p>おすすめ: ${map.best.join(" / ")}</p>
    </div>
  `).join("");
}

renderFeatured();
renderBrawlers();
renderTierTable();
renderMaps();
