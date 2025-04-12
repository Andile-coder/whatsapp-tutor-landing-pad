import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What does this WhatsApp service do?",
      answer:
        "Our AI helps Grade 11 and 12 students instantly download question papers and memorandums through WhatsApp. Just send a message with what you're looking for, and the AI will fetch it for you!",
    },
    {
      question: "Is this service really free?",
      answer:
        "Yes, 100% free. There are no hidden charges or subscriptions. You simply request a paper or memo, and the AI sends it to you – no strings attached.",
    },
    {
      question: "What types of documents can I download?",
      answer:
        "Right now, we offer Grade 11 and 12 question papers and memos. We're also adding study guides, textbooks, and other free educational books soon – stay tuned!",
    },
    {
      question: "How do I request a paper or memo?",
      answer:
        "Just send a message like 'Grade 12 Maths P1 2023 memo' or 'Grade 11 Life Sciences November paper' on WhatsApp. The AI will understand and send you the file instantly.",
    },
    {
      question: "Can I get past exam papers by year?",
      answer:
        "Absolutely! You can request documents by year and subject. For example, say 'Grade 12 Physical Science 2022 Paper 2' and we’ll get it to you.",
    },
    {
      question: "Do you support all school subjects?",
      answer:
        "We currently support core subjects like Mathematics, Physical Science, Life Sciences, Business Studies, Geography, Accounting, and more. If you're not sure, just ask and the AI will let you know.",
    },
    {
      question: "Can I use this anytime?",
      answer:
        "Yes! The WhatsApp bot is available 24/7. Whether it's midnight before an exam or a Sunday afternoon, it's always ready to help.",
    },
    {
      question: "Will you add Grade 10 or other content?",
      answer:
        "We're focused on Grade 11 and 12 right now, but we plan to expand to other grades soon. Study guides, textbooks, and even revision material are coming next!",
    },
    {
      question: "What if I need help using it?",
      answer:
        "You can message the word 'help' on WhatsApp and the AI will guide you through how to request documents, step by step.",
    },
    {
      question: "Can I download the files on my phone?",
      answer:
        "Yes! All documents are mobile-friendly and come in PDF format, so you can easily open or save them on your phone or share them with friends.",
    },
  ];

  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our WhatsApp tutoring service? Find answers to
            common questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
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
