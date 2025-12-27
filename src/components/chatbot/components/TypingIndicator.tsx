import { motion } from 'framer-motion';
import { messageVariants, typingDotVariants } from '../lib/animations';
import styles from '../styles/chatbot.module.scss';

interface TypingIndicatorProps {
  avatarUrl?: string;
}

export function TypingIndicator({ avatarUrl }: TypingIndicatorProps) {
  const defaultAvatar = '/assets/img/logo/favicon.png';

  return (
    <motion.div
      className={styles.typingIndicator}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.botAvatar}>
        <img src={avatarUrl || defaultAvatar} alt="Bot Avatar" />
      </div>
      <div className={styles.typingBubble}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className={styles.typingDot}
            variants={typingDotVariants}
            animate="animate"
            custom={delay}
          />
        ))}
      </div>
    </motion.div>
  );
}
