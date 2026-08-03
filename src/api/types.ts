/* ═══════════════════════════════════════════════════════════════════
   API Types — mirrors the SOW §4.2 backend contract:
     Conversations table — PK: user_id, SK: conversation_id
     Messages table       — PK: conversation_id, SK: timestamp
   Swap the stub functions below for real fetch() calls once
   API Gateway + Lambda is deployed.
   ═══════════════════════════════════════════════════════════════════ */

export interface Conversation {
  conversation_id: string;
  user_id: string;
  title: string;
  created_date: string;
  last_activity: string;
}

export interface ChatMessage {
  conversation_id: string;
  timestamp: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, unknown>;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export async function listConversations(): Promise<Conversation[]> {
  const res = await fetch(`${API_BASE}/conversations`);
  if (!res.ok) throw new Error('Failed to list conversations');
  return res.json();
}

export async function createConversation(title: string): Promise<Conversation> {
  const res = await fetch(`${API_BASE}/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create conversation');
  return res.json();
}

export async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${API_BASE}/conversations/${conversationId}/messages`);
  if (!res.ok) throw new Error('Failed to load messages');
  return res.json();
}

export async function sendMessage(conversationId: string, content: string): Promise<ChatMessage> {
  const res = await fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function deleteConversation(conversationId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/conversations/${conversationId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete conversation');
}
