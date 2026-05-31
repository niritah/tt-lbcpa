// ═══════════════ TIME TRACKER MODULE v7 ═══════════════
(function(){

// ── GLOBAL APP STYLES (sidebar + bg) ─────────────────
const _g=document.createElement('style');
_g.textContent=`
  /* ── BACKGROUND ── */
  body {
    background: linear-gradient(160deg,#0f172a 0%,#1e3a8a 45%,#2563eb 100%) !important;
    min-height:100vh;
  }
  /* ── TT SCREEN FULL COVER IN LOGIN MODE ── */
  body.tt-login-mode #screen-tt {
    position:fixed !important;
    inset:0 !important;
    z-index:400 !important;
    background: linear-gradient(160deg,#0f172a 0%,#1e3a8a 45%,#2563eb 100%) !important;
    overflow-y:auto !important;
    margin-right:0 !important;
  }
  /* ── SIDEBAR ── */
  #tabbar {
    position:fixed !important;
    right:0 !important; top:0 !important;
    width:130px !important; height:100vh !important;
    flex-direction:column !important;
    background:rgba(15,23,42,0.97) !important;
    border-top:none !important;
    border-left:1px solid rgba(255,255,255,0.08) !important;
    padding:6px 5px 8px !important;
    z-index:300 !important;
    gap:1px !important;
    overflow-y:auto !important;
    box-shadow:-2px 0 12px rgba(0,0,0,0.3) !important;
    justify-content:flex-start !important;
    align-items:stretch !important;
    transition: right .25s ease !important;
  }
  /* Mobile: hide sidebar by default */
  @media (max-width:767px) {
    #tabbar {
      right:-130px !important;
      z-index:500 !important;
    }
    #tabbar.tt-mob-open {
      right:0 !important;
    }
    #header { margin-right:0 !important; }
    #app    { margin-right:0 !important; }
    #tt-mob-overlay {
      display:none;
      position:fixed;inset:0;
      background:rgba(0,0,0,0.45);
      z-index:490;
    }
    #tt-mob-overlay.show { display:block; }
    #tt-hamburger {
      display:flex !important;
    }
  }
  /* Desktop: hamburger hidden */
  #tt-hamburger {
    display:none;
    position:fixed;
    top:9px; right:9px;
    z-index:600;
    background:rgba(15,23,42,0.9);
    border:1px solid rgba(255,255,255,0.18);
    color:#93c5fd;
    font-size:18px;
    width:36px; height:36px;
    border-radius:8px;
    align-items:center; justify-content:center;
    cursor:pointer;
  }
  /* Push header & app AWAY from right sidebar — desktop only */
  @media (min-width:768px) {
    #header { margin-right:130px !important; }
    #app    { margin-right:130px !important; }
  }
  #header {
    position:sticky !important; top:0 !important; z-index:200 !important;
    order:0 !important;
  }
  #app { order:1 !important; }
  /* Fix law browser buttons visibility */
  .law-quick-btn { background:rgba(30,64,175,0.85) !important; color:#fff !important; border:1px solid rgba(255,255,255,0.25) !important; font-weight:600 !important; }
  .law-quick-btn:hover { background:rgba(59,130,246,0.9) !important; }
  /* Fix other app buttons */
  .bk-submit, .btn-save, button.go-btn { background:var(--blue) !important; color:#fff !important; }
  .send-btn { background:#1d4ed8 !important; color:#fff !important; }
  /* ── TAB BUTTONS ── */
  .tab-btn {
    flex-direction:column !important;
    justify-content:center !important;
    align-items:center !important;
    padding:5px 4px !important;
    border-radius:7px !important;
    gap:2px !important;
    width:100% !important;
    font-size:11px !important;
    font-weight:500 !important;
    color:rgba(255,255,255,0.55) !important;
    text-align:center !important;
    transition:all .15s !important;
    line-height:1.15 !important;
    height:46px !important;
    overflow:hidden !important;
  }
  .tab-btn:hover { background:rgba(255,255,255,0.07) !important; color:rgba(255,255,255,0.85) !important; }
  .tab-btn.active { background:rgba(59,130,246,0.2) !important; color:#93c5fd !important; border-right:3px solid #3b82f6 !important; }
  .tab-btn .tab-icon { font-size:18px !important; flex-shrink:0 !important; line-height:1 !important; }
  /* Time tracker button — 2x height of regular buttons */
  #tab-tt {
    order:-1 !important;
    background:linear-gradient(135deg,#1d4ed8,#2563eb) !important;
    color:#fff !important;
    font-weight:700 !important;
    margin-bottom:4px !important;
    border-radius:8px !important;
    padding:2px 4px !important;
    height:76px !important;
    box-shadow:0 2px 8px rgba(37,99,235,0.35) !important;
    border-right:none !important;
    font-size:11px !important;
  }
  #tab-tt .tab-icon { font-size:22px !important; }
  #tab-tt:hover { background:linear-gradient(135deg,#2563eb,#3b82f6) !important; }
  #tab-tt.active { background:linear-gradient(135deg,#2563eb,#3b82f6) !important; border-right:none !important; }
  /* ── GOLD LB BADGE — clickable back to app ── */
  #logo-badge {
    background:linear-gradient(135deg,#B8860B,#D4A017,#F0C040) !important;
    cursor:pointer !important;
    transition:transform .15s, box-shadow .15s !important;
  }
  #logo-badge:hover {
    transform:scale(1.08) !important;
    box-shadow:0 2px 10px rgba(212,160,23,0.5) !important;
  }
  /* ── ALL SCREENS SHOW GRADIENT ── */
  .screen, #app { background:transparent !important; }
  /* Main content panels — semi-transparent so gradient shows */
  .chat-msgs { background:rgba(15,23,42,0.55) !important; }
  .chat-input { background:rgba(15,23,42,0.7) !important; }
  #law-body, #law-content { background:rgba(15,23,42,0.55) !important; }
  #law-nav { background:rgba(15,23,42,0.7) !important; }
  #law-header { background:rgba(15,23,42,0.75) !important; }
  .bk-form { background:rgba(15,23,42,0.55) !important; }
  .msg-ai { background:rgba(15,23,42,0.8) !important; border-color:rgba(255,255,255,0.1) !important; color:#e8eaf0 !important; }
  .msg-user { background:rgba(30,64,175,0.6) !important; color:#fff !important; }
  .chat-textarea { background:rgba(15,23,42,0.7) !important; border-color:rgba(255,255,255,0.15) !important; color:#e8eaf0 !important; }
  .chat-textarea:focus { border-color:rgba(99,147,255,0.6) !important; }
  .chat-textarea::placeholder { color:rgba(255,255,255,0.35) !important; }
  /* Login screen moved to login.html */
  /* Law browser */
  .sec-title { color:#93c5fd !important; }
  .sec-body { color:#cbd5e1 !important; }
  .sec-item { color:#94a3b8 !important; }
  .sec-item:hover, .sec-item.active { color:#93c5fd !important; background:rgba(59,130,246,0.1) !important; }
  .cat-header { color:#93c5fd !important; background:rgba(15,23,42,0.9) !important; border-color:rgba(255,255,255,0.08) !important; }
  /* BK form */
  .bk-group label { color:#94a3b8 !important; }
  .bk-group select, .bk-group input { background:rgba(255,255,255,0.08) !important; border-color:rgba(255,255,255,0.15) !important; color:#e8eaf0 !important; }
`;
document.head.appendChild(_g);

// ── TT-SPECIFIC STYLES ────────────────────────────────
const _s=document.createElement('style');
_s.textContent=`
  :root {
    --blue:#1E40AF; --blue-light:#3B82F6; --blue-pale:#EFF6FF; --blue-border:#DBEAFE;
    --dark:#0F172A; --text:#1E293B; --muted:#475569; --subtle:#64748B;
    --border:#E2E8F0; --surface:#F8FAFC; --white:#FFFFFF;
    --red:#DC2626; --red-bg:#FEF2F2; --red-border:#FECACA;
    --yellow:#D97706; --yellow-bg:#FFFBEB; --yellow-border:#FDE68A;
    --green:#16A34A; --green-bg:#F0FDF4; --green-border:#BBF7D0;
  }
  #screen-tt { background:transparent !important; }
  .tt-bar{background:rgba(255,255,255,0.95);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;backdrop-filter:blur(10px);}
  .tt-bar-title{font-size:18px;font-weight:800;color:var(--blue);}
  .tt-bar-r{display:flex;align-items:center;gap:8px;}
  .tt-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--blue-light));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;}
  .tt-nm{font-size:12px;font-weight:600;color:var(--text);}
  .tt-xbtn{background:transparent;border:1px solid var(--border);color:var(--muted);font-size:11px;padding:4px 10px;border-radius:6px;cursor:pointer;font-family:inherit;}
  .tt-xbtn:hover{border-color:var(--blue-light);color:var(--blue);}
  .tt{max-width:640px;margin:0 auto;padding:10px 12px 32px;direction:rtl;font-family:'Segoe UI',Arial,sans-serif;}
  .tt-tabs{display:flex;gap:4px;margin-bottom:12px;}
  .tt-tab{flex:1;padding:8px;border-radius:9px;border:1px solid var(--border);background:#fff;color:var(--muted);font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;}
  .tt-tab.on{background:var(--blue);color:#fff;border-color:var(--blue);box-shadow:0 2px 8px rgba(30,64,175,.25);}
  .tt-dbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .tt-dlbl{font-size:13px;font-weight:700;color:#fff;cursor:pointer;display:flex;align-items:center;gap:5px;text-shadow:0 1px 3px rgba(0,0,0,.3);}
  .tt-dlbl:hover{color:#93c5fd;}
  .tt-today{font-size:10px;color:#fff;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);padding:1px 6px;border-radius:5px;font-weight:700;}
  .tt-nav{display:flex;gap:4px;}
  .tt-nav button{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);color:#fff;width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;}
  .tt-nav button:hover{background:rgba(255,255,255,.25);}
  .tt-nav button:disabled{opacity:.3;cursor:not-allowed;}
  /* Cards */
  .tt-card{background:rgba(255,255,255,0.95);border:1px solid rgba(255,255,255,.5);border-radius:14px;padding:12px 14px;margin-bottom:8px;box-shadow:0 2px 8px rgba(0,0,0,.08);backdrop-filter:blur(8px);}
  .tt-att{background:#F1F5F9;border:1px solid #CBD5E1;border-radius:14px;padding:12px 14px;margin-bottom:8px;box-shadow:0 2px 8px rgba(0,0,0,.08);}
  .tt-att-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .tt-att-title{font-size:16px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.7px;}
  .tt-att-sum{font-size:13px;font-weight:800;color:var(--text);}
  .tt-att-sum span{color:var(--blue);}
  .tt-att-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  .tt-afield label{display:block;font-size:14px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
  .tt-tbox{width:100%;background:#FFFFFF;border:2px solid #BFDBFE;color:var(--blue);padding:8px 10px;border-radius:8px;font-size:19px;font-weight:800;font-family:'Segoe UI',Arial,sans-serif;text-align:center;letter-spacing:3px;direction:ltr;box-shadow:0 1px 4px rgba(30,64,175,0.08);}
  .tt-tbox:focus{outline:none;border-color:var(--blue-light);box-shadow:0 0 0 3px rgba(59,130,246,0.15);}
  .tt-tbox.set{border-color:var(--blue-light);background:#EFF6FF;color:var(--blue);}
  .tt-tbox::placeholder{color:#94A3B8;font-size:14px;font-weight:400;letter-spacing:1px;}
  .tt-tbox:disabled{opacity:0.45;cursor:not-allowed;background:#f1f5f9;}
  .tt-dbl{font-size:11px;color:var(--muted);text-align:center;margin-top:3px;}
  .tt-alert{display:flex;align-items:center;gap:8px;border-radius:8px;padding:8px 12px;margin-bottom:8px;font-size:12px;font-weight:600;flex-wrap:wrap;}
  .tt-alert.warn{background:var(--yellow-bg);border:1px solid var(--yellow-border);color:var(--yellow);}
  .tt-alert.ok{background:var(--green-bg);border:1px solid var(--green-border);color:var(--green);}
  .tt-form{background:#F1F5F9;border:1px solid #CBD5E1;border-radius:14px;padding:12px 14px;margin-bottom:10px;box-shadow:0 2px 8px rgba(0,0,0,.08);}
  .tt-ftitle{font-size:12px;font-weight:700;color:var(--blue);margin-bottom:10px;}
  .tt-r2{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;}
  .tt-fg{margin-bottom:8px;}
  .tt-fl{display:block;font-size:14px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
  .tt-fi{width:100%;background:var(--surface);border:1.5px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:13px;font-family:'Segoe UI',Arial,sans-serif;direction:rtl;}
  .tt-fi:focus{outline:none;border-color:var(--blue-light);}
  .tt-fs{width:100%;background:#fff;border:1.5px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:13px;font-family:'Segoe UI',Arial,sans-serif;direction:rtl;appearance:auto;}
  .tt-fs:focus{outline:none;border-color:var(--blue-light);}
  .tt-fs option{background:#fff;color:var(--text);}
  .tt-tfi{text-align:center;font-size:16px;font-weight:800;letter-spacing:3px;direction:ltr;}
  .tt-tfi::placeholder{color:var(--subtle);font-size:13px;font-weight:400;letter-spacing:1px;}
  .tt-hint{font-size:11px;color:var(--blue-light);margin-top:2px;}
  .tt-dur{display:inline-flex;align-items:center;gap:5px;background:var(--blue-pale);border:1px solid var(--blue-border);color:var(--blue);padding:5px 11px;border-radius:7px;font-size:13px;font-weight:800;margin-bottom:8px;}
  .tt-chk{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
  .tt-chk input{width:15px;height:15px;accent-color:var(--blue);cursor:pointer;}
  .tt-chk label{font-size:12px;cursor:pointer;color:var(--text);}
  .tt-add{width:100%;padding:10px;border-radius:9px;border:none;background:var(--blue);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(30,64,175,.2);}
  .tt-add:hover{background:var(--blue-light);}
  .tt-add:disabled{opacity:.4;cursor:not-allowed;}
  .tt-lhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;}
  .tt-ltitle{font-size:11px;font-weight:700;color:#fff;display:flex;align-items:center;gap:4px;text-shadow:0 1px 3px rgba(0,0,0,.3);}
  .tt-cnt{background:rgba(255,255,255,.2);color:#fff;border-radius:20px;padding:1px 7px;font-size:10px;font-weight:700;}
  .tt-wsum{font-size:11px;font-weight:700;color:#fff;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);padding:2px 9px;border-radius:20px;}
  /* ── ENTRY ROWS with column headers ── */
  .tt-entries-wrap { margin-top:4px; }
  .tt-entries-header {
    display:grid;
    grid-template-columns:100px 50px 1fr 1fr auto;
    align-items:center;gap:6px;
    padding:3px 9px 5px;
    font-size:10px;font-weight:700;
    color:rgba(255,255,255,.6);
    text-transform:uppercase;letter-spacing:.4px;
    border-bottom:1px solid rgba(255,255,255,.15);
    margin-bottom:4px;
  }
  .tt-entry-sm{background:rgba(255,255,255,0.9);border:0.5px solid rgba(255,255,255,.4);border-radius:7px;padding:7px 9px;margin-bottom:4px;display:grid;grid-template-columns:100px 50px 1fr 1fr auto;align-items:center;gap:6px;font-size:11px;}
  .tt-entry-sm:hover{border-color:rgba(99,147,255,.5);background:rgba(255,255,255,.97);}
  /* Bigger time and hours in entries */
  .tt-esm-time{font-family:monospace;font-size:13px;font-weight:800;color:var(--blue);direction:ltr;white-space:nowrap;}
  .tt-esm-h{font-weight:800;color:var(--blue);font-size:15px;text-align:center;}
  .tt-esm-cli{font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .tt-esm-wt{color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .tt-del{background:transparent;border:none;color:rgba(220,38,38,0.6);width:20px;height:20px;border-radius:4px;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .tt-del:hover{background:var(--red-bg);color:var(--red);}
  .tt-empty{text-align:center;padding:18px;color:rgba(255,255,255,.7);font-size:12px;background:rgba(255,255,255,.08);border:1px dashed rgba(255,255,255,.2);border-radius:9px;}
  /* Stats side panel */
  #tt-stats-inline { transition: all .2s; }
  .tt-stats{background:rgba(8,18,55,0.5);border:1px solid rgba(99,147,255,0.3);border-radius:10px;padding:10px;height:100%;}
  .tt-stats-header{margin-bottom:6px;}
  .tt-stats-title{font-size:10px;font-weight:700;color:rgba(255,255,255,.95);line-height:1.3;word-break:break-word;}
  .tt-stats-total-badge{display:inline-block;background:rgba(59,130,246,0.4);border:1px solid rgba(99,147,255,0.4);border-radius:6px;padding:2px 7px;font-size:13px;font-weight:800;color:#fff;margin-top:4px;}
  .tt-stats-months-bars{display:flex;gap:3px;align-items:flex-end;height:60px;margin-top:8px;}
  .tt-stats-month{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0;}
  .tt-stats-month-bar{width:100%;border-radius:2px 2px 0 0;min-height:2px;}
  .tt-stats-month .sm-val{font-size:8px;font-weight:700;color:#93c5fd;margin-top:2px;line-height:1;text-align:center;}
  .tt-stats-month .sm-lbl{font-size:7px;color:rgba(255,255,255,.4);margin-top:1px;line-height:1;text-align:center;}
  /* Login */
  .tt-login{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;padding:20px;}
  .tt-lbox{background:rgba(255,255,255,0.97);border:1px solid rgba(255,255,255,.5);border-radius:20px;padding:28px;width:300px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.2);}
  .tt-lico{font-size:34px;margin-bottom:8px;}
  .tt-lttl{font-size:18px;font-weight:800;color:var(--dark);margin-bottom:4px;}
  .tt-lsub{color:var(--muted);font-size:12px;margin-bottom:14px;}
  .tt-emplist{display:flex;flex-direction:column;gap:5px;max-height:240px;overflow-y:auto;margin-bottom:10px;}
  .tt-ebtn{background:var(--surface);border:1px solid var(--border);color:var(--text);padding:8px 11px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;font-family:inherit;text-align:right;display:flex;align-items:center;gap:7px;width:100%;}
  .tt-ebtn:hover{border-color:var(--blue-light);background:var(--blue-pale);}
  .tt-eav{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--blue-light));display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;color:#fff;}
  .tt-pass{width:100%;background:var(--surface);border:2px solid var(--border);color:var(--blue);padding:9px;border-radius:9px;font-size:20px;font-weight:800;text-align:center;letter-spacing:6px;font-family:inherit;direction:ltr;margin:8px 0;}
  .tt-pass:focus{outline:none;border-color:var(--blue-light);}
  .tt-pass.err{border-color:var(--red);color:var(--red);}
  .tt-back{display:flex;align-items:center;gap:6px;cursor:pointer;margin-bottom:10px;color:var(--blue-light);font-size:13px;font-weight:700;}
  .tt-lbtn{width:100%;padding:10px;border-radius:8px;border:none;background:var(--blue);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:4px;}
  .tt-lbtn:hover{background:var(--blue-light);}
  .tt-srch{width:100%;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:7px;font-size:12px;font-family:inherit;direction:rtl;margin-bottom:8px;}
  .tt-srch:focus{outline:none;border-color:var(--blue-light);}
  .tt-perr{color:var(--red);font-size:11px;min-height:15px;text-align:center;}
  /* Dashboard */
  .tt-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;}
  .tt-stat{background:rgba(255,255,255,0.92);border:1px solid rgba(255,255,255,.4);border-radius:10px;padding:10px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.08);}
  .tt-stat-v{font-size:20px;font-weight:800;color:var(--blue);}
  .tt-stat-l{font-size:10px;color:var(--muted);margin-top:2px;}
  .tt-bar-row{margin-bottom:8px;}
  .tt-bar-lbl{display:flex;justify-content:space-between;font-size:11px;color:var(--text);margin-bottom:3px;}
  .tt-bar-lbl span:last-child{color:var(--blue);font-weight:700;}
  .tt-bar-bg{background:var(--surface);border-radius:3px;height:7px;overflow:hidden;}
  .tt-bar-fill{height:100%;border-radius:3px;}
  .tt-period-btns{display:flex;gap:5px;margin-bottom:10px;}
  .tt-period-btn{padding:5px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:11px;cursor:pointer;font-family:inherit;}
  .tt-period-btn.on{background:var(--blue);border-color:var(--blue);color:#fff;font-weight:700;}
  /* Timer */
  .tt-timer{display:inline-flex;align-items:center;gap:6px;background:var(--blue-pale);border:1.5px solid var(--blue-border);color:var(--blue);padding:5px 12px;border-radius:8px;font-size:15px;font-weight:800;font-family:monospace;margin-bottom:8px;}
  .tt-timer-dot{width:7px;height:7px;border-radius:50%;background:var(--blue-light);flex-shrink:0;animation:tdblink 1s infinite;}
  @keyframes tdblink{0%,100%{opacity:1}50%{opacity:.2}}
  .tt-sp{display:inline-block;width:11px;height:11px;border:2px solid rgba(30,64,175,.2);border-top-color:var(--blue);border-radius:50%;animation:ttsp .6s linear infinite;vertical-align:middle;margin-left:4px;}
  @keyframes ttsp{to{transform:rotate(360deg)}}
  .tt-loader{display:flex;align-items:center;justify-content:center;min-height:200px;gap:10px;color:rgba(255,255,255,.7);font-size:13px;}
  .tt-toast-el{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);padding:8px 18px;border-radius:9px;font-weight:700;font-size:12px;z-index:999;white-space:nowrap;background:var(--green-bg);border:1px solid var(--green-border);color:var(--green);box-shadow:0 4px 14px rgba(0,0,0,.15);animation:ttsu .2s ease;}
  .tt-toast-el.err{background:var(--red-bg);border-color:var(--red-border);color:var(--red);}
  @keyframes ttsu{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  /* Date picker */
  .tt-datepicker{position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:500;display:flex;align-items:center;justify-content:center;}
  .tt-dp-box{background:#fff;border:1px solid var(--border);border-radius:14px;padding:16px;width:280px;box-shadow:0 8px 32px rgba(0,0,0,.2);}
  .tt-dp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .tt-dp-title{font-size:14px;font-weight:800;color:var(--dark);}
  .tt-dp-nav{background:var(--surface);border:1px solid var(--border);color:var(--muted);width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:14px;}
  .tt-dp-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
  .tt-dp-hdr{text-align:center;font-size:9px;color:var(--subtle);padding:2px 0;font-weight:700;}
  .tt-dp-day{text-align:center;padding:6px 2px;border-radius:6px;cursor:pointer;font-size:12px;color:var(--text);}
  .tt-dp-day:hover{background:var(--blue-pale);}
  .tt-dp-day.today{border:1.5px solid var(--blue-light);color:var(--blue);font-weight:700;}
  .tt-dp-day.selected{background:var(--blue);color:#fff;font-weight:700;}
  .tt-dp-day.other{color:var(--subtle);}
  .tt-dp-day.future{opacity:.3;cursor:not-allowed;}
  .tt-save-btn{background:var(--blue);border:none;color:#fff;padding:0 12px;border-radius:8px;cursor:pointer;font-weight:700;font-size:11px;white-space:nowrap;flex-shrink:0;height:38px;font-family:inherit;}
  .tt-save-btn:hover{background:var(--blue-light);}
  /* ── DASHBOARD full width ── */
  #tt-panel-dash > .tt { max-width:none !important; }
  .tt-dash-inner { max-width:1400px; margin:0 auto; }
  .tt-dash-cols {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px;
    margin-bottom:0;
  }
  /* Gap days table */
  .tt-gap-table { width:100%; border-collapse:collapse; font-size:12px; margin-top:6px; }
  .tt-gap-table th { background:rgba(30,64,175,0.1); color:var(--blue); font-weight:700; padding:7px 12px; text-align:right; border-bottom:2px solid var(--blue-border); }
  .tt-gap-table td { padding:6px 12px; border-bottom:1px solid var(--border); color:var(--text); }
  .tt-gap-table tr:last-child td { border-bottom:none; }
  .tt-gap-table tr:hover td { background:rgba(30,64,175,0.03); }
  .tt-gap-val { color:var(--yellow); font-weight:700; }
  /* Mobile responsive */
  @media (max-width:767px) {
    .tt-r2 { grid-template-columns:1fr !important; }
    #tt-stats-inline { display:none !important; }
    .tt { padding:8px 8px 24px; }
    .tt-dash-cols { grid-template-columns:1fr !important; }
    .tt-entries-header { display:none; }
    .tt-entry-sm { grid-template-columns:85px 40px 1fr auto; }
    .tt-esm-wt { display:none; }
  }
`;
document.head.appendChild(_s);

// ── CONFIG ─────────────────────────────────────────────
const PROXY_URL="/api/airtable";
const TABLES={employees:"tbl2NkTX2B5V0v3Vh",clients:"tblEJCS5WwolJ88PZ",workTypes:"tblavAtJvM0AGisde",attendance:"tblblLKnhsTfKWVA5",workEntries:"tblg8GcNbT1HmLPSk"};
const FE={fullName:"fldCo8bwUEjO8NGvq",status:"fldmCWnGz25l5c2L5",password:"fld2uJcLjBObxQNtd"};
const FC={name:"fld44goTyw5dtEunP"};
const FW={name:"fldheopDfAhGTCpL1",active:"fldSPl54felVcT23H"};
const FA={employee:"fldYwWpI2UCrzIVpV",date:"fldhoximxseaQC0Is",startTime:"fldwky7ITDabkGvKA",endTime:"fld2Li75khdTogMzk"};
const FT={employee:"fld5L3oItqqa1WLrw",client:"fldp5hH5cBfPn1riP",workType:"fldOcluTdeJTHKsyY",startTime:"fld0NfLmvTFQd96RS",endTime:"fldPHLSVt9JJ0bu1Y",hours:"fldIMdfBJXRjMd55r",notes:"fldgN2y3ithObOArm",billable:"fld5bdJ2MMyL6PBJf"};

// ── STATE ───────────────────────────────────────────────
let ttEmps=[],ttClients=[],ttWorkTypes=[],ttDays={};
let ttCurEmp=null,ttSelEmp=null,ttSelDate=ttToday();
let ttTimeVals={arrive:"",leave:"",start:"",end:""};
let ttInitialized=false,ttToastT=null;
let ttActiveTab="day",ttDashPeriod="week";
let ttTimerInterval=null,ttTimerStartMs=0;
let ttHistoryDays={};
// In-progress work-entry draft, persisted in localStorage across browser
// sessions. Cleared when the entry is successfully saved.
let ttDraft=null;

// ── UTILS ───────────────────────────────────────────────
function ttPad(n){return String(n).padStart(2,"0");}
function ttToday(){const d=new Date();return `${d.getFullYear()}-${ttPad(d.getMonth()+1)}-${ttPad(d.getDate())}`;}
function ttNow(){const d=new Date();return `${ttPad(d.getHours())}:${ttPad(d.getMinutes())}`;}
function ttT2m(t){if(!t)return 0;const[h,m]=t.split(":").map(Number);return h*60+(m||0);}
function ttFmtH(dec){const h=Math.floor(dec);const m=Math.round((dec-h)*60);return `${h}:${ttPad(m)}`;}
function ttV(v){return /^\d{2}:\d{2}$/.test(v)&&+v.slice(0,2)<24&&+v.slice(3)<60;}
function ttISO(d,t){if(!d||!t)return null;const[h,mi]=t.split(":").map(Number);const dt=new Date(d+"T00:00:00");dt.setHours(h,mi,0,0);return dt.toISOString();}
function ttITime(iso){if(!iso)return"";const d=new Date(iso);return `${ttPad(d.getHours())}:${ttPad(d.getMinutes())}`;}
function ttIDate(iso){if(!iso)return"";const d=new Date(iso);return `${d.getFullYear()}-${ttPad(d.getMonth()+1)}-${ttPad(d.getDate())}`;}
function ttDLbl(d){const dn=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];const dt=new Date(d+"T12:00:00");return `יום ${dn[dt.getDay()]}, ${ttPad(dt.getDate())}/${ttPad(dt.getMonth()+1)}/${dt.getFullYear()}`;}
function ttGetDay(d){return ttDays[d]||{attendId:null,arrive:"",leave:"",entries:[]};}
function ttMonthKey(d){return d?d.slice(0,7):"";}
function ttMonthLabel(k){if(!k)return"";const[y,m]=k.split("-");return["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"][+m-1]+"' "+y.slice(2);}
function ttIsMonthlyType(name){return name&&(name.includes("שכר")||name.includes("הנה")||name.includes("הנהלת"));}

// ── MOBILE SIDEBAR ──────────────────────────────────────
function ttShrinkSidebar(){
  const tabbar=document.getElementById("tabbar");
  if(!tabbar)return;
  tabbar.style.setProperty("padding","4px 5px 8px","important");
  tabbar.style.setProperty("gap","2px","important");
  tabbar.querySelectorAll(".tab-btn").forEach(btn=>{
    if(btn.id==="tab-tt"){
      btn.style.setProperty("height","76px","important");
      btn.style.setProperty("max-height","76px","important");
      btn.style.setProperty("min-height","0","important");
      const icon=btn.querySelector(".tab-icon");
      if(icon) icon.style.setProperty("font-size","22px","important");
      return;
    }
    btn.style.setProperty("height","46px","important");
    btn.style.setProperty("min-height","0","important");
    btn.style.setProperty("max-height","46px","important");
    btn.style.setProperty("padding","5px 4px","important");
    btn.style.setProperty("font-size","11px","important");
    btn.style.setProperty("flex-direction","column","important");
    btn.style.setProperty("gap","2px","important");
    btn.style.setProperty("line-height","1.15","important");
    btn.style.setProperty("overflow","hidden","important");
    const icon=btn.querySelector(".tab-icon");
    if(icon) icon.style.setProperty("font-size","18px","important");
  });
}

function ttInitMobile(){
  ttShrinkSidebar();
  ttConvertTabBtn();
  const tabbar=document.getElementById("tabbar");
  if(tabbar && !tabbar._ttObserver){
    const obs=new MutationObserver(()=>{ttShrinkSidebar();ttConvertTabBtn();ttHookLogoBadge();});
    obs.observe(tabbar,{childList:true,subtree:true,attributes:true});
    tabbar._ttObserver=obs;
  }
  if(!tabbar){
    const bodyObs=new MutationObserver(()=>{
      if(document.getElementById("tabbar")){ttShrinkSidebar();ttConvertTabBtn();bodyObs.disconnect();}
    });
    bodyObs.observe(document.body,{childList:true,subtree:true});
  }
  if(!document.getElementById("tt-hamburger")){
    const btn=document.createElement("button");
    btn.id="tt-hamburger";btn.innerHTML="☰";btn.title="תפריט";
    btn.onclick=ttToggleSidebar;document.body.appendChild(btn);
  }
  if(!document.getElementById("tt-mob-overlay")){
    const ov=document.createElement("div");
    ov.id="tt-mob-overlay";ov.onclick=ttCloseSidebar;document.body.appendChild(ov);
  }
  // Hook LB badge → back to app
  ttHookLogoBadge();
  // Also watch header for badge being added/re-created
  const header=document.getElementById("header");
  if(header && !header._ttBadgeObs){
    const obs=new MutationObserver(()=>{
      const b=document.getElementById("logo-badge");
      if(b && !b._ttHooked) ttHookLogoBadge();
    });
    obs.observe(header,{childList:true,subtree:true});
    header._ttBadgeObs=obs;
  }
  // Retry after DOM settles
  setTimeout(ttHookLogoBadge,300);
  setTimeout(ttHookLogoBadge,800);
}

// ── LB BADGE → BACK TO APP ──────────────────────────────
function ttHookLogoBadge(){
  const badge=document.getElementById("logo-badge");
  if(!badge||badge._ttHooked)return;
  badge._ttHooked=true;
  badge.title="חזרה לאפליקציה";
  badge.style.setProperty("cursor","pointer","important");
  badge.onclick=function(e){
    e.preventDefault();e.stopPropagation();
    window.location.href=window.location.origin+"/";
  };
}

function ttToggleSidebar(){
  const tb=document.getElementById("tabbar");const ov=document.getElementById("tt-mob-overlay");
  if(!tb)return;
  const isOpen=tb.classList.contains("tt-mob-open");
  if(isOpen){ttCloseSidebar();}else{tb.classList.add("tt-mob-open");if(ov)ov.classList.add("show");}
}
function ttCloseSidebar(){
  const tb=document.getElementById("tabbar");const ov=document.getElementById("tt-mob-overlay");
  if(tb)tb.classList.remove("tt-mob-open");if(ov)ov.classList.remove("show");
}

// ── API ─────────────────────────────────────────────────
async function ttGet(table,filter,fieldIds){
  let all=[],offset=null;
  do{
    // Retry transient failures (5xx, 429, network). 4xx client errors skip retry.
    let resp, lastErr;
    for(let attempt=0; attempt<3; attempt++){
      try{
        resp=await fetch(PROXY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'get',table,filter:filter||'',fields:fieldIds||[],offset})});
        if(resp.ok)break;
        if(resp.status>=500||resp.status===429){lastErr=new Error('Airtable error '+resp.status);await new Promise(r=>setTimeout(r,400*(attempt+1)));continue;}
        throw new Error('Airtable error '+resp.status);
      }catch(e){lastErr=e;if(attempt<2){await new Promise(r=>setTimeout(r,400*(attempt+1)));continue;}throw e;}
    }
    if(!resp||!resp.ok)throw lastErr||new Error('Airtable error');
    const j=await resp.json();
    if(j.error)throw new Error(j.error);
    all=all.concat(j.records||[]);offset=j.offset||null;
  }while(offset);
  return all;
}
async function ttPost(table,fields){
  const resp=await fetch(PROXY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'post',table,data:fields})});
  if(!resp.ok)throw new Error('Airtable error '+resp.status);
  const j=await resp.json();if(j.error)throw new Error(j.error);return j;
}
async function ttPatch(table,id,fields){
  const resp=await fetch(PROXY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'patch',table,id,data:fields})});
  if(!resp.ok)throw new Error('Airtable error '+resp.status);
  const j=await resp.json();if(j.error)throw new Error(j.error);return j;
}
async function ttDel(table,id){
  const resp=await fetch(PROXY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',table,id})});
  if(!resp.ok)throw new Error('Airtable error '+resp.status);
  const j=await resp.json();if(j.error)throw new Error(j.error);return j;
}

// ── PASSWORD MASKING ─────────────────────────────────────
let _ttPassReal="";
window.ttMaskPass=function(el){
  const prev=_ttPassReal;const shown=el.value;
  if(shown.length>prev.length){const added=shown.replace(/•/g,"");_ttPassReal=prev+added;}
  else{_ttPassReal=prev.slice(0,shown.length);}
  el.classList.remove("err");
  document.getElementById("tt-perr").textContent="";
  el.value="•".repeat(_ttPassReal.length);
};
window.ttResetPass=function(){_ttPassReal="";};

function ttToast(msg,isErr){
  let el=document.getElementById("tt-toast-el");
  if(!el){el=document.createElement("div");el.id="tt-toast-el";document.body.appendChild(el);}
  el.className="tt-toast-el"+(isErr?" err":"");el.textContent=msg;el.style.display="block";
  if(ttToastT)clearTimeout(ttToastT);
  ttToastT=setTimeout(()=>el.style.display="none",2800);
}
function ttRoot(){return document.getElementById("tt-root");}

// ── TIMER ───────────────────────────────────────────────
function ttStartTimer(startTimeStr){
  ttStopTimer();
  if(!startTimeStr||!ttV(startTimeStr))return;
  const[h,m]=startTimeStr.split(":").map(Number);
  const start=new Date();start.setHours(h,m,0,0);
  if(start.getTime()>Date.now())return;
  ttTimerStartMs=start.getTime();
  setTimeout(()=>{
    function tick(){
      const el=document.getElementById("tt-timer-val");
      if(!el){ttStopTimer();return;}
      const sec=Math.max(0,Math.floor((Date.now()-ttTimerStartMs)/1000));
      el.textContent=`${ttPad(Math.floor(sec/3600))}:${ttPad(Math.floor((sec%3600)/60))}:${ttPad(sec%60)}`;
    }
    tick();ttTimerInterval=setInterval(tick,1000);
  },50);
}
function ttStopTimer(){if(ttTimerInterval)clearInterval(ttTimerInterval);ttTimerInterval=null;}

// ── DRAFT (persist unsaved work entry across browser close) ──────
function ttDraftKey(){return ttCurEmp?`tt-draft-${ttCurEmp.id}`:null;}
function ttLoadDraftFromStorage(){
  try{const k=ttDraftKey();if(!k)return null;
    const s=localStorage.getItem(k);return s?JSON.parse(s):null;
  }catch{return null;}
}
window.ttSaveDraft=function(){
  const k=ttDraftKey();if(!k)return;
  const cliId=document.getElementById("tt-cli")?.value||"";
  const wtId=document.getElementById("tt-wt")?.value||"";
  const startEl=document.getElementById("tt-st");
  const startDom=startEl?.value||"";
  const start=ttV(startDom)?startDom:(ttV(ttTimeVals.start||"")?ttTimeVals.start:(ttDraft?.start&&ttV(ttDraft.start)?ttDraft.start:""));
  const notes=document.getElementById("tt-notes")?.value||"";
  const billEl=document.getElementById("tt-bill");
  const bill=billEl?billEl.checked:true;
  if(!cliId&&!wtId&&!start&&!notes){try{localStorage.removeItem(k);}catch{}ttDraft=null;return;}
  const d={cliId,wtId,start,notes,bill,date:ttSelDate};
  ttDraft=d;
  try{localStorage.setItem(k,JSON.stringify(d));}catch{}
};
function ttClearDraft(){
  const k=ttDraftKey();if(k){try{localStorage.removeItem(k);}catch{}}
  ttDraft=null;
}
window.addEventListener("beforeunload",function(){try{if(ttCurEmp&&window.ttSaveDraft)window.ttSaveDraft();}catch{}});
window.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"){try{if(ttCurEmp&&window.ttSaveDraft)window.ttSaveDraft();}catch{}}});

// ── INIT ─────────────────────────────────────────────────
window.ttInit=function(){ttInitMobile();window.open('/tt.html','_blank');};

(function(){
  document.addEventListener('click',function(e){
    const btn=e.target.closest('#tab-tt');
    if(!btn)return;
    e.preventDefault();e.stopImmediatePropagation();
    window.open('/tt.html','_blank');
  },true);
})();

function ttConvertTabBtn(){
  const btn=document.getElementById("tab-tt");
  if(btn){btn.onclick=null;btn.removeAttribute("onclick");}
}

// ── EMPLOYEES ───────────────────────────────────────────
// Find an employee record that matches the currently-authenticated user
// (logged in via the main app's OTP flow, name stored in sessionStorage).
function ttFindAuthedEmp(){
  const norm=s=>String(s||"").replace(/\s+/g," ").trim();
  try{
    const s=sessionStorage.getItem("tax-user");
    if(s){const u=JSON.parse(s);const byId=ttEmps.find(e=>e.id===u.id);if(byId)return byId;}
  }catch{}
  const mainName=localStorage.getItem("lbcpa_name")||sessionStorage.getItem("lbcpa_name")||localStorage.getItem("lbcpa_user")||sessionStorage.getItem("lbcpa_user");
  if(!mainName)return null;
  const target=norm(mainName);const parts=target.split(" ").filter(Boolean);
  let emp=ttEmps.find(e=>norm(e.fields[FE.fullName])===target);
  if(!emp&&parts.length)emp=ttEmps.find(e=>norm(e.fields[FE.fullName])===parts[0]);
  if(!emp&&parts.length)emp=ttEmps.find(e=>parts.every(p=>norm(e.fields[FE.fullName]).includes(p)));
  if(!emp&&parts.length)emp=ttEmps.find(e=>norm(e.fields[FE.fullName]).split(" ")[0]===parts[0]);
  return emp||null;
}

async function ttLoadEmps(){
  ttRoot().innerHTML=`<div class="tt-loader"><span class="tt-sp" style="width:20px;height:20px;border-width:3px"></span><span>טוען עובדים...</span></div>`;
  try{
    const recs=await ttGet(TABLES.employees,"",[FE.fullName,FE.status,FE.password]);
    ttEmps=recs.filter(r=>{const st=r.fields[FE.status];return(st&&typeof st==="object"?st.name:st)==="פעיל";})
      .sort((a,b)=>(a.fields[FE.fullName]||"").localeCompare(b.fields[FE.fullName]||"","he"));
    // Auto-login if the user is already authenticated via the main app's OTP flow
    const authed=ttFindAuthedEmp();
    if(authed){
      ttSelEmp=authed;ttCurEmp=authed;
      ttRemoveLoginEl();
      ttRoot().innerHTML=`<div class="tt-loader"><span class="tt-sp" style="width:20px;height:20px;border-width:3px"></span><span>טוען נתונים...</span></div>`;
      ttLoadData();
      return;
    }
    ttRenderLogin();
  }catch(e){ttRoot().innerHTML=`<div class="tt-loader" style="color:var(--red)">שגיאה: ${e.message}</div>`;}
}

// ── LOGIN CONTAINER ───────────────────────────────────────
function ttGetLoginEl(){
  let el=document.getElementById("tt-login-container");
  if(!el){
    el=document.createElement("div");el.id="tt-login-container";
    el.style.cssText=["position:fixed","inset:0","z-index:2147483647",
      "background:linear-gradient(160deg,#0f172a 0%,#1e3a8a 45%,#2563eb 100%)",
      "display:flex","align-items:center","justify-content:center",
      "font-family:'Segoe UI',Arial,sans-serif","direction:rtl","overflow-y:auto"].join(";");
    document.body.appendChild(el);_ttBlockBotModals();
  }
  return el;
}
function _ttBlockBotModals(){
  const selectors=['.login-card','.login-box','[class*="modal"]','[class*="overlay"]','[id*="modal"]'];
  selectors.forEach(sel=>{document.querySelectorAll(sel).forEach(el=>{
    if(!el.closest('#tt-login-container')){el.dataset.ttHidden='1';el.style.setProperty('display','none','important');}
  });});
}
function ttRemoveLoginEl(){
  document.querySelectorAll('[data-tt-hidden="1"]').forEach(el=>{el.style.removeProperty('display');delete el.dataset.ttHidden;});
  document.getElementById("tt-login-container")?.remove();
}

function ttRenderLogin(){
  const list=ttEmps.map(e=>{const n=e.fields[FE.fullName]||"עובד";return `<button class="tt-ebtn" onclick="ttSelEmpFn('${e.id}')"><div class="tt-eav">${n[0]||"?"}</div><span>${n}</span></button>`;}).join("");
  ttGetLoginEl().innerHTML=`<div class="tt-lbox">
    <div class="tt-lico">⏱️</div>
    <div class="tt-lttl">דיווח שעות</div>
    <div class="tt-lsub">בן אבי רואה חשבון</div>
    <input class="tt-srch" type="text" placeholder="חיפוש שם..." oninput="ttFilterEmps(this.value)" autocomplete="off"/>
    <div class="tt-emplist" id="tt-emplist">${list}</div>
  </div>`;
}
window.ttFilterEmps=function(q){
  const el=document.getElementById("tt-emplist");if(!el)return;
  el.innerHTML=ttEmps.filter(e=>(e.fields[FE.fullName]||"").includes(q))
    .map(e=>{const n=e.fields[FE.fullName]||"";return `<button class="tt-ebtn" onclick="ttSelEmpFn('${e.id}')"><div class="tt-eav">${n[0]||"?"}</div><span>${n}</span></button>`;}).join("");
};
window.ttSelEmpFn=function(id){
  ttSelEmp=ttEmps.find(e=>e.id===id)||null;if(!ttSelEmp)return;
  // 2FA already verified via login.html — skip password, go straight in
  if(localStorage.getItem('lbcpa_auth')==='1'||sessionStorage.getItem('lbcpa_auth')==='1'){
    ttCurEmp=ttSelEmp;
    ttRemoveLoginEl();
    ttRoot().innerHTML=`<div class="tt-loader"><span class="tt-sp" style="width:20px;height:20px;border-width:3px"></span><span>טוען נתונים...</span></div>`;
    ttLoadData();
    return;
  }
  // Fallback: if somehow no 2FA session, require password
  const name=ttSelEmp.fields[FE.fullName]||"עובד";
  ttGetLoginEl().innerHTML=`<div class="tt-lbox">
    <div class="tt-back" onclick="ttRenderLogin()">‹ <span>${name}</span></div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:4px">הזן סיסמא</div>
    <input class="tt-pass" type="text" id="tt-pass" placeholder="••••"
      autocomplete="off" autocorrect="off" spellcheck="false"
      style="letter-spacing:8px;font-size:22px;"
      oninput="ttMaskPass(this)" onkeydown="if(event.key==='Enter')ttDoLogin()"/>
    <div class="tt-perr" id="tt-perr"></div>
    <button class="tt-lbtn" onclick="ttDoLogin()">כניסה ←</button>
  </div>`;
  setTimeout(()=>{const p=document.getElementById("tt-pass");if(p)p.focus();},80);
};
window.ttDoLogin=function(){
  const entered=(_ttPassReal||"").trim();const stored=(ttSelEmp?.fields[FE.password]||"").trim();
  if(!stored){ttToast("לעובד זה אין סיסמא — פנה למנהל",true);return;}
  if(entered!==stored){
    const inp=document.getElementById("tt-pass");
    if(inp){inp.classList.add("err");inp.value="";}
    _ttPassReal="";document.getElementById("tt-perr").textContent="סיסמא שגויה";return;
  }
  ttCurEmp=ttSelEmp;_ttPassReal="";
  ttRemoveLoginEl();
  ttRoot().innerHTML=`<div class="tt-loader"><span class="tt-sp" style="width:20px;height:20px;border-width:3px"></span><span>טוען נתונים...</span></div>`;
  ttLoadData();
};

// ── LOAD DATA ────────────────────────────────────────────
async function ttLoadData(){
  try{
    const ago=new Date();ago.setDate(ago.getDate()-180);
    const agoStr=ago.toISOString().slice(0,10);
    const empId=ttCurEmp.id;
    let[cls,wts,attR,wrkR]=await Promise.all([
      ttGet(TABLES.clients,`{${FC.name}}!=''`,[FC.name]),
      ttGet(TABLES.workTypes,`{${FW.active}}='פעיל'`,[FW.name]),
      ttGet(TABLES.attendance,`IS_AFTER({${FA.date}},'${agoStr}')`,[FA.employee,FA.date,FA.startTime,FA.endTime]),
      ttGet(TABLES.workEntries,`IS_AFTER({${FT.startTime}},'${agoStr}')`,[FT.employee,FT.client,FT.workType,FT.startTime,FT.endTime,FT.hours,FT.notes,FT.billable]),
    ]);
    ttClients=cls.sort((a,b)=>(a.fields[FC.name]||"").localeCompare(b.fields[FC.name]||"","he"));
    ttWorkTypes=wts.sort((a,b)=>(a.fields[FW.name]||"").localeCompare(b.fields[FW.name]||"","he"));
    ttDays={};
    attR=attR.filter(r=>(r.fields[FA.employee]||[]).includes(empId));
    wrkR=wrkR.filter(r=>(r.fields[FT.employee]||[]).includes(empId));
    attR.forEach(r=>{
      const date=(r.fields[FA.date]||"").slice(0,10);if(!date)return;
      if(!ttDays[date])ttDays[date]={attendId:null,arrive:"",leave:"",entries:[]};
      ttDays[date].attendId=r.id;
      ttDays[date].arrive=ttITime(r.fields[FA.startTime]);
      ttDays[date].leave=ttITime(r.fields[FA.endTime]);
    });
    wrkR.forEach(r=>{
      const iso=r.fields[FT.startTime];if(!iso)return;
      const date=ttIDate(iso);
      if(!ttDays[date])ttDays[date]={attendId:null,arrive:"",leave:"",entries:[]};
      const sm=ttT2m(ttITime(r.fields[FT.startTime])),em=ttT2m(ttITime(r.fields[FT.endTime]));
      ttDays[date].entries.push({id:r.id,clientId:(r.fields[FT.client]||[])[0]||"",workTypeId:(r.fields[FT.workType]||[])[0]||"",start:ttITime(r.fields[FT.startTime]),end:ttITime(r.fields[FT.endTime]),notes:r.fields[FT.notes]||"",hours:r.fields[FT.hours]||(em>sm?(em-sm)/60:0)});
    });
    Object.values(ttDays).forEach(d=>d.entries.sort((a,b)=>a.start.localeCompare(b.start)));
    // Restore in-progress entry draft from a previous browser session
    const draft=ttLoadDraftFromStorage();
    if(draft&&draft.date){
      ttDraft=draft;ttSelDate=draft.date;
      if(draft.start)ttTimeVals.start=draft.start;
    }
    ttRenderMain();
    if(draft&&draft.date)setTimeout(()=>ttToast("✓ שוחזר דיווח שהתחלת בעבר"),250);
  }catch(e){ttRoot().innerHTML=`<div class="tt-loader" style="color:var(--red)">שגיאה: ${e.message}</div>`;}
}

// ── WORK TYPE STATS ──────────────────────────────────────
function ttGetStats(clientId,workTypeId){
  if(!clientId||!workTypeId)return null;
  const wtName=ttWorkTypes.find(w=>w.id===workTypeId)?.fields[FW.name]||"";
  const isMonthly=ttIsMonthlyType(wtName);
  const months={};const today=new Date();const last6=[];
  for(let i=5;i>=0;i--){
    const d=new Date(today.getFullYear(),today.getMonth()-i,1);
    const k=`${d.getFullYear()}-${ttPad(d.getMonth()+1)}`;months[k]=0;last6.push(k);
  }
  let total=0;
  Object.entries(ttDays).forEach(([date,day])=>{
    day.entries.forEach(e=>{
      if(e.clientId!==clientId||e.workTypeId!==workTypeId)return;
      const h=e.hours||Math.max(0,(ttT2m(e.end)-ttT2m(e.start))/60);
      total+=h;const mk=ttMonthKey(date);if(mk in months)months[mk]+=h;
    });
  });
  return{isMonthly,total,months,last6};
}
function ttRenderStats(clientId,workTypeId){
  const el=document.getElementById("tt-stats-side");if(!el)return;
  if(!clientId||!workTypeId){el.innerHTML="";el.style.width="0";el.style.padding="0";return;}
  const s=ttGetStats(clientId,workTypeId);if(!s){el.innerHTML="";return;}
  const wtName=ttWorkTypes.find(w=>w.id===workTypeId)?.fields[FW.name]||"";
  const cName=ttClients.find(c=>c.id===clientId)?.fields[FC.name]||"";
  if(s.isMonthly){
    const maxVal=Math.max(...Object.values(s.months),0.01);
    const bars=s.last6.map(k=>{const h=s.months[k]||0;const pct=(h/maxVal)*100;
      return `<div class="tt-stats-month"><div class="tt-stats-month-bar" style="height:${Math.max(pct,3)}%;background:${h>0?'rgba(59,130,246,0.7)':'rgba(255,255,255,0.1)'}"></div><span class="sm-val">${h>0?ttFmtH(h):"—"}</span><span class="sm-lbl">${ttMonthLabel(k)}</span></div>`;
    }).join("");
    el.style.width="180px";el.style.padding="0 0 0 10px";
    el.innerHTML=`<div class="tt-stats" style="height:100%"><div style="font-size:9px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.6px;margin-bottom:5px">היסטוריית שעות</div><div class="tt-stats-header"><div class="tt-stats-title">📊 ${wtName} | ${cName}</div><div class="tt-stats-total-badge">${ttFmtH(s.total)} שע' סה"כ</div></div><div class="tt-stats-months-bars">${bars}</div></div>`;
  } else if(s.total>0){
    el.style.width="180px";el.style.padding="0 0 0 10px";
    el.innerHTML=`<div class="tt-stats" style="height:100%"><div style="font-size:9px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.6px;margin-bottom:5px">היסטוריית שעות</div><div class="tt-stats-header"><div class="tt-stats-title">📊 ${wtName} | ${cName}</div><div class="tt-stats-total-badge">${ttFmtH(s.total)} שע' סה"כ</div></div></div>`;
  } else {el.innerHTML="";el.style.width="0";el.style.padding="0";}
}

// ── MAIN SHELL ──────────────────────────────────────────
function ttRenderMain(){
  ttRemoveLoginEl();
  const name=ttCurEmp.fields[FE.fullName]||"";
  ttRoot().innerHTML=`
  <div class="tt-bar">
    <div class="tt-bar-title">⏱ דיווח שעות</div>
    <div class="tt-bar-r">
      <div class="tt-av">${name[0]||"?"}</div>
      <span class="tt-nm">${name}</span>
      <button class="tt-xbtn" onclick="ttLogout()">החלף</button>
    </div>
  </div>
  <div class="tt">
    <div class="tt-tabs">
      <button class="tt-tab${ttActiveTab==='day'?' on':''}" onclick="ttSwitchTab('day',this)">📅 יום עבודה</button>
      <button class="tt-tab${ttActiveTab==='dash'?' on':''}" onclick="ttSwitchTab('dash',this)">📊 דשבורד</button>
    </div>
    <div id="tt-panel-day" style="${ttActiveTab!=='day'?'display:none':''}"></div>
    <div id="tt-panel-dash" style="${ttActiveTab!=='dash'?'display:none':''}"></div>
  </div>`;
  if(ttActiveTab==='day')ttRenderDay();else ttRenderDash();
}
window.ttSwitchTab=function(tab,btn){
  ttActiveTab=tab;
  document.querySelectorAll('.tt-tab').forEach(b=>b.classList.remove('on'));
  if(btn)btn.classList.add('on');
  document.getElementById('tt-panel-day').style.display=tab==='day'?'':'none';
  document.getElementById('tt-panel-dash').style.display=tab==='dash'?'':'none';
  if(tab==='day')ttRenderDay();else ttRenderDash();
};

// ── DATE PICKER ─────────────────────────────────────────
window.ttOpenDatePicker=function(){
  const today=ttToday();
  let vy=+ttSelDate.slice(0,4),vm=+ttSelDate.slice(5,7)-1;
  function render(){
    document.getElementById("tt-dp")?.remove();
    const dp=document.createElement("div");dp.id="tt-dp";dp.className="tt-datepicker";
    dp.onclick=e=>{if(e.target===dp)dp.remove();};
    const mN=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
    const dH=["א'","ב'","ג'","ד'","ה'","ו'","ש'"];
    const first=new Date(vy,vm,1).getDay();const dim=new Date(vy,vm+1,0).getDate();
    let cells=dH.map(d=>`<div class="tt-dp-hdr">${d}</div>`).join("");
    for(let i=0;i<first;i++)cells+=`<div></div>`;
    for(let d=1;d<=dim;d++){
      const ds=`${vy}-${ttPad(vm+1)}-${ttPad(d)}`;const isFut=ds>today;
      let cls="tt-dp-day";if(ds===today)cls+=" today";if(ds===ttSelDate)cls+=" selected";if(isFut)cls+=" future";
      cells+=`<div class="${cls}" ${isFut?"":"onclick=\"ttPickDate('"+ds+"')\""}>${d}</div>`;
    }
    dp.innerHTML=`<div class="tt-dp-box"><div class="tt-dp-head"><button class="tt-dp-nav" onclick="ttDPNav(-1)">›</button><div class="tt-dp-title">${mN[vm]} ${vy}</div><button class="tt-dp-nav" onclick="ttDPNav(1)">‹</button></div><div class="tt-dp-grid">${cells}</div></div>`;
    document.body.appendChild(dp);
  }
  window.ttDPNav=d=>{vm+=d;if(vm>11){vm=0;vy++;}if(vm<0){vm=11;vy--;}render();};
  window.ttPickDate=d=>{ttSelDate=d;document.getElementById("tt-dp")?.remove();ttTimeVals={arrive:"",leave:"",start:"",end:""};ttStopTimer();ttRenderDay();};
  render();
};

// ── CHECK PREV DAY LEAVE ─────────────────────────────────
// Returns warning HTML if the previous work day has arrive but no leave
function ttCheckPrevDayLeave(){
  const d=ttGetDay(ttSelDate);
  if(d.arrive)return ""; // already clocked in today — no need to check

  for(let i=1;i<=7;i++){
    const dt=new Date(ttSelDate+"T12:00:00");
    dt.setDate(dt.getDate()-i);
    const ds=`${dt.getFullYear()}-${ttPad(dt.getMonth()+1)}-${ttPad(dt.getDate())}`;
    const prev=ttDays[ds];
    if(!prev)continue;
    const hasArrive=prev.arrive&&ttV(prev.arrive);
    if(hasArrive && !prev.leave){
      return `<div class="tt-alert warn" style="margin-bottom:8px;">
        ⚠️ ביום <strong>${ttDLbl(ds)}</strong> לא הוזנה שעת יציאה מעבודה — יש להזינה לפני כניסה ליום זה.
        <button onclick="ttGoToDate('${ds}')" style="margin-right:8px;background:var(--yellow);border:none;color:#fff;padding:3px 10px;border-radius:5px;cursor:pointer;font-size:11px;font-weight:700;white-space:nowrap;">מעבר ליום →</button>
      </div>`;
    }
    if(hasArrive && prev.leave) break; // found complete day — stop
  }
  return "";
}

window.ttGoToDate=function(ds){
  ttSelDate=ds;ttTimeVals={arrive:"",leave:"",start:"",end:""};ttStopTimer();ttRenderDay();
};

// ── DAY TAB ─────────────────────────────────────────────
function ttRenderDay(){
  ttStopTimer();
  const today=ttToday();
  const d=ttGetDay(ttSelDate);
  ttTimeVals.arrive=d.arrive||"";ttTimeVals.leave=d.leave||"";
  const attH=(d.arrive&&d.leave&&ttV(d.arrive)&&ttV(d.leave))?Math.max(0,(ttT2m(d.leave)-ttT2m(d.arrive))/60):0;
  const workH=d.entries.reduce((s,e)=>{const m=ttT2m(e.end)-ttT2m(e.start);return s+(m>0?m/60:0);},0);
  const gap=attH-workH;
  const alertHTML=(attH>0&&workH>0&&gap>0.25)?`<div class="tt-alert warn">⚠️ פער של <strong style="margin:0 3px">${ttFmtH(gap)}</strong> שע' — נוכחות ${ttFmtH(attH)} | דווח ${ttFmtH(workH)}</div>`
    :(attH>0&&workH>0&&gap<=0.25)?`<div class="tt-alert ok">✓ כל שעות הנוכחות מוסברות</div>`:"";
  const lastEnd=d.entries.length>0?d.entries[d.entries.length-1].end:"";
  // Restore unsaved entry draft for this day (persisted across browser sessions)
  const draftForDay=(ttDraft&&ttDraft.date===ttSelDate)?ttDraft:null;
  if(draftForDay&&!ttTimeVals.start&&draftForDay.start)ttTimeVals.start=draftForDay.start;
  const defStart=ttTimeVals.start||draftForDay?.start||(ttV(lastEnd)?lastEnd:"");
  if(defStart&&ttV(defStart))ttTimeVals.start=defStart;
  const draftCli=draftForDay?.cliId||"";
  const draftWt=draftForDay?.wtId||"";
  const draftNotes=(draftForDay?.notes||"").replace(/"/g,"&quot;");
  const draftBill=draftForDay?draftForDay.bill!==false:true;
  const cliOpts=ttClients.map(c=>`<option value="${c.id}"${c.id===draftCli?' selected':''}>${c.fields[FC.name]||""}</option>`).join("");
  const wtOpts=ttWorkTypes.map(w=>`<option value="${w.id}"${w.id===draftWt?' selected':''}>${w.fields[FW.name]||""}</option>`).join("");

  // ── Check previous day leave ──
  const prevWarn=ttCheckPrevDayLeave();
  const arriveBlocked=!!prevWarn && !d.arrive;

  // ── Entries with column headers ──
  let entriesHTML;
  if(d.entries.length===0){
    entriesHTML=`<div class="tt-empty">עדיין לא נוספו דיווחים היום</div>`;
  } else {
    const hdr=`<div class="tt-entries-header">
      <span>שעות</span>
      <span style="text-align:center">סה"כ</span>
      <span>לקוח</span>
      <span>סוג עבודה</span>
      <span></span>
    </div>`;
    const rows=d.entries.map(e=>{
      const m=ttT2m(e.end)-ttT2m(e.start);const h=m>0?ttFmtH(m/60):"—";
      const cn=ttClients.find(c=>c.id===e.clientId)?.fields[FC.name]||"";
      const wn=ttWorkTypes.find(w=>w.id===e.workTypeId)?.fields[FW.name]||"";
      return `<div class="tt-entry-sm">
        <span class="tt-esm-time">${e.start}–${e.end}</span>
        <span class="tt-esm-h">${h}</span>
        <span class="tt-esm-cli">${cn}</span>
        <span class="tt-esm-wt">${wn}</span>
        <button class="tt-del" onclick="ttDelEntry('${e.id}','${ttSelDate}')">✕</button>
      </div>`;
    }).join("");
    entriesHTML=`<div class="tt-entries-wrap">${hdr}${rows}</div>`;
  }

  const showTimer=defStart&&ttV(defStart);
  const dlbl=ttDLbl(ttSelDate)+(ttSelDate===today?` <span class="tt-today">היום</span>`:"");
  const panel=document.getElementById("tt-panel-day");if(!panel)return;

  panel.innerHTML=`
    <div class="tt-dbar">
      <div class="tt-dlbl" onclick="ttOpenDatePicker()" title="לחץ לבחירת תאריך">${dlbl} 📆</div>
      <div class="tt-nav"><button onclick="ttChangeDay(-1)">‹</button><button onclick="ttChangeDay(1)" ${ttSelDate>=today?"disabled":""}>›</button></div>
    </div>
    ${prevWarn}
    <div class="tt-att">
      <div class="tt-att-top"><div class="tt-att-title">🏢 נוכחות</div>${attH>0?`<div class="tt-att-sum">סה"כ: <span>${ttFmtH(attH)}</span> שע'</div>`:""}</div>
      <div class="tt-att-row">
        <div class="tt-afield"><label>כניסה לעבודה</label>
          <div style="display:flex;gap:5px;align-items:center">
            <input type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM"
              id="tt-arr" class="tt-tbox${d.arrive?" set":""}" value="${d.arrive||""}"
              autocomplete="off" style="flex:1"
              oninput="ttOnTime(this,'arrive')"
              ondblclick="ttSetNow('arrive')"
              ${arriveBlocked?'disabled title="הזן שעת יציאה ביום הקודם תחילה"':''} />
            ${(d.arrive&&!d.leave)?`<button class="tt-del" onclick="ttClearArrive()" title="איפוס שעת כניסה" style="width:38px;height:38px;font-size:14px">✕</button>`:''}
          </div>
          <div class="tt-dbl">${arriveBlocked?'⚠️ הזן יציאה ביום הקודם':(d.arrive&&!d.leave)?'לחץ ✕ לאיפוס אם נרשם בטעות':'לחיצה כפולה = עכשיו'}</div></div>
        <div class="tt-afield"><label>יציאה מעבודה</label>
          <div style="display:flex;gap:5px;align-items:center">
            <input type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM"
              id="tt-lv" class="tt-tbox${d.leave?" set":""}" value="${d.leave||""}"
              autocomplete="off" style="flex:1"
              oninput="ttOnTime(this,'leave')"
              ondblclick="ttSetNow('leave')"/>
            <button class="tt-save-btn" onclick="ttSaveLeave()">שמור</button>
          </div>
          <div class="tt-dbl">לחיצה כפולה = עכשיו</div></div>
      </div>
    </div>
    ${alertHTML}
    <div style="display:flex;gap:10px;align-items:flex-start">
      <div class="tt-form" style="flex:1;min-width:0">
        <div class="tt-ftitle">➕ הוסף דיווח עבודה</div>
        <div class="tt-r2">
          <div><label class="tt-fl">לקוח *</label>
            <select class="tt-fs" id="tt-cli" onchange="ttOnSelChange();ttSaveDraft()" autocomplete="off">
              <option value="">— בחר לקוח —</option>${cliOpts}
            </select></div>
          <div><label class="tt-fl">סוג עבודה *</label>
            <select class="tt-fs" id="tt-wt" onchange="ttOnSelChange();ttSaveDraft()" autocomplete="off">
              <option value="">— בחר —</option>${wtOpts}
            </select></div>
        </div>
        <div class="tt-r2">
          <div><label class="tt-fl">שעת התחלה *</label>
            <input type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM"
              id="tt-st" class="tt-fi tt-tfi" value="${defStart}" autocomplete="off"
              oninput="ttOnTime(this,'start');ttOnStartChange();ttSaveDraft()" ondblclick="ttSetNow('start')"/>
            <div class="tt-hint">לחיצה כפולה = עכשיו</div></div>
          <div><label class="tt-fl">שעת סיום *</label>
            <input type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM"
              id="tt-en" class="tt-fi tt-tfi" autocomplete="off"
              oninput="ttOnTime(this,'end')" ondblclick="ttSetNow('end')"/>
            <div class="tt-hint">לחיצה כפולה = עכשיו</div></div>
        </div>
        <div id="tt-timer-wrap">${showTimer?`<div class="tt-timer"><span class="tt-timer-dot"></span><span id="tt-timer-val">00:00:00</span></div>`:""}</div>
        <div id="tt-dur"></div>
        <div class="tt-fg"><label class="tt-fl">הערות</label>
          <input class="tt-fi" type="text" id="tt-notes" placeholder="תיאור קצר..." value="${draftNotes}" oninput="ttSaveDraft()" autocomplete="off"/></div>
        <div class="tt-chk"><input type="checkbox" id="tt-bill" ${draftBill?'checked':''} onchange="ttSaveDraft()"/><label for="tt-bill">לחיוב לקוח</label></div>
        <button class="tt-add" id="tt-addbtn" onclick="ttAddEntry()">💾 שמור דיווח</button>
      </div>
      <div id="tt-stats-side" style="flex-shrink:0;width:0;overflow:hidden;transition:all .2s"></div>
    </div>
    <div class="tt-lhead">
      <div class="tt-ltitle">📋 עבודות היום <span class="tt-cnt">${d.entries.length}</span></div>
      ${workH>0?`<div class="tt-wsum">${ttFmtH(workH)} שעות</div>`:""}
    </div>
    ${entriesHTML}`;
  if(showTimer)setTimeout(()=>ttStartTimer(defStart),30);
  if(draftForDay&&(draftCli||draftWt))setTimeout(()=>ttRenderStats(draftCli,draftWt),30);
}

window.ttOnSelChange=function(){
  const cId=document.getElementById("tt-cli")?.value;
  const wId=document.getElementById("tt-wt")?.value;
  ttRenderStats(cId,wId);
};
window.ttOnStartChange=function(){
  const s=ttTimeVals.start;if(!s||!ttV(s))return;
  ttStartTimer(s);
  const wrap=document.getElementById("tt-timer-wrap");if(!wrap)return;
  if(!document.getElementById("tt-timer-val")){
    wrap.innerHTML=`<div class="tt-timer"><span class="tt-timer-dot"></span><span id="tt-timer-val">00:00:00</span></div>`;
    setTimeout(()=>ttStartTimer(s),20);
  }
};

// ── TIME INPUT ───────────────────────────────────────────
window.ttOnTime=function(el,field){
  const digits=el.value.replace(/\D/g,"").slice(0,4);
  const fmt=digits.length>2?digits.slice(0,2)+":"+digits.slice(2):digits;
  el.value=fmt;
  if(ttV(fmt)){
    ttTimeVals[field]=fmt;
    if(field==="arrive"){
      // ── VALIDATION: arrive must be before leave ──
      const leaveVal=ttTimeVals.leave||ttGetDay(ttSelDate).leave;
      if(leaveVal&&ttV(leaveVal)&&ttT2m(fmt)>=ttT2m(leaveVal)){
        ttToast("⚠️ שעת כניסה חייבת להיות לפני שעת היציאה",true);
        setTimeout(()=>{el.value="";ttTimeVals.arrive="";el.classList.remove("set");},80);
        return;
      }
      el.classList.add("set");
      ttSaveAtt("arrive",fmt);
    }
    if(field==="leave"){
      // ── VALIDATION: leave must be after arrive ──
      const arriveVal=ttTimeVals.arrive||ttGetDay(ttSelDate).arrive;
      if(arriveVal&&ttV(arriveVal)&&ttT2m(fmt)<=ttT2m(arriveVal)){
        ttToast("⚠️ שעת יציאה חייבת להיות אחרי שעת הכניסה",true);
        setTimeout(()=>{el.value="";ttTimeVals.leave="";},80);
        return;
      }
    }
    if(field==="start"||field==="end")ttUpdateDur();
  }else if(!fmt){
    ttTimeVals[field]="";
    // Clear arrive from Airtable when user deletes it
    if(field==="arrive"){
      const d=ttGetDay(ttSelDate);
      if(d.attendId){
        ttPatch(TABLES.attendance,d.attendId,{[FA.startTime]:null}).catch(()=>{});
        d.arrive="";
        el.classList.remove("set");
      }
    }
  }
};
window.ttSetNow=function(field){
  const t=ttNow();const m={arrive:"tt-arr",leave:"tt-lv",start:"tt-st",end:"tt-en"};
  const el=document.getElementById(m[field]);
  if(el){el.value=t;ttOnTime(el,field);if(field==='start')ttOnStartChange();if(field==='end')ttUpdateDur();}
  if(field==='start'||field==='end')window.ttSaveDraft&&window.ttSaveDraft();
};
document.addEventListener("keydown",function(e){
  if(["tt-arr","tt-lv","tt-st","tt-en"].includes(e.target.id)&&e.key==="Backspace"&&e.target.value.endsWith(":")){e.preventDefault();e.target.value=e.target.value.slice(0,-1);}
});
function ttUpdateDur(){
  const s=ttTimeVals.start,en=ttTimeVals.end;
  const el=document.getElementById("tt-dur");if(!el)return;
  if(s&&en&&ttV(s)&&ttV(en)){const m=ttT2m(en)-ttT2m(s);el.innerHTML=m>0?`<div class="tt-dur">⏱ ${ttFmtH(m/60)} שעות (${(m/60).toFixed(2)})</div>`:"";}
  else el.innerHTML="";
}

// ── ATTENDANCE ───────────────────────────────────────────
async function ttSaveAtt(field,value){
  if(!ttCurEmp||!value||!ttV(value))return;
  const d=ttGetDay(ttSelDate);
  try{
    if(d.attendId){const fm={arrive:FA.startTime,leave:FA.endTime};await ttPatch(TABLES.attendance,d.attendId,{[fm[field]]:ttISO(ttSelDate,value)});}
    else{const f={[FA.employee]:[ttCurEmp.id],[FA.date]:ttSelDate};if(field==="arrive")f[FA.startTime]=ttISO(ttSelDate,value);else f[FA.endTime]=ttISO(ttSelDate,value);const rec=await ttPost(TABLES.attendance,f);if(!ttDays[ttSelDate])ttDays[ttSelDate]={attendId:null,arrive:"",leave:"",entries:[]};ttDays[ttSelDate].attendId=rec.id;}
    if(!ttDays[ttSelDate])ttDays[ttSelDate]={attendId:null,arrive:"",leave:"",entries:[]};
    ttDays[ttSelDate][field]=value;
  }catch(e){ttToast("שגיאה: "+e.message,true);}
}
// Clear arrive time on a day that has arrive but no leave (e.g. clicked by mistake).
// If the record has no leave either, delete the whole attendance record.
window.ttClearArrive=async function(){
  const d=ttGetDay(ttSelDate);
  if(!d.arrive)return;
  if(!confirm("לאפס את שעת הכניסה ליום זה? הרשומה תימחק."))return;
  try{
    if(d.attendId){
      if(d.leave){
        await ttPatch(TABLES.attendance,d.attendId,{[FA.startTime]:null});
      }else{
        await ttDel(TABLES.attendance,d.attendId);
        d.attendId=null;
      }
    }
    d.arrive="";ttTimeVals.arrive="";
    ttToast("✓ שעת הכניסה אופסה");ttRenderDay();
  }catch(e){ttToast("שגיאה: "+e.message,true);}
};
window.ttSaveLeave=async function(){
  const val=ttTimeVals.leave;
  if(!val||!ttV(val)){ttToast("הזן שעת יציאה תקינה",true);return;}
  // Validate
  const arriveVal=ttTimeVals.arrive||ttGetDay(ttSelDate).arrive;
  if(arriveVal&&ttV(arriveVal)&&ttT2m(val)<=ttT2m(arriveVal)){
    ttToast("⚠️ שעת יציאה חייבת להיות אחרי שעת הכניסה",true);return;
  }
  const d=ttGetDay(ttSelDate);
  try{
    if(d.attendId)await ttPatch(TABLES.attendance,d.attendId,{[FA.endTime]:ttISO(ttSelDate,val)});
    else{const f={[FA.employee]:[ttCurEmp.id],[FA.date]:ttSelDate,[FA.endTime]:ttISO(ttSelDate,val)};if(d.arrive)f[FA.startTime]=ttISO(ttSelDate,d.arrive);const rec=await ttPost(TABLES.attendance,f);if(!ttDays[ttSelDate])ttDays[ttSelDate]={attendId:null,arrive:"",leave:"",entries:[]};ttDays[ttSelDate].attendId=rec.id;}
    if(!ttDays[ttSelDate])ttDays[ttSelDate]={attendId:null,arrive:"",leave:"",entries:[]};
    ttDays[ttSelDate].leave=val;
    ttToast("✓ שעת יציאה נשמרה");ttRenderDay();
  }catch(e){ttToast("שגיאה: "+e.message,true);}
};

// ── ADD / DELETE ─────────────────────────────────────────
window.ttAddEntry=async function(){
  const cId=document.getElementById("tt-cli")?.value;const wId=document.getElementById("tt-wt")?.value;
  const s=ttTimeVals.start,en=ttTimeVals.end;
  const notes=document.getElementById("tt-notes")?.value.trim()||"";
  const bill=document.getElementById("tt-bill")?.checked;
  if(!cId||!wId||!ttV(s)||!ttV(en))return;
  const m=ttT2m(en)-ttT2m(s);
  if(m<=0){ttToast("שעת הסיום חייבת להיות אחרי ההתחלה",true);return;}
  const d=ttGetDay(ttSelDate);
  const ov=d.entries.find(e=>{const es=ttT2m(e.start),ee=ttT2m(e.end);return ttT2m(s)<ee&&ttT2m(en)>es;});
  if(ov){const cn=ttClients.find(c=>c.id===ov.clientId)?.fields[FC.name]||"";ttToast(`❌ חפיפה עם "${cn}" (${ov.start}–${ov.end})`,true);return;}
  const btn=document.getElementById("tt-addbtn");
  if(btn){btn.disabled=true;btn.innerHTML='<span class="tt-sp"></span> שומר...';}
  try{
    const rec=await ttPost(TABLES.workEntries,{[FT.employee]:[ttCurEmp.id],[FT.client]:[cId],[FT.workType]:[wId],[FT.startTime]:ttISO(ttSelDate,s),[FT.endTime]:ttISO(ttSelDate,en),[FT.hours]:m/60,[FT.billable]:bill,...(notes?{[FT.notes]:notes}:{})});
    if(!ttDays[ttSelDate])ttDays[ttSelDate]={attendId:null,arrive:"",leave:"",entries:[]};
    ttDays[ttSelDate].entries.push({id:rec.id,clientId:cId,workTypeId:wId,start:s,end:en,notes,hours:m/60});
    ttDays[ttSelDate].entries.sort((a,b)=>a.start.localeCompare(b.start));
    ttTimeVals.start=en;ttTimeVals.end="";
    ttClearDraft();
    ttStopTimer();ttToast("✓ דיווח נשמר");ttRenderDay();
  }catch(e){ttToast("שגיאה: "+e.message,true);if(btn){btn.disabled=false;btn.textContent="💾 שמור דיווח";}}
};
window.ttDelEntry=async function(id,date){
  if(!confirm("למחוק?"))return;
  try{await ttDel(TABLES.workEntries,id);ttDays[date].entries=ttDays[date].entries.filter(e=>e.id!==id);ttToast("נמחק");ttRenderDay();}
  catch(e){ttToast("שגיאת מחיקה: "+e.message,true);}
};
window.ttChangeDay=function(dir){
  const d=new Date(ttSelDate+"T12:00:00");d.setDate(d.getDate()+dir);
  const next=d.toISOString().slice(0,10);if(next>ttToday())return;
  ttSelDate=next;ttTimeVals={arrive:"",leave:"",start:"",end:""};ttStopTimer();ttRenderDay();
};

// ── DASHBOARD ────────────────────────────────────────────
function ttRenderDash(){
  const panel=document.getElementById("tt-panel-dash");if(!panel)return;
  const today=new Date();
  function getPeriodDays(p){
    const days=[];
    if(p==="week"){const d=new Date(today);const dow=d.getDay();d.setDate(d.getDate()+(dow===0?-6:1-dow));for(let i=0;i<7;i++){const dd=new Date(d);dd.setDate(d.getDate()+i);days.push(`${dd.getFullYear()}-${ttPad(dd.getMonth()+1)}-${ttPad(dd.getDate())}`);}}
    else{const y=today.getFullYear(),mo=today.getMonth()+1,dim=new Date(y,mo,0).getDate();for(let i=1;i<=dim;i++)days.push(`${y}-${ttPad(mo)}-${ttPad(i)}`);}
    return days;
  }
  const pd=getPeriodDays(ttDashPeriod);
  let attH=0,workH=0,daysW=0;const byCli={},byWt={};const gapDays=[];
  pd.forEach(ds=>{
    const d=ttDays[ds];if(!d)return;
    let dayAttH=0;
    if(d.arrive&&d.leave&&ttV(d.arrive)&&ttV(d.leave)){
      dayAttH=Math.max(0,(ttT2m(d.leave)-ttT2m(d.arrive))/60);attH+=dayAttH;if(dayAttH>0)daysW++;
    }
    let dayWorkH=0;
    d.entries.forEach(e=>{const m=ttT2m(e.end)-ttT2m(e.start);if(m<=0)return;const h=m/60;workH+=h;dayWorkH+=h;byCli[e.clientId]=(byCli[e.clientId]||0)+h;byWt[e.workTypeId]=(byWt[e.workTypeId]||0)+h;});
    if(dayAttH>0&&dayWorkH>0){const g=dayAttH-dayWorkH;if(g>0.25)gapDays.push({date:ds,attH:dayAttH,workH:dayWorkH,gap:g});}
  });
  function renderBars(obj,nameFunc,clr){
    const sorted=Object.entries(obj).sort((a,b)=>b[1]-a[1]);
    if(!sorted.length)return`<div style="color:var(--muted);font-size:12px;text-align:center;padding:10px">אין נתונים</div>`;
    const max=sorted[0][1];
    return sorted.map(([id,h])=>`<div class="tt-bar-row"><div class="tt-bar-lbl"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70%">${nameFunc(id)}</span><span>${ttFmtH(h)}</span></div><div class="tt-bar-bg"><div class="tt-bar-fill" style="width:${(h/max)*100}%;background:${clr}"></div></div></div>`).join("");
  }
  const cN=id=>ttClients.find(c=>c.id===id)?.fields[FC.name]||"לא ידוע";
  const wN=id=>ttWorkTypes.find(w=>w.id===id)?.fields[FW.name]||"לא ידוע";
  const totalGap=attH-workH;

  // Gap table
  let gapTableHTML="";
  if(gapDays.length>0){
    const rows=gapDays.map(g=>`<tr>
      <td>${ttDLbl(g.date)}</td>
      <td style="text-align:center">${ttFmtH(g.attH)}</td>
      <td style="text-align:center">${ttFmtH(g.workH)}</td>
      <td style="text-align:center" class="tt-gap-val">${ttFmtH(g.gap)}</td>
    </tr>`).join("");
    gapTableHTML=`<div class="tt-form" style="margin-top:12px">
      <div class="tt-ftitle">📋 ימים עם פער לא מוסבר</div>
      <table class="tt-gap-table">
        <thead><tr>
          <th>תאריך</th>
          <th style="text-align:center">נוכחות</th>
          <th style="text-align:center">דווח</th>
          <th style="text-align:center">פער</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  // Dashboard is full-width — wrap in .tt div manually
  panel.innerHTML=`<div class="tt" style="max-width:none;padding:10px 16px 32px">
    <div class="tt-dash-inner">
      <div class="tt-period-btns">
        <button class="tt-period-btn${ttDashPeriod==='week'?' on':''}" onclick="ttSetPeriod('week')">שבוע נוכחי</button>
        <button class="tt-period-btn${ttDashPeriod==='month'?' on':''}" onclick="ttSetPeriod('month')">חודש נוכחי</button>
      </div>
      ${totalGap>0.25?`<div class="tt-alert warn" style="margin-bottom:10px">⚠️ סה"כ פער של <strong style="margin:0 4px">${ttFmtH(totalGap)}</strong> שע' לא מוסברות בתקופה זו</div>`:""}
      <div class="tt-stat-grid">
        <div class="tt-stat"><div class="tt-stat-v">${ttFmtH(attH)}</div><div class="tt-stat-l">נוכחות</div></div>
        <div class="tt-stat"><div class="tt-stat-v">${ttFmtH(workH)}</div><div class="tt-stat-l">שעות עבודה</div></div>
        <div class="tt-stat"><div class="tt-stat-v">${daysW}</div><div class="tt-stat-l">ימי עבודה</div></div>
      </div>
      <div class="tt-dash-cols">
        <div class="tt-form"><div class="tt-ftitle">👥 שעות לפי לקוח</div>${renderBars(byCli,cN,"linear-gradient(90deg,var(--blue),var(--blue-light))")}</div>
        <div class="tt-form"><div class="tt-ftitle">🗂 שעות לפי סוג עבודה</div>${renderBars(byWt,wN,"linear-gradient(90deg,var(--green),#34d399)")}</div>
      </div>
      ${gapTableHTML}
    </div>
  </div>`;
}
window.ttSetPeriod=function(p){ttDashPeriod=p;ttRenderDash();};
window.ttLogout=function(){
  ttCurEmp=null;ttSelEmp=null;ttSelDate=ttToday();
  ttTimeVals={arrive:"",leave:"",start:"",end:""};
  ttStopTimer();ttRoot().innerHTML="";ttRenderLogin();
};

// ── INIT MOBILE ON LOAD ──────────────────────────────────
ttInitMobile();

// ── AUTO-BOOT ON STANDALONE tt.html (detected via #tt-splash) ──
if(document.getElementById('tt-splash')){
  const splash=document.getElementById('tt-splash');
  splash.classList.add('fade-out');
  setTimeout(()=>splash.remove(),400);
  ttLoadEmps();
}

// ── LOGIN SCREEN (kept for 2FA auth) ────────────────

})();
