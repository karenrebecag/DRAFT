import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './ContactStrip.module.scss'

interface FormData {
  user_name: string
  user_email: string
  user_phone: string
  message: string
}

const schema = yup.object({
  user_name: yup.string().required('Name is required'),
  user_email: yup.string().required('Email is required').email('Please enter a valid email'),
  user_phone: yup.string().required('Phone is required'),
  message: yup.string().required('Message is required'),
}).required()

const ContactStrip = () => {
  const form = useRef<HTMLFormElement>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const sendEmail = () => {
    if (form.current) {
      emailjs.sendForm('themegenix', 'template_hdr7ic6', form.current, 'QOBCxT0bzNKEs-CwW')
        .then((result) => {
          toast('Message sent successfully', { position: 'top-center' })
          reset()
          console.log(result.text)
        }, (error) => {
          console.log(error.text)
        })
    }
  }

  return (
    <section className={styles.contactStrip} id="contact">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Get in Touch</span>
          <h2 className={styles.title}>
            Let's create something <span className={styles.titleAccent}>great</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className={styles.grid}>
          {/* Map Section */}
          <div className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <iframe
                className={styles.map}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31078.361591144112!2d-74.0256365664179!3d40.705584751235754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1724572184688!5m2!1sen!2sbd"
                loading="lazy"
                title="Location Map"
              />
              <div className={styles.mapOverlay}>
  
                <div className={styles.contactInfo}>
                  <span className={styles.contactInfoLabel}>Contact info</span>
                  <Link className={styles.contactLink} to="tel:+999235645689">
                    +999 2356 45689
                  </Link>
                  <Link className={styles.contactLink} to="mailto:hello@draftstudio.com">
                    hello@draftstudio.com
                  </Link>
                  <span className={styles.contactLink}>
                    Old Westbury 256, New York, USA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send us a message</h3>
              <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-name">Name</label>
                    <input
                      {...register('user_name')}
                      className={styles.formInput}
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                    />
                    {errors.user_name && (
                      <p className={styles.formError}>{errors.user_name.message}</p>
                    )}
                  </div>

                  <div className={styles.formGroupHalf}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="contact-email">Email</label>
                      <input
                        {...register('user_email')}
                        className={styles.formInput}
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                      />
                      {errors.user_email && (
                        <p className={styles.formError}>{errors.user_email.message}</p>
                      )}
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="contact-phone">Phone</label>
                      <input
                        {...register('user_phone')}
                        className={styles.formInput}
                        id="contact-phone"
                        type="tel"
                        placeholder="+1 234 567 890"
                      />
                      {errors.user_phone && (
                        <p className={styles.formError}>{errors.user_phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-message">Message</label>
                    <textarea
                      {...register('message')}
                      className={styles.formTextarea}
                      id="contact-message"
                      placeholder="Tell us about your project..."
                      rows={4}
                    />
                    {errors.message && (
                      <p className={styles.formError}>{errors.message.message}</p>
                    )}
                  </div>

                  <div className={styles.formSubmit}>
                    <button type="submit" className={styles.submitButton}>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Quick Contact Cards */}
            <div className={styles.quickContact}>
              <Link to="mailto:hello@draftstudio.com" className={styles.quickCard}>
                <span className={styles.quickCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.quickCardLabel}>Email</span>
                <span className={styles.quickCardValue}>hello@draftstudio.com</span>
              </Link>
              <Link to="tel:+999235645689" className={styles.quickCard}>
                <span className={styles.quickCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.quickCardLabel}>Phone</span>
                <span className={styles.quickCardValue}>+999 2356 45689</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip
