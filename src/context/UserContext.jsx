import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Daftar akun yang diizinkan (mock database)
const ACCOUNTS = {
  'admin@taskmanager.com': {
    password: 'admin123',
    name: 'Administrator',
    role: 'admin',
    profilePic: null,
  },
  'rowllyalfairo496@gmail.com': {
    password: 'password123',
    name: 'M. Rowlly Alfairo',
    role: 'user',
    profilePic: null,
  },
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }); // null = belum login

  const login = (email, password) => {
    const account = ACCOUNTS[email];
    if (account && account.password === password) {
      const loggedIn = {
        name: account.name,
        email,
        role: account.role,
        profilePic: localStorage.getItem('profilePic') || null,
      };
      setUser(loggedIn);
      localStorage.setItem('user', JSON.stringify(loggedIn));
      return { success: true, role: account.role };
    }
    return { success: false };
  };

  const loginAsGoogle = () => {
    // Simulasi login Google sebagai User
    const loggedIn = {
      name: 'M. Rowlly Alfairo',
      email: 'rowllyalfairo496@gmail.com',
      role: 'user',
      profilePic: null,
    };
    setUser(loggedIn);
    localStorage.setItem('user', JSON.stringify(loggedIn));
    return { success: true, role: 'user' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfilePic = (picUrl) => {
    setUser(prev => {
      const updated = { ...prev, profilePic: picUrl };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
    localStorage.setItem('profilePic', picUrl);
  };

  const updateUserInfo = (info) => {
    setUser(prev => {
      const updated = { ...prev, ...info };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, loginAsGoogle, logout, updateProfilePic, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
