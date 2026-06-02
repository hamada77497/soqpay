'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  image?: string;
  createdAt: string;
}

interface ItemCardProps {
  item: MarketplaceItem;
  onViewDetails?: (item: MarketplaceItem) => void;
}

export function ItemCard({ item, onViewDetails }: ItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetails?.(item)}>
      <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <svg
              className="w-12 h-12 text-primary/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-foreground truncate">
          {item.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-primary">
            π {item.price.toFixed(2)}
          </div>
          <Badge variant="outline" className="text-xs">
            {item.seller}
          </Badge>
        </div>
        
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(item);
          }}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
