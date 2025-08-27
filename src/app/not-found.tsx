"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaHome, FaPen, FaSearch, FaExclamationTriangle } from "react-icons/fa"

export default function NotFound() {
  const suggestions = [
    {
      icon: FaHome,
      title: "Go Home",
      description: "Return to our homepage and explore the latest posts",
      href: "/",
      color: "from-blog-primary to-blog-accent",
    },
    {
      icon: FaPen,
      title: "Write a Post",
      description: "Share your own story and contribute to our community",
      href: "/posts/new",
      color: "from-blog-accent to-blog-warm",
    },
    {
      icon: FaSearch,
      title: "Browse Posts",
      description: "Discover amazing content from our writers",
      href: "/#posts",
      color: "from-blog-warm to-blog-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blog-warm/5 via-white to-blog-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blog-primary to-blog-accent bg-clip-text dark:text-white"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <FaExclamationTriangle className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off into the digital void. Don&apos;t worry though - there&apos;s
            plenty of great content waiting for you!
          </p>
        </motion.div>

        {/* Suggestions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Link href={suggestion.href}>
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 h-full">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${suggestion.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <suggestion.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{suggestion.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{suggestion.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blog-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
