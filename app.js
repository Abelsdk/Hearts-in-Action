// ============================================================================
// Heart in Action — app.js (Beginner-Friendly Comments)
// ----------------------------------------------------------------------------
// PURPOSE
// - Load small JSON files (in /data) and render dynamic parts of the site.
// - Keep everything framework-free so it runs perfectly on GitHub Pages.
//
// FILES WE READ
// - data/site.json   → goal, raised, simple KPI numbers
// - data/events.json → list of events (title, date, location, description, image)
// - data/members.json→ list of founders (name, role, photo, links)
//
// HOW IT WORKS
// 1) When the page loads, we check which sections exist.
// 2) For each section, we fetch the JSON and render UI.
// 3) We also make small usability tweaks (active nav link, year in footer).
// ============================================================================

// Run once the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // 1) ACTIVE NAV: mark the current page's link as active
  const map = { 'index.html':'nav-home', 'events.html':'nav-events', 'members.html':'nav-members' };
  const here = location.pathname.split('/').pop() || 'index.html';
  const id = map[here];
  if (id) { const el = document.getElementById(id); if (el) el.classList.add('active'); }

  // 2) FOOTER YEAR: auto-updated so you don't have to edit it yearly
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 3) GOAL WIDGET + KPIs: only on pages that include those elements (Home)
  if (document.getElementById('goalAmount')) {
    try{
      // cache: 'no-store' is helpful on GitHub Pages to avoid stale JSON
      const res = await fetch('data/site.json', { cache: 'no-store' });
      const site = await res.json();
      renderGoal(site.goal, site.raised);
      renderKpis(site);
    }catch(e){ console.error('Missing or invalid data/site.json', e); }
  }

  // 4) EVENTS GRID: render cards if #eventsGrid exists (Events page)
  if (document.getElementById('eventsGrid')) {
    try{
      const res = await fetch('data/events.json', { cache: 'no-store' });
      const events = await res.json();
      renderEvents(events);
    }catch(e){ console.error('Missing or invalid data/events.json', e); }
  }

  // 5) MEMBERS GRID: render cards if #membersGrid exists (Members page)
  if (document.getElementById('membersGrid')) {
    try{
      const res = await fetch('data/members.json', { cache: 'no-store' });
      const members = await res.json();
      renderMembers(members);
    }catch(e){ console.error('Missing or invalid data/members.json', e); }
  }
});

/** Utility: format a number as Canadian dollars (e.g., 1500 → $1,500) */
function formatMoney(n){
  return new Intl.NumberFormat('en-CA', { style:'currency', currency:'CAD', maximumFractionDigits:0 }).format(n);
}

/** Render the fundraising goal widget */
function renderGoal(goal, raised){
  const goalEl = document.getElementById('goalAmount');
  const raisedEl = document.getElementById('raisedAmount');
  goalEl.textContent = formatMoney(goal);
  raisedEl.textContent = formatMoney(raised);

  // Compute percentage and clamp at 100 to avoid overflow if you exceed the goal
  const pct = Math.min(100, Math.round((raised/goal)*100));

  // Animate the bar to that percentage
  const bar = document.querySelector('.progress__bar');
  if (bar){
    bar.style.width = pct + '%';
    // ARIA attribute helps screen readers understand the current percentage
    bar.setAttribute('aria-valuenow', String(pct));
  }

  // Update the % label next to the bar
  const pctEl = document.getElementById('goalPct');
  if (pctEl) pctEl.textContent = pct + '%';
}

/** Update KPI counters under the hero */
function renderKpis(site){
  const k1 = document.getElementById('kpiEvents'); if (k1) k1.textContent = site.eventsRun || 1;
  const k2 = document.getElementById('kpiVolunteers'); if (k2) k2.textContent = site.volunteers || 10;
  const k3 = document.getElementById('kpiRaised'); if (k3) k3.textContent = formatMoney(site.raised);
}

/** Render an array of event objects as cards */
function renderEvents(events){
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';
  events.forEach(ev => {
    const card = document.createElement('article');
    card.className = 'card event';
    card.innerHTML = `
      <img src="${ev.image || 'assets/event-placeholder.jpg'}" alt="${ev.title}" loading="lazy">
      <div class="meta">${ev.date} • ${ev.location}</div>
      <h3>${ev.title}</h3>
      <p>${ev.description}</p>
    `;
    grid.appendChild(card);
  });
}

/** Render members (founders) as cards */
function renderMembers(members){
  const grid = document.getElementById('membersGrid');
  grid.innerHTML = '';
  members.forEach(m => {
    const card = document.createElement('article');
    card.className = 'card member-card';
    card.innerHTML = `
      <img src="${m.photo || 'assets/member-placeholder.jpg'}" alt="${m.name}" loading="lazy">
      <h3>${m.name}</h3>
      ${m.role ? `<div class="meta">${m.role}</div>`:''}
      <div class="links">
        ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`:''}
        ${m.email ? `<a href="mailto:${m.email}">Email</a>`:''}
      </div>
    `;
    grid.appendChild(card);
  });
}
