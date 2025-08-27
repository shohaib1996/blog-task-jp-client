import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function Navbar() {
  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold">My Blog</Link>
        <ModeToggle/>
        <Link href="/posts/new">New Post</Link>
      </div>
    </nav>
  );
}