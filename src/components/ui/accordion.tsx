"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";

// Accordion Components
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-gray-300 transition hover:bg-gray-50",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center px-5 py-4 text-sm lg:text-lg font-semibold transition",
        "text-left hover:bg-gray-100 rounded-lg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-5 w-5 text-gray-600 transition-transform duration-200 mr-2" />
      <span>{children}</span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="px-5 pb-4 pt-2 text-gray-700 text-sm">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Testimonial Types
type TestimonialItem = {
  id: string;
  title: string;
  subtitle: string[];
};

type TestimonialsProps = {
  testimonials: TestimonialItem[];
};

// Testimonials Component
export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [activeItem, setActiveItem] = React.useState<string | undefined>(
    undefined
  );

  const isLargeDevice = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      <div className="border border-gray-300 rounded-xl p-4 divide-y divide-gray-200">
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={setActiveItem}
          className="w-full"
        >
          {testimonials.map(({ id, title, subtitle }) => (
            <AccordionItem
              key={id}
              value={id}
              onMouseEnter={() => isLargeDevice && setActiveItem(id)}
              onMouseLeave={() => isLargeDevice && setActiveItem(undefined)}
            >
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-none list-inside space-y-2">
                  {subtitle.map((sub, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 text-green-500" size={18} /> {sub}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
