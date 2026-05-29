import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Settings = () => {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted mt-2">Manage your account preferences and profile.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Input label="First Name" defaultValue="User" />
            <Input label="Last Name" defaultValue="Doe" />
            <Input label="Email" type="email" defaultValue="user@example.com" />
            <Input label="Phone Number" defaultValue="+91 9876543210" />
          </div>
          <Button variant="primary" className="mt-6">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex-col gap-4">
          <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <p className="font-semibold">Language</p>
              <p className="text-sm text-muted">Select your preferred app language</p>
            </div>
            <select style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Voice Assistant</p>
              <p className="text-sm text-muted">Enable voice navigation and prompts</p>
            </div>
            <Button variant="secondary">Enabled</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
