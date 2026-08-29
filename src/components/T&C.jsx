import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FileText } from "lucide-react";
import SEO from './SEO'


const EFFECTIVE_DATE = "2026-08-11"; // update this whenever you revise the terms

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <SEO
  title="Terms & Conditions | S1 Creations & StudioBits"
  description="Review the terms and conditions governing the use of S1 Creations and StudioBits websites, services, and digital platforms."
  path="/t&c"
/>

      <section className="bg-[#F7F5F0] min-h-screen px-5 py-24 sm:px-6 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <FileText size={14} className="text-[#b8912c]" />
            <p className="text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#b8912c] font-semibold">
              Legal
            </p>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-xs text-gray-500">
            Last updated:{" "}
            {new Date(EFFECTIVE_DATE).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="mt-6 h-px w-16 bg-[#b8912c]" />

          {/* Content — static, written directly in JSX */}
          <div
            className="
              mt-10 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8

              [&_h2]:mb-3
              [&_h2]:mt-10
              [&_h2]:first:mt-0
              [&_h2]:text-lg
              [&_h2]:font-semibold
              [&_h2]:text-[#1a1a1a]
              sm:[&_h2]:text-xl

              [&_p]:mb-4

              [&_ul]:mt-3
              [&_ul]:mb-4
              [&_ul]:list-disc
              [&_ul]:pl-5
              [&_ul]:space-y-2

              [&_strong]:text-[#1a1a1a]
              [&_strong]:font-medium

              [&_a]:text-[#b8912c]
              [&_a]:font-medium
              [&_a:hover]:underline
            "
          >
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these
              Terms & Conditions and our Privacy Policy. If you do not agree with any part of
              these terms, please do not use our services.
            </p>

            <h2>2. Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in a manner that does
              not infringe the rights of, or restrict or inhibit the use and enjoyment of, our
              services by any third party. Prohibited behavior includes:
            </p>
            <ul>
              <li>Attempting to gain unauthorized access to our systems or networks</li>
              <li>Uploading or transmitting viruses, malware, or any other malicious code</li>
              <li>Using automated tools (bots, scrapers) to access our services without permission</li>
              <li>Impersonating any person or entity, or misrepresenting your affiliation</li>
              <li>Engaging in any activity that disrupts or interferes with our services</li>
            </ul>

            <h2>3. Accounts</h2>
            <p>
              If you create an account with us, you are responsible for maintaining the
              confidentiality of your login credentials and for all activities that occur under
              your account. You agree to notify us immediately of any unauthorized use of your
              account.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software,
              is the property of our company or its licensors and is protected by applicable
              intellectual property laws. You may not reproduce, distribute, modify, or create
              derivative works from any content without our prior written consent.
            </p>

            <h2>5. Payments & Refunds</h2>
            <p>
              Where applicable, all fees for our services are due at the time of purchase unless
              otherwise stated. Refunds, if any, are handled on a case-by-case basis in accordance
              with our refund policy. Please contact us directly for any billing disputes.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our services may contain links to third-party websites or services that are not
              owned or controlled by us. We have no control over, and assume no responsibility
              for, the content, privacy policies, or practices of any third-party sites.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising out of or related to
              your use of, or inability to use, our services.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              Our services are provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis
              without warranties of any kind, either express or implied, including but not limited
              to implied warranties of merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>

            <h2>9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at any
              time, without notice, for conduct that we believe violates these Terms & Conditions
              or is otherwise harmful to other users, us, or third parties.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We may update these Terms & Conditions from time to time. Any changes will be posted
              on this page with an updated effective date. Continued use of our services after
              changes are posted constitutes your acceptance of the revised terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the
              laws of the applicable jurisdiction in which our company operates, without regard to
              its conflict of law provisions.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these Terms & Conditions, please reach out to us at{" "}
              <a href="mailto:studibits@gmail.com">studibits@gmail.com</a>.
            </p>
          </div>

          {/* Contact note */}
<p className="mt-8 text-center text-xs text-gray-500">
  Questions about these terms? Reach out at{" "}
  <a href="mailto:studibits@gmail.com" className="text-[#b8912c] hover:underline">
    studibits@gmail.com
  </a>{" "}
  or{" "}
  <a href="mailto:info@studibits.com" className="text-[#b8912c] hover:underline">
    info@studibits.com
  </a>
</p>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default TermsAndConditions;
