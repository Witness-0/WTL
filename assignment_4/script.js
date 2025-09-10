window.onload = function() {
    fetchUsers();
};

function showError(message) {
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.marginBottom = '10px';
        document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.form-container'));
    }
    errorDiv.textContent = message;
}

function clearError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) errorDiv.textContent = '';
}

async function fetchUsers() {
    clearError();
    const response = await fetch('read.php');
    const users = await response.json();

    const tbody = document.getElementById('usersTable').querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td><input id="name-${user.id}" value="${user.name}"></td>
            <td><input id="email-${user.id}" value="${user.email}"></td>
            <td>
                <button onclick="updateUser(${user.id})">Update</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function createUser() {
    clearError();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        showError('Name and email are required.');
        return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        showError('Invalid email format.');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);

    const response = await fetch('create.php', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();

    if (result.status === 'success') {
        fetchUsers();
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    } else {
        showError(result.message || 'Error creating user.');
    }
}

async function updateUser(id) {
    clearError();
    const name = document.getElementById(`name-${id}`).value.trim();
    const email = document.getElementById(`email-${id}`).value.trim();

    if (!name || !email) {
        showError('Name and email are required.');
        return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        showError('Invalid email format.');
        return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('email', email);

    const response = await fetch('update.php', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();

    if (result.status === 'success') {
        fetchUsers();
    } else {
        showError(result.message || 'Error updating user.');
    }
}

async function deleteUser(id) {
    clearError();
    const formData = new FormData();
    formData.append('id', id);

    const response = await fetch('delete.php', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();

    if (result.status === 'success') {
        fetchUsers();
    } else {
        showError(result.message || 'Error deleting user.');
    }
}
