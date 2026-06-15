import { NewInvoicePage } from './pages/NewInvoicePage';
import styles from './styles/App.module.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <NewInvoicePage />
    </div>
  );
};

export default App;