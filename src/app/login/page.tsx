'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Sparkles, Mail, Lock, UserPlus, LogIn, Ghost, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please enter both email and password.',
      });
      return;
    }

    setLoading(true);
    if (isSignUp) {
      initiateEmailSignUp(auth, email, password);
    } else {
      initiateEmailSignIn(auth, email, password);
    }
    
    // Auth state changes are handled by the provider's onAuthStateChanged listener
    // which will handle redirection once the user is authenticated.
    setTimeout(() => {
        router.push('/');
    }, 1500);
  };

  const handleAnonymous = () => {
    setLoading(true);
    initiateAnonymousSignIn(auth);
    setTimeout(() => {
        router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-soft-ivory flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="bg-deep-plum text-white text-center py-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-rose-gold/20 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-rose-gold" />
            </div>
          </div>
          <CardTitle className="text-3xl font-headline italic">Welcome to LookSync</CardTitle>
          <CardDescription className="text-champagne-gold/70 mt-2">
            {isSignUp ? 'Create an account to save your looks' : 'Sign in to access your virtual wardrobe'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 rounded-full h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 rounded-full h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 rounded-full bg-rose-gold hover:bg-rose-gold/90 text-white font-bold text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : isSignUp ? (
                <><UserPlus className="mr-2 h-5 w-5" /> Sign Up</>
              ) : (
                <><LogIn className="mr-2 h-5 w-5" /> Sign In</>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground font-bold tracking-widest">Or</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-12 rounded-full border-deep-plum/20 text-deep-plum hover:bg-deep-plum/5"
            onClick={handleAnonymous}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Ghost className="mr-2 h-5 w-5" /> Continue as Guest</>}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-rose-gold font-medium">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
