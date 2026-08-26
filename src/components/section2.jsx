import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function WhoWeAre() {

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <section id="about" className="relative bg-[#0A0A0A] py-24 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="
        absolute
        -right-40
        top-20
        w-[450px]
        h-[450px]
        bg-[#0E7490]/20
        blur-[140px]
        rounded-full
      "></div>


      <div className="max-w-7xl mx-auto relative">

        <div className="grid lg:grid-cols-2 gap-16 items-center">


          {/* Left Heading */}
          <div data-aos="fade-right">

            <p className="
              text-[#F8B400]
              uppercase
              tracking-[5px]
              text-sm
              mb-5
            ">
              Who We Are
            </p>


            <h2 className="
              text-white
              text-4xl
              md:text-6xl
              font-bold
              leading-tight
            ">
              Transforming Ideas
              <span className="
                block
                text-[#0E7490]
              ">
                Into Digital Solutions
              </span>
            </h2>


          </div>



          {/* Right Content */}
          <div data-aos="fade-left">

            <p className="
              text-gray-300
              text-lg
              leading-8
              mb-6
            ">
              At StudioBit Tech, we simplify the digital journey
              by creating innovative software solutions that help
              businesses grow, adapt, and succeed.
            </p>


            <p className="
              text-gray-400
              leading-8
              mb-8
            ">
              From modern web applications to custom digital
              platforms, we combine creativity, technology,
              and strategy to build solutions that make a
              real impact.
            </p>


            {/* Highlight */}
            <div className="
              border-l-2
              border-[#F8B400]
              pl-6
            ">

              <p className="
                text-white
                text-xl
                font-medium
              ">
                We understand. We innovate. We deliver.
              </p>


              <p className="
                text-gray-500
                mt-2
              ">
                Building reliable, scalable, and user-focused
                digital experiences for modern businesses.
              </p>

            </div>


          </div>


        </div>

      </div>

    </section>
  );
}

export default WhoWeAre;