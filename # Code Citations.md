# Code Citations

## License: unknown
https://github.com/Sohel51/grocery-website-task/blob/75cb02cb09046ed6dc20d7314d940ed2edc60f1e/src/Components/Home/Services/Services.jsx

```
Je vais corriger tous ces erreurs ESLint. Voici les fichiers à modifier :

````typescript
// filepath: d:\munaspher\src\components\BlogSection.tsx
import { useQuery } from '@tanstack/react-query';
import { PortableText } from 'next-sanity';
import { getAllBlogPosts } from '@/lib/sanity';
import { Button } from './ui/button';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  body: unknown[];
  author: { name: string };
}

export const BlogSection = () => {
  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => getAllBlogPosts(),
  });

  if (!posts) return null;

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h2>
          <p className="text-xl text-gray-600">
            Insights and updates from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <article key={post._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="mb-4">
                  <PortableText value={post.body} />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author.name}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Articles</Button>
        </div>
      </div>
    </section>
  );
};
````

````typescript
// filepath: d:\munaspher\src\components\Header.tsx
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <button onClick={handleMenuToggle} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex gap-6">
            <a href="/#services" onClick={handleNavigation}>Services</a>
            <a href="/#team" onClick={handleNavigation}>Team</a>
            <a href="/contact" onClick={handleNavigation}>Contact</a>
          </div>
        </div>
      </nav>
    </header>
  );
};
````

````typescript
// filepath: d:\munaspher\src\components\ProjectsSection.tsx
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/sanity';
import { ProjectCard } from './ProjectCard';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: { asset: { url: string } };
  category: string;
}

export const ProjectsSection = () => {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => getProjects(),
  });

  if (!projects) return null;

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
````

````typescript
// filepath: d:\munaspher\src\components\ServicesGridSection.tsx
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/sanity';

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  icon: string;
}

export const ServicesGridSection = () => {
  const servicePatterns = [
    { pattern: /^design/i, category: 'Design' },
    { pattern: /^development/i, category: 'Development' },
    { pattern: /^consulting/i, category: 'Consulting' },
  ];

  const { data: services } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => getServices(),
  });

  if (!services) return null;

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: Service) => (
            <div key={service._id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
````

````typescript
// filepath: d:\munaspher\src\components\ServicesSection.tsx
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/sanity';

interface Service {
  _id: string;
  title: string;
  description: string;
}

export const ServicesSection = () => {
  const { data: services } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => getServices(),
  });

  if (!services) return null;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Our Services</h2>
        <div className="grid gap-6">
          {services.map((service: Service) => (
            <div key={service._id} className="p-6 border rounded">
              <h3 className="text-2xl font-bold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
```

