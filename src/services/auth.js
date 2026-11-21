export const USERS_KEY = 'sustainai_users';
export const CURRENT_USER_KEY = 'sustainai_current_user';

// Helper to get all users
const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Helper to save users
const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = (name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        throw new Error("User already exists with this email.");
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, hash this!
        stats: {
            scans: 0,
            co2Saved: 0, // in kg
            points: 0,
            recycled: 0,
            level: 1
        },
        history: [], // Array of { id, item, type, date, points }
        joinedAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Auto login
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
};

export const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
};

export const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = '/login';
};

export const getCurrentUser = () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const updateUserStats = (type, itemName, action) => { // type: 'Recycle' | 'Compost' | 'Trash' | 'Hazardous'
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Game Logic
    let pointsToAdd = 0;
    let co2ToAdd = 0; // kg

    if (type === 'Recycle') {
        pointsToAdd = 50;
        co2ToAdd = 0.5;
    } else if (type === 'Compost') {
        pointsToAdd = 30;
        co2ToAdd = 0.2;
    } else {
        pointsToAdd = 10; // Participation points
        co2ToAdd = 0;
    }

    // Update in memory
    currentUser.stats.scans += 1;
    currentUser.stats.points += pointsToAdd;
    currentUser.stats.co2Saved += co2ToAdd;
    if (type === 'Recycle') currentUser.stats.recycled += 1;

    // Level up logic (every 500 points)
    currentUser.stats.level = Math.floor(currentUser.stats.points / 500) + 1;

    // Add to history
    if (!currentUser.history) currentUser.history = [];
    currentUser.history.unshift({ // Add to beginning
        id: Date.now().toString(),
        item: itemName || 'Unknown Item',
        action: action || 'Scanned',
        type: type,
        date: new Date().toISOString(),
        points: pointsToAdd
    });

    // Keep only last 20 items
    if (currentUser.history.length > 20) currentUser.history.pop();

    // Persist to current session
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

    // Persist to main users array
    const users = getUsers();
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
        users[index] = currentUser;
        saveUsers(users);
    }

    return currentUser;
};
