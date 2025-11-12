"use client";
import { HandHeart } from "lucide-react";
import { Card } from "./Card";
import { motion } from "framer-motion";
import DonationButton from "./payment/DonationButton";

export const DonationSection = () => {
  const projects = [
    {
      title: "Temple Maintenance",
      description: "Support the beautification of our sacred space",
      image: "/images/temple/temple-top-2.jpeg",
    },
    {
      title: "Religious Ceremonies",
      description: "Help us conduct regular pujas and special celebrations",
      image: "/images/milkbath2.jpeg",
    },
    {
      title: "Community Services",
      description: "Support our food distribution and educational programs",
      image: "/images/carryin2.jpeg",
    },
  ];
  return (
    <section
      className="py-16 relative z-0 select-none cursor-default"
      data-section="donation"
    >
      <div className="container mx-auto px-4">
        <div className="section-card max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-8"
            >
              <HandHeart
                className="mx-auto text-spiritual-gold"
                size={80}
                strokeWidth={1.5}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-spiritual-gold text-3xl md:text-4xl font-bold mb-4 font-quicksand">
                Support Our Temple
              </h2>
              <p className="font-medium text-spiritual-green text-base md:text-lg mb-8 leading-relaxed">
                Your generous donations help us maintain the temple, organize
                religious ceremonies, and serve our community. Every contribution,
                no matter the size, is deeply appreciated and will be used to
                preserve our sacred traditions.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row select-none cursor-default items-center justify-center gap-6 mb-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    text={project.title}
                    image={project.image}
                    description={project.description}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="flex items-center justify-center mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <DonationButton />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
