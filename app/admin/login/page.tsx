import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-sm w-full p-8 rounded-2xl shadow-lg flex flex-col gap-6">
        <h1 className="font-heading text-2xl text-center mb-2 text-primary">Admin Login</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="username" className="font-body">Username</Label>
            <Input id="username" placeholder="Enter username" className="font-body" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="font-body">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" className="font-body" />
          </div>
          <Button className="rounded-2xl w-full mt-2">Login</Button>
        </form>
      </Card>
    </main>
  );
}
