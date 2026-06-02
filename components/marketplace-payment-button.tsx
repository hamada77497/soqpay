'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MarketplacePaymentButtonProps {
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
  amount?: number;
  itemId?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export function MarketplacePaymentButton({
  size = 'default',
  variant = 'default',
  className = '',
  amount = 1,
  itemId = 'premium-features',
  onSuccess,
  onError,
}: MarketplacePaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    // Check if Pi SDK is available
    const pi = (window as any).Pi;
    if (!pi) {
      const error = 'Pi SDK not loaded. Please make sure you are using Pi Browser.';
      setErrorMessage(error);
      onError?.(error);
      setIsProcessing(false);
      return;
    }

    try {
      // Step 1: Authenticate the user
      const scopes = ['payments'];
      const auth = await pi.authenticate(scopes, (payment: any) => {
        console.log('Incomplete payment found:', payment);
        // Handle incomplete payment if needed
      });

      console.log('Authenticated user:', auth.user.uid);

      // Step 2: Create payment data
      const paymentData = {
        amount: amount,
        memo: `Payment for ${itemId} - SoqPay Marketplace`,
        metadata: {
          itemId: itemId,
          timestamp: Date.now().toString(),
        },
      };

      // Step 3: Create the payment
      const callbacks = {
        onReadyForServerApproval: function (paymentId: string) {
          console.log('Payment ready for approval:', paymentId);
          // Here you would call your backend to approve the payment
          // For demo purposes, we'll auto-approve
          approvePayment(paymentId);
        },
        onReadyForServerCompletion: function (paymentId: string) {
          console.log('Payment ready for completion:', paymentId);
          // Here you would call your backend to complete the payment
          completePayment(paymentId);
        },
        onCancel: function (paymentId: string) {
          console.log('Payment cancelled:', paymentId);
          setIsProcessing(false);
        },
        onError: function (error: any, paymentId: string) {
          console.error('Payment error:', error, paymentId);
          setErrorMessage(error.message || 'Payment failed');
          onError?.(error.message || 'Payment failed');
          setIsProcessing(false);
        },
      };

      const payment = await pi.createPayment(paymentData, callbacks);
      console.log('Payment created:', payment);

      // Step 4: Call onSuccess after payment completes
      if (payment && payment.identifier) {
        onSuccess?.(payment.identifier);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage(error.message || 'Something went wrong');
      onError?.(error.message || 'Something went wrong');
      setIsProcessing(false);
    }
  };

  // Helper functions for payment approval/completion
  const approvePayment = async (paymentId: string) => {
    try {
      // Call your backend API to approve the payment
      const response = await fetch('/api/pi/approve-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      });
      
      if (response.ok) {
        console.log('Payment approved by server');
      }
    } catch (error) {
      console.error('Failed to approve payment:', error);
    }
  };

  const completePayment = async (paymentId: string) => {
    try {
      const response = await fetch('/api/pi/complete-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      });
      
      if (response.ok) {
        console.log('Payment completed by server');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Failed to complete payment:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Button
        size={size}
        variant={variant}
        className={className}
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay ${amount} π`}
      </Button>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}