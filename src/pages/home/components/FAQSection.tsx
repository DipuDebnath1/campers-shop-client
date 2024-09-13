import SectionTitle from "../../../componets/SectionTitle";

const FAQSection = () => {
    const faqs = [
        {
          question: "What is the return policy?",
          answer: "You can return any item within 30 days of purchase as long as it is in its original condition and packaging. Please contact our support team for further assistance."
        },
        {
          question: "How long does shipping take?",
          answer: "Shipping typically takes 5-7 business days for standard delivery. Expedited shipping options are available at checkout, which can reduce the delivery time to 2-3 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries around the world. Shipping fees and delivery times vary based on location. Please check our shipping information page for more details."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. We also offer installment payment options through selected partners."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on the carrier's website."
        }
      ];
      
    return (
        <div className="mt-[4rem] px-5">
            <SectionTitle title={'FAQ'}  />
          <div className="relative min-h-[40vh]">
            {
                faqs.map((faq, i)=><div key={i} className="collapse collapse-arrow mt-4 bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title  md:text-xl font-medium">{faq.question}</div>
                <div className="collapse-content">
                    <p className="md:text-lg">{faq.answer}</p>
                </div>
                </div>)
            }
          </div>
            
       </div>
    );
};

export default FAQSection;