import { useRef } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   user_name: string;
   user_email: string;
   user_phone: number;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      user_phone: yup.number()
         .transform((originalValue, originalObject) => {
            // Convert empty string to NaN
            return originalObject && originalObject.phone === '' ? NaN : originalValue;
         })
         .typeError('Phone number is required')
         .required('Phone must be a number'),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = () => {
      if (form.current) {
         emailjs.sendForm('themegenix', 'template_hdr7ic6', form.current, 'QOBCxT0bzNKEs-CwW')
            .then((result) => {
               const notify = () => toast('Message sent successfully', { position: 'top-center' });
               notify();
               reset();
               console.log(result.text);
            }, (error) => {
               console.log(error.text);
            });
      } else {
         console.error("Form reference is null");
      }
   };

   return (
      <form id="contact-form" ref={form} onSubmit={handleSubmit(sendEmail)}>
         <div className="row">
            <div className="col-12 mb-25">
               <label htmlFor="name">Name</label>
               <input {...register("user_name")} className="td-input" id="name" type="text" />
               <p className="form_error">{errors.user_name?.message}</p>
            </div>
            <div className="col-md-6 mb-25">
               <label htmlFor="email">Email</label>
               <input {...register("user_email")} className="td-input" id="email" type="text" />
               <p className="form_error">{errors.user_email?.message}</p>
            </div>
            <div className="col-md-6 mb-25">
               <label htmlFor="phone">Phone</label>
               <input {...register("user_phone")} className="td-input" id="phone" type="text" />
               <p className="form_error">{errors.user_phone?.message}</p>
            </div>
            <div className="col-12 mb-25">
               <label htmlFor="website">Website</label>
               <input className="td-input" id="website" type="text" />
            </div>
            <div className="col-md-12 mb-30">
               <label htmlFor="message">Message</label>
               <textarea {...register("message")} className="td-input message" id="message" cols={30} rows={10}></textarea>
               <p className="form_error">{errors.message?.message}</p>
            </div>
            <div className="col-12">
               <button type="submit" className="td-btn-group">
                  <span className="td-btn-circle">
                     <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="td-btn-2 td-btn-primary">Send  message</span>
                  <span className="td-btn-circle">
                     <i className="fa-solid fa-arrow-right"></i>
                  </span>
               </button>
               <p className="ajax-response pt-20"></p>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
