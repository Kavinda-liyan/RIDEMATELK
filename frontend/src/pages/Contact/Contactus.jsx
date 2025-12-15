import { motion } from "framer-motion";
import rmlk_logo_dark from "../../assets/rmlk_logo_dark.svg";
import contact_bg from "../../assets/contact.jpg";

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

const Contactus = () => {
  return (
    <section className="min-h-dvh bg-rmlk-dark text-white px-[60px] max-md-rmlk:px-[24px] pt-[80px] pb-[60px]">
      <motion.div {...fadeUp} className="text-center mb-[48px]">
        <img
          src={rmlk_logo_dark}
          alt="RideMate LK"
          className="h-[24px] mx-auto mb-[16px]"
        />
        <p className="text-gray-400 max-w-[600px] mx-auto text-[12px]">
          Have questions or feedback? Reach out to us and we'll get back to you
          as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-[40px] max-md-rmlk:grid-cols-1 items-center">
        <motion.div {...fadeSide(-30)}>
          <h2 className="text-[20px] font-semibold mb-[12px]">Get in Touch</h2>
          <p className="text-gray-300 text-[12px] leading-relaxed mb-[16px]">
            Fill out the form below, and our team will respond within 24 hours.
          </p>

          <form className="space-y-[12px] text-[12px]">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your full name..."
                className="bg-rmlk-dark-lighter p-[6px] rounded-md text-white"
              />
            </div>

            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email..."
                className="bg-rmlk-dark-lighter p-[6px] rounded-md text-white"
              />
            </div>

            <div className="flex flex-col">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Subject..."
                className="bg-rmlk-dark-lighter p-[6px] rounded-md text-white"
              />
            </div>

            <div className="flex flex-col">
              <label>Message</label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="bg-rmlk-dark-lighter p-[6px] rounded-md text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 py-[6px] rounded-md shadow-md w-full mt-[8px]"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden rounded-sm"
        >
          <img
            src={contact_bg}
            alt="Contact Us"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rmlk-dark via-rmlk-dark/20 to-transparent" />
          <div className="absolute inset-0 from-rmlk-dark via-rmlk-dark/0 to-transparent bg-gradient-to-l" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-[64px] bg-rmlk-dark-light p-[32px] rounded-sm border border-rmlk-dark-lighter text-center"
      >
        <h2 className="text-[20px] font-semibold mb-[12px]">Our Commitment</h2>
        <p className="text-gray-300 text-[14px] leading-relaxed max-w-[800px] mx-auto">
          We value your feedback and inquiries. Our team is dedicated to
          providing fast, accurate, and helpful responses to ensure you have the
          best experience with RideMate LK.
        </p>
      </motion.div>
    </section>
  );
};

export default Contactus;
