"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  PenTool,
  ImageIcon,
  User,
  Tag,
  FileText,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const postTypes = [
  "Lifestyle",
  "Inspirational",
  "Tutorial",
  "Educational",
  "Travel",
  "Technology",
  "Food & Cooking",
  "Personal Finance",
  "Health & Fitness",
  "Book Review",
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function NewPostPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("**Hello world!!!**");
  const [thumbnail, setThumbnail] = useState("");
  const [author, setAuthor] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [type, setType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !content || !type) {
      setShowSuccess(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post("/posts", {
        title,
        content,
        thumbnail,
        author,
        authorAvatar,
        type,
      });

      if (response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blog-warm/5 via-background to-blog-primary/5">
      <div className="container mx-auto p-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blog-primary hover:text-blog-primary/80 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blog-primary/10 rounded-lg">
              <PenTool className="w-6 h-6 text-blog-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blog-primary to-blog-accent bg-clip-text text-transparent">
              Create New Post
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Share your thoughts and ideas with the world
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className=" shadow-xl bg-card/50 backdrop-blur-sm py-6">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blog-primary" />
                  Post Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label
                      htmlFor="title"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-blog-primary" />
                      Post Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a catchy title that grabs attention..."
                      required
                      className="text-lg h-12 border-2 focus:border-blog-primary transition-colors"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label
                      htmlFor="type"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <Tag className="w-4 h-4 text-blog-primary" />
                      Post Category
                    </Label>
                    <Select onValueChange={setType} required>
                      <SelectTrigger className="h-12 border-2 focus:border-blog-primary">
                        <SelectValue placeholder="Choose the perfect category for your post" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {postTypes.map((postType) => (
                          <SelectItem
                            key={postType}
                            value={postType}
                            className="py-3"
                          >
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {postType}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <Separator className="my-8" />

                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label
                      htmlFor="content"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-blog-primary" />
                      Content
                    </Label>
                    <div
                      data-color-mode={theme}
                      className="border-2 rounded-lg overflow-hidden focus-within:border-blog-primary transition-colors"
                    >
                      <MDEditor
                        value={content}
                        onChange={(val) => setContent(val || "")}
                        height={500}
                        preview="edit"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !title || !content || !type}
                      className="w-full h-12 text-lg hover:from-blog-primary/90 hover:to-blog-accent/90 transition-all duration-300 transform hover:scale-[1.02] text-white cursor-pointer"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : showSuccess ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Sparkles className="w-5 h-5" />
                          Post Created Successfully!
                        </motion.div>
                      ) : (
                        <>
                          <PenTool className="w-5 h-5 mr-2" />
                          Publish Post
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {/* Author Information Card */}
            <Card className=" shadow-lg bg-card/50 backdrop-blur-sm py-6 border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blog-primary" />
                  Author Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-medium">
                    Author Name
                  </Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    className="border-2 focus:border-blog-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorAvatar" className="text-sm font-medium">
                    Avatar URL
                  </Label>
                  <Input
                    id="authorAvatar"
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    placeholder="https://example.com/avatar.png"
                    className="border-2 focus:border-blog-primary"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Card */}
            <Card className="border shadow-lg bg-card/50 backdrop-blur-sm py-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blog-primary" />
                  Featured Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail" className="text-sm font-medium">
                    Thumbnail URL
                  </Label>
                  <Input
                    id="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="https://example.com/image.png"
                    className="border-2 focus:border-blog-primary"
                  />
                  {thumbnail && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3"
                    >
                      <Image
                        height={128}
                        width={256}
                        src={thumbnail || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg border-2 border-border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border shadow-lg bg-gradient-to-br from-blog-primary/5 to-blog-accent/5 py-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blog-primary" />
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use engaging headlines that capture attention</li>
                  <li>• Break up text with headers and bullet points</li>
                  <li>• Add relevant images to enhance your content</li>
                  <li>• Keep paragraphs short and readable</li>
                  <li>• End with a call-to-action or question</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
