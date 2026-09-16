import { Save } from 'lucide-react'
import { siteConfig } from '@/site-config'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your store configuration and details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>
            Most of these settings are currently driven by the `site-config.ts` file in your codebase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            
            <div className="grid gap-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input
                type="text"
                name="store-name"
                id="store-name"
                disabled
                defaultValue={siteConfig.name}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                disabled
                defaultValue={siteConfig.description}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                disabled
                defaultValue={siteConfig.contactEmail}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                type="text"
                name="currency"
                id="currency"
                disabled
                defaultValue={`${siteConfig.currency.code} (${siteConfig.currency.symbol})`}
              />
            </div>

          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button disabled>
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
