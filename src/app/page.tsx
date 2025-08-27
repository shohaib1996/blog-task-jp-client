"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import { CalendarIcon, UserIcon, ClockIcon } from "lucide-react"
import Navbar from "@/components/Navbar"
import PaginationControl from "@/components/PaginationControl"
import { useEffect, useState } from "react"
import Banner from "@/components/Banner"

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

interface Meta {
  page: number
  limit: number
  totalPages: number
  totalPosts: number
}

interface ApiResponse {
  posts: Post[]
  meta: Meta
}

async function getPosts(page = 1): Promise<ApiResponse> {
  try {
    const response = await api.get(`/posts?page=${page}&limit=5`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return { posts: [], meta: { page: 1, limit: 5, totalPages: 1, totalPosts: 0 } }
  }
}

// Helper to truncate content
const markdownToPlainText = (markdown: string) => {
  return markdown
    .replace(/!\[.*?\]$$.*?$$/g, "") // Remove images
    .replace(/\[(.*?)\]$$.*?$$/g, "$1") // Remove links
    .replace(/\*\*|__/g, "") // Remove bold
    .replace(/\*|_/g, "") // Remove italic
    .replace(/`{1,3}/g, "") // Remove code
    .replace(/#{1,6}\s/g, "") // Remove headers
    .replace(/>\s/g, "") // Remove blockquotes
    .replace(/\n/g, " ")
    .trim()
}

const truncate = (str: string, num: number) => {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + "..."
}

export default function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const [postsData, setPostsData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const currentPage = Number(searchParams?.page) || 1

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const data = await getPosts(currentPage)
      setPostsData(data)
      setLoading(false)
    }
    fetchPosts()
  }, [currentPage])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading amazing content...</p>
        </motion.div>
      </div>
    )
  }

  if (!postsData || postsData.posts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">No posts found</h2>
          <p className="text-muted-foreground">Make sure your backend is running.</p>
        </motion.div>
      </div>
    )
  }

  const { posts, meta } = postsData
  const featuredPost = posts[0]

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <Banner/>

      <div className="container mx-auto px-4 py-8" id="posts-section">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="w-full lg:w-2/3">
            {/* Featured Post */}
            {currentPage === 1 && featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/20 transition-all duration-500 group">
                  <CardHeader className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-96 w-full overflow-hidden"
                    >
                      <Image
                        src={featuredPost.thumbnail || "/placeholder.svg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-8 ">
                    <Badge variant="outline" className="mb-4 border-primary/20">
                      {featuredPost.type}
                    </Badge>
                    <CardTitle className="text-3xl md:text-4xl font-bold mb-6 text-balance group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                          <AvatarImage
                            src={featuredPost.authorAvatar || "/placeholder.svg"}
                            alt={featuredPost.author}
                          />
                          <AvatarFallback className="bg-primary/10">{featuredPost.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{featuredPost.author}</p>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-3 h-3" />
                            <span>
                              {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                      {truncate(markdownToPlainText(featuredPost.content), 200)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href={`/posts/${featuredPost._id}`}>Read Full Story</Link>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-12"
                />
              </motion.div>
            )}

            <div className="space-y-8">
              {posts.map((post, index) => {
                // Skip featured post on page 1
                if (currentPage === 1 && post._id === featuredPost?._id) return null

                return (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="flex flex-col md:flex-row overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 group">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative h-48 md:h-auto md:w-1/3 overflow-hidden"
                      >
                        <Image
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </motion.div>
                      <div className="md:w-2/3 flex flex-col py-6">
                        <CardHeader className="pb-3">
                          <Badge variant="outline" className="w-fit mb-2 border-primary/20">
                            {post.type}
                          </Badge>
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors text-balance">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                              <AvatarFallback className="bg-primary/10">{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center space-x-2">
                              <UserIcon className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-3 h-3" />
                              <span>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-pretty">
                            {truncate(markdownToPlainText(post.content), 120)}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              asChild
                              variant="outline"
                              className="border-primary/20 hover:bg-primary/10 bg-primary text-white"
                            >
                              <Link href={`/posts/${post._id}`}>Continue Reading</Link>
                            </Button>
                          </motion.div>
                        </CardFooter>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12">
              <PaginationControl totalPages={meta.totalPages} currentPage={meta.page} />
            </motion.div>
          </main>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-1/3"
          >
            <div className="sticky top-24 space-y-6">
              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 py-6">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center space-x-2">
                    <div className="w-2 h-6 bg-primary rounded-full"></div>
                    <span>Latest Posts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {posts?.slice(0, 5).map((post, index) => (
                      <motion.li
                        key={post._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="group"
                      >
                        <Link
                          href={`/posts/${post._id}`}
                          className="block p-3 rounded-lg hover:bg-primary/5 transition-colors border-b border-border/30 last:border-b-0"
                        >
                          <h4 className="font-medium group-hover:text-primary transition-colors text-balance">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 py-6 gap-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center space-x-2">
                    <div className="w-2 h-6 bg-secondary rounded-full"></div>
                    <span>Connect With Us</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {[
                      { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
                      { icon: FaLinkedin, href: "#", color: "hover:text-blue-600" },
                      { icon: FaGithub, href: "#", color: "hover:text-gray-600" },
                    ].map((social, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                        <Link
                          href={social.href}
                          className={`text-muted-foreground ${social.color} transition-colors p-2 rounded-lg hover:bg-primary/5`}
                        >
                          <social.icon size={24} />
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
    </div>
  )
}
