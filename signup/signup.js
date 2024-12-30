document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('signupError');

    if (!username || !email || !password) {
        errorEl.textContent = 'All fields are required!';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorEl.textContent = 'Please enter a valid email!';
        return;
    }

    localStorage.setItem('storedUsername', username);
    localStorage.setItem('storedEmail', email);
    localStorage.setItem('storedPassword', password);

    alert('Signup successful! You can now log in.');
    window.location.href = '../login/login.html';
});