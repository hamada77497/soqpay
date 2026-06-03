'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthLoadingScreen } from '@/components/auth-loading-screen';
import { ItemCard, type MarketplaceItem } from '@/components/item-card';
import { ListingForm } from '@/components/listing-form';
import { Empty } from '@/components/ui/empty';
import { MarketplacePaymentButton } from '@/components/marketplace-payment-button';

// ========== Pi Authentication Hook ==========
function usePiAuth() {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState('Connecting to Pi Network...');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      if (typeof window === 'undefined') return;
      
      // Wait for Pi SDK to load
      let attempts = 0;
      while (!(window as any).Pi && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }
      
      const pi = (window as any).Pi;
      if (!pi) {
        setAuthMessage('Pi SDK not loaded. Please use Pi Browser.');
        setHasError(true);
        return;
      }

      try {
        setAuthMessage('Initializing Pi SDK...');
        pi.init({ version: '2.0', sandbox: true });
        
        setAuthMessage('Requesting authentication...');
        const scopes = ['username', 'payments'];
        const auth = await pi.authenticate(scopes, (payment: any) => {
          console.log('Incomplete payment found:', payment);
        });
        
        setUser(auth.user);
        setIsAuthenticated(true);
        setAuthMessage(`Welcome ${auth.user.username}!`);
        setHasError(false);
      } catch (err: any) {
        console.error('Auth error:', err);
        setAuthMessage(err.message || 'Authentication failed. Please try again.');
        setHasError(true);
      }
    };

    authenticate();
  }, []);

  return { user, isAuthenticated, authMessage, hasError };
}
// ==========================================

export default function HomePage() {
  const { isAuthenticated, authMessage, hasError } = usePiAuth();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [userListings, setUserListings] = useState<MarketplaceItem[]>([]);
  const [selectedTab, setSelectedTab] = useState('browse');
  const [userName, setUserName] = useState('Pioneer');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  // Mock data for initial items
  useEffect(() => {
    const mockItems: MarketplaceItem[] = [
      {
        id: '1',
        title: 'Vintage Leather Wallet',
        description: 'Beautiful brown leather wallet in excellent condition. Perfect for daily use.',
        price: 12.50,
        seller: 'Alice',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Wireless Earbuds',
        description: 'High-quality sound, 20 hour battery life. Barely used.',
        price: 45.00,
        seller: 'Bob',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Hardcover Book - Science',
        description: 'Fascinating science book about space exploration. Great read!',
        price: 8.75,
        seller: 'Carol',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Phone Stand',
        description: 'Adjustable phone stand for desk. Works with all phones.',
        price: 5.00,
        seller: 'David',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard. Cherry MX switches. Gaming ready.',
        price: 78.50,
        seller: 'Eve',
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'USB-C Cable 2m',
        description: 'High-speed USB-C charging and data cable. Certified and durable.',
        price: 3.25,
        seller: 'Frank',
        createdAt: new Date().toISOString(),
      },
    ];
    setItems(mockItems);
  }, []);

  if (!isAuthenticated) {
    return <AuthLoadingScreen message={authMessage} hasError={hasError} />;
  }

  const handleAddListing = (newItem: Omit<MarketplaceItem, 'id' | 'createdAt' | 'seller'>) => {
    const item: MarketplaceItem = {
      ...newItem,
      id: Date.now().toString(),
      seller: userName,
      createdAt: new Date().toISOString(),
    };
    setUserListings([item, ...userListings]);
    setItems([item, ...items]);
    setSelectedTab('browse');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                S
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Soqpay</h1>
                <p className="text-xs text-muted-foreground">Pi Marketplace</p>
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <MarketplacePaymentButton size="sm" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Welcome, {userName}</p>
              <p className="text-xs text-muted-foreground">π Pioneer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="browse" className="text-base">
              Browse
            </TabsTrigger>
            <TabsTrigger value="listings" className="text-base">
              My Listings
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-base">
              Sell
            </TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse" className="py-6">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Unlock Premium Marketplace Features
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Access advanced listing tools, analytics, and seller features to grow your business
                  </p>
                </div>
                <div className="w-full sm:w-auto">
                  <MarketplacePaymentButton size="lg" className="w-full sm:w-auto" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground mb-2">Browse Items</h2>
              <p className="text-muted-foreground">Discover items from other Pi Pioneers</p>
            </div>

            {items.length === 0 ? (
              <Empty
                icon={
                  <svg
                    className="w-16 h-16 text-muted-foreground/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                }
                title="No items available"
                description="Check back soon for new listings"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onViewDetails={setSelectedItem}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="py-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground mb-2">My Listings</h2>
              <p className="text-muted-foreground">Items you&apos;ve listed for sale</p>
            </div>

            {userListings.length === 0 ? (
              <Empty
                icon={
                  <svg
                    className="w-16 h-16 text-muted-foreground/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                title="No listings yet"
                description="Start selling by creating your first listing"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userListings.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onViewDetails={setSelectedItem}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sell Tab */}
          <TabsContent value="sell" className="py-6">
            <div className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">Pro Tip:</span> Get access to advanced seller tools and analytics
              </p>
              <MarketplacePaymentButton />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ListingForm 
                  onSubmit={handleAddListing}
                  seller={userName}
                />
              </div>

              <div className="bg-secondary rounded-lg p-4 h-fit">
                <h3 className="font-semibold text-foreground mb-3">Selling Tips</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>Write clear, descriptive titles</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>Include detailed descriptions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>Price competitively</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>Be responsive to inquiries</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>Maintain accurate inventory</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Item Details Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-end z-50 sm:items-center"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-background w-full sm:w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedItem.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">By {selectedItem.seller}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedItem(null)}
                className="text-muted-foreground"
              >
                ✕
              </Button>
            </div>

            <p className="text-muted-foreground">{selectedItem.description}</p>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Price</p>
              <p className="text-3xl font-bold text-primary">π {selectedItem.price.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </Button>
              <div className="flex flex-col gap-2">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Buy Now
                </Button>
                <div className="mt-1">
                  <MarketplacePaymentButton size="sm" variant="outline" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
