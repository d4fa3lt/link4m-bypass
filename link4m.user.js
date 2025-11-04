// ==UserScript==
// @name         D4FA3LT Bypass
// @namespace    http://tampermonkey.net/
// @version      2.2.0
// @description  Premium Link4m Bypass with Success Notification
// @author       D4FA3LT
// @match        https://link4m.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      raw.githubusercontent.com 
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/ducknovis/link4m-bypass-source/refs/heads/main/code';
    
    GM_addStyle(`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        #d4fa3lt-ultimate {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
            width: 360px;
            max-height: 80vh;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%);
            border-radius: 20px;
            border: 1px solid rgba(99, 102, 241, 0.3);
            box-shadow: 0 0 60px rgba(99, 102, 241, 0.2), 0 20px 60px rgba(0,0,0,0.4);
            overflow: hidden;
            transition: box-shadow 0.3s ease;
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
        }
        
        #d4fa3lt-ultimate.dragging {
            box-shadow: 0 0 80px rgba(99, 102, 241, 0.4), 0 20px 80px rgba(0,0,0,0.5);
            cursor: grabbing !important;
        }
        
        #d4fa3lt-ultimate.collapsed {
            width: 200px;
            max-height: auto;
        }
        
        .ultimate-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            padding: 20px 24px;
            cursor: grab;
            position: relative;
            overflow: hidden;
            user-select: none;
            flex-shrink: 0;
        }
        
        .ultimate-header:active {
            cursor: grabbing;
        }
        
        .ultimate-header::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
            top: -150px;
            right: -150px;
            animation: orbits 20s linear infinite;
        }
        
        .ultimate-header::after {
            content: '';
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(240, 147, 251, 0.15) 0%, transparent 70%);
            bottom: -100px;
            left: -100px;
            animation: orbits-reverse 25s linear infinite;
        }
        
        @keyframes orbits {
            from { transform: rotate(0deg) translateX(0); }
            to { transform: rotate(360deg) translateX(0); }
        }
        
        @keyframes orbits-reverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }
        
        .ultimate-header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 2;
        }
        
        .ultimate-branding {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }
        
        .ultimate-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.2);
            animation: float 3s ease-in-out infinite;
            flex-shrink: 0;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        
        .ultimate-title {
            color: #ffffff;
            flex: 1;
        }
        
        .ultimate-title h1 {
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2px;
        }
        
        .ultimate-title p {
            font-size: 11px;
            font-weight: 500;
            color: rgba(255,255,255,0.8);
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        
        .ultimate-collapse {
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.1);
            border: 1.5px solid rgba(255,255,255,0.2);
            border-radius: 10px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
        }
        
        .ultimate-collapse:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.4);
            transform: scale(1.1) rotate(90deg);
        }
        
        .ultimate-tabs {
            display: flex;
            gap: 10px;
            padding: 16px 24px 0 24px;
            border-bottom: 1px solid rgba(99, 102, 241, 0.2);
            background: rgba(255,255,255,0.02);
            flex-shrink: 0;
        }
        
        #d4fa3lt-ultimate.collapsed .ultimate-tabs {
            display: none;
        }
        
        .ultimate-tab-btn {
            padding: 10px 16px;
            border: none;
            background: transparent;
            border-radius: 10px 10px 0 0;
            font-size: 13px;
            font-weight: 600;
            color: rgba(255,255,255,0.6);
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 2px solid transparent;
        }
        
        .ultimate-tab-btn:hover {
            color: rgba(255,255,255,0.8);
        }
        
        .ultimate-tab-btn.active {
            color: #fff;
            border-bottom-color: #667eea;
            background: rgba(102, 126, 234, 0.1);
        }
        
        .ultimate-body {
            padding: 24px;
            overflow-y: auto;
            flex: 1;
            min-height: 0;
        }
        
        #d4fa3lt-ultimate.collapsed .ultimate-body {
            display: none;
        }
        
        .ultimate-body::-webkit-scrollbar {
            width: 8px;
        }
        
        .ultimate-body::-webkit-scrollbar-track {
            background: rgba(99, 102, 241, 0.1);
            border-radius: 10px;
        }
        
        .ultimate-body::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
        }
        
        .ultimate-tab-content {
            display: none;
        }
        
        .ultimate-tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .ultimate-lang-toggle {
            display: flex;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(240, 147, 251, 0.1) 100%);
            border-radius: 12px;
            padding: 4px;
            margin-bottom: 18px;
            border: 1px solid rgba(99, 102, 241, 0.2);
        }
        
        .ultimate-lang-btn {
            flex: 1;
            padding: 8px;
            border: none;
            background: transparent;
            border-radius: 9px;
            font-weight: 600;
            font-size: 12px;
            color: rgba(255,255,255,0.6);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .ultimate-lang-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .ultimate-status {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(79, 209, 197, 0.1) 100%);
            border-radius: 14px;
            padding: 16px 18px;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .ultimate-status-dot {
            width: 12px;
            height: 12px;
            background: #10b981;
            border-radius: 50%;
            position: relative;
            animation: pulse-ultimate 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            flex-shrink: 0;
        }
        
        @keyframes pulse-ultimate {
            0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        }
        
        .ultimate-status-text {
            flex: 1;
        }
        
        .ultimate-status-text strong {
            display: block;
            color: #10b981;
            font-weight: 700;
            font-size: 13px;
            margin-bottom: 2px;
        }
        
        .ultimate-status-text span {
            color: rgba(16, 185, 129, 0.8);
            font-size: 11px;
            font-weight: 500;
        }
        
        .ultimate-btn {
            width: 100%;
            padding: 16px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            border: 1px solid rgba(240, 147, 251, 0.3);
            border-radius: 13px;
            color: white;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .ultimate-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.7s;
        }
        
        .ultimate-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5);
        }
        
        .ultimate-btn:hover::before {
            left: 100%;
        }
        
        .ultimate-btn:active {
            transform: scale(0.98);
        }
        
        .ultimate-btn.loading {
            background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%) !important;
            box-shadow: 0 8px 32px rgba(245, 158, 11, 0.4) !important;
        }
        
        .ultimate-btn.success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4) !important;
        }
        
        .ultimate-btn.error {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4) !important;
        }
        
        .ultimate-spinner {
            width: 14px;
            height: 14px;
            border: 2.5px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .ultimate-faq-item {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(240, 147, 251, 0.05) 100%);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 12px;
            margin-bottom: 10px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .ultimate-faq-item:hover {
            border-color: rgba(99, 102, 241, 0.4);
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(240, 147, 251, 0.1) 100%);
        }
        
        .ultimate-faq-item.open {
            border-color: #667eea;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(240, 147, 251, 0.15) 100%);
        }
        
        .ultimate-faq-q {
            background: transparent;
            color: #e0e7ff;
            font-size: 13px;
            font-weight: 700;
            padding: 14px 16px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            user-select: none;
            transition: all 0.2s;
        }
        
        .ultimate-faq-q:hover {
            color: #fff;
        }
        
        .ultimate-faq-icon {
            font-size: 13px;
            color: #667eea;
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            flex-shrink: 0;
        }
        
        .ultimate-faq-item.open .ultimate-faq-icon {
            transform: rotate(180deg);
        }
        
        .ultimate-faq-a {
            display: none;
            color: rgba(255,255,255,0.7);
            font-size: 12px;
            line-height: 1.7;
            padding: 0 16px 14px 16px;
            background: rgba(0,0,0,0.2);
        }
        
        .ultimate-faq-item.open .ultimate-faq-a {
            display: block;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .ultimate-faq-a a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
        }
        
        .ultimate-faq-a a:hover {
            color: #f093fb;
            text-decoration: underline;
        }
        
        .ultimate-footer {
            text-align: center;
            padding: 16px 24px;
            border-top: 1px solid rgba(99, 102, 241, 0.2);
            background: rgba(0,0,0,0.2);
            font-size: 10px;
            color: rgba(255,255,255,0.6);
            font-weight: 500;
            line-height: 1.6;
            flex-shrink: 0;
        }
        
        .ultimate-footer strong {
            color: #667eea;
            font-weight: 700;
        }
        
        .ultimate-footer a {
            color: #667eea;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .ultimate-footer a:hover {
            color: #f093fb;
        }
        
        @media (max-width: 480px) {
            #d4fa3lt-ultimate {
                width: calc(100% - 32px);
                right: 16px;
                top: 16px;
            }
            
            #d4fa3lt-ultimate.collapsed {
                width: 180px;
            }
        }
    `);

    const translations = {
        vi: {
            subtitle: 'ULTIMATE BYPASS',
            tabBypass: 'Bypass',
            tabFAQ: 'FAQ',
            ready: 'Sẵn Sàng',
            readyDesc: 'Hệ thống hoạt động tối ưu',
            btnBypass: '⚡ KÍCH HOẠT BYPASS',
            loading: 'Đang Xử Lý...',
            success: '✓ BYPASS THÀNH CÔNG!',
            error: '✗ LỖI KẾT NỐI',
            faq: [
                { 
                    q: 'Bypass hoạt động thế nào?', 
                    a: 'Script tải mã bypass từ GitHub repo của ducknovis, sau đó thực thi nó tự động. Trang Link4m sẽ bị bypass, cho phép bạn truy cập link trực tiếp mà không cần chờ đợi.' 
                },
                { 
                    q: 'Có an toàn để sử dụng không?', 
                    a: 'Có. Script chỉ thực thi mã từ repo GitHub chính thức của ducknovis. Toàn bộ source code công khai, bạn có thể kiểm tra bất cứ lúc nào trên GitHub.' 
                },
                { 
                    q: 'Tool này được tạo ra bằng AI không?', 
                    a: 'Có, giao diện người dùng và cấu trúc script được tạo với AI để tối ưu hóa trải nghiệm. Tuy nhiên, logic bypass nguyên gốc đến từ ducknovis.' 
                },
                { 
                    q: 'Link4m có thể chặn bypass được không?', 
                    a: 'Có khả năng. Nếu Link4m thay đổi cấu trúc website hoặc phương pháp chuyển hướng, bypass có thể không hoạt động. Khi đó, ducknovis sẽ cập nhật repo.' 
                },
                { 
                    q: 'Script dùng bao nhiêu data?', 
                    a: 'Rất ít. Chỉ tốn ~10-50KB để tải mã bypass từ GitHub lần đầu tiên. Những lần sau sẽ dùng cache, vì vậy data usage tối thiểu.' 
                },
                { 
                    q: 'Làm sao để báo cáo lỗi hoặc yêu cầu tính năng?', 
                    a: 'Vào GitHub repo: github.com/ducknovis/link4m-bypass-source hoặc GitHub của D4FA3LT UI để báo cáo issues hoặc đề xuất tính năng mới.' 
                }
            ],
            copyright: '© 2025 D4FA3LT'
        },
        en: {
            subtitle: 'ULTIMATE BYPASS',
            tabBypass: 'Bypass',
            tabFAQ: 'FAQ',
            ready: 'Ready',
            readyDesc: 'System running optimally',
            btnBypass: '⚡ ACTIVATE BYPASS',
            loading: 'Processing...',
            success: '✓ BYPASS SUCCESS!',
            error: '✗ CONNECTION ERROR',
            faq: [
                { 
                    q: 'How does the bypass work?', 
                    a: 'The script loads bypass code from ducknovis GitHub repo and executes it automatically. Link4m page is bypassed, allowing you to access the link directly without waiting.' 
                },
                { 
                    q: 'Is it safe to use?', 
                    a: 'Yes. The script only executes code from the official ducknovis GitHub repo. All source code is public, you can review it anytime on GitHub.' 
                },
                { 
                    q: 'Is this tool created by AI?', 
                    a: 'Yes, the UI and script structure were created with AI to optimize user experience. However, the bypass logic originally comes from ducknovis.' 
                },
                { 
                    q: 'Can Link4m block the bypass?', 
                    a: 'Possibly. If Link4m changes website structure or redirect methods, the bypass may stop working. When that happens, ducknovis will update the repo.' 
                },
                { 
                    q: 'How much data does it use?', 
                    a: 'Very little. Only ~10-50KB to load bypass code from GitHub on first run. Subsequent uses utilize cache, so data usage is minimal.' 
                },
                { 
                    q: 'How to report bugs or request features?', 
                    a: 'Visit GitHub repo: github.com/ducknovis/link4m-bypass-source or D4FA3LT UI repo to report issues or suggest new features.' 
                }
            ],
            copyright: '© 2025 D4FA3LT'
        }
    };

    let currentLang = 'vi';
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    function init() {
        const panel = document.createElement('div');
        panel.id = 'd4fa3lt-ultimate';

        function renderFAQ() {
            return translations[currentLang].faq.map(item => `
                <div class="ultimate-faq-item">
                    <div class="ultimate-faq-q">
                        <span>${item.q}</span>
                        <span class="ultimate-faq-icon">▼</span>
                    </div>
                    <div class="ultimate-faq-a">${item.a}</div>
                </div>
            `).join('');
        }

        panel.innerHTML = `
            <div class="ultimate-header">
                <div class="ultimate-header-content">
                    <div class="ultimate-branding">
                        <div class="ultimate-icon">⚡</div>
                        <div class="ultimate-title">
                            <h1>D4FA3LT</h1>
                            <p>${translations[currentLang].subtitle}</p>
                        </div>
                    </div>
                    <button class="ultimate-collapse">−</button>
                </div>
            </div>
            <div class="ultimate-tabs">
                <button class="ultimate-tab-btn active" data-tab="bypass">${translations[currentLang].tabBypass}</button>
                <button class="ultimate-tab-btn" data-tab="faq">${translations[currentLang].tabFAQ}</button>
            </div>
            <div class="ultimate-body">
                <div class="ultimate-tab-content active" id="tab-bypass">
                    <div class="ultimate-lang-toggle">
                        <button class="ultimate-lang-btn active" data-lang="vi">Tiếng Việt</button>
                        <button class="ultimate-lang-btn" data-lang="en">English</button>
                    </div>
                    <div class="ultimate-status">
                        <div class="ultimate-status-dot"></div>
                        <div class="ultimate-status-text">
                            <strong class="status-title">${translations[currentLang].ready}</strong>
                            <span class="status-desc">${translations[currentLang].readyDesc}</span>
                        </div>
                    </div>
                    <button class="ultimate-btn">
                        <span class="btn-text">${translations[currentLang].btnBypass}</span>
                    </button>
                </div>
                <div class="ultimate-tab-content" id="tab-faq">
                    ${renderFAQ()}
                </div>
            </div>
            <div class="ultimate-footer">
                <div class="ultimate-copyright">
                    <span class="copyright-text">${translations[currentLang].copyright}</span><br>
                    Based on <a href="https://github.com/ducknovis" target="_blank">ducknovis</a> • AI-Powered UI
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        const header = panel.querySelector('.ultimate-header');
        const collapseBtn = panel.querySelector('.ultimate-collapse');
        const bypassBtn = panel.querySelector('.ultimate-btn');
        const btnText = panel.querySelector('.btn-text');
        const langBtns = panel.querySelectorAll('.ultimate-lang-btn');
        const statusTitle = panel.querySelector('.status-title');
        const statusDesc = panel.querySelector('.status-desc');
        const copyrightText = panel.querySelector('.copyright-text');
        const tabBtns = panel.querySelectorAll('.ultimate-tab-btn');
        const tabContents = panel.querySelectorAll('.ultimate-tab-content');

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.ultimate-collapse')) return;
            isDragging = true;
            const rect = panel.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            panel.classList.add('dragging');
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            panel.style.left = (e.clientX - offsetX) + 'px';
            panel.style.top = (e.clientY - offsetY) + 'px';
            panel.style.right = 'auto';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            panel.classList.remove('dragging');
        });

        collapseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('collapsed');
            collapseBtn.textContent = panel.classList.contains('collapsed') ? '+' : '−';
        });

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
            });
        });

        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentLang = btn.dataset.lang;
                
                statusTitle.textContent = translations[currentLang].ready;
                statusDesc.textContent = translations[currentLang].readyDesc;
                btnText.textContent = translations[currentLang].btnBypass;
                copyrightText.textContent = translations[currentLang].copyright;
                
                tabBtns[0].textContent = translations[currentLang].tabBypass;
                tabBtns[1].textContent = translations[currentLang].tabFAQ;
                
                document.getElementById('tab-faq').innerHTML = renderFAQ();
                setupFAQ();
            });
        });

        bypassBtn.addEventListener('click', function() {
            bypassBtn.classList.add('loading');
            bypassBtn.disabled = true;
            btnText.innerHTML = `<div class="ultimate-spinner"></div>${translations[currentLang].loading}`;

            GM_xmlhttpRequest({
                method: "GET",
                url: GITHUB_RAW_URL,
                onload: function(response) {
                    if (response.status === 200) {
                        try {
                            unsafeWindow.eval(response.responseText.trim());
                            bypassBtn.classList.remove('loading');
                            bypassBtn.classList.add('success');
                            btnText.textContent = translations[currentLang].success;
                            statusTitle.textContent = translations[currentLang].success;
                            statusDesc.textContent = 'Bypass hoàn tất thành công!';
                        } catch (e) {
                            bypassBtn.classList.remove('loading');
                            bypassBtn.classList.add('error');
                            btnText.textContent = translations[currentLang].error;
                        }
                    } else {
                        bypassBtn.classList.remove('loading');
                        bypassBtn.classList.add('error');
                        btnText.textContent = translations[currentLang].error;
                    }
                    
                    setTimeout(() => {
                        bypassBtn.className = 'ultimate-btn';
                        btnText.textContent = translations[currentLang].btnBypass;
                        bypassBtn.disabled = false;
                        statusTitle.textContent = translations[currentLang].ready;
                        statusDesc.textContent = translations[currentLang].readyDesc;
                    }, 3500);
                },
                onerror: function() {
                    bypassBtn.classList.remove('loading');
                    bypassBtn.classList.add('error');
                    btnText.textContent = translations[currentLang].error;
                    
                    setTimeout(() => {
                        bypassBtn.className = 'ultimate-btn';
                        btnText.textContent = translations[currentLang].btnBypass;
                        bypassBtn.disabled = false;
                    }, 3500);
                }
            });
        });

        function setupFAQ() {
            const faqItems = panel.querySelectorAll('.ultimate-faq-item');
            faqItems.forEach(item => {
                const q = item.querySelector('.ultimate-faq-q');
                q.onclick = () => item.classList.toggle('open');
            });
        }

        setupFAQ();
    }

    init();
})();
