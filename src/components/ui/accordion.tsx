"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Accordion Components
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-gray-200 transition-colors hover:bg-gray-50/50",
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
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-4 py-4 text-sm font-medium transition-all",
        "text-left hover:bg-gray-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        "[&[data-state=open]>svg]:rotate-180",
        "[&[data-state=open]]:bg-gray-50",
        className
      )}
      {...props}
    >
      <div className="flex-1 mr-4">{children}</div>
      <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
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
      "overflow-hidden text-sm transition-all",
      "data-[state=closed]:animate-accordion-up",
      "data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className={cn("px-4 pb-4 pt-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Testimonial Types
type TestimonialItem = {
  id: string;
  title: string;
  subtitle: string;
};

type TestimonialsProps = {
  testimonials: TestimonialItem[];
  title: string;
  subtitle: string;
};

// Testimonials Component
export const Testimonials = ({ testimonials, title, subtitle }: TestimonialsProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="border border-gray-300 rounded-lg p-4">
        <Accordion type="single" collapsible className="w-full">
          {testimonials.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>
                <div className="font-medium text-base">{item.title}</div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 leading-relaxed">{item.subtitle}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
