"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FaTwitter, FaLinkedin, FaGithub, FaArrowLeft, FaClock, FaUser } from "react-icons/fa"

interface Post {
  _id: string
  slug: string
  title: string
  content: string
  thumbnail: string
  createdAt: string
  author: string
  authorAvatar: string
  type: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 },
  },
}

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [latestPosts, setLatestPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [postResponse, postsResponse] = await Promise.all([api.get(`/posts/${params?.slug}`), api.get("/posts")])

        setPost(postResponse.data)
        setLatestPosts(postsResponse.data?.posts || [])
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setError("Failed to load post")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params?.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blog-warm-50 to-blog-warm-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-blog-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error || !post) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-br from-blog-warm-50 to-blog-warm-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
      >
        <div className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 bg-blog-primary/10 rounded-full flex items-center justify-center"
          >
            <span className="text-4xl">📝</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blog-primary text-white rounded-lg font-medium hover:bg-blog-primary/90 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blog-warm-50 to-blog-warm-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-blog-primary hover:text-blog-primary/80 transition-colors font-medium"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Posts
            </motion.button>
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Post Content */}
          <motion.main variants={itemVariants} className="w-full lg:w-2/3">
            <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Post Header */}
              <div className="p-8 pb-0">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Badge
                    variant="outline"
                    className="mb-6 bg-blog-primary/10 text-blog-primary border-blog-primary/20 hover:bg-blog-primary/20 transition-colors"
                  >
                    {post.type}
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white text-balance leading-tight"
                >
                  {post.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-blog-primary/20">
                      <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback className="bg-blog-primary/10 text-blog-primary font-semibold">
                        {post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <FaUser className="w-3 h-3" />
                        <span className="font-medium text-gray-900 dark:text-white">By {post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FaClock className="w-3 h-3" />
                        <time dateTime={post.createdAt}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Featured Image */}
              <motion.div variants={imageVariants} className="relative h-96 md:h-[500px] w-full mb-8 overflow-hidden">
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Post Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-8 pt-0"
              >
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blog-primary hover:prose-a:text-blog-primary/80 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blog-primary prose-code:bg-blog-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                </div>
              </motion.div>
            </article>
          </motion.main>

          {/* Enhanced Sidebar */}
          <motion.aside variants={itemVariants} className="w-full lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Latest Posts Card */}
              <Card className="bg-white/80 py-6 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="w-2 h-6 bg-primary rounded-full"></div>
                    Latest Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {latestPosts?.slice(0, 4).map((latestPost, index) => (
                      <motion.div
                        key={latestPost._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Link href={`/posts/${latestPost.slug}`}>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="group p-3 rounded-lg hover:bg-blog-primary/5 transition-all duration-200 border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blog-primary transition-colors text-sm leading-relaxed">
                              {latestPost.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(latestPost.createdAt).toLocaleDateString()}
                            </p>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links Card */}
              <Card className="bg-white/80 gap-0 py-6 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-6 bg-secondary rounded-full"></div>
                    Connect With Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {[
                      { icon: FaTwitter, href: "#", color: "hover:text-blue-500" },
                      { icon: FaLinkedin, href: "#", color: "hover:text-blue-600" },
                      { icon: FaGithub, href: "#", color: "hover:text-gray-900 dark:hover:text-white" },
                    ].map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Link href={social.href}>
                          <motion.div
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-200 shadow-sm hover:shadow-md`}
                          >
                            <social.icon size={20} />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  )
}
