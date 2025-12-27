# API Contracts: React Native App Initialization

**Date**: 2025-12-19  
**Feature**: 001-rn-app-init

## Overview

This feature is **purely infrastructure setup** and does not define any API contracts or endpoints. The initialization process establishes the technical foundation for the mobile application but does not implement any server communication.

---

## No API Contracts Required

**Reason**: This feature focuses on:

- Project structure setup
- Dependency installation and configuration
- Development tool configuration (TypeScript, ESLint, testing)
- UI foundation (NativeWind, component library)
- State management setup (patterns, not actual API calls)

No backend services or API endpoints are created or consumed during initialization.

---

## Future API Contracts

When features requiring API communication are added, contracts will be documented here using the following structure:

```
contracts/
├── openapi.yaml           # OpenAPI 3.0 specification (if REST)
├── graphql/
│   └── schema.graphql     # GraphQL schema (if GraphQL)
└── endpoints/
    ├── auth.md            # Authentication endpoints
    ├── users.md           # User management endpoints
    └── README.md          # Contract documentation guide
```

---

## API Integration Pattern (For Future Features)

When API integration is needed, follow this pattern using TanStack Query:

### Example: Fetching User Data

```typescript
// src/services/api/users.ts
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(userId: string): Promise<User> {
  const response = await fetch(`https://api.zimzimba.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Example: Creating a Resource

```typescript
// src/services/api/posts.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreatePostInput {
  title: string;
  content: string;
}

async function createPost(input: CreatePostInput): Promise<Post> {
  const response = await fetch('https://api.zimzimba.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

---

## API Client Configuration

The initialization sets up a base API client pattern that future features will use:

```typescript
// src/services/api/client.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getAuthToken(): Promise<string | null> {
    return storage.getString('auth_token') ?? null;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getAuthToken();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(
  process.env.EXPO_PUBLIC_API_URL ?? 'https://api.zimzimba.com'
);
```

---

## Environment Variables

API configuration will use environment variables:

```bash
# .env.local (for development)
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# .env.staging
EXPO_PUBLIC_API_URL=https://staging-api.zimzimba.com

# .env.production
EXPO_PUBLIC_API_URL=https://api.zimzimba.com
```

Accessed via:

```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

---

## Summary

- **Current State**: No API contracts (infrastructure setup only)
- **Future State**: API contracts will be added when features require server communication
- **Pattern**: TanStack Query for all data fetching (per constitution)
- **Structure**: OpenAPI/GraphQL schemas + TypeScript types
- **Client**: Base API client configured for future use

This directory will remain minimal until features requiring API integration are developed.
