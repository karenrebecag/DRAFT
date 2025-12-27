import { motion } from 'framer-motion';
import type { Message } from '../types';
import { formatMessageTime } from '../types';
import MarkdownRenderer from '../MarkdownRenderer';
import { messageVariants, bubbleVariants } from '../lib/animations';
import styles from '../styles/chatbot.module.scss';

// Icons
const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface MessageBubbleProps {
  message: Message;
  avatarUrl?: string;
}

export function MessageBubble({ message, avatarUrl }: MessageBubbleProps) {
  const defaultAvatar = '/assets/img/logo/favicon.png';

  return (
    <motion.div
      className={`${styles.message} ${message.sender === 'user' ? styles.user : styles.bot}`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {message.sender === 'bot' && (
        <motion.div className={styles.botAvatar} variants={bubbleVariants}>
          <img src={avatarUrl || defaultAvatar} alt="Bot Avatar" />
        </motion.div>
      )}

      <div className={`${styles.messageContent} ${message.sender === 'user' ? styles.user : styles.bot}`}>
        <motion.div
          className={`${styles.bubble} ${message.sender === 'user' ? styles.user : styles.bot}`}
          variants={bubbleVariants}
        >
          {message.sender === 'bot' ? (
            <MarkdownRenderer content={message.text} />
          ) : (
            message.text
          )}

          {message.file && (
            <motion.div
              className={styles.fileAttachment}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {message.file.type.startsWith('image/') ? (
                <motion.img
                  src={message.file.url}
                  alt={message.file.name}
                  whileHover={{ opacity: 0.9 }}
                />
              ) : (
                <div className={styles.fileInfo}>
                  <div className={styles.fileIcon}>
                    <FileTextIcon />
                  </div>
                  <div className={styles.fileDetails}>
                    <p>{message.file.name}</p>
                    <p>{message.file.size}</p>
                  </div>
                  <motion.a
                    href={message.file.url}
                    download={message.file.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DownloadIcon />
                  </motion.a>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        <span className={`${styles.timestamp} ${message.sender === 'user' ? styles.user : ''}`}>
          {formatMessageTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
