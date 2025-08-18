import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contact StudyHub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you! Reach out for support, partnerships, or just to say hello.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">support@studyhub.com</p>
                <p className="text-gray-600">partners@studyhub.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Headquarters</h3>
                <p className="text-gray-600">123 Sports Avenue</p>
                <p className="text-gray-600">Boston, MA 02108</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            toast.success('Message sent successfully!');
            e.target.reset();
          }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
              <select 
                id="subject" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:text-muted-foreground focus:border-blue-500"
              >
                <option value="">Select a topic</option>
                <option value="support">Technical Support</option>
                <option value="event">Event Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
            >
              Send Message
            </button>
          </form>
        </section>
      </div>

      {/* Map Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="bg-gray-200 h-96 rounded-xl overflow-hidden">
          {/* Embed your actual map here */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.665953876257!2d-71.059875684544!3d42.35184767918784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3708e2a7b3f81%3A0xafd8d5564e4b9e7f!2s123%20Sports%20Ave%2C%20Boston%2C%20MA%2002108!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy"
            title="studyhub Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;