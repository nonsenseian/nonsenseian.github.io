document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the standard Navbar with Logo
    const navbarHTML = `
        <nav class="p-4 bg-white dark:bg-darkCard shadow-sm flex justify-between items-center transition-colors">
            <a href="https://nonsenseian.github.io/" class="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <img src="https://nonsenseian.github.io/nonsenseian_logo.jpg" alt="Nonsenseian Logo" class="w-8 h-8 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 object-cover">
                Nonsenseian Finance
            </a>
            <button onclick="toggleDarkMode()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors">
                <span id="theme-icon">🌙</span>
            </button>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 2. Inject the Finn AI Widget (with your SVG avatar and disclaimer)
    const finnHTML = `
        <div id="ai-widget" class="fixed bottom-6 right-6 z-50 flex items-end gap-3">
            <div id="ai-greeting" class="relative cursor-pointer bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder shadow-2xl rounded-2xl py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-2 hover:-translate-y-1 transition-all duration-300 max-w-[220px] md:max-w-xs" onclick="toggleChat()">
                <span>👋 Need help with your finances? Ask me!</span>
                <button onclick="event.stopPropagation(); dismissGreeting()" class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-lg leading-none rounded-full ml-1">&times;</button>
                <div class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-darkCard border-t border-r border-gray-200 dark:border-darkBorder rotate-45"></div>
            </div>

            <div class="flex flex-col items-end">
                <div id="ai-chat" class="hidden w-80 bg-white dark:bg-darkCard rounded-2xl shadow-2xl border border-gray-200 dark:border-darkBorder mb-4 overflow-hidden flex flex-col transform transition-all origin-bottom-right">
                    <div class="bg-blue-600 p-3 text-white font-bold flex justify-between items-center">
                        <span class="flex items-center gap-2">Finn Assistant 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-6 h-6"><circle cx="25" cy="30" r="14" fill="#6A4B3A" /><circle cx="75" cy="30" r="14" fill="#6A4B3A" /><rect x="20" y="45" width="60" height="50" rx="30" fill="#E8C39E" /><circle cx="50" cy="45" r="32" fill="#E8C39E" /><ellipse cx="28" cy="52" rx="5" ry="3" fill="#FFB3C6" opacity="0.8" /><ellipse cx="72" cy="52" rx="5" ry="3" fill="#FFB3C6" opacity="0.8" /><circle cx="35" cy="45" r="3.5" fill="#3B2A20" /><circle cx="65" cy="45" r="3.5" fill="#3B2A20" /><ellipse cx="50" cy="48" rx="2.5" ry="1.5" fill="#3B2A20" /><path d="M 45 52 Q 50 56 55 52" stroke="#3B2A20" stroke-width="2" stroke-linecap="round" fill="none" /><circle cx="50" cy="75" r="18" fill="#FFD700" /><circle cx="50" cy="75" r="14" fill="#FFC107" /><text x="50" y="82" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#D4AF37" text-anchor="middle">$</text><path d="M 22 65 Q 35 68 35 78" stroke="#E8C39E" stroke-width="8" stroke-linecap="round" fill="none" /><path d="M 78 65 Q 65 68 65 78" stroke="#E8C39E" stroke-width="8" stroke-linecap="round" fill="none" /></svg>
                        </span>
                        <button onclick="toggleChat()" class="hover:text-gray-300">✕</button>
                    </div>
                    <div id="ai-messages" class="p-4 h-64 overflow-y-auto flex flex-col space-y-3 text-sm">
                        <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg self-start max-w-[85%] text-gray-800 dark:text-gray-200 shadow-sm">
                            Hi! I'm Finn. Need help mapping out your finances or understanding these calculators?
                        </div>
                    </div>
                    <div class="p-3 border-t border-gray-200 dark:border-darkBorder flex gap-2">
                        <input type="text" id="ai-input" class="flex-grow p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Ask a finance question..." onkeypress="if(event.key === 'Enter') sendToAI()">
                        <button onclick="sendToAI()" class="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">Send</button>
                    </div>
                    <div class="px-3 pb-3 text-center bg-white dark:bg-darkCard">
                        <p class="text-[10px] text-gray-400 dark:text-gray-500">Finn is an AI assistant. Information provided does not constitute official financial advice.</p>
                    </div>
                </div>

                <button onclick="toggleChat()" class="w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-xl border-4 border-blue-500 hover:scale-110 transition-transform overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-11 h-11 translate-y-1"><circle cx="25" cy="30" r="14" fill="#6A4B3A" /><circle cx="75" cy="30" r="14" fill="#6A4B3A" /><rect x="20" y="45" width="60" height="50" rx="30" fill="#E8C39E" /><circle cx="50" cy="45" r="32" fill="#E8C39E" /><ellipse cx="28" cy="52" rx="5" ry="3" fill="#FFB3C6" opacity="0.8" /><ellipse cx="72" cy="52" rx="5" ry="3" fill="#FFB3C6" opacity="0.8" /><circle cx="35" cy="45" r="3.5" fill="#3B2A20" /><circle cx="65" cy="45" r="3.5" fill="#3B2A20" /><ellipse cx="50" cy="48" rx="2.5" ry="1.5" fill="#3B2A20" /><path d="M 45 52 Q 50 56 55 52" stroke="#3B2A20" stroke-width="2" stroke-linecap="round" fill="none" /><circle cx="50" cy="75" r="18" fill="#FFD700" /><circle cx="50" cy="75" r="14" fill="#FFC107" /><text x="50" y="82" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#D4AF37" text-anchor="middle">$</text><path d="M 22 65 Q 35 68 35 78" stroke="#E8C39E" stroke-width="8" stroke-linecap="round" fill="none" /><path d="M 78 65 Q 65 68 65 78" stroke="#E8C39E" stroke-width="8" stroke-linecap="round" fill="none" /></svg>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', finnHTML);

    // 3. Initialize Theme
    initDarkMode();
});

// --- STATE MANAGEMENT ---
window.FinanceState = {
    load: function() {
        const data = localStorage.getItem('finance_state');
        return data ? JSON.parse(data) : { assets: {}, liabilities: {}, income: {} };
    },
    save: function(data) {
        localStorage.setItem('finance_state', JSON.stringify(data));
    }
};

// --- DARK MODE LOGIC ---
function initDarkMode() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme-icon').textContent = '🌙';
    }
}

window.toggleDarkMode = function() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
};

// --- FINN LOGIC ---
window.toggleChat = function() {
    document.getElementById('ai-chat').classList.toggle('hidden');
    window.dismissGreeting();
};

window.dismissGreeting = function() {
    const greeting = document.getElementById('ai-greeting');
    if (greeting) greeting.classList.add('hidden');
};

window.sendToAI = async function() {
    const inputEl = document.getElementById('ai-input');
    const msgBox = document.getElementById('ai-messages');
    
    const promptText = inputEl.value.trim();
    const currentPage = document.title || "Home Dashboard";
    if (!promptText) return;

    msgBox.innerHTML += `<div class="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg self-end max-w-[85%] text-blue-900 dark:text-blue-100 shadow-sm">${promptText}</div>`;
    inputEl.value = '';
    
    const typingId = 'typing-' + Date.now();
    msgBox.innerHTML += `<div id="${typingId}" class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg self-start text-gray-500 italic shadow-sm">Thinking...</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;

    try {
        const response = await fetch('https://finance-avatar.nonsenseian.workers.dev', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptText, activePage: currentPage })
        });
        const data = await response.json();
        
        document.getElementById(typingId).remove();
        msgBox.innerHTML += `<div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg self-start max-w-[85%] text-gray-800 dark:text-gray-200 shadow-sm">${data.reply}</div>`;
    } catch (error) {
        document.getElementById(typingId).remove();
        msgBox.innerHTML += `<div class="bg-red-100 text-red-600 p-2 rounded-lg self-start shadow-sm">Network error. Try again!</div>`;
    }
    msgBox.scrollTop = msgBox.scrollHeight;
};