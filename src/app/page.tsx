'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Globe, Upload, FileText, Clock, CheckCircle2, XCircle,
  Wifi, WifiOff, RefreshCw, Send, Image as ImageIcon,
  ChevronRight, AlertCircle, Loader2, Eye, ExternalLink,
  Newspaper, LayoutDashboard, PackageOpen
} from 'lucide-react';
import { ARTICLES } from '@/data/articles';

// Types
interface ImageItem {
  filename: string;
  caption: string;
  color: string;
  path: string;
  size: number;
  lastModified: string;
  hasPostData: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  postCount: number;
  parentId: number;
}

interface WpPost {
  id: number;
  title: string;
  link: string;
  status: string;
  date: string;
  modified: string;
  featuredImageUrl: string | null;
  categories: string[];
}

interface ArticleItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  defaultCategoryId: number;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardTabs />
      </main>
      <footer className="mt-auto border-t bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-muted-foreground">
          Outil de Publication WordPress &mdash; roisdumenage.fr &mdash; Trucs Malins pour la Maison
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Outil de Publication WordPress
            </h1>
            <p className="text-amber-100 text-sm mt-0.5">
              Trucs Malins pour la Maison &mdash; roisdumenage.fr
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function DashboardTabs() {
  const [gridCols, setGridCols] = useState('repeat(2, 1fr)');

  useEffect(() => {
    const updateGrid = () => {
      setGridCols(window.innerWidth >= 640 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)');
    };
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  return (
    <Tabs defaultValue="dashboard" className="space-y-6">
      <TabsList className="w-full bg-white shadow-sm rounded-xl p-1.5 h-auto gap-1" style={{ display: 'grid', gridTemplateColumns: gridCols }}>
        <TabsTrigger value="dashboard" className="flex items-center justify-center gap-1.5 py-3 px-1 text-[11px] sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg transition-all min-h-[48px]">
          <LayoutDashboard className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Tableau de bord</span>
        </TabsTrigger>
        <TabsTrigger value="posts" className="flex items-center justify-center gap-1.5 py-3 px-1 text-[11px] sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg transition-all min-h-[48px]">
          <ImageIcon className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Publier Images</span>
        </TabsTrigger>
        <TabsTrigger value="articles" className="flex items-center justify-center gap-1.5 py-3 px-1 text-[11px] sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg transition-all min-h-[48px]">
          <Newspaper className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Publier Articles</span>
        </TabsTrigger>
        <TabsTrigger value="recent" className="flex items-center justify-center gap-1.5 py-3 px-1 text-[11px] sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white rounded-lg transition-all min-h-[48px]">
          <Clock className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Articles Récents</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <DashboardTab />
      </TabsContent>
      <TabsContent value="posts">
        <PublishPostsTab />
      </TabsContent>
      <TabsContent value="articles">
        <PublishArticlesTab />
      </TabsContent>
      <TabsContent value="recent">
        <RecentPostsTab />
      </TabsContent>
    </Tabs>
  );
}

// ─── Dashboard Tab ─────────────────────────────────────────────

function DashboardTab() {
  const { toast } = useToast();
  const [connected, setConnected] = useState<boolean | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const checkConnection = useCallback(async () => {
    try {
      const res = await fetch('/api/wordpress/test-connection');
      const data = await res.json();
      setConnected(data.connected);
    } catch {
      setConnected(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await checkConnection();

    try {
      const [postsRes, imagesRes, catsRes] = await Promise.allSettled([
        fetch('/api/wordpress/posts?per_page=1&status=publish'),
        fetch('/api/images'),
        fetch('/api/wordpress/categories'),
      ]);

      if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
        const data = await postsRes.value.json();
        setTotalPosts(data.total || 0);
      }

      if (imagesRes.status === 'fulfilled' && imagesRes.value.ok) {
        const data = await imagesRes.value.json();
        setImages(data.images || []);
      }

      if (catsRes.status === 'fulfilled' && catsRes.value.ok) {
        const data = await catsRes.value.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [checkConnection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="border-2 transition-all" style={{
        borderColor: connected === true ? '#22c55e' : connected === false ? '#ef4444' : '#f59e0b'
      }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {loading ? (
                <Skeleton className="w-12 h-12 rounded-full" />
              ) : connected ? (
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <Wifi className="w-6 h-6 text-green-600" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                  <WifiOff className="w-6 h-6 text-red-600" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {loading ? 'Vérification...' : connected ? 'Connecté à WordPress' : 'Connexion échouée'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {loading ? 'Test de la connexion en cours' : connected ? 'roisdumenage.fr - API accessible' : 'Impossible de joindre l\'API WordPress'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                checkConnection();
                toast({ title: 'Test de connexion...', description: 'Vérification en cours' });
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tester
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Globe className="w-5 h-5" />}
          label="Articles publiés"
          value={loading ? '-' : totalPosts.toString()}
          color="amber"
        />
        <StatCard
          icon={<ImageIcon className="w-5 h-5" />}
          label="Images disponibles"
          value={loading ? '-' : images.length.toString()}
          color="orange"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Articles à publier"
          value="5"
          color="yellow"
        />
        <StatCard
          icon={<PackageOpen className="w-5 h-5" />}
          label="Catégories"
          value={loading ? '-' : categories.length.toString()}
          color="amber"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300 transition-colors"
            onClick={() => {
              const tabsEl = document.querySelector('[data-state="active"]')?.closest('[role="tablist"]');
              // Switch to posts tab
              const postsTab = document.querySelector('[value="posts"]') as HTMLElement;
              postsTab?.click();
            }}
          >
            <ImageIcon className="w-6 h-6 text-amber-600" />
            <span className="font-medium">Publier des images</span>
            <span className="text-xs text-muted-foreground">33 images prêtes</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
            onClick={() => {
              const articlesTab = document.querySelector('[value="articles"]') as HTMLElement;
              articlesTab?.click();
            }}
          >
            <FileText className="w-6 h-6 text-orange-600" />
            <span className="font-medium">Publier des articles</span>
            <span className="text-xs text-muted-foreground">5 articles rédigés</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
            onClick={() => {
              const recentTab = document.querySelector('[value="recent"]') as HTMLElement;
              recentTab?.click();
            }}
          >
            <Clock className="w-6 h-6 text-yellow-600" />
            <span className="font-medium">Voir les articles récents</span>
            <span className="text-xs text-muted-foreground">Derniers articles publiés</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-700',
    orange: 'bg-orange-100 text-orange-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <Card className="bg-white">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorMap[color] || colorMap.amber}`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Publish Posts Tab ─────────────────────────────────────────

function PublishPostsTab() {
  const { toast } = useToast();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, filename: '' });
  const [publishStatus, setPublishStatus] = useState<Map<string, 'pending' | 'publishing' | 'success' | 'error'>>(new Map());
  const [selectedCategory, setSelectedCategory] = useState<string>('13');
  const [publishAsDraft, setPublishAsDraft] = useState(false);
  const [titleOverrides, setTitleOverrides] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    async function fetch() {
      try {
        const [imagesRes, catsRes] = await Promise.all([
          fetch('/api/images'),
          fetch('/api/wordpress/categories'),
        ]);
        if (imagesRes.ok) {
          const data = await imagesRes.json();
          setImages(data.images || []);
        }
        if (catsRes.ok) {
          const data = await catsRes.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Error fetching:', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const toggleImage = (filename: string) => {
    const next = new Set(selectedImages);
    if (next.has(filename)) next.delete(filename);
    else next.add(filename);
    setSelectedImages(next);
  };

  const toggleAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(i => i.filename)));
    }
  };

  const publishSelected = async () => {
    if (selectedImages.size === 0) {
      toast({ title: 'Aucune image sélectionnée', variant: 'destructive' });
      return;
    }

    setPublishing(true);
    const total = selectedImages.size;
    const selected = Array.from(selectedImages);
    setProgress({ current: 0, total, filename: '' });

    const newStatus = new Map<string, 'pending' | 'publishing' | 'success' | 'error'>();

    for (let i = 0; i < selected.length; i++) {
      const filename = selected[i];
      newStatus.set(filename, 'publishing');
      setPublishStatus(new Map(newStatus));
      setProgress({ current: i + 1, total, filename });

      const title = titleOverrides.get(filename) || images.find(img => img.filename === filename)?.caption || filename.replace(/\.png$/, '').replace(/_/g, ' ');

      try {
        const res = await fetch('/api/wordpress/publish-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename,
            title,
            status: publishAsDraft ? 'draft' : 'publish',
            category_id: selectedCategory,
          }),
        });

        const data = await res.json();
        if (data.success) {
          newStatus.set(filename, 'success');
        } else {
          newStatus.set(filename, 'error');
        }
      } catch {
        newStatus.set(filename, 'error');
      }

      setPublishStatus(new Map(newStatus));

      // Small delay between publishes to avoid rate limiting
      if (i < selected.length - 1) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    setPublishing(false);
    const successes = Array.from(newStatus.values()).filter(v => v === 'success').length;
    toast({
      title: 'Publication terminée',
      description: `${successes}/${total} articles publiés avec succès`,
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Catégorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name} ({cat.postCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={publishAsDraft}
                  onChange={e => setPublishAsDraft(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Brouillon
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleAll} disabled={publishing}>
                {selectedImages.size === images.length ? 'Tout désélectionner' : 'Tout sélectionner'}
              </Button>
              <Button
                size="sm"
                onClick={publishSelected}
                disabled={publishing || selectedImages.size === 0}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {publishing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publication... ({progress.current}/{progress.total})</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Publier ({selectedImages.size})</>
                )}
              </Button>
            </div>
          </div>

          {publishing && (
            <div className="mt-4 space-y-2">
              <Progress value={(progress.current / progress.total) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress.filename ? `Traitement : ${progress.filename}` : 'En cours...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selection info */}
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-sm px-3 py-1">
          {images.length} images disponibles
        </Badge>
        {selectedImages.size > 0 && (
          <Badge className="bg-amber-600 text-sm px-3 py-1">
            {selectedImages.size} sélectionnées
          </Badge>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image) => {
          const isSelected = selectedImages.has(image.filename);
          const status = publishStatus.get(image.filename);

          return (
            <div
              key={image.filename}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 shadow-lg shadow-amber-200 scale-[1.02]'
                  : 'border-transparent hover:border-amber-200 shadow-sm'
              } ${status === 'success' ? 'ring-2 ring-green-400' : ''} ${status === 'error' ? 'ring-2 ring-red-400' : ''}`}
              onClick={() => !publishing && toggleImage(image.filename)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.path}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                {/* Selection checkbox */}
                <div className="absolute top-2 left-2">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    isSelected ? 'bg-amber-500 text-white' : 'bg-white/80 text-transparent'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                {/* Status indicator */}
                {status && (
                  <div className="absolute top-2 right-2">
                    {status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                    {status === 'publishing' && <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />}
                  </div>
                )}
                {/* Overlay with title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-xs line-clamp-2 font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Publish Articles Tab ──────────────────────────────────────

function PublishArticlesTab() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [articleCategories, setArticleCategories] = useState<Map<number, string>>(new Map());
  const [publishStatus, setPublishStatus] = useState<Map<number, 'idle' | 'publishing' | 'success' | 'error'>>(new Map());
  const [publishAsDraft, setPublishAsDraft] = useState(false);

  const articles: ArticleItem[] = ARTICLES.map(a => ({
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    defaultCategoryId: a.defaultCategoryId,
  }));

  useEffect(() => {
    async function fetch() {
      try {
        const catsRes = await fetch('/api/wordpress/categories');
        if (catsRes.ok) {
          const data = await catsRes.json();
          setCategories(data.categories || []);
          // Set default categories
          const defaults = new Map<number, string>();
          articles.forEach(a => defaults.set(a.id, a.defaultCategoryId.toString()));
          setArticleCategories(defaults);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const publishArticle = async (article: ArticleItem) => {
    setPublishStatus(prev => new Map(prev).set(article.id, 'publishing'));
    try {
      const categoryId = articleCategories.get(article.id);
      const res = await fetch('/api/wordpress/publish-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category_id: categoryId,
          status: publishAsDraft ? 'draft' : 'publish',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPublishStatus(prev => new Map(prev).set(article.id, 'success'));
        toast({ title: 'Article publié', description: `"${article.title}" publié avec succès` });
      } else {
        setPublishStatus(prev => new Map(prev).set(article.id, 'error'));
        toast({ title: 'Erreur', description: data.error || 'Échec de la publication', variant: 'destructive' });
      }
    } catch {
      setPublishStatus(prev => new Map(prev).set(article.id, 'error'));
      toast({ title: 'Erreur de connexion', variant: 'destructive' });
    }
  };

  const publishAllArticles = async () => {
    for (const article of articles) {
      if (publishStatus.get(article.id) !== 'success') {
        await publishArticle(article);
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  };

  const getCategoryName = (catId: string) => {
    return categories.find(c => c.id.toString() === catId)?.name || 'Non défini';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={publishAsDraft}
                  onChange={e => setPublishAsDraft(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Publier en brouillon
              </label>
            </div>
            <Button
              onClick={publishAllArticles}
              disabled={articles.every(a => publishStatus.get(a.id) === 'success')}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Publier tous les articles
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Articles list */}
      <div className="space-y-4">
        {articles.map((article) => {
          const status = publishStatus.get(article.id);
          const categoryId = articleCategories.get(article.id);
          const isPublishing = status === 'publishing';

          return (
            <Card key={article.id} className={`bg-white transition-all ${
              status === 'success' ? 'border-green-200 bg-green-50/30' : ''
            }`}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0 mt-0.5">
                        {article.id}
                      </span>
                      <div>
                        <h3 className="font-semibold text-base">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-9">
                      <Select
                        value={categoryId}
                        onValueChange={val => setArticleCategories(prev => new Map(prev).set(article.id, val))}
                      >
                        <SelectTrigger className="w-64 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2 shrink-0">
                    {status === 'success' ? (
                      <Badge className="bg-green-600 text-sm px-4 py-1">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Publié
                      </Badge>
                    ) : status === 'error' ? (
                      <div className="flex gap-2">
                        <Badge variant="destructive" className="text-sm px-3 py-1">
                          <XCircle className="w-3 h-3 mr-1" /> Erreur
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => publishArticle(article)}>
                          <RefreshCw className="w-3 h-3 mr-1" /> Réessayer
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => publishArticle(article)}
                        disabled={isPublishing}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        {isPublishing ? (
                          <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Publication...</>
                        ) : (
                          <><Send className="w-3 h-3 mr-1" /> Publier</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recent Posts Tab ──────────────────────────────────────────

function RecentPostsTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wordpress/posts?per_page=20&page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      } else {
        toast({ title: 'Erreur', description: 'Impossible de récupérer les articles', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Erreur de connexion', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [page, toast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publish':
        return <Badge className="bg-green-600 text-xs">Publié</Badge>;
      case 'draft':
        return <Badge variant="outline" className="text-xs">Brouillon</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 text-xs">En attente</Badge>;
      case 'private':
        return <Badge variant="secondary" className="text-xs">Privé</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="p-12 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Aucun article trouvé</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Aucun article n'a pu être récupéré depuis WordPress.
          </p>
          <Button variant="outline" className="mt-4" onClick={fetchPosts}>
            <RefreshCw className="w-4 h-4 mr-2" /> Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {posts.length} article{posts.length > 1 ? 's' : ''} affiché{posts.length > 1 ? 's' : ''}
        </p>
        <Button variant="outline" size="sm" onClick={fetchPosts}>
          <RefreshCw className="w-4 h-4 mr-2" /> Actualiser
        </Button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden hidden sm:block">
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3
                        className="font-medium text-sm truncate"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {getStatusBadge(post.status)}
                        {post.categories.slice(0, 2).map((cat, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-normal">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-amber-600 transition-colors shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(post.date)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Précédent
        </Button>
        <span className="flex items-center px-4 text-sm">Page {page}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => p + 1)}
          disabled={posts.length < 20}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
