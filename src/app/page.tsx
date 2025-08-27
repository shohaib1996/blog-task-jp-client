import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import PaginationControl from "@/components/PaginationControl";

interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  author: string;
  authorAvatar: string;
  type: string;
}

interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  totalPosts: number;
}

interface ApiResponse {
  posts: Post[];
  meta: Meta;
}

async function getPosts(page: number = 1): Promise<ApiResponse> {
  try {
    const response = await api.get(`/posts?page=${page}&limit=5`); // Assuming a limit of 5
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [], meta: { page: 1, limit: 5, totalPages: 1, totalPosts: 0 } };
  }
}

// Helper to truncate content
const markdownToPlainText = (
  markdown: string
) => {
  return markdown
    .replace(/\!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/\*\*|__/g, '') // Remove bold
    .replace(/\*|_/g, '') // Remove italic
    .replace(/`{1,3}/g, '') // Remove code
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/>\s/g, '') // Remove blockquotes
    .replace(/\n/g, ' ')
    .trim();
};

const truncate = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { posts, meta } = await getPosts(currentPage);

  if (posts.length === 0) {
    return <p>No posts found. Make sure your backend is running.</p>;
  }

  const featuredPost = posts[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-8">Mix Blog</h1>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content (2/3 width) */}
        <main className="w-full md:w-2/3">
          {/* Featured Post (only on page 1) */}
          {currentPage === 1 && featuredPost && (
            <>
              <Card className="mb-8 text-center overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-96 w-full">
                    <Image
                      src={featuredPost.thumbnail}
                      alt={featuredPost.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2">
                    {featuredPost.type}
                  </Badge>
                  <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                    {featuredPost.title}
                  </CardTitle>
                  <div className="flex justify-center items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                      />
                      <AvatarFallback>
                        {featuredPost.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>By {featuredPost.author}</span>
                    <span>•</span>
                    <span>
                      {new Date(featuredPost.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {truncate(markdownToPlainText(featuredPost.content), 150)}
                  </p>
                </CardContent>
                <CardFooter className="justify-center p-6 pt-0">
                  <Button asChild size="lg">
                    <Link href={`/posts/${featuredPost._id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <hr className="my-8" />
            </>
          )}

          {/* Post List */}
          <div className="space-y-8">
            {posts.map((post) => (
               // On page 1, the featured post is handled above, so we skip it in this list.
              (currentPage === 1 && post._id === featuredPost?._id) ? null : (
                <Card key={post._id} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image src={post.thumbnail} alt={post.title} layout="fill" objectFit="cover" />
                  </div>
                  <div className="md:w-2/3 flex flex-col">
                    <CardHeader>
                      <Badge variant="outline">{post.type}</Badge>
                      <CardTitle className="text-2xl mt-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.authorAvatar} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                      </div>
                      <p className="text-gray-600">{truncate(markdownToPlainText(post.content), 100)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link href={`/posts/${post._id}`}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              )
            ))}
          </div>

          <div className="mt-8">
            <PaginationControl totalPages={meta.totalPages} currentPage={meta.page} />
          </div>

        </main>

        {/* Sidebar (1/3 width) */}
        <aside className="w-full md:w-1/3">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Latest Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {posts?.slice(0, 5).map((post) => (
                  <li key={post._id} className="hover:text-blue-500 border-b pb-2">
                    <Link href={`/posts/${post._id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Follow Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-blue-500"><FaTwitter size={24} /></Link>
                <Link href="#" className="text-gray-500 hover:text-blue-500"><FaLinkedin size={24} /></Link>
                <Link href="#" className="text-gray-500 hover:text-blue-500"><FaGithub size={24} /></Link>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}