"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaPen, FaArrowDown } from "react-icons/fa"

export default function Banner() {
  const BlogIcon = ({ type, className }: { type: string; className?: string }) => {
    const icons = {
      comment: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      heart: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      book: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      ),
      camera: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2S8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zm0-5.2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z" />
        </svg>
      ),
      coffee: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.38 0 2.5-1.12 2.5-2.5S19.88 5 18.5 5V3zM16 10c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h10v5zM18.5 7H18V6h.5c.28 0 .5.22.5.5s-.22.5-.5.5z" />
        </svg>
      ),
      lightbulb: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
        </svg>
      ),
      star: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      globe: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    }
    return icons[type as keyof typeof icons] || icons.comment
  }

  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blog-warm/5 via-background to-blog-primary/5">
      {/* Top Left Corner Icons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`tl-${i}`}
          initial={{ opacity: 0, scale: 0, x: -50, y: -50 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [-50, 100 + i * 80, 250],
            y: [-50, 80 + i * 60, 200],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 3,
          }}
          className="absolute top-0 left-0 w-8 h-8 text-blog-primary/40"
        >
          <BlogIcon type={["comment", "heart", "book"][i]} />
        </motion.div>
      ))}

      {/* Top Right Corner Icons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`tr-${i}`}
          initial={{ opacity: 0, scale: 0, x: 50, y: -50 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            x: [50, -100 - i * 70, -250],
            y: [-50, 90 + i * 50, 180],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 9 + i * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2.5 + 1,
          }}
          className="absolute top-0 right-0 w-10 h-10 text-blog-accent/50"
        >
          <BlogIcon type={["camera", "coffee", "lightbulb"][i]} />
        </motion.div>
      ))}

      {/* Bottom Left Corner Icons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`bl-${i}`}
          initial={{ opacity: 0, scale: 0, x: -50, y: 50 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 0.8, 0],
            x: [-50, 120 + i * 90, 280],
            y: [50, -70 - i * 40, -160],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 7 + i * 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 4 + 2,
          }}
          className="absolute bottom-0 left-0 w-6 h-6 text-blog-warm/60"
        >
          <BlogIcon type={["star", "globe", "comment"][i]} />
        </motion.div>
      ))}

      {/* Bottom Right Corner Icons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`br-${i}`}
          initial={{ opacity: 0, scale: 0, x: 50, y: 50 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.1, 0],
            x: [50, -80 - i * 100, -220],
            y: [50, -60 - i * 70, -150],
            rotate: [0, -90, -180],
          }}
          transition={{
            duration: 10 + i * 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 3.5 + 0.5,
          }}
          className="absolute bottom-0 right-0 w-9 h-9 text-blog-primary/45"
        >
          <BlogIcon type={["heart", "book", "camera"][i]} />
        </motion.div>
      ))}

      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`center-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            x: [0, Math.cos((i * 60 * Math.PI) / 180) * 200],
            y: [0, Math.sin((i * 60 * Math.PI) / 180) * 200],
            rotate: [0, 360],
          }}
          transition={{
            duration: 12 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2,
          }}
          className="absolute top-1/2 left-1/2 w-5 h-5 text-blog-accent/30 -translate-x-1/2 -translate-y-1/2"
        >
          <BlogIcon type={["coffee", "lightbulb", "star", "globe", "heart", "book"][i]} />
        </motion.div>
      ))}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(251,191,36,0.05),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blog-primary via-blog-accent to-blog-warm bg-clip-text text-transparent leading-tight"
          >
            Mix Blog
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Share your thoughts, stories, and ideas with the world.
            <span className="text-blog-primary font-medium"> No signup required</span> – just pure, authentic content.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blog-primary to-blog-accent hover:from-blog-primary/90 hover:to-blog-accent/90 dark:text-white text-black px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/posts/new" className="flex items-center space-x-2">
                  <FaPen className="w-5 h-5" />
                  <span>Start Writing</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blog-primary/30 hover:border-blog-primary hover:bg-blog-primary/5 px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-transparent"
                onClick={() => {
                  document.getElementById("posts-section")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
              >
                Explore Posts
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "1000+", label: "Stories Shared" },
              { number: "500+", label: "Writers" },
              { number: "24/7", label: "Open Platform" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-blog-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-blog-primary transition-colors cursor-pointer"
            onClick={() => {
              document.getElementById("posts-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
          >
            <span className="text-sm font-medium">Discover Stories</span>
            <FaArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  )
}
