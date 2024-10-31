"use client";

import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body style={styles.body}>
        <header style={styles.header}>
          <nav>
            <ul style={styles.navList}>
              <li style={styles.navItem}><a href="/" style={styles.link}>Home</a></li>
              <li style={styles.navItem}><a href="/about" style={styles.link}>About</a></li>
              <li style={styles.navItem}><a href="/blog" style={styles.link}>Blog</a></li>
            </ul>
          </nav>
        </header>
        <main style={styles.main}>{children}</main>
        <footer style={styles.footer}>
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  header: {
    padding: '10px 20px',
    backgroundColor: '#2e2e2e',
    borderBottom: '1px solid #444',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  navItem: {},
  link: {
    color: '#aaa',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  main: {
    padding: '20px',
    minHeight: '80vh',
    backgroundColor: '#1e1e1e', // Same as the page background
  },
  footer: {
    padding: '10px 20px',
    backgroundColor: '#2e2e2e',
    borderTop: '1px solid #444',
    textAlign: 'center' as const,
  },
};

export default RootLayout;