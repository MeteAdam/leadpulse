// ==========================================================================
// LeadPulse AI — Application Logic & Interactive Lead Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Sample High-Intent Dataset for Live Simulator
  const sampleLeads = [
    {
      id: "lead_1",
      channel: "r/SaaS",
      author: "u/growth_founder_99",
      title: "Looking for an automated way to monitor Reddit for leads without getting banned",
      snippet: "I've been manually searching reddit every morning for keywords like 'need CRM' or 'alternative to Salesforce'. It works and got me 4 paying customers, but it takes 3 hours a day. Is there a tool that alerts me in real-time when people ask for recommendations?",
      intentScore: 98,
      category: "urgent",
      time: "14m ago",
      pitchDraft: "Hey u/growth_founder_99! Completely feel your pain on the manual keyword search grind. Instead of manual scraping, you can set up semantic alerts that match intent (not just exact words) so you catch discussions before competitors jump in. LeadPulse AI automates this exact pipeline and generates draft replies compliant with subreddit rules. Happy to share our free setup if you want to test it out!"
    },
    {
      id: "lead_2",
      channel: "r/Entrepreneur",
      author: "u/tech_agency_mike",
      title: "What's your current stack for B2B client acquisition in 2026?",
      snippet: "Cold email open rates have plummeted for us after recent domain policy updates. Looking to pivot our outbound strategy towards social selling and targeted community discussions. Budget is $100-$300/mo for a solid tool.",
      intentScore: 95,
      category: "budget",
      time: "38m ago",
      pitchDraft: "Hey Mike! With cold email inbox deliverability tightening, high-intent social listening on Reddit and Twitter is converting 4-5x higher because you're reaching buyers at the exact moment they express the problem. LeadPulse AI lets you monitor high-intent requests and plug directly into your CRM. Check it out at leadpulse.ai if you're looking for that kind of workflow!"
    },
    {
      id: "lead_3",
      channel: "r/webdev",
      author: "u/dev_studio_alex",
      title: "Any good alternatives to BuzzSumo / Brand24 for small indie developers?",
      snippet: "Brand24 is charging $199/mo which is overkill for a solo dev. I just need alerts when someone in dev subreddits asks for web development agencies or custom integrations.",
      intentScore: 92,
      category: "alternative",
      time: "1h ago",
      pitchDraft: "Hey Alex! Enterprise listening tools are heavily bloated and overpriced for solo devs. You might want to take a look at LeadPulse AI ($29/mo starter plan). It filters specifically for actionable buying intent rather than generic brand mentions."
    },
    {
      id: "lead_4",
      channel: "r/SideProject",
      author: "u/indie_builder_sam",
      title: "How do you find your first 10 paying users without spending on Ads?",
      snippet: "Just launched my AI document summarizer. Zero marketing budget. Where do people actively look for document tools so I can reach out directly?",
      intentScore: 89,
      category: "urgent",
      time: "2h ago",
      pitchDraft: "Hey Sam! Finding your first 10 customers is best done through high-intent community replies where users complain about document overload. An automated scanner like LeadPulse AI can ping you the second someone asks for PDF tools so you can offer value first."
    }
  ];

  let currentLeads = [...sampleLeads];
  let activeFilter = 'all';

  // Elements
  const scannerContainer = document.getElementById('scanner-results-list');
  const keywordInput = document.getElementById('scanner-keyword-input');
  const scanBtn = document.getElementById('trigger-scan-btn');
  const spinner = document.getElementById('scanner-spinner');
  const filterChips = document.querySelectorAll('.filter-chip');
  const exportBtn = document.getElementById('export-leads-btn');
  const statFound = document.getElementById('stat-found');

  // Modal Elements
  const modal = document.getElementById('action-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalForm = document.getElementById('lead-capture-form');
  const modalSuccess = document.getElementById('modal-success-state');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');

  // Render Leads
  function renderLeads(leadsToRender) {
    scannerContainer.innerHTML = '';

    if (leadsToRender.length === 0) {
      scannerContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <p>No leads found matching this filter criteria.</p>
        </div>
      `;
      return;
    }

    leadsToRender.forEach(lead => {
      const leadEl = document.createElement('div');
      leadEl.className = 'lead-item';
      leadEl.innerHTML = `
        <div class="lead-top">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="lead-channel-badge">${lead.channel}</span>
            <span style="font-size: 0.8rem; color: var(--text-dim);">${lead.author} • ${lead.time}</span>
          </div>
          <span class="intent-score score-high">Intent: ${lead.intentScore}%</span>
        </div>

        <h4 class="lead-title">${escapeHtml(lead.title)}</h4>
        <p class="lead-snippet">"${escapeHtml(lead.snippet)}"</p>

        <div class="ai-pitch-box">
          <div class="ai-pitch-header">
            <span>✨ AI Value-First Outreach Draft (Subreddit Rule Compliant):</span>
            <button class="btn btn-sm btn-outline copy-pitch-btn" data-pitch="${escapeHtml(lead.pitchDraft)}" style="padding: 2px 8px; font-size: 0.75rem;">Copy Pitch</button>
          </div>
          <p class="ai-pitch-text">${escapeHtml(lead.pitchDraft)}</p>
        </div>

        <div class="lead-actions">
          <button class="btn btn-sm btn-primary approve-lead-btn" data-id="${lead.id}">
            <span>Approve & Open Thread</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </button>
          <button class="btn btn-sm btn-outline save-lead-btn" data-id="${lead.id}">Save to CRM</button>
        </div>
      `;
      scannerContainer.appendChild(leadEl);
    });

    if (statFound) {
      statFound.innerHTML = `Found <strong>${leadsToRender.length}</strong> verified intent signals`;
    }

    // Attach Copy Listeners
    document.querySelectorAll('.copy-pitch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-pitch');
        navigator.clipboard.writeText(text);
        const originalText = e.currentTarget.textContent;
        e.currentTarget.textContent = 'Copied!';
        setTimeout(() => {
          e.currentTarget.textContent = originalText;
        }, 1800);
      });
    });

    // Attach Action Listeners
    document.querySelectorAll('.approve-lead-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openModal('Approve & Dispatch Outreach', 'Engage Lead');
      });
    });

    document.querySelectorAll('.save-lead-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.currentTarget.textContent = '✓ Saved to Local CRM';
        e.currentTarget.style.borderColor = 'var(--emerald)';
        e.currentTarget.style.color = 'var(--emerald)';
      });
    });
  }

  // Filter Handler
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');

      applyFilter();
    });
  });

  function applyFilter() {
    if (activeFilter === 'all') {
      renderLeads(currentLeads);
    } else {
      const filtered = currentLeads.filter(lead => lead.category === activeFilter);
      renderLeads(filtered);
    }
  }

  // Trigger Scan Simulation
  if (scanBtn && keywordInput) {
    scanBtn.addEventListener('click', () => {
      const query = keywordInput.value.trim();
      if (!query) return;

      const btnText = scanBtn.querySelector('.btn-text');
      btnText.textContent = 'Scanning Feeds...';
      spinner.style.display = 'inline-block';
      scanBtn.disabled = true;

      setTimeout(() => {
        // Generate a custom simulated lead based on user query
        const customLead = {
          id: 'lead_' + Date.now(),
          channel: 'r/SaaS',
          author: 'u/founder_' + Math.floor(Math.random() * 899 + 100),
          title: `Looking for recommendations on tools for ${query}`,
          snippet: `We are scaling our workflow and looking for software that automates ${query}. Tired of clunky legacy solutions. What are you guys using?`,
          intentScore: Math.floor(Math.random() * 8 + 92),
          category: 'urgent',
          time: 'Just now',
          pitchDraft: `Hey! If you're looking for a streamlined tool for ${query}, we built LeadPulse AI specifically to solve this without heavy setup overhead. Happy to share how we handle it!`
        };

        currentLeads = [customLead, ...sampleLeads];
        applyFilter();

        btnText.textContent = 'Scan Live Leads';
        spinner.style.display = 'none';
        scanBtn.disabled = false;
      }, 900);
    });
  }

  // Export Leads
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentLeads, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `leadpulse_leads_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Modal Handlers
  function openModal(title = "Get Started with LeadPulse AI", badge = "Free Instant Access") {
    if (modalTitle) modalTitle.textContent = title;
    if (modalBadge) modalBadge.textContent = badge;
    modalForm.style.display = 'block';
    modalSuccess.style.display = 'none';
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Form Submit (Lead Capture & Mock Payment Handoff)
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('user-email').value;
      const product = document.getElementById('user-product').value;
      const subreddits = document.getElementById('user-subreddits').value;

      // Save locally
      const leadConfig = { email, product, subreddits, date: new Date().toISOString() };
      localStorage.setItem('leadpulse_user_config', JSON.stringify(leadConfig));

      modalForm.style.display = 'none';
      modalSuccess.style.display = 'block';
    });
  }

  if (modalDoneBtn) {
    modalDoneBtn.addEventListener('click', () => {
      closeModal();
      document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hook Up All CTA Buttons
  const ctaButtons = [
    document.getElementById('nav-cta-btn'),
    document.getElementById('hero-get-started-btn'),
    document.getElementById('footer-cta-btn'),
    document.getElementById('nav-login-btn')
  ];

  ctaButtons.forEach(btn => {
    if (btn) btn.addEventListener('click', () => openModal('Start Free 15 Lead Pilot', 'Instant Activation'));
  });

  // Pricing buttons
  const GUMROAD_CHECKOUT_URL = 'https://aydinmete.gumroad.com/l/zctpad';

  document.querySelectorAll('.pricing-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plan = e.currentTarget.getAttribute('data-plan');
      if (plan === 'free') {
        openModal('Activate Free Starter Pilot', '15 Free Leads');
      } else if (plan === 'pro') {
        window.open(GUMROAD_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
      } else if (plan === 'agency') {
        window.open(GUMROAD_CHECKOUT_URL, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // Helper
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initial Render
  renderLeads(currentLeads);
});
