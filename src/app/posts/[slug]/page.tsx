import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

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

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

async function getPosts(): Promise<Post[]> {
  try {
    const response = await api.get('/posts');
    return response.data?.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params?.slug);
  const latestPosts = await getPosts();

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Main Post Content (2/3 width) */}
        <main className="w-full md:w-2/3">
          <article>
            <header className="mb-8">
              <Badge variant="outline" className="mb-4">{post.type}</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{post.title}</h1>
              <div className="flex items-center space-x-3 text-md text-gray-500">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>By {post.author}</span>
                <span className="text-gray-300">•</span>
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </article>
        </main>

        {/* Sidebar (1/3 width) */}
        <aside className="w-full md:w-1/3">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Latest Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {latestPosts?.slice(0, 3).map(latestPost => (
                  <li key={latestPost._id} className="hover:text-blue-500 border-b pb-2">
                    <Link href={`/posts/${latestPost.slug}`}>{latestPost.title}</Link>
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