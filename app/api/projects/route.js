import { NextResponse } from 'next/server';
import { createProject } from '@/services/projectService';

export async function POST(request) {
  try {
    const payload = await request.json();
    const created = await createProject(payload);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    const message = error?.message || 'Failed to create project';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
