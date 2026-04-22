import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Globe } from '@/components/ui/globe';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { countriesQuery } from '@/queries/countries';
import { getMarkers } from '@/utils/globe';
import type { Country } from '@/types/country';
import type { Marker } from '@/types/globe';
import googleLogo from '@/assets/google-logo.svg';

function AuthLayout() {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const { data: countries, isLoading } = useQuery<Country[]>(countriesQuery);

  const navigate = useNavigate();
  const isSignup = useMatch('/signup');
  const activeTab = isSignup ? 'signup' : 'signin';

  useEffect(() => {
    if (!countries) return;

    setMarkers(getMarkers(countries));

    const interval = setInterval(() => {
      setMarkers(getMarkers(countries));
    }, 10_000);

    return () => clearInterval(interval);
  }, [countries]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className='relative container flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-evenly md:flex-row md:pt-0'>
      <Card className='bg-background z-1 flex w-full max-w-md text-center sm:px-0 md:left-4 lg:static'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Welcome to Geogiga
          </CardTitle>
          <CardDescription>
            Explore the world from your browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => navigate(`/${value}`)}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='signin' className='cursor-pointer'>
                Sign In
              </TabsTrigger>
              <TabsTrigger value='signup' className='cursor-pointer'>
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value='signin'>
              {activeTab === 'signin' && <Outlet />}
            </TabsContent>
            <TabsContent value='signup'>
              {activeTab === 'signup' && <Outlet />}
            </TabsContent>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background text-muted-foreground px-2'>
                  or
                </span>
              </div>
            </div>
            <Button
              variant='outline'
              type='button'
              className='w-full'
              onClick={() => {}}
            >
              <img src={googleLogo} alt='Google Logo' />
              Sign in with Google
            </Button>
          </Tabs>
        </CardContent>
      </Card>
      {countries && (
        <Globe
          markers={markers}
          className='absolute z-0 md:right-4 lg:static'
        />
      )}
    </main>
  );
}

export default AuthLayout;
