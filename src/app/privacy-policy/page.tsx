import Footer from "@/components/Footer";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="privacy-policy p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md sm:mt-32 ">
        <h1 className="sm:text-3xl text-xl font-bold mb-4 text-center">
          Privacy Policy
        </h1>
        <p className="mb-4">
          Our privacy policy is subject to change at any time without notice. To
          make sure you are aware of any changes, please review this policy
          periodically.
        </p>
        <p className="mb-4">
          By visiting this Website you agree to be bound by the terms and
          conditions of this Privacy Policy. If you do not agree please do not
          use or access our Website.
        </p>
        <p className="mb-4">
          By mere use of the Website, you expressly consent to our use and
          disclosure of your personal information in accordance with this
          Privacy Policy. This Privacy Policy is incorporated into and subject
          to the Terms of Use.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Collection of Personally Identifiable Information and other
          Information
        </h2>
        <p className="mb-4">
          We use data collection devices such as &quot;cookies&quot; on certain
          pages of the Website to help analyse our web page flow, measure
          promotional effectiveness, and promote trust and safety.
          &quot;Cookies&quot; are small files placed on your hard drive that
          assist us in providing our services.
        </p>
        <p className="mb-4">
          Additionally, you may encounter &quot;cookies&quot; or other similar
          devices on certain pages of the Website that are placed by third
          parties. We do not control the use of cookies by third parties.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          A &quot;cookie&quot; is a small piece of information stored by a web
          server on a web browser so it can be later read back from that
          browser. Cookies are useful for enabling the browser to remember
          information specific to a given user.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Sharing of personal information
        </h2>
        <p className="mb-4">
          We may disclose personal information if required to do so by law or in
          the good faith belief that such disclosure is reasonably necessary to
          respond to subpoenas, court orders, or another legal process.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Your Consent</h2>
        <p className="mb-4">
          By using the Website and/ or by providing your information, you
          consent to the collection and use of the information you disclose on
          the Website in accordance with this Privacy Policy, including but not
          limited to Your consent for sharing your information as per this
          privacy policy.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Grievance Officer</h2>
        <p className="mb-4">Cyborg Robotics Academy Private Limited</p>
        <p className="mb-4">Email: info@cyborgrobotics.in</p>
        <p className="mb-4">Time: Mon &ndash; Sat (10:00 &ndash; 18:00)</p>
      </div>
      <Footer />
    </div>
  );
};

export default page;
