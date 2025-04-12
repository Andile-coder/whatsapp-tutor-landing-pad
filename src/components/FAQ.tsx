
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How quickly can I connect with a tutor?",
      answer: "Most students are connected with a tutor within 5 minutes during peak hours and within 15 minutes during off-peak hours. We're available 24/7, so you can get help whenever you need it."
    },
    {
      question: "What subjects do you offer tutoring for?",
      answer: "We offer tutoring in a wide range of subjects including Math (all levels), Science (Physics, Chemistry, Biology), English, Languages, Computer Science, Social Studies, and Test Prep (SAT, ACT, AP, etc.). If you don't see your subject listed, just ask - we can likely help!"
    },
    {
      question: "How much does it cost?",
      answer: "We offer flexible pricing options. You can pay as you go at $2/minute with no minimum session length, or choose weekly ($49) or monthly ($149) packages for unlimited tutoring. There are no hidden fees or long-term commitments."
    },
    {
      question: "Who are your tutors?",
      answer: "Our tutors are qualified professionals with degrees from top universities. They all have teaching experience and undergo a rigorous selection process. Many have advanced degrees and teaching certifications in their subject areas."
    },
    {
      question: "How does tutoring via WhatsApp work?",
      answer: "After you sign up, you'll message our service number with your question. We'll match you with an appropriate tutor who will help you through text, voice messages, images, or even video calls - whatever works best for your learning style, all through WhatsApp."
    },
    {
      question: "Is there a minimum session length?",
      answer: "No, there's no minimum session length for our pay-as-you-go option. You can ask a quick question that takes just a few minutes or engage in a longer tutoring session. You only pay for the time you use."
    },
    {
      question: "What if I'm not satisfied with my tutor?",
      answer: "Your satisfaction is guaranteed. If you're not happy with your tutor, let us know and we'll connect you with a different tutor or issue a refund for that session. We want to ensure you have the best learning experience possible."
    },
    {
      question: "Can I schedule sessions in advance?",
      answer: "Yes, you can schedule sessions in advance with your favorite tutors if you prefer consistency. However, our on-demand service is designed for immediate help without scheduling, giving you maximum flexibility."
    }
  ];

  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our WhatsApp tutoring service? Find answers to common questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <p className="mb-2">Still have questions?</p>
          <a 
            href="#" 
            className="text-whatsapp hover:underline font-medium inline-flex items-center"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
