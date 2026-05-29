// State Tracking Storage Object
let configData = {
    serverType: 'Admin Server',
    cpuType: 'Unlimited CPU',
    username: ''
};

// Authentication Verification Sequence
function handleLogin() {
    const emailInp = document.getElementById('email').value.trim();
    const passInp = document.getElementById('password').value.trim();
    const errorBanner = document.getElementById('login-error');

    if(emailInp === 'damiisnonchalant@gmail.com' && passInp === 'nonchalanceispure') {
        errorBanner.style.display = 'none';
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'grid';
    } else {
        errorBanner.style.display = 'block';
    }
}

// Toggle Visual Component Selections
function selectTile(element, variableKey, targetValue) {
    const siblings = element.parentNode.querySelectorAll('.radio-tile');
    siblings.forEach(tile => tile.classList.remove('selected'));
    element.classList.add('selected');
    configData[variableKey] = targetValue;
}

// Move across Multi-Step Forms
function goToStep(stepNumber) {
    document.querySelectorAll('.step-container').forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');
}

// Programmatic Password String Generator
function cryptPassGen(length = 14) {
    const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$!%*";
    let returnString = "";
    for (let i = 0; i < length; i++) {
        returnString += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    return returnString;
}

// Process Instance Initialization Requirements
function generateServer() {
    const userField = document.getElementById('target-username').value.trim();
    if(!userField) {
        alert('Please input a valid target username.');
        return;
    }
    configData.username = userField;
    
    const randomPassword = cryptPassGen();
    
    // Build absolute deployment url containing safe base64 tokens
    const mockUrl = `${window.location.origin}${window.location.pathname}?nodeAlloc=${btoa(configData.username)}&auth=${btoa(configData.serverType)}&cpu=${btoa(configData.cpuType)}`;

    // Inject data metrics back into DOM layout
    document.getElementById('out-name').innerText = configData.username;
    document.getElementById('out-pass').innerText = randomPassword;
    document.getElementById('share-link').value = mockUrl;

    // Update live layout list registry
    const registry = document.getElementById('active-servers-hook');
    if(registry.innerText.includes("No third-party environments")) {
        registry.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = 'server-item';
    item.innerHTML = `
        <div>
            <strong style="font-size: 14px; display:block;">${configData.username}</strong>
            <span style="font-size: 11px; color: var(--text-muted);">${configData.serverType} | ${configData.cpuType}</span>
        </div>
        <span class="status-badge"></span>
    `;
    registry.appendChild(item);

    goToStep(4);
}

// Clipboard Action Interface
function copyLink() {
    const element = document.getElementById('share-link');
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
    
    const copyBtn = document.querySelector('.btn-copy');
    copyBtn.innerText = "Copied!";
    copyBtn.style.background = "var(--success)";
    setTimeout(() => {
        copyBtn.innerText = "Copy Link";
        copyBtn.style.background = "var(--border-color)";
    }, 2000);
}

// Reset Construction Form State
function resetForm() {
    document.getElementById('target-username').value = '';
    goToStep(1);
}