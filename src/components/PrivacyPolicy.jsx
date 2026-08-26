import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "./Api";
import { ShieldCheck } from "lucide-react";
import SEO from "./SEO";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await api.get("/policies/public/privacy-policy");
        setPolicy(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <>
      {/* ================= SEO ================= */}
      <SEO
        title="Privacy Policy | S1 Creations & StudioBits"
        description="Read the privacy policy of S1 Creations and StudioBits to understand how we collect, use, protect, and manage your information."
        path="/privacy-policy"
      />

      {/* ================= LOADING ================= */}
      {loading ? (
        <>
          <Navbar />

          <div className="min-h-screen bg-[#F7F5F0] pt-32 px-5 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-2xl flex flex-col gap-4">

              <div className="h-4 w-24 bg-black/5 rounded animate-pulse" />

              <div className="h-10 w-2/3 bg-black/5 rounded animate-pulse" />

              <div className="h-4 w-40 bg-black/5 rounded animate-pulse mb-6" />

              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-black/5 rounded animate-pulse"
                  style={{
                    width: `${90 - i * 6}%`,
                  }}
                />
              ))}

            </div>
          </div>
        </>
      ) : !policy ? (
        /* ================= ERROR ================= */
        <>
          <Navbar />

          <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6">
            <div className="text-center">

              <ShieldCheck
                size={40}
                className="text-[#d4af37]/50 mx-auto mb-4"
              />

              <p className="text-gray-500 text-sm">
                Privacy Policy not available right now.
              </p>

            </div>
          </div>

          <Footer />
        </>
      ) : (
        /* ================= PRIVACY POLICY ================= */
        <>
          <Navbar />

          <section className="bg-[#F7F5F0] min-h-screen px-5 py-24 sm:px-6 sm:py-28 lg:px-12 lg:py-32">
            <div className="mx-auto max-w-2xl">

              {/* Header */}
              <div className="flex items-center gap-2 mb-5">

                <ShieldCheck
                  size={14}
                  className="text-[#b8912c]"
                />

                <p className="text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#b8912c] font-semibold">
                  Legal
                </p>

              </div>

              <h1 className="text-3xl font-bold leading-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
                Privacy Policy
              </h1>

              <p className="mt-4 text-xs text-gray-500">
                Last updated:{" "}
                {new Date(policy.effectiveDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>

              <div className="mt-6 h-px w-16 bg-[#b8912c]" />

              {/* Content */}
              <div
                className="
                  mt-10
                  text-sm
                  leading-7
                  text-gray-600
                  sm:text-base
                  sm:leading-8

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
                dangerouslySetInnerHTML={{
                  __html: policy.content,
                }}
              />

              {/* Contact note */}
              <p className="mt-8 text-center text-xs text-gray-500">
                Questions about this policy? Reach out at{" "}
                <a
                  href="mailto:hello@studiobits.dev"
                  className="text-[#b8912c] hover:underline"
                >
                  hello@studiobits.dev
                </a>
              </p>

            </div>
          </section>

          <Footer />
        </>
      )}
    </>
  );
};

export default PrivacyPolicy;