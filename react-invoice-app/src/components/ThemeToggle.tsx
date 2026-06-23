import { useSettings } from "../state/useSettings";
import styles from '../styles/ThemeToggle.module.css';

export function ThemeToggle() {
    const { settings, updateSettings } = useSettings();
    const isDarkMode = settings.theme === 'dark';

    const handleToggle = (): void => {
        updateSettings({
            theme: isDarkMode ? 'light' : 'dark',
        });
    };

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={handleToggle}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
            <span className={styles.icon} aria-hidden="true">
                {isDarkMode ? '☀' : '☾'}
            </span>

            {isDarkMode ? 'Light' : 'Dark'}
        </button>
    );
}