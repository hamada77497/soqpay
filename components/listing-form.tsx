'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Field, FieldLabel } from '@/components/ui/field';
import type { MarketplaceItem } from './item-card';

interface ListingFormProps {
  onSubmit: (item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'seller'>) => void;
  seller: string;
  isLoading?: boolean;
}

export function ListingForm({ onSubmit, seller, isLoading = false }: ListingFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!price || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: undefined,
    });

    setTitle('');
    setDescription('');
    setPrice('');
    setErrors({});
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-foreground">List a New Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field>
          <FieldLabel>Item Title</FieldLabel>
          <Input
            placeholder="e.g., Vintage Watch"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors({ ...errors, title: '' });
              }
            }}
            disabled={isLoading}
            className="bg-background"
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1">{errors.title}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            placeholder="Describe your item in detail..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors({ ...errors, description: '' });
              }
            }}
            disabled={isLoading}
            className="bg-background min-h-24 resize-none"
          />
          {errors.description && (
            <p className="text-sm text-destructive mt-1">{errors.description}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Price (in π)</FieldLabel>
          <Input
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) {
                setErrors({ ...errors, price: '' });
              }
            }}
            disabled={isLoading}
            className="bg-background"
          />
          {errors.price && (
            <p className="text-sm text-destructive mt-1">{errors.price}</p>
          )}
        </Field>

        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
        >
          {isLoading ? 'Listing...' : 'List Item'}
        </Button>
      </form>
    </Card>
  );
}
