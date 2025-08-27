"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaHeart, FaPen, FaUsers, FaRocket, FaArrowLeft } from "react-icons/fa"
import Navbar from "@/components/Navbar"

export default function AboutPage() {
  const features = [
    {
      icon: FaPen,
      title: "Write Freely",
      description: "Share your thoughts and stories without any barriers. No signup required, just pure creativity.",
    },
    {
      icon: FaUsers,
      title: "Community Driven",
      description: "Connect with fellow writers and readers in a welcoming, inclusive environment.",
    },
    {
      icon: FaHeart,
      title: "Passion First",
      description: "We believe great content comes from passion, not algorithms or monetization.",
    },
    {
      icon: FaRocket,
      title: "Simple & Fast",
      description: "Clean, distraction-free interface that lets you focus on what matters most - your words.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blog-warm/5 via-white to-blog-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.div
              whileHover={{ x: -5 }}
              className="inline-flex items-center space-x-2 text-blog-primary hover:text-blog-primary/80 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blog-primary to-blog-accent bg-clip-text ">
              MixBlog
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A place where words flow freely, stories come alive, and every voice matters. We believe in the power of
            authentic expression without barriers.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-16 border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            We created BlogSpace to democratize content creation. In a world where platforms often require complex
            signups, personal data, and algorithmic approval, we offer something different: a simple, beautiful space
            where anyone can share their thoughts instantly. Whether you&apos;re a seasoned writer or someone with a story to
            tell, your voice deserves to be heard.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blog-primary to-blog-accent rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 " />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blog-primary/10 to-blog-accent/10 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Share Your Story?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of writers and readers. No account needed, no barriers - just you and your words.
          </p>
          <Link href="/posts/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blog-primary to-blog-accent  px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Writing Now
            </motion.button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
