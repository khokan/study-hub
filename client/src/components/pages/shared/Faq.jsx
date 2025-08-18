import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is StudyHub?",
      answer:
        "StudyHub is a collaborative learning platform where students can book study sessions, access materials, and interact with tutors."
    },
    {
      question: "How can I book a session?",
      answer:
        "Simply browse the available sessions, click on 'Read More' to view details, and then choose 'Book Now'."
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! Many sessions are free to join, and tutors also provide trial study materials."
    },
    {
      question: "How do I become a tutor?",
      answer:
        "You can apply by creating a tutor profile and submitting your details. Once approved by admin, you’ll be able to host sessions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-secondary-black1 mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-secondary-black2 dark:bg-secondary-black1 rounded-2xl shadow hover:shadow-md transition"
          >
            <button
              className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-secondary-black1 dark:text-white"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <FaChevronDown
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-secondary-gray4 dark:text-secondary-gray2">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
