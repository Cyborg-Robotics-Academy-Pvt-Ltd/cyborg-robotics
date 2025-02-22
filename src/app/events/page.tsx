"use client";

import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const testimonialData = [
    {
      id: "1",
      title: "Increased Efficiency",
      subtitle: "This product has transformed how we handle our day-to-day operations. The efficiency gains have been remarkable, and our team loves using it.",
    },
    {
      id: "2",
      title: "Seamless Implementation",
      subtitle: "The implementation was seamless, and the support team was incredibly helpful throughout the process. We've seen a 40% increase in productivity.",
    },
    {
      id: "3",
      title: "Best in Market",
      subtitle: "We evaluated several options in the market, but this stood out for its robust features and intuitive interface.",
    },
    {
      id: "4",
      title: "User-Friendly",
      subtitle: "The UI/UX is outstanding, making it easy for our team to adapt quickly and improve workflow efficiency.",
    },
    {
      id: "5",
      title: "Excellent Support",
      subtitle: "The customer support team is very responsive and always ready to help whenever we need assistance.",
    },
  ];

  return (
    <Testimonials 
      testimonials={testimonialData}
     
    />
  );
};

export default Page;
