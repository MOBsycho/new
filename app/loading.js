"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-heritage-cream via-ivory to-heritage-cream">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Loading Animation */}
      <div className="relative flex flex-col items-center justify-center gap-8">
        {/* Rotating Yantra */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className="relative"
        >
          <Image
            src="/icons/kuber-yantra-bg.svg"
            alt="Loading..."
            width={120}
            height={120}
            className="opacity-90"
            priority
          />
        </motion.div>

        {/* Pulsing Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute w-40 h-40 bg-sandalwood/20 rounded-full blur-3xl"
        />

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p
            className="text-2xl font-light text-deep-brown mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            KuberJi Mandir
          </p>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center gap-1"
          >
            <span className="text-sm text-incense font-light">Loading</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                times: [0, 0.5, 1],
              }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                times: [0, 0.5, 1],
                delay: 0.2,
              }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                times: [0, 0.5, 1],
                delay: 0.4,
              }}
            >
              .
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
