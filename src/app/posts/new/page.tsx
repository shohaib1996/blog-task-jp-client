'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import { useTheme } from 'next-themes';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const postTypes = [
  'Lifestyle',
  'Inspirational',
  'Tutorial',
  'Educational',
  'Travel',
  'Technology',
  'Food & Cooking',
  'Personal Finance',
  'Health & Fitness',
  'Book Review',
];

export default function NewPostPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('**Hello world!!!**');
  const [thumbnail, setThumbnail] = useState('');
  const [author, setAuthor] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [type, setType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title || !content || !type) {
      alert('Title, Content, and Type are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post('/posts', {
        title,
        content,
        thumbnail,
        author,
        authorAvatar,
        type,
      });

      if (response.status === 201) {
        alert('Post created successfully!');
        router.push('/'); // Redirect to homepage
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Post Type</Label>
              <Select onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type for your post" />
                </SelectTrigger>
                <SelectContent>
                  {postTypes.map((postType) => (
                    <SelectItem key={postType} value={postType}>
                      {postType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div data-color-mode={theme}>
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height={400}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="authorAvatar">Author Avatar URL</Label>
                <Input
                  id="authorAvatar"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Post...' : 'Create Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
