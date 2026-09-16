import { login, signup } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 text-sm font-medium">
              {message}
            </div>
          )}
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Button formAction={login} className="w-full">
                Log in
              </Button>
              <Button formAction={signup} variant="outline" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
