import { motion } from 'framer-motion';
import { headerVariants } from '../lib/animations';
import styles from '../styles/chatbot.module.scss';

// Icons
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <circle cx="8" cy="16" r="1" />
    <circle cx="16" cy="16" r="1" />
  </svg>
);

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onMinimize: () => void;
  minimizeLabel: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

export function ChatHeader({
  title,
  subtitle,
  onMinimize,
  minimizeLabel,
  avatarUrl,
  isOnline = true,
}: ChatHeaderProps) {
  const defaultAvatar = '/assets/img/logo/favicon.png';

  return (
    <motion.div
      className={styles.header}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.headerInfo}>
        <motion.div
          className={styles.avatar}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {avatarUrl ? (
            <img src={avatarUrl || defaultAvatar} alt="Bot Avatar" />
          ) : (
            <BotIcon />
          )}
        </motion.div>
        <div className={styles.titleContainer}>
          <h3>{title}</h3>
          {subtitle && <span>{isOnline ? subtitle : 'Offline'}</span>}
        </div>
      </div>
      <motion.button
        onClick={onMinimize}
        className={styles.minimizeBtn}
        aria-label={minimizeLabel}
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDownIcon />
      </motion.button>
    </motion.div>
  );
}
