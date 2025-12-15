import { motion } from "framer-motion";
import rmlk_logo_dark from "../../assets/rmlk_logo_dark.svg";
import about_img from "../../assets/bg-about.png";
import seats from "../../assets/roadtrip.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeSide = (x) => ({
  initial: { opacity: 0, x },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
});

const AboutUs = () => {
  return (
    <section className="min-h-dvh bg-rmlk-dark text-white px-[60px] max-md-rmlk:px-[24px] pt-[80px] pb-[60px]">
      <motion.div {...fadeUp} className="text-center mb-[48px]">
        <img
          src={rmlk_logo_dark}
          alt="RideMate LK"
          className="h-[24px] mx-auto mb-[16px]"
        />

        <p className="text-gray-400 max-w-[600px] mx-auto text-[12px]">
          Helping people choose the right vehicle with confidence, clarity, and
          local insight.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-[40px] max-md-rmlk:grid-cols-1 items-center">
        {/* Left Column */}
        <motion.div {...fadeSide(-30)}>
          <h2 className="text-[20px] font-semibold mb-[12px]">Who We Are</h2>
          <p className="text-gray-300 text-[12px] leading-relaxed mb-[16px]">
            RideMate LK is a Sri Lanka–focused vehicle recommendation platform
            designed to help users find the most suitable vehicle based on real
            needs — not marketing hype.
          </p>
          <p className="text-gray-300 text-[12px] leading-relaxed">
            Whether you’re buying your first car, upgrading for family use, or
            choosing a vehicle for business or travel, RideMate LK guides you
            step by step with practical recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden rounded-sm d"
        >
          <img
            src={about_img}
            alt="About Us"
            className="w-full h-auto object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-rmlk-dark via-rmlk-dark/20 to-transparent" />
          <div className="absolute inset-0 from-rmlk-dark via-rmlk-dark/0 to-transparent bg-gradient-to-l" />
        </motion.div>
      </div>

      <div
        className="grid grid-cols-2 gap-[40px] items-center 
                max-md-rmlk:grid-cols-1 max-md-rmlk:grid-rows-1"
      >
        {/* Text first on mobile */}
        <motion.div
          {...fadeSide(30)}
          className="mt-[48px] order-2 max-md-rmlk:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-[48px]"
          >
            <h2 className="text-[20px] font-semibold mb-[12px]">What We Do</h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              className="text-gray-300 text-[12px] leading-relaxed space-y-[12px]"
            >
              {[
                "We provide personalized vehicle recommendations tailored to each user's unique needs, ensuring the right choice every time.",
                "Our suggestions take road conditions, traffic patterns, and fuel efficiency into account for practical, real-world advice.",
                "We guide users step by step with a simple, intuitive, and user-friendly interface.",
                "Our admin team ensures all vehicle data is accurate, up-to-date, and verified for reliability.",
                "We offer locally relevant insights for Sri Lankan users, highlighting vehicles suitable for the climate, terrain, and typical usage patterns.",
                "We educate users about maintenance costs, safety ratings, and resale value to make informed long-term decisions.",
                "Our platform supports both personal and commercial vehicle selection, helping families and businesses alike.",
              ].map((sentence, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="block mb-[8px]"
                >
                  {sentence}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden rounded-sm order-1 max-md-rmlk:order-2"
        >
          <img src={seats} alt="About Us" className="w-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-rmlk-dark via-rmlk-dark/20 to-transparent" />
          <div className="absolute inset-0 from-rmlk-dark via-rmlk-dark/0 to-transparent bg-gradient-to-l" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-[64px] bg-rmlk-dark-light p-[32px] rounded-sm border border-rmlk-dark-lighter"
      >
        <h2 className="text-[20px] font-semibold mb-[12px] text-center">
          Our Mission
        </h2>
        <p className="text-gray-300 text-[14px] leading-relaxed text-center max-w-[800px] mx-auto">
          Our mission is to simplify vehicle selection by combining user needs,
          smart filtering, and reliable data — empowering users to make informed
          decisions without confusion or pressure.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutUs;
