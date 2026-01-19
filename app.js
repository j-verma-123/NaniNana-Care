// Local Storage Keys
const STORAGE_KEYS = {
    PROFILE: 'elderly_app_profile',
    SCHEDULE: 'elderly_app_schedule',
    LOGS: 'elderly_app_logs',
    ALERTS: 'elderly_app_alerts'
};

// Utility to get data
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Utility to save data
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize default data if empty
if (!getData(STORAGE_KEYS.PROFILE)) {
    saveData(STORAGE_KEYS.PROFILE, {
        name: "Elderly Parent",
        age: 72,
        emergencyContact: "9876543210",
        doctorContact: "9123456780"
    });
}

if (!getData(STORAGE_KEYS.SCHEDULE)) {
    saveData(STORAGE_KEYS.SCHEDULE, []);
}

if (!getData(STORAGE_KEYS.LOGS)) {
    saveData(STORAGE_KEYS.LOGS, []);
}

// Utility to get next dose
function getNextDose() {
    const schedule = getData(STORAGE_KEYS.SCHEDULE) || [];
    if (schedule.length === 0) return null;

    // For simplicity in hackathon, just return the first one
    // In a real app, we'd sort by time
    return schedule[0];
}

// Global UI Helper
function updateUI() {
    const profile = getData(STORAGE_KEYS.PROFILE);
    const greetingEl = document.getElementById('user-greeting');
    if (greetingEl && profile) {
        greetingEl.textContent = `Hello, ${profile.name}`;
    }

    // Dynamic Next Dose on Home Page
    const nextDoseEl = document.getElementById('next-dose-container');
    if (nextDoseEl) {
        const nextDose = getNextDose();
        if (nextDose) {
            nextDoseEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <p style="text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--warning); font-weight: 800; margin-bottom: 0.5rem;">
                            Upcoming Dose</p>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">${nextDose.name} ${nextDose.dose}</h3>
                        <p style="color: var(--text-muted); font-size: 1.1rem;"><i data-lucide="clock" size="18"
                                style="vertical-align: middle;"></i> Scheduled: ${nextDose.time}</p>
                    </div>
                    <div style="background: white; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 1rem; text-align: center;">
                        <p style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">01</p>
                        <p style="font-size: 0.7rem; color: var(--text-muted);">HOUR</p>
                    </div>
                </div>
            `;
        } else {
            nextDoseEl.innerHTML = `<p style="text-align:center; color:var(--text-muted)">No doses scheduled. Upload a prescription to start.</p>`;
        }
        lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    // Add active state to nav
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});
