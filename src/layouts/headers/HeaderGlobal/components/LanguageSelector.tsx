import { useI18n, type LanguageCode } from '@/i18n'
import type { LanguageSelectorProps } from '../types'
import styles from './LanguageSelector.module.scss'

const LanguageSelector = ({
  label = 'Language',
  className = '',
}: LanguageSelectorProps) => {
  const { locale, setLocale, languages } = useI18n()

  const handleSelect = (langCode: LanguageCode) => {
    setLocale(langCode)
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.buttons}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`${styles.btn} ${lang.code === locale ? styles.active : ''}`}
            onClick={() => handleSelect(lang.code)}
            aria-label={`Switch to ${lang.name}`}
          >
            <span className={styles.text}>{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
