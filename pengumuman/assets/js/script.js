// Data Resmi 20 Kandidat Zerava Studio 2026
const candidates = [
  { "name": "Nanda Afif Al Fathoni", "class": "XI TJKT", "section": "1", "status": "LULUS", "noreg": "CZRV202601" },
  { "name": "Sherene Nabil Aquila Ramadan", "class": "XI DKV", "section": "2", "status": "LULUS", "noreg": "CZRV202602" },
  { "name": "Hafidza Arafah", "class": "XI DKV", "section": "2", "status": "LULUS", "noreg": "CZRV202603" },
  { "name": "Nur Asifah", "class": "XI DKV", "section": "2", "status": "TIDAK LULUS", "noreg": "CZRV202604" },
  { "name": "Diah Ayu Hartanti", "class": "XI DKV", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202605" },
  { "name": "Nicky Fataya Alfania", "class": "XI DKV", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202606" },
  { "name": "Annisa Mutiara Putri", "class": "XI AKL", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202607" },
  { "name": "Zilfia Indi Mecca", "class": "XI PM", "section": "2", "status": "TIDAK LULUS", "noreg": "CZRV202608" },
  { "name": "Syifa Nur Rahmah", "class": "XI MPLB", "section": "2", "status": "TIDAK LULUS", "noreg": "CZRV202609" },
  { "name": "Bonia Prabandari", "class": "XI DKV", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV2026010" },
  { "name": "Fetika Rahmawati", "class": "XI DKV", "section": "3", "status": "TIDAK LULUS", "noreg": "CZRV202611" },
  { "name": "Syifa Nur Hikmah", "class": "XI MPLB", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202612" },
  { "name": "Syidhu Dwi Kristianjani", "class": "XI MPLB", "section": "2", "status": "TIDAK LULUS", "noreg": "CZRV202613" },
  { "name": "Nana Fencil Viona", "class": "XI MPLB", "section": "2", "status": "TIDAK LULUS", "noreg": "CZRV202614" },
  { "name": "Afifah Zahrila", "class": "XI AKL", "section": "3", "status": "TIDAK LULUS", "noreg": "CZRV202615" },
  { "name": "Fatimah Nur Risma", "class": "XI DKV", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202616" },
  { "name": "Alfira Nayla Putri", "class": "XI DKV", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202617" },
  { "name": "Aqilla Amor Fadilla Wait", "class": "XI AKL", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202618" },
  { "name": "Cintasya Aulia Irfadillah", "class": "XI DKV", "section": "1", "status": "TIDAK LULUS", "noreg": "CZRV202619" },
  { "name": "Aning Tiyas Triasih", "class": "XI DKV", "section": "3", "status": "TIDAK LULUS", "noreg": "CZRV202620" }
];

// Configuration
const COUNTDOWN_ENABLED = true; // Set to true to enable countdown, false to bypass
const TARGET_DATE = new Date('2026-07-25T19:00:00').getTime(); // Target date: 25 Juli 2026 19:00 WIB
const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/LUR4IGjas7e0D0SDP3CR97?s=qt&p=a&ilr=4'; // Replace with actual WhatsApp group link

// State management
let currentState = 'form'; // 'countdown', 'form', 'rejected', 'accepted'

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (COUNTDOWN_ENABLED) {
        initCountdown();
    } else {
        showState('form');
    }
});

// Countdown Timer Logic
function initCountdown() {
    showState('countdown');
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = TARGET_DATE - now;
        
        if (distance < 0) {
            clearInterval(timer);
            showState('form');
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// State Management
function showState(state) {
    // Hide all states
    document.getElementById('countdown-state').classList.add('hidden');
    document.getElementById('form-state').classList.add('hidden');
    document.getElementById('rejected-state').classList.add('hidden');
    document.getElementById('accepted-state').classList.add('hidden');
    
    // Show target state
    document.getElementById(state + '-state').classList.remove('hidden');
    currentState = state;
}

// Form Submission Logic
function checkResult() {
    const noregInput = document.getElementById('input-noreg').value.trim();
    
    // Validation - check for empty field
    if (!noregInput) {
        alert('Mohon lengkapi Nomor Registrasi!');
        return;
    }
    
    // Validation - check for minimum length
    if (noregInput.length < 5) {
        alert('Mohon verifikasi/validasi Nomor Registrasi! Format terlalu pendek.');
        return;
    }
    
    // Search for candidate (case-insensitive and trimmed)
    const candidate = candidates.find(c => 
        c.noreg.toLowerCase().trim() === noregInput.toLowerCase()
    );
    
    if (!candidate) {
        alert('DATA TIDAK DITEMUKAN! Mohon periksa kembali Nomor Registrasi Anda.');
        return;
    } else if (candidate.status === 'LULUS') {
        showAccepted(candidate);
    } else {
        showRejected(noregInput, candidate);
    }
}

// Show Accepted Screen
function showAccepted(candidate) {
    document.getElementById('accepted-noreg').textContent = candidate.noreg;
    document.getElementById('accepted-nama').textContent = candidate.name;
    document.getElementById('accepted-kelas').textContent = `${candidate.class} ${candidate.section}`;
    
    showState('accepted');
}

// Show Rejected Screen
function showRejected(noreg, candidate) {
    // If candidate exists but not LULUS, use their data. Otherwise use input noreg
    const displayNoreg = candidate ? candidate.noreg : noreg;
    const displayName = candidate ? candidate.name : '-';
    const displayKelas = candidate ? `${candidate.class} ${candidate.section}` : '-';
    
    document.getElementById('rejected-noreg').textContent = displayNoreg;
    document.getElementById('rejected-nama').textContent = displayName;
    document.getElementById('rejected-kelas').textContent = displayKelas;
    
    showState('rejected');
}

// Back to Form
function backToForm() {
    // Clear form input
    document.getElementById('input-noreg').value = '';
    
    showState('form');
}
